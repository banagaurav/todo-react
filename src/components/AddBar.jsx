import React, { useState } from "react";

const AddBar = ({ todos, setTodos }) => {
  const [todo, setTodo] = useState("");

  const onInputChange = (e) => {
    setTodo(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() === "") return;
    const position = todos.length + 1;
    const addnewTodo = {
      id: Date.now(),
      todo: todo,
      completed: false,
      position: position,
    };

    setTodos([...todos, addnewTodo]);
    setTodo("");
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "row",
          alignItem: "center",
          backgroundColor: "grey",
          width: "200px",
        }}
        onSubmit={onSubmit}
      >
        <input
          name="newTodo"
          type="text"
          placeholder="add Todo"
          value={todo}
          onChange={onInputChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddBar;
