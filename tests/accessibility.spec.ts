import { test, expect } from './util/axe-test';
import { TestInfo } from '@playwright/test';

test.describe('Accesibility', () => {

	test.beforeEach(async ({ page, baseURL }) => {
		await page.goto(baseURL!);
	});

	test('it should show violations if any', async ({ analyzeAccessibility }, testInfo: TestInfo) => {
		const accessibilityScanResults = await analyzeAccessibility(testInfo);

		expect(accessibilityScanResults.violations).toEqual([]);
	});
});
