import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const [todos, setTodos] = useState(null);
  const [newItem, setNewItem] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos').then((result) => {
      setTodos(result.data);
    });
  }, []);
  const handleChange = (event) => {
    setNewItem(event.target.value);
  };

  const addTodo = (event) => {
    event.preventDefault();
    axios
      .post(
        'https://jsonplaceholder.typicode.com/todos',
        {
          title: newItem,
          completed: 'false',
          userId: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        setTodos([...todos, response.data]);
        // window.alert(JSON.stringify(response.data));
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        navigate('/');
      });
    setNewItem('');
  };

  return (
    <div>
      <h1 className='text-center m-2'>Todo List</h1>
      <form
        onSubmit={addTodo}
        className='d-flex flex-row justify-content-center m-1'
      >
        <input
          type='text'
          className='form-control'
          style={{ width: '400px', height: '50px' }}
          placeholder='Enter todo element'
          required
          value={newItem}
          onChange={handleChange}
        />
        <button className='btn btn-sm:hover btn-primary m-1' type='submit'>
          Add Todo
        </button>
      </form>
      {todos ? (
        <TodoList todos={todos} setTodos={setTodos} />
      ) : (
        <div className='text-center m-2'>Loading...</div>
      )}
    </div>
  );
};

export default Todo;
