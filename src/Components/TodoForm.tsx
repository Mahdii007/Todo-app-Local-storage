import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../utility/type';

interface TodoFormProps {
  onSubmit: (task: Task) => void; 
}

const TodoForm: React.FC<TodoFormProps> = (props) => {
  
  const [input, setInput] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      isComplete: false
    });

    setInput(''); 
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        placeholder="Add a todo"
        value={input}
        onChange={handleChange}
        name="text"
        className="todo-input"
        ref={inputRef}
      />
      <button type="submit" className="todo-button">
        Add todo
      </button>
    </form>
  );
};

export default TodoForm;
