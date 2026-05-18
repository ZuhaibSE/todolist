// src/pages/Todo.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const navigate = useNavigate();

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Load todos
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const saveTodos = (items: string[]) => {
    localStorage.setItem("todos", JSON.stringify(items));
  };

  // Add / Update Todo
  const handleAddOrUpdate = () => {
    if (!task.trim()) return;

    let updatedTodos = [...todos];

    if (editIndex !== null) {
      // Update mode
      updatedTodos[editIndex] = task;
      setEditIndex(null);
    } else {
      // Add mode
      updatedTodos.push(task);
    }

    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setTask("");
  };

  // Delete
  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // Edit
  const editTodo = (index: number) => {
    setTask(todos[index]);
    setEditIndex(index);
  };

  // Logout
  const logout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold text-blue-600">Todo List</h1>

          <button
            onClick={logout}
            className="bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-black"
          >
            Logout
          </button>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task"
            className="flex-1 border p-2 rounded-lg"
          />

          <button
            onClick={handleAddOrUpdate}
            className="bg-blue-600 text-white px-4 rounded-lg"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* List */}
        <ul className="mt-5 space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              <span>{todo}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => editTodo(index)}
                  className="text-blue-600 font-bold"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTodo(index)}
                  className="text-red-500 font-bold"
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}