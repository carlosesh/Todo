import { test, expect } from './util/axe-test';

test.describe('Accesibility', () => {

    test.beforeEach(async ({ page , baseURL}) => {
        await page.goto(baseURL);
    });

    test('it should show violations if any', async ({ makeAxeBuilder }, testInfo) => {
        const accessibilityScanResults = await makeAxeBuilder().analyze();

        await testInfo.attach('accessibility-scan-results', {
            body: JSON.stringify(accessibilityScanResults, null, 2),
            contentType: 'application/json'
        });

        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
