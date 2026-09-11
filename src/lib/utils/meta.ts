/**
 * Meta Conversions API (CAPI) helpers
 *
 * Normalization and hashing follow Meta's customer information parameters spec.
 * Meta normalizes its own records the same way before hashing, so any deviation
 * here silently lowers Event Match Quality instead of raising it.
 *
 * Docs: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters
 */

import { META_GRAPH_API_VERSION, META_LEAD_CURRENCY, SITE_URL } from '$lib/config/constants';

/**
 * Hosts accepted as an event_source_url origin. The URL arrives from the client
 * (request body or Referer header), so an unchecked value would let a caller
 * write arbitrary URLs into the Meta dataset.
 */
const ALLOWED_EVENT_SOURCE_HOSTS = new Set(['awvaughan.com', 'www.awvaughan.com']);

const DEFAULT_EVENT_SOURCE_URL = `${SITE_URL}/contact`;

/** Meta rejects slow requests anyway; fail fast rather than hold the response. */
const REQUEST_TIMEOUT_MS = 8000;

/**
 * SHA-256 hash a string as lowercase hex. Meta requires this for all PII fields.
 * Callers must normalize before hashing — this function hashes exactly what it is given.
 */
export async function sha256Hex(value: string): Promise<string> {
	const data = new TextEncoder().encode(value);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	return Array.from(new Uint8Array(hashBuffer))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}

/**
 * Normalize an email for matching: trimmed and lowercased.
 */
export function normalizeEmail(email: string): string {
	return email.trim().toLowerCase();
}

/**
 * Normalize a name for matching: lowercased, accents folded away, punctuation
 * and whitespace removed. e.g. "O'Brien-Smith" becomes "obriensmith".
 *
 * Letters of every script are preserved. An earlier version stripped everything
 * outside `a-z`, which turned "Łukasz" into "ukasz" and "王小明" into an empty
 * string — producing hashes that can never match, for precisely the customers
 * whose names are least ambiguous.
 */
export function normalizeName(name: string): string {
	return (
		name
			.normalize('NFKD')
			// NFKD splits accented characters into letter + combining mark; drop
			// the marks so "José" and "Jose" hash identically.
			.replace(/\p{M}+/gu, '')
			.toLowerCase()
			.replace(/[^\p{L}\p{N}]+/gu, '')
	);
}

/**
 * Normalize a US phone number to digits with country code, e.g. 17574021100.
 *
 * Returns null for anything that is not a plausible NANP number: sending
 * malformed digits to Meta lowers Event Match Quality, so an unusable phone is
 * dropped rather than guessed at. NANP forbids 0 and 1 as the leading digit of
 * either the area code or the exchange, which rejects placeholder input such as
 * "0000000000" that would otherwise hash to a confident-looking wrong answer.
 */
export function normalizePhone(phone: string): string | null {
	const digits = phone.replace(/\D/g, '');
	const national = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;

	if (national.length !== 10) return null;
	if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(national)) return null;

	return `1${national}`;
}

/**
 * Resolve an event_source_url, accepting it only when it points at this site.
 */
export function resolveEventSourceUrl(candidate: string | null | undefined): string {
	if (candidate) {
		try {
			const parsed = new URL(candidate);
			if (parsed.protocol === 'https:' && ALLOWED_EVENT_SOURCE_HOSTS.has(parsed.hostname)) {
				return parsed.toString();
			}
		} catch {
			// Not a parseable URL — fall through to the default
		}
	}
	return DEFAULT_EVENT_SOURCE_URL;
}

/**
 * Whether a client-supplied event ID is a well-formed UUID.
 *
 * The browser pixel and this server share an event ID so Meta can deduplicate
 * the two Lead events. The value arrives in the request body, so it is client
 * input: an arbitrary string would be written straight into the dataset, and a
 * deliberately repeated one would let a caller suppress real Lead events
 * through Meta's own deduplication.
 */
export function isValidEventId(candidate: string | null | undefined): boolean {
	if (!candidate) return false;
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
		candidate
	);
}

