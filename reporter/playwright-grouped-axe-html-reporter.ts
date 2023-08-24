import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { AxeResults } from 'axe-core';
import { createHtmlReport } from 'axe-html-reporter';
import { accessibilityTags } from '../tests/util/constants';

class AxeHtmlReporter implements Reporter {
	private groupedAxeResults: Record<string, { axeResult: AxeResults; browser: string }[]> = {};
	private axeResults: AxeResults[] = [];
	private totalTestsRun = 0;

	onEnd() {
		// Call the method to create the grouped HTML report
		this.createGroupedHtmlReport();

		// Combine all axe results into a single object
		const combinedResults: Partial<AxeResults> = {
			passes: this.axeResults.flatMap(result => result.passes),
			violations: this.axeResults.flatMap(result => result.violations),
			incomplete: this.axeResults.flatMap(result => result.incomplete),
			inapplicable: this.axeResults.flatMap(result => result.inapplicable),
		};

		/// Extract unique browsers used in the tests
		const browsersUsed = Array.from(new Set(Object.values(this.groupedAxeResults).flatMap(results => results.map(result => result.browser))));

		// Date and Time
		const dateAndTime = new Date().toLocaleString();

		const totalViolations = this.axeResults.flatMap(result => result.violations).length;

		// Create a custom summary with the selected details
		const customSummary = `
            <h3>Accessibility Test Summary</h3>
            <p><strong>Accessibility Standards:</strong> ${accessibilityTags.join(', ')}</p>
            <p><strong>Date and Time:</strong> ${dateAndTime}</p>
            <p><strong>Total Tests Run:</strong> ${this.totalTestsRun}</p>
            <p><strong>Total Violations Found:</strong> ${totalViolations}</p>
            <p><strong>Tests were run on the following browsers:</strong></p>
            <ul>
                ${browsersUsed.map(browser => `<li>${browser}</li>`).join('')}
            </ul>
            <p><strong>Total Violations Found</strong> != <strong>axe-core found N violations</strong>, the first represents the total violations found which are calculated for each element in the table and the latter represents the amount of violations within each row for that category</p>
        `;

		// Generate a single HTML report using axe-html-reporter
		createHtmlReport({
			results: combinedResults,
			options: {
				projectKey: 'playwright-axe-html-reporter',
				customSummary, // Include the custom summary
				outputDir: 'reports/axe-report',
				reportFileName: 'index.html',
			}
		});
	}

	onTestEnd(test: TestCase, result: TestResult) {
		// Collect axe results and browser information from the test case results
		const attachments = result.attachments
			.filter(attachment => attachment.name === 'accessibility-scan-results')
			.map(attachment => JSON.parse(attachment.body?.toString() || ''));

		// Group results by test
		const testIdentifier = test.title;
		if (!this.groupedAxeResults[testIdentifier]) {
			this.groupedAxeResults[testIdentifier] = [];
		}
		this.groupedAxeResults[testIdentifier].push(...attachments);

		this.totalTestsRun++;
	}

	createGroupedHtmlReport() {
		// Iterate through the grouped results
		for (const [testIdentifier, results] of Object.entries(this.groupedAxeResults)) {
			// Modify the axe results to include the test information
			results.forEach(({ axeResult, browser }) => {
				axeResult.violations.forEach((violation) => { // Added type any for violation
					violation.description = `
						Test: ${testIdentifier}
						Browser: ${browser}
						Violation: ${violation.description}
					`;
				});
				this.axeResults.push(axeResult);
			});
		}
	}
}

export default AxeHtmlReporter;
