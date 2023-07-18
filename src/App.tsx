// src/Todo.tsx
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

type Todo = {
    text: string;
    expiryDate: Date;
};
function App() {
    const [items, setItems] = useState<Todo[]>([]);
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
                <TodoItem key={index} text={todo.text} expiryDate={todo.expiryDate} deleteTodo={() => deleteTodo(index)} />
            ))}
        </div>
    );
}

export default App;
