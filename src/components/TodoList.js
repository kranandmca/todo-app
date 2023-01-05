import axios from 'axios';
import React, { useState } from 'react';
import TodoItem from './TodoItem';
// TodoList component pass each Todo Item as prps to TodoItem Component
const TodoList = ({ todos, setTodos }) => {
  // useState for make input box editable after edit click
  const [editingItemId, setEditingItemId] = useState(null);
  // set id for Todo item which is being edited
  const handleEditClick = (id) => {
    setEditingItemId(id);
  };
  // cancel button click while editing
  const handleCancelClick = () => {
    setEditingItemId(null);
  };
  // called afer save buuton click while editing
  const handleSaveClick = (id, titleobj) => {
    // Find the todo item with the matching ID
    const todo = todos.find((todo) => todo.id === id);
    // Send a UPDATE request to the API
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
      })
      .catch((error) => {
        console.error(error);
      });

    setEditingItemId(null);
  };
  // Called when delete button clicked
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
        {/* Iterate through each item in todo list */}
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
