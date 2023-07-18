// src/Todo.tsx
import React, { useState, useEffect } from 'react';

type TodoItem = {
    text: string;
    expiryDate: Date;
};

function App() {
    const [items, setItems] = useState<TodoItem[]>([]);
    const [newItem, setNewItem] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string>('');
    const deleteTodo = (index: number) => {
        setItems(prev => prev.filter((todo, i) => i !== index));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setItems(items => items.filter(item => new Date() < item.expiryDate));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="todo">
            <label htmlFor="todoInput">Enter a new todo:</label>
            <input
                id="todoInput"
                type="text"
                placeholder="Enter a new todo"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
            />
            <input
                type="datetime-local"
                value={expiryDate}
                placeholder="Enter expiry date and time"
                onChange={e => setExpiryDate(e.target.value)}
            />
            <button onClick={() => setItems([...items, { text: newItem, expiryDate: new Date(expiryDate) }])}>
                Add Todo
            </button>
            {items.map((todo, index) => (
                <div key={index}>
                    <span>{todo.text}</span>
                    <span>Expires at: {new Date(todo.expiryDate).toLocaleString()}</span>
                    <button onClick={() => deleteTodo(index)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default App;
