import './App.css';
import InputTodo from './components/InputTodo';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div  className="container mt-5 mb-15" style={{ maxWidth: '1000px' }}>
      <h3 className='text-center'>Todo</h3>
      <InputTodo />
      <TodoList />
    </div>
  );
}

export default App;
