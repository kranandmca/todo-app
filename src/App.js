import './App.css';
import Todo from './components/Todo';
import { BrowserRouter as Router } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Todo />
    </Router>
  );
};

export default App;
