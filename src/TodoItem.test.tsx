import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('TodoItem Component', () => {
	it('renders the todo text and expiry date', () => {
		render(
			<TodoItem
				text="Test Todo"
				expiryDate={new Date('2023-12-31T13:00')}
				deleteTodo={() => {}}
			/>
		);

		const todoText = screen.getByText('Test Todo');
		expect(todoText).toBeInTheDocument();

		const expiryDateText = screen.getByText(/Expires at:/);
		expect(expiryDateText).toBeInTheDocument();
	});

	it('calls the deleteTodo function when the delete button is clicked', () => {
		const deleteTodo = jest.fn();

		render(
			<TodoItem
				text="Test Todo"
				expiryDate={new Date('2023-12-31T13:00')}
				deleteTodo={deleteTodo}
			/>
		);

		const deleteButton = screen.getByText('Delete');
		fireEvent.click(deleteButton);

		expect(deleteTodo).toHaveBeenCalledTimes(1);
	});
});
