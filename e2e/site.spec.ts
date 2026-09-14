import { expect, test, type ConsoleMessage, type Page } from '@playwright/test';

/**
 * Hosts belonging to the retired Stape Conversions API Gateway.
 *
 * Stape is no longer used — this site sends Conversions API events directly to
 * Meta from /api/contact — but a Conversions API Gateway is still configured in
 * Meta Events Manager, so fbevents.js reads it at runtime and still attempts to
 * post events there. The CSP blocks those attempts, which is the intended
 * outcome; they are listed here only so this test does not fail on a
 * decommissioning that is still in progress.
 *
 * Once the gateway is removed in Events Manager these hosts stop appearing:
 * empty this list at that point, so any reappearance fails the test. See
 * CLAUDE.md.
 */
const RETIRED_GATEWAY_HOSTS = ['capig.stape.st', '.a.run.app'];

/**
 * The host of the resource a violation is about.
 *
 * Every Chromium CSP message names the blocked resource before it quotes the
 * policy ("Connecting to 'X' violates...", "Fetch API cannot load X.",
 * "Refused to load the script 'X'..."), so the first URL in the text is the
 * subject and any later ones belong to the policy.
 */
function blockedHost(message: string): string | null {
	const match = message.match(/https?:\/\/([^/'"\s,]+)/);
	return match ? match[1] : null;
}

function isRetiredGatewayHost(host: string): boolean {
	return RETIRED_GATEWAY_HOSTS.some((known) => host === known || host.endsWith(known));
}

/**
 * Collect Content-Security-Policy violations reported by the browser.
 *
 * Network failures are ignored: outbound calls to Facebook and Cloudflare are
 * not available in every environment, and a blocked request is not the same as
 * a policy that forbids it. A CSP violation, by contrast, means a policy is
 * rejecting a resource.
 */
function collectCspViolations(page: Page): string[] {
	const violations: string[] = [];
	page.on('console', (message: ConsoleMessage) => {
		const text = message.text();
		if (/content security policy|refused to (load|execute|connect)/i.test(text)) {
			violations.push(text);
		}
	});
	return violations;
}

/**
 * Split violations into the ones that matter — the app's own resources being
 * blocked, which breaks hydration silently — and the retired gateway's hosts.
 * Any other host counts as unexpected and fails the test, so a third-party
 * endpoint nobody decided on cannot appear unnoticed.
 */
function partitionViolations(violations: string[], pageOrigin: string) {
	const ownHost = new URL(pageOrigin).host;
	const unexpected: string[] = [];
	const retiredGateway: string[] = [];

	for (const violation of violations) {
		const host = blockedHost(violation);
		if (host && host !== ownHost && isRetiredGatewayHost(host)) {
			retiredGateway.push(violation);
		} else {
			unexpected.push(violation);
		}
	}

	return { unexpected, retiredGateway };
}

test.describe('content security policy', () => {
	// The policy is delivered as a <meta> tag on prerendered pages and as a
	// response header on server-rendered ones. A policy that blocks the app's own
	// scripts breaks hydration with no visible error at all.
	for (const path of [
		'/',
		'/about',
		'/services',
		'/services/land-clearing',
		'/service-area',
		'/contact'
	]) {
		test(`does not block the app's own resources on ${path}`, async ({ page, baseURL }) => {
			const violations = collectCspViolations(page);
			await page.goto(path);
			await expect(page.locator('h1')).toBeVisible();

			const { unexpected } = partitionViolations(violations, baseURL!);
			expect(unexpected).toEqual([]);
		});
	}

	test('permits the Meta pixel script host', async ({ page }) => {
		// Regression guard: `script-src` once omitted connect.facebook.net, which
		// silently blocked fbevents.js on /contact — the only page that fires the
		// Lead event — while leaving window.fbq defined so nothing looked broken.
		await page.goto('/contact');
		const policy = await page.evaluate(() => {
			const meta = document.querySelector('meta[http-equiv="content-security-policy" i]');
			return meta?.getAttribute('content') ?? '';
		});
		const header = (await page.request.get('/contact')).headers()['content-security-policy'] ?? '';
		expect(`${policy} ${header}`).toContain('https://connect.facebook.net');
	});
});

test.describe('page metadata', () => {
	test('every page has its own title and canonical URL', async ({ page }) => {
		// Ten navigations, and only <head> matters, so this waits for the DOM
		// rather than for third-party subresources to settle.
		test.slow();
		// These were previously identical sitewide, and every canonical pointed at
		// the homepage — which asks search engines to drop the other pages.
		const seen = new Map<string, string>();

		for (const path of [
			'/',
			'/about',
			'/services',
			'/services/land-clearing',
			'/services/bush-hogging',
			'/services/forestry-mulching',
			'/services/trail-systems',
			'/services/property-maintenance',
			'/service-area',
			'/contact'
		]) {
			await page.goto(path, { waitUntil: 'domcontentloaded' });
			const title = await page.title();
			const canonical = await page
				.locator('link[rel="canonical"]')
				.getAttribute('href', { timeout: 5000 });

			expect(title, `${path} should have a title`).toBeTruthy();
			expect(canonical, `${path} canonical`).toBe(
				`https://awvaughan.com${path === '/' ? '/' : path}`
			);
			expect(seen.has(title), `${path} duplicates the title of ${seen.get(title)}`).toBe(false);
			seen.set(title, path);
		}
	});

	test('shares an absolute Open Graph image', async ({ page }) => {
		await page.goto('/about');
		const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
		expect(ogImage).toBe('https://awvaughan.com/og-image.jpg');
	});
});

test.describe('service area map', () => {
	test('renders every locality as a shape and as text', async ({ page }) => {
		// The map is inline SVG rather than a tile layer precisely so it survives
		// prerendering. If it ever became client-only this would catch it: the
		// shapes would be absent from the served HTML.
		await page.goto('/service-area', { waitUntil: 'domcontentloaded' });

		const shapes = page.locator('svg[role="img"] path[aria-hidden="true"]');
		// Sixteen served localities plus one combined backdrop path.
		await expect(shapes).toHaveCount(17);

		// The locality names are the accessible equivalent of the map and the text
		// search engines index, so they must be real content, not just shapes.
		for (const name of ['York County', 'City of Virginia Beach', 'King and Queen County']) {
			await expect(page.getByRole('button', { name: `Show ${name} on the map` })).toBeVisible();
		}
	});

	test('highlights a locality from the keyboard', async ({ page }) => {
		await page.goto('/service-area');

		const button = page.getByRole('button', { name: 'Show York County on the map' });
		await button.focus();

		await expect(button).toHaveAttribute('aria-pressed', 'true');
		await expect(page.locator('figcaption')).toHaveText('York County');
	});

	test('adds no area served claims of its own', async ({ page }) => {
		// The map shades localities the company will travel to but does not market
		// — Virginia Beach and Chesapeake among them. This page contributing its
		// own LocalBusiness node merged those back into the business's serving
		// geography, because a second `areaServed` against the same `@id` is read
		// as one entity. See docs/keyword-strategy.md.
		await page.goto('/service-area', { waitUntil: 'domcontentloaded' });

		const areas = (await page.locator('script[type="application/ld+json"]').allTextContents())
			.join('\n')
			.split('\n')
			.map((line) => JSON.parse(line))
			.flatMap((node) => node.areaServed ?? [])
			.map((area) => area.name);

		expect(areas.length).toBeGreaterThan(0);
		for (const retired of ['Virginia Beach', 'Chesapeake', 'Norfolk']) {
			expect(areas, `${retired} must not be claimed as served`).not.toContain(retired);
		}
	});
});

test.describe('contact form', () => {
	test('submits successfully and reports the outcome', async ({ page }) => {
		await page.goto('/contact');

		// The preview build has no mail credentials, so the real endpoint
		// correctly refuses (covered by the next test). Here the endpoint is
		// stubbed with the success payload to exercise the page's own wiring.
		await page.route('**/api/contact', (route) =>
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					success: true,
					delivered: true,
					message: 'Thank you for your message. We will get back to you soon!'
				})
			})
		);

		const form = page.locator('form');
		await form.getByLabel('First Name').fill('Jamie');
		await form.getByLabel('Last Name').fill('Rivera');
		await form.getByLabel('Email').fill('jamie@example.com');
		await form.getByLabel('Phone').fill('757-555-0142');
		await form
			.getByLabel('Message')
			.fill('The driveway needs a pad <10 ft > wide and it holds water.');

		const submit = page.getByRole('button', { name: /send message/i });
		await expect(submit).toBeEnabled();
		await submit.click();

		// The form must say what actually happened, not claim success regardless.
		await expect(page.getByRole('heading', { name: /message (sent|received)/i })).toBeVisible();
	});

	test('surfaces the server error message instead of a generic one', async ({ page }) => {
		await page.goto('/contact');

		// The API rejects this; the page must show the API's explanation.
		await page.route('**/api/contact', (route) =>
			route.fulfill({
				status: 400,
				contentType: 'application/json',
				body: JSON.stringify({ message: 'Your CAPTCHA verification expired.' })
			})
		);

		const form = page.locator('form');
		await form.getByLabel('First Name').fill('Jamie');
		await form.getByLabel('Last Name').fill('Rivera');
		await form.getByLabel('Email').fill('jamie@example.com');
		await form.getByLabel('Message').fill('Hello');
		await page.getByRole('button', { name: /send message/i }).click();

		await expect(page.getByText('Your CAPTCHA verification expired.')).toBeVisible();
	});

	test('never claims success when the server cannot capture the submission', async ({ page }) => {
		// End to end against the real endpoint. The preview build has no mail
		// credentials configured, so the submission genuinely cannot be captured —
		// and the visitor must be told to call instead of being thanked. The old
		// handler swallowed the failure and rendered "Message Sent!".
		await page.goto('/contact');

		const form = page.locator('form');
		await form.getByLabel('First Name').fill('Jamie');
		await form.getByLabel('Last Name').fill('Rivera');
		await form.getByLabel('Email').fill('jamie@example.com');
		await form.getByLabel('Message').fill('Hello');
		await page.getByRole('button', { name: /send message/i }).click();

		await expect(page.getByRole('heading', { name: /^error$/i })).toBeVisible();
		await expect(page.getByText(/could not submit your message/i)).toBeVisible();
		await expect(page.getByRole('heading', { name: /message sent/i })).toBeHidden();
	});
});