/**
 * Constant-time string comparison for secret values, so response timing does not
 * reveal how much of a candidate secret was correct. Length is not concealed.
 */
export function timingSafeEqual(a: string, b: string): boolean {
	const aBytes = new TextEncoder().encode(a);
	const bBytes = new TextEncoder().encode(b);
	if (aBytes.length !== bBytes.length) return false;

	let difference = 0;
	for (let i = 0; i < aBytes.length; i++) {
		difference |= aBytes[i] ^ bBytes[i];
	}
	return difference === 0;
}

export interface MetaLeadUser {
	email: string;
	phone?: string;
	firstName: string;
	lastName: string;
	fbp?: string;
	fbc?: string;
	clientIp?: string;
	userAgent?: string;
}

/**
 * Build the user_data payload for a Lead event.
 *
 * A field whose normalized value is empty is omitted rather than hashed. Hashing
 * an empty string yields a valid-looking digest that can never match a real
 * person, and — because it is the same digest every time — makes every affected
 * submission look to Meta like one shared identity.
 *
 * Note that fbp, fbc, client_ip_address, and client_user_agent are sent
 * unhashed — Meta requires these in the clear and hashing them destroys the match.
 */
export async function buildUserData(user: MetaLeadUser): Promise<Record<string, string>> {
	const userData: Record<string, string> = {};

	const email = normalizeEmail(user.email);
	if (email) userData.em = await sha256Hex(email);

	const firstName = normalizeName(user.firstName);
	if (firstName) userData.fn = await sha256Hex(firstName);

	const lastName = normalizeName(user.lastName);
	if (lastName) userData.ln = await sha256Hex(lastName);

	if (user.phone) {
		const normalizedPhone = normalizePhone(user.phone);
		if (normalizedPhone) {
			userData.ph = await sha256Hex(normalizedPhone);
		}
	}

	if (user.fbp) userData.fbp = user.fbp;
	if (user.fbc) userData.fbc = user.fbc;
	if (user.clientIp) userData.client_ip_address = user.clientIp;
	if (user.userAgent) userData.client_user_agent = user.userAgent;

	return userData;
}

/**
 * Send a Lead event to the Conversions API.
 *
 * The access token is sent as a Bearer header rather than a query parameter so it
 * does not land in proxy, CDN, or error logs.
 *
 * `leadValue` is omitted when the operator has not configured one. An earlier
 * version hardcoded 0.0, which gives Meta's value-based bidding nothing to
 * optimize toward while presenting itself as a real measurement.
 *
 * Throws when Meta rejects the event. Meta returns HTTP 200 with an `error` body
 * for some failures, so the body is inspected as well as the status — otherwise a
 * broken integration looks identical to a working one.
 */
export async function sendMetaConversionEvent(options: {
	accessToken: string;
	pixelId: string;
	eventId: string;
	user: MetaLeadUser;
	sourceUrl: string;
	testEventCode?: string;
	leadValue?: number;
}): Promise<void> {
	const event: Record<string, unknown> = {
		event_name: 'Lead',
		event_time: Math.floor(Date.now() / 1000),
		event_id: options.eventId,
		action_source: 'website',
		event_source_url: options.sourceUrl,
		user_data: await buildUserData(options.user)
	};

	if (options.leadValue !== undefined) {
		event.custom_data = { value: options.leadValue, currency: META_LEAD_CURRENCY };
	}

	const body: Record<string, unknown> = { data: [event] };
	if (options.testEventCode) body.test_event_code = options.testEventCode;

	const response = await fetch(
		`https://graph.facebook.com/${META_GRAPH_API_VERSION}/${options.pixelId}/events`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${options.accessToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body),
			signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
		}
	);

	const payload = await response.json().catch(() => null);
	if (!response.ok || payload?.error) {
		const reason = payload?.error?.message ?? `HTTP ${response.status}`;
		throw new Error(`Meta CAPI Lead event rejected: ${reason}`);
	}
}
