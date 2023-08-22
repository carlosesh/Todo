// jest.setup.ts
import { configureAxe } from 'jest-axe';

module.exports = {
	// Your existing config (if any)...

	// Add the reporter
	'reporters': [
		'default',
		['./node_modules/jest-html-reporters', {
			'pageTitle': 'Test Report',
			'outputPath': './test-report.html'
		}]
	]
};

// Configure axe for Jest
configureAxe({
	rules: {
		// Your custom rules here
	},
	impactLevels: ['minor', 'moderate', 'serious', 'critical'],
});
