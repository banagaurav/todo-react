import { useEffect, useState } from "react";
import "./App.css";
import AddBar from "./components/AddBar";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <AddBar todos={todos} setTodos={setTodos} />
      {todos &&
        todos.map((todo) => (
          <ul>
            <li>
              {todo.todo} - {todo.completed ? "Completed" : "Pending"}
            </li>
          </ul>
        ))}
    </div>
  );
}

export default App;
