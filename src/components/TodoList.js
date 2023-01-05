import React from 'react';

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  return (
    <div className='d-flex flex-row justify-content-center'>
      <ul className='list-group' style={listStyle}>
        {todos.map((todo) => (
          <li className='list-group-item'>
            {todo.title}
            <div className='d-flex justify-content-end'>
              <button type='button' className='btn btn-primary btn-sm m-1'>
                Update
              </button>

              <button type='button' className='btn btn-danger btn-sm m-1'>
                Delete
              </button>
            </div>
          </li>
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