test.describe('service pages', () => {
	test('all four render from the shared template', async ({ page }) => {
		test.slow();
		// The `heading` field of each record in src/lib/data/services.ts — which is
		// not the same string as its `title`, the card label used on the listing.
		const expected = [
			['/services/land-clearing', 'Land Clearing in Williamsburg, VA'],
			['/services/bush-hogging', 'Bush Hogging in Williamsburg & the Middle Peninsula'],
			['/services/forestry-mulching', 'Forestry Mulching in Williamsburg, VA'],
			['/services/trail-systems', 'Trail Systems & Recreational Access'],
			['/services/property-maintenance', 'Property Maintenance in Williamsburg, VA']
		];

		for (const [path, heading] of expected) {
			await page.goto(path, { waitUntil: 'domcontentloaded' });
			await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
			// Four offerings, from the service data. Scoped to main, since the
			// footer has headings of its own. The photograph is deliberately not
			// asserted: `image` is optional, and a service with no honest photo of
			// the work ships without one.
			const main = page.locator('#main-content');
			await expect(main.getByRole('heading', { level: 3 })).toHaveCount(4);
		}
	});

	test('retired service URLs redirect instead of 404ing', async ({ page }) => {
		test.slow();
		// These four were retired when the company moved to land management.
		// Redirects live in _redirects and are applied by Cloudflare Pages, which
		// `vite preview` does not emulate — so this only asserts the destinations
		// are reachable. The mapping itself is guarded in deployment.test.ts.
		const destinations = ['/services/land-clearing', '/services'];
		for (const path of destinations) {
			const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
			expect(response?.status(), `${path} should be served`).toBe(200);
		}
	});

	test('an unknown service returns 404', async ({ page }) => {
		const response = await page.goto('/services/not-a-real-service');
		expect(response?.status()).toBe(404);
	});
});

