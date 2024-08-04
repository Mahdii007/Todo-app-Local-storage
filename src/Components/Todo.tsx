import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { MdOutlineDone } from 'react-icons/md';
import { Task } from '../utility/type';

interface TodoProps {
  todos: Task[];
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, newValue: Task) => void;
}

const Todo: React.FC<TodoProps> = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  const handleDoubleClick = (todo: Task) => {
    setEditingId(todo.id); 
    setEditText(todo.text);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value); 
  };

  const handleEditSubmit = (id: number) => {
    if (!editText || /^\s*$/.test(editText)) {
      setEditingId(null);
      return;
    }

    updateTodo(id, { ...todos.find(todo => todo.id === id)!, text: editText });
    setEditingId(null); 
  };

  const handleEditKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>, id: number) => {
    if (e.key === 'Enter') {
      handleEditSubmit(id); 
    }
  };

  const handleBlur = (id: number) => {
    handleEditSubmit(id); 
  };

  return (
    <>
      {todos.map((todo) => (
        <div
          className={`card ${todo.isComplete ? 'todo-row complete' : 'todo-row'}`}
          key={todo.id}
          onDoubleClick={() => handleDoubleClick(todo)}
        >
          {editingId === todo.id ? (
            <textarea
                          value={editText}
              onChange={handleEditChange}
              onBlur={() => handleBlur(todo.id)}
              onKeyPress={(e) => handleEditKeyPress(e, todo.id)}
              className="textarea-modern"
              autoFocus
            />
          ) : (
            <div>
              {todo.text}
            </div>
          )}
          <div className="icons">
            <RiCloseCircleLine
              onClick={() => removeTodo(todo.id)}
              className="delete-icon"
            />
            <MdOutlineDone onClick={() => completeTodo(todo.id)} className="done-icon" />
            <TiEdit className="edit-icon" onClick={() => handleDoubleClick(todo)} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Todo;
