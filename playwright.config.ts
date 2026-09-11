import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests.
 *
 * These run against the production build rather than the dev server, because
 * the bugs worth catching here only exist in the built output: the
 * Content-Security-Policy is generated at build time, and most pages are
 * prerendered.
 */
/**
 * Escape hatch for environments that ship a pre-provisioned Chromium whose
 * build does not match the one this Playwright version would download.
 * Unset in CI, where `playwright install` provides the matching browser.
 */
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
const launchOptions = executablePath ? { launchOptions: { executablePath } } : {};

export default defineConfig({
	testDir: 'e2e',
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? 'github' : 'list',
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'on-first-retry'
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'], ...launchOptions } },
		{ name: 'mobile', use: { ...devices['Pixel 5'], ...launchOptions } }
	],
	webServer: {
		command: 'npm run build && npm run preview -- --port 4173',
		port: 4173,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000
	}
});
