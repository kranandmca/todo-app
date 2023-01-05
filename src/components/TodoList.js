import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoItem from './TodoItem';
const TodoList = ({ todos, setTodos }) => {
  const [editingItemId, setEditingItemId] = useState(null);
  const navigate = useNavigate();
  const handleEditClick = (id) => {
    setEditingItemId(id);
  };

  const handleCancelClick = () => {
    setEditingItemId(null);
  };

  const handleSaveClick = (id, titleobj) => {
    // Find the todo item with the matching ID
    const todo = todos.find((todo) => todo.id === id);

    axios
      .put(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          ...todo,
          title: titleobj.title,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        // Update the todo item in the list
        setTodos(todos.map((t) => (t.id === id ? response.data : t)));
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        navigate('/');
      });

    setEditingItemId(null);
  };
  // Delete request to Jso
  const handleDelete = (id) => {
    // Send a DELETE request to the API
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        // Remove the deleted item from the todo list
        setTodos(todos.filter((todo) => todo.id !== id));
      });
  };
  return (
    <div className='d-flex flex-row justify-content-center'>
      <ul className='list-group' style={listStyle}>
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            isEditing={item.id === editingItemId}
            onEditClick={() => handleEditClick(item.id)}
            onCancelClick={handleCancelClick}
            onSaveClick={handleSaveClick}
            onDeleteClick={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

const listStyle = {
  height: '490px',
  overflowY: 'scroll',
};
