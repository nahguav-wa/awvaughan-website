import { expect, test, type ConsoleMessage, type Page } from '@playwright/test';

/**
 * Third-party endpoints that page scripts contact and the CSP deliberately does
 * not allow.
 *
 * These come from the Meta pixel's own Conversions API Gateway configuration in
 * Events Manager, not from anything in this repository: fbevents.js reads them
 * at runtime and posts events to them. They are listed rather than ignored, so
 * that a *new* third-party endpoint appearing in the pixel configuration fails
 * this test and gets a decision, instead of passing unnoticed.
 *
 * Whether to allow these in connect-src is a data-flow decision for the site
 * owner; see CLAUDE.md.
 */
const KNOWN_BLOCKED_THIRD_PARTY = ['capig.stape.st', '.a.run.app'];

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

function isKnownThirdParty(host: string): boolean {
	return KNOWN_BLOCKED_THIRD_PARTY.some((known) => host === known || host.endsWith(known));
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
 * blocked, which breaks hydration silently — and known third-party endpoints.
 * An unrecognized host counts as unexpected and fails the test.
 */
function partitionViolations(violations: string[], pageOrigin: string) {
	const ownHost = new URL(pageOrigin).host;
	const unexpected: string[] = [];
	const knownThirdParty: string[] = [];

	for (const violation of violations) {
		const host = blockedHost(violation);
		if (host && host !== ownHost && isKnownThirdParty(host)) {
			knownThirdParty.push(violation);
		} else {
			unexpected.push(violation);
		}
	}

	return { unexpected, knownThirdParty };
}

test.describe('content security policy', () => {
	// The policy is delivered as a <meta> tag on prerendered pages and as a
	// response header on server-rendered ones. A policy that blocks the app's own
	// scripts breaks hydration with no visible error at all.
	for (const path of ['/', '/about', '/services', '/services/excavation', '/contact']) {
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
		// Eight navigations, and only <head> matters, so this waits for the DOM
		// rather than for third-party subresources to settle.
		test.slow();
		// These were previously identical sitewide, and every canonical pointed at
		// the homepage — which asks search engines to drop the other pages.
		const seen = new Map<string, string>();

		for (const path of [
			'/',
			'/about',
			'/services',
			'/services/gravel-driveway-repair',
			'/services/drainage-solutions',
			'/services/shed-pad-preparation',
			'/services/excavation',
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
		const expected = [
			['/services/gravel-driveway-repair', 'Gravel Driveway Repair & Restoration'],
			['/services/drainage-solutions', 'Drainage Solutions & Grading'],
			['/services/shed-pad-preparation', 'Shed Pad & Foundation Preparation'],
			['/services/excavation', 'Small Excavation & Site Work']
		];

		for (const [path, heading] of expected) {
			await page.goto(path, { waitUntil: 'domcontentloaded' });
			await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
			// Four offerings and a photograph, from the service data. Scoped to
			// main, since the footer has headings of its own.
			const main = page.locator('#main-content');
			await expect(main.getByRole('heading', { level: 3 })).toHaveCount(4);
			await expect(main.locator('picture img').first()).toBeVisible();
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
