import { test as base, TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { accessibilityTags } from './constants';
import { AxeResults } from 'axe-core';

type AxeFixture = {
	makeAxeBuilder: () => AxeBuilder;
	analyzeAccessibility: (testInfo: TestInfo) => Promise<AxeResults>;
};

export const test = base.extend<AxeFixture>({
	makeAxeBuilder: async ({ page }, use) => {
		const makeAxeBuilder = () => new AxeBuilder({ page })
			.withTags(accessibilityTags);
		await use(makeAxeBuilder);
	},
	analyzeAccessibility: async ({ makeAxeBuilder }, use) => {
		const analyzeAccessibility = async (testInfo: TestInfo) => {
			const axeBuilder = makeAxeBuilder();
			const accessibilityScanResults = await axeBuilder.analyze();

			await testInfo.attach('accessibility-scan-results', {
				body: JSON.stringify({ axeResult: accessibilityScanResults, browser: testInfo.project.name }, null, 2),
				contentType: 'application/json',
			});

			return accessibilityScanResults;
		};

		await use(analyzeAccessibility);
	}
});
export { expect } from '@playwright/test';
