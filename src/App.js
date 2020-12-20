import { useState, useEffect } from "react";
import './App.css';
//importing components
import Form from "./components/form";
import TodoList from "./components/todolist";



function App() {

  useEffect(() => {
    getLocalTodos();
  },[])

  const [inputText, setInputText] = useState("");
  const [todos ,setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilterTodos] = useState([]);


  useEffect(() => {
    filterHandler();
  }, [todos, status] ) ;

  function filterHandler() {
    switch (status) {
      case 'completed':
        setFilterTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilterTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilterTodos(todos);
        break;
    }
  };
  

  const saveLocalTodos = () => {
    
      localStorage.setItem("todos", JSON.stringify(todos));
    
  };
  const getLocalTodos =() => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }
    else{
      let todoLocal = JSON.parse(localStorage.getItem('todo'));
      setTodos(todoLocal);
    }
  }
  return (
    <div className="App">
     <header>
       <h1>Abhishek's Todo list</h1>
     </header>
     <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus}  />
     <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
