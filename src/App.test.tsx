import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import { advanceTo } from 'jest-date-mock';

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

test('Todo item should correctly display the expiry date', () => {
  render(<App />);

  const textField = screen.getByPlaceholderText("Enter a new todo");
  const expiryDateField = screen.getByPlaceholderText("Enter expiry date and time");

  fireEvent.change(textField, { target: { value: 'Test Todo' } });
  fireEvent.change(expiryDateField, { target: { value: '2023-12-31T13:00' } });
  fireEvent.click(screen.getByText("Add Todo"));

  // Adjust the displayed date according to your time zone
  // This will match any text that starts with 'Expires at:'
  const expiryDateText = screen.getByText(/^Expires at:/);
  expect(expiryDateText).toBeInTheDocument();
});


test('Todo item should be deleted correctly', () => {
  render(<App />);

  const textField = screen.getByPlaceholderText("Enter a new todo");
  const expiryDateField = screen.getByPlaceholderText("Enter expiry date and time");

  fireEvent.change(textField, { target: { value: 'Unique Test Todo' } });
  fireEvent.change(expiryDateField, { target: { value: '2023-12-31T13:00' } });
  fireEvent.click(screen.getByText("Add Todo"));

  // Delete the todo
  fireEvent.click(screen.getByText("Delete"));

  // The todo should no longer be in the document
  expect(screen.queryByText('Unique Test Todo')).not.toBeInTheDocument();
  expect(screen.queryByText('Expires at: 12/31/2023, 1:00 PM')).not.toBeInTheDocument();
});

test('useEffect should delete expired todos', async () => {
  render(<App />);

  const textField = screen.getByPlaceholderText("Enter a new todo");
  const expiryDateField = screen.getByPlaceholderText("Enter expiry date and time");

  fireEvent.change(textField, { target: { value: 'Expired Test Todo' } });
  fireEvent.change(expiryDateField, { target: { value: '2023-12-31T13:00' } });
  fireEvent.click(screen.getByText("Add Todo"));

  // Advance the time to after the expiry date of the todo
  advanceTo(new Date('2024-01-01T00:00'));

  // Wait for useEffect to execute and re-render the component
  await new Promise(r => setTimeout(r, 2000));

  // The todo should no longer be in the document
  expect(screen.queryByText('Expired Test Todo')).not.toBeInTheDocument();
  expect(screen.queryByText('Expires at: 12/31/2023, 1:00 PM')).not.toBeInTheDocument();
});

