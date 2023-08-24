import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from './App';
import TodoItem from './TodoItem';

expect.extend(toHaveNoViolations);  // Extend Jest's expect function

test('Todo text input should be accessible', async () => {
	render(<App />);
	const textField = screen.getByLabelText('Enter a new todo:');
	const results = await axe(textField);
	expect(results).toHaveNoViolations();
});

test('Todo expiry date input should be accessible', async () => {
	const { container } = render(<App />);
	const dateField = container.querySelector('input[type="datetime-local"]');
	const results = await axe(dateField!);
	expect(results).toHaveNoViolations();
});

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
