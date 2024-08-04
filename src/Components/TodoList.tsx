import { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { Task } from '../utility/type';

function TodoList() {
  const [todos, setTodos] = useState<Task[]>([]);

  // Add a new todo
  const addTodo = (task: Task) => {
    if (!task.text || /^\s*$/.test(task.text)) {
      return;
    }
    setTodos((prevTodos) => [...prevTodos, task]); 

    console.log(todos);
  };

  // Load TODOs from local storage on app startup
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos !== null) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (error) {
        console.error('Failed to parse stored todos:', error);
      }
    }
  }, []);

  // Save TODOs to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); 

  // Update an existing todo
  const updateTodo = (todoId: number, newValue: Task) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) => prev.map((item) => (item.id === todoId ? newValue : item))); 
  };

  // Remove a todo by id
  const removeTodo = (id: number) => {
    const removedArr = todos.filter((todo) => todo.id !== id);

    setTodos(removedArr); 
  };

  // Toggle the complete state of a todo
  const completeTodo = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isComplete: !todo.isComplete }; 
      }
      return todo;
    });
    setTodos(updatedTodos); 
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <div className='card-container '>
      <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}  />
      </div>
    </>
  );
}

export default TodoList;
