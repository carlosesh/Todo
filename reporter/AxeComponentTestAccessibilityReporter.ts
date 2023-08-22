import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { createHtmlReport } from 'axe-html-reporter';
import { AxeResults } from 'axe-core';

class AxeComponentTestAccessibilityReporter implements Reporter {
	private accessibilityResults: AxeResults[] = [];

	onEnd(): void {

		const axeResults: Partial<AxeResults> = {
			violations: this.accessibilityResults.flatMap(result => result.violations),
			incomplete: this.accessibilityResults.flatMap(result => result.incomplete),
			// Add other properties if needed
		};
		// Generate a single HTML report using axe-html-reporter
		createHtmlReport({
			results: axeResults,
			options: {
				projectKey: 'playwright-axe-html-reporter',
				// customSummary, // Include the custom summary if needed
				outputDir: 'reports/axe-report',
				reportFileName: 'index.html',
			}
		});
	}

	onTestEnd(test: TestCase, result: TestResult): void {
		const attachments = result.attachments
			.filter(attachment => attachment.name === 'accessibility-scan-results')
			.map(attachment => JSON.parse(attachment.body?.toString() || ''));

		// Append each attachment to the accessibilityResults array
		for (const attachment of attachments) {
			this.accessibilityResults.push(attachment as AxeResults);
		}
	}

}

export default AxeComponentTestAccessibilityReporter;
