import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = "http://localhost:3001/todos"
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    getTodos();
  }, []);
  function getTodos() {
    axios
      .get(apiUrl)
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) {
      return;
    }
    axios
      .post(apiUrl, { title: input, completed: false, timestamp: new Date() })
      .then((response) => {
        getTodos();
        setInput("");
      })
      .catch((error) => console.log(error));
  }
  function handleDelete(id) {
    axios
      .delete(`apiUrl${id}`)
      .then((response) => {
        getTodos();
      })
      .catch((error) => console.log(error));
  }
  function handleCompleted(id, completed) {
    axios
      .put(`apiUrl${id}`, { completed: !completed, timestamp: new Date() })
      .then((response) => {
        getTodos();
      })
      .catch((error) => console.log(error));
  }
  function handleEdit(id, task) {
    setInput(task);
    handleDelete(id);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add Todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? "line-through" : "" }}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button onClick={() => handleCompleted(todo.id, todo.completed)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleEdit(todo.id, todo.title)}>Edit</button>
            <p>timestamp: {todo.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TodoList;
