import { test, expect } from './util/axe-test';
import { TestInfo } from '@playwright/test';

test.describe('Accesibility', () => {

	test.beforeEach(async ({ page, baseURL }) => {
		await page.goto(baseURL!);
	});

	test('it should show violations if any', async ({ makeAxeBuilder, browserName }, testInfo: TestInfo) => {
		const accessibilityScanResults = await makeAxeBuilder().analyze();

		await testInfo.attach('accessibility-scan-results', {
			body: JSON.stringify({ axeResult: accessibilityScanResults, browser: browserName }, null, 2),
			contentType: 'application/json',
		});

		expect(accessibilityScanResults.violations).toEqual([]);
	});
});
