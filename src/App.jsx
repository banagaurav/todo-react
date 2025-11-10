import { useEffect, useState } from "react";
import "./App.css";
import AddBar from "./components/AddBar";
import TodoCard from "./components/TodoCard";

const Action = {
  DELETE: "delete",
  TOGGLE_STATUS: "Toggle Status",
};

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
      {todos && <TodoCard todos={todos} setTodos={setTodos} />}
    </div>
  );
}

export default App;
