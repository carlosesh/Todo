import React from 'react';

type TodoItemProps = {
    text: string;
    expiryDate: Date;
    deleteTodo: () => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ text, expiryDate, deleteTodo }) => {
	return (
		<div>
			<span>{text}</span>
			<span>Expires at: {new Date(expiryDate).toLocaleString()}</span>
			<button onClick={deleteTodo}>Delete</button>
		</div>
	);
};

export default TodoItem;
