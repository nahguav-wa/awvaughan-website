import { describe, it, expect, vi, afterEach } from 'vitest';
import {
	buildUserData,
	normalizeEmail,
	normalizeName,
	normalizePhone,
	resolveEventSourceUrl,
	sendMetaConversionEvent,
	sha256Hex,
	timingSafeEqual
} from './meta';

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('sha256Hex', () => {
	it('produces the known digest for a known input', async () => {
		expect(await sha256Hex('abc')).toBe(
			'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
		);
	});

	it('hashes exactly what it is given, without normalizing', async () => {
		expect(await sha256Hex('ABC')).not.toBe(await sha256Hex('abc'));
	});
});

describe('normalizeEmail', () => {
	it('trims and lowercases', () => {
		expect(normalizeEmail('  John.Doe@Example.COM ')).toBe('john.doe@example.com');
	});
});

describe('normalizeName', () => {
	it('lowercases', () => {
		expect(normalizeName('John')).toBe('john');
	});

	it('strips punctuation and whitespace', () => {
		expect(normalizeName("O'Brien-Smith")).toBe('obriensmith');
		expect(normalizeName('  Mary Jane  ')).toBe('maryjane');
	});

	it('strips accents rather than dropping the letter', () => {
		expect(normalizeName('José')).toBe('jose');
	});
});

describe('normalizePhone', () => {
	it('adds the US country code to a 10-digit number', () => {
		expect(normalizePhone('757-402-1100')).toBe('17574021100');
		expect(normalizePhone('(757) 402-1100')).toBe('17574021100');
	});

	it('accepts an already-prefixed 11-digit number', () => {
		expect(normalizePhone('+1 757-402-1100')).toBe('17574021100');
	});

	it('rejects a number with an extension rather than sending junk digits', () => {
		expect(normalizePhone('757-402-1100 ext 12')).toBeNull();
	});

	it('rejects too-short and implausible numbers', () => {
		expect(normalizePhone('(757) 402-11')).toBeNull();
		expect(normalizePhone('12345')).toBeNull();
		expect(normalizePhone('')).toBeNull();
		expect(normalizePhone('not a phone')).toBeNull();
	});

	it('rejects an 11-digit number that does not start with the US country code', () => {
		expect(normalizePhone('44757402110')).toBeNull();
	});
});

describe('resolveEventSourceUrl', () => {
	it('accepts a URL on this site', () => {
		expect(resolveEventSourceUrl('https://awvaughan.com/contact?utm_source=fb')).toBe(
			'https://awvaughan.com/contact?utm_source=fb'
		);
		expect(resolveEventSourceUrl('https://www.awvaughan.com/contact')).toBe(
			'https://www.awvaughan.com/contact'
		);
	});

	it('rejects an off-site URL so callers cannot write arbitrary URLs into the dataset', () => {
		expect(resolveEventSourceUrl('https://evil.example.com/phish')).toBe(
			'https://awvaughan.com/contact'
		);
	});

	it('rejects a lookalike host', () => {
		expect(resolveEventSourceUrl('https://awvaughan.com.evil.example.com/x')).toBe(
			'https://awvaughan.com/contact'
		);
	});

	it('rejects non-https schemes', () => {
		expect(resolveEventSourceUrl('http://awvaughan.com/contact')).toBe(
			'https://awvaughan.com/contact'
		);
	});

	it('falls back for missing or unparseable values', () => {
		expect(resolveEventSourceUrl(undefined)).toBe('https://awvaughan.com/contact');
		expect(resolveEventSourceUrl(null)).toBe('https://awvaughan.com/contact');
		expect(resolveEventSourceUrl('not a url')).toBe('https://awvaughan.com/contact');
	});
});

describe('timingSafeEqual', () => {
	it('matches identical strings', () => {
		expect(timingSafeEqual('correct-secret', 'correct-secret')).toBe(true);
	});

	it('rejects differing strings of equal and unequal length', () => {
		expect(timingSafeEqual('correct-secret', 'correct-secreT')).toBe(false);
		expect(timingSafeEqual('short', 'much-longer-secret')).toBe(false);
		expect(timingSafeEqual('', 'x')).toBe(false);
	});
});

