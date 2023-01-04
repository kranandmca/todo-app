import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState(null);
  const updateTodo = () => {};

  const deleteTodo = () => {};
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos').then((result) => {
      setTodos(result.data);
    });
  }, []);
  return (
    <div>
      {todos ? (
        <TodoList
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default App;
