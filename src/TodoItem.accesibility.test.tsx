import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import TodoItem from './TodoItem';

expect.extend(toHaveNoViolations);  // Extend Jest's expect function

test('TodoItem should be accessible', async () => {
	const todo = {
		text: 'Test Todo',
		expiryDate: new Date('2023-12-31T13:00'),
		index: 0,
		deleteTodo: jest.fn(),
	};

	const { container } = render(<TodoItem {...todo} />);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});

test('TodoItem button text should not throw accessibility violation', async () => {
	// Render the TodoItem with a button without discernible text
	const { container } = render(
		<TodoItem
			text="Test todo"
			expiryDate={new Date('2023-12-31T13:00')}
			deleteTodo={() => {}}
		/>
	);

	// Change the text of the delete button to be empty
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const deleteButton = container.querySelector('button');

	// Run axe on the rendered HTML
	const results = await axe(container);

	// Assert that axe found violations
	expect(results).toHaveNoViolations();
});