describe('buildUserData', () => {
	const baseUser = { email: 'John@Example.com', firstName: 'John', lastName: 'Doe' };

	it('hashes normalized email and name', async () => {
		const userData = await buildUserData(baseUser);

		expect(userData.em).toBe(await sha256Hex('john@example.com'));
		expect(userData.fn).toBe(await sha256Hex('john'));
		expect(userData.ln).toBe(await sha256Hex('doe'));
	});

	it('hashes a normalized phone when it is usable', async () => {
		const userData = await buildUserData({ ...baseUser, phone: '(757) 402-1100' });

		expect(userData.ph).toBe(await sha256Hex('17574021100'));
	});

	it('omits an unusable phone rather than sending malformed digits', async () => {
		const userData = await buildUserData({ ...baseUser, phone: '757-402-1100 ext 12' });

		expect(userData.ph).toBeUndefined();
	});

	it('sends fbp, fbc, IP, and user agent unhashed as Meta requires', async () => {
		const userData = await buildUserData({
			...baseUser,
			fbp: 'fb.1.123.456',
			fbc: 'fb.1.123.abc',
			clientIp: '203.0.113.10',
			userAgent: 'Mozilla/5.0'
		});

		expect(userData.fbp).toBe('fb.1.123.456');
		expect(userData.fbc).toBe('fb.1.123.abc');
		expect(userData.client_ip_address).toBe('203.0.113.10');
		expect(userData.client_user_agent).toBe('Mozilla/5.0');
	});

	it('omits optional keys that were not provided', async () => {
		const userData = await buildUserData(baseUser);

		expect(Object.keys(userData).sort()).toEqual(['em', 'fn', 'ln']);
	});
});

describe('sendMetaConversionEvent', () => {
	const options = {
		accessToken: 'test-token',
		pixelId: '1234567890',
		eventId: 'event-abc',
		user: { email: 'john@example.com', firstName: 'John', lastName: 'Doe' },
		sourceUrl: 'https://awvaughan.com/contact'
	};

	function stubFetch(response: Response) {
		const fetchMock = vi.fn().mockResolvedValue(response);
		vi.stubGlobal('fetch', fetchMock);
		return fetchMock;
	}

	it('sends the token as a Bearer header, never in the URL', async () => {
		const fetchMock = stubFetch(Response.json({ events_received: 1 }));

		await sendMetaConversionEvent(options);

		const [url, init] = fetchMock.mock.calls[0];
		expect(url).not.toContain('test-token');
		expect(url).not.toContain('access_token');
		expect(init.headers.Authorization).toBe('Bearer test-token');
	});

	it('posts a Lead event carrying the shared event ID for deduplication', async () => {
		const fetchMock = stubFetch(Response.json({ events_received: 1 }));

		await sendMetaConversionEvent(options);

		const body = JSON.parse(fetchMock.mock.calls[0][1].body);
		expect(body.data[0].event_name).toBe('Lead');
		expect(body.data[0].event_id).toBe('event-abc');
		expect(body.data[0].action_source).toBe('website');
		expect(body.data[0].event_source_url).toBe('https://awvaughan.com/contact');
	});

	it('omits test_event_code unless one is configured', async () => {
		const fetchMock = stubFetch(Response.json({ events_received: 1 }));

		await sendMetaConversionEvent(options);
		expect(JSON.parse(fetchMock.mock.calls[0][1].body).test_event_code).toBeUndefined();

		const withCode = stubFetch(Response.json({ events_received: 1 }));
		await sendMetaConversionEvent({ ...options, testEventCode: 'TEST123' });
		expect(JSON.parse(withCode.mock.calls[0][1].body).test_event_code).toBe('TEST123');
	});

	it('throws on an HTTP error so the failure is not silent', async () => {
		stubFetch(Response.json({ error: { message: 'Invalid OAuth access token' } }, { status: 400 }));

		await expect(sendMetaConversionEvent(options)).rejects.toThrow('Invalid OAuth access token');
	});

	// Meta returns 200 with an error body for some failures — status alone is not enough.
	it('throws when a 200 response carries an error body', async () => {
		stubFetch(Response.json({ error: { message: 'Unsupported post request' } }, { status: 200 }));

		await expect(sendMetaConversionEvent(options)).rejects.toThrow('Unsupported post request');
	});

	it('throws when the response body is not JSON', async () => {
		stubFetch(new Response('upstream failure', { status: 502 }));

		await expect(sendMetaConversionEvent(options)).rejects.toThrow('HTTP 502');
	});
});
