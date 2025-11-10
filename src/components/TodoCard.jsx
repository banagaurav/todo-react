import React from "react";

const TodoCard = ({ todos, setTodos }) => {
  const handleToggleStatus = (todo) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          completed: todo.completed === true ? false : true,
        };
      }
      return t;
    });
    setTodos(updatedTodos);
  };
  const handleDelete = (todo) => {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
  };

  const handleUp = (index) => {
    if (index === 0) return;

    console.log("up clicked: ", todos[index]);
    const newTodos = [...todos];
    const temp = newTodos[index - 1];
    newTodos[index - 1] = newTodos[index];
    newTodos[index] = temp;
    setTodos(newTodos);
  };
  const handleDown = (index) => {
    if (index === todos.length - 1) return;

    const newTodos = [...todos];
    const temp = newTodos[index + 1];
    newTodos[index + 1] = newTodos[index];
    newTodos[index] = temp;
    setTodos(newTodos);

    console.log("down clicked: ", index);
  };
  return (
    <div style={{ marginTop: "20px" }}>
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "100px",
            padding: "10px",
            border: "2px solid red",
          }}
        >
          <span>
            {todo.todo} - {todo.completed ? "Completed" : "Pending"}
          </span>
          <button onClick={() => handleToggleStatus(todo)}>
            {todo.completed ? "Mark as Pending" : "Mark as Completed"}
          </button>
          <button onClick={() => handleDelete(todo)}>Delete</button>
          <button onClick={() => handleUp(index)}>Up</button>
          <button onClick={() => handleDown(index)}>Down</button>
        </div>
      ))}
    </div>
  );
};

export default TodoCard;
