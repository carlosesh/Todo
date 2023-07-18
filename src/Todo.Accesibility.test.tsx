// src/Todo.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from "./App";

expect.extend(toHaveNoViolations);  // Extend Jest's expect function

test('Todo text input should be accessible', async () => {
    render(<App />);
    const textField = screen.getByLabelText("Enter a new todo:");
    const results = await axe(textField);
    expect(results).toHaveNoViolations();
});

test('Todo expiry date input should be accessible', async () => {
    const { container } = render(<App />);
    const dateField = container.querySelector('input[type="datetime-local"]');
    const results = await axe(dateField!);
    expect(results).toHaveNoViolations();
});
