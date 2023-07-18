import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

test('renders the add button and input field', () => {
  render(<App />);

  // Check that the add button is there
  const addButton = screen.getByText('Add Todo');
  expect(addButton).toBeInTheDocument();

  // Check that the input is there
  const input = screen.getByPlaceholderText('Enter a new todo');
  expect(input).toBeInTheDocument();
});

test('allows the user to add a todo', () => {
  render(<App />);

  const addButton = screen.getByText('Add Todo');
  const input = screen.getByPlaceholderText('Enter a new todo');

  // Add a new todo
  fireEvent.change(input, { target: { value: 'Learn React' } });
  fireEvent.click(addButton);

  expect(screen.getByText('Learn React')).toBeInTheDocument();
});

test('allows the user to delete a todo', () => {
  render(<App />);

  const addButton = screen.getByText('Add Todo');
  const input = screen.getByPlaceholderText('Enter a new todo');

  // Add a new todo
  fireEvent.change(input, { target: { value: 'Learn React' } });
  fireEvent.click(addButton);

  // Delete a todo
  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);

  expect(screen.queryByText('Learn React')).toBeNull();
});