test.describe('headings', () => {
	test('h1 is visibly larger than h2', async ({ page }) => {
		// Every heading was pinned at 20px, so pages had no visual hierarchy.
		await page.goto('/about');
		const sizeOf = (selector: string) =>
			page
				.locator(selector)
				.first()
				.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));

		expect(await sizeOf('h1')).toBeGreaterThan(await sizeOf('h2'));
		expect(await sizeOf('h2')).toBeGreaterThan(await sizeOf('h3'));
	});
});

test.describe('navigation', () => {
	test('mobile menu opens, marks the current page, and closes on Escape', async ({
		page
	}, testInfo) => {
		test.skip(testInfo.project.name !== 'mobile', 'mobile viewport only');

		await page.goto('/about');
		const toggle = page.getByRole('button', { name: /toggle navigation menu/i });
		await toggle.click();

		const menu = page.locator('#mobile-navigation');
		await expect(menu).toBeVisible();
		await expect(toggle).toHaveAttribute('aria-expanded', 'true');
		await expect(menu.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');

		await page.keyboard.press('Escape');
		await expect(menu).toBeHidden();
	});
});

test.describe('homepage services carousel', () => {
	// The homepage services grid became a carousel. The risk a carousel carries
	// is that the cards it is not showing stop existing — for the visitor without
	// JavaScript, and for the crawler that never runs it — so what is asserted
	// here is that all five service links ship in the prerendered HTML, and that
	// the controls move the track and track their own position.
	test('ships every service link in the HTML and steps through the pages', async ({ page }) => {
		const slugs = [
			'land-clearing',
			'bush-hogging',
			'forestry-mulching',
			'trail-systems',
			'property-maintenance'
		];

		const html = await (await page.request.get('/')).text();
		for (const slug of slugs) {
			expect(html).toContain(`href="/services/${slug}"`);
		}

		await page.goto('/');
		const carousel = page.getByRole('group', { name: 'Our services' });
		const track = carousel.getByRole('group', { name: /scrollable/i });
		const previous = carousel.getByRole('button', { name: 'Previous services' });
		const next = carousel.getByRole('button', { name: 'Next services' });
		const dots = carousel.getByRole('button', { name: /^Go to services/ });

		await expect(previous).toBeDisabled();
		await expect(dots.first()).toHaveAttribute('aria-current', 'true');

		// How many cards fit is decided by CSS, so the page count is read from the
		// dots rather than assumed: two per view on desktop, one on mobile.
		const pageCount = await dots.count();
		expect(pageCount).toBeGreaterThan(1);

		for (let index = 1; index < pageCount; index++) {
			await next.click();
			await expect(dots.nth(index)).toHaveAttribute('aria-current', 'true');
		}

		await expect(next).toBeDisabled();
		await expect(previous).toBeEnabled();
		await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
	});
});
