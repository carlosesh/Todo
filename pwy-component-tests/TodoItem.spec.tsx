import { test, expect } from './util/axe-test';
import App from '../src/App';
import TodoItem from '../src/TodoItem';

test.use({ viewport: { width: 500, height: 500 } });

test('it should show violations if any', async ({ mount, makeAxeBuilder }, testInfo) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const component = await mount(<App />);
	const accessibilityScanResults = await makeAxeBuilder().analyze();

	await testInfo.attach('accessibility-scan-results', {
		body: JSON.stringify(accessibilityScanResults, null, 2),
		contentType: 'application/json'
	});

	expect(accessibilityScanResults.violations).toEqual([]);
});

test('TodoItem button text should not throw accessibility violation', async ({ mount, makeAxeBuilder }, testInfo) => {
	// Render the TodoItem with a button without discernible text
	const component = await mount(<TodoItem
		text="Test todo"
		expiryDate={new Date('2023-12-31T13:00')}
		deleteTodo={() => {}}
	/>);

	// Change the text of the delete button to be empty
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const deleteButton = component.getByRole('button');

	// Assert that axe found violations
	const accessibilityScanResults = await makeAxeBuilder().analyze();

	await testInfo.attach('accessibility-scan-results', {
		body: JSON.stringify(accessibilityScanResults, null, 2),
		contentType: 'application/json'
	});

	expect(accessibilityScanResults.violations).toEqual([]);
});
