import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from "./App";
import TodoItem from "./TodoItem";

expect.extend(toHaveNoViolations);  // Extend Jest's expect function

test('TodoItem should be accessible', async () => {
    const todo = {
        text: "Test Todo",
        expiryDate: new Date('2023-12-31T13:00'),
        index: 0,
        deleteTodo: jest.fn(),
    };

    const { container } = render(<TodoItem {...todo} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
});
