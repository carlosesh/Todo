import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const baseURL = process.env.BASE_URL || 'http://localhost:3000';
export default defineConfig({
	testDir: './tests',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [['html'], ['./reporter/playwright-grouped-axe-html-reporter.ts']],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		baseURL,
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
		trace: 'retain-on-failure',
		headless: true,
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'Desktop Chrome',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'Desktop Firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'Desktop Safari',
			use: { ...devices['Desktop Safari'] },
		},

		{
			name: 'Desktop Edge',
			use: { ...devices['Desktop Edge'] },
		},
	],

	// Run your local dev server before starting the tests.
	webServer: {
		command: 'yarn start',
		url: 'http://127.0.0.1:3000/',
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI,
	},
});
