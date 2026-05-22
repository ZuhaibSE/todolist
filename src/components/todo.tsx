import { useEffect, useState } from "react";
import API from "../api/api";
import type { Todo } from "../types/todo";

export default function TodoCard() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    const res = await API.get("/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ADD / UPDATE TODO
  const handleSave = async () => {
    if (!text.trim()) return;

    if (editId) {
      await API.put(
        `/todos/${editId}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditId(null);
    } else {
      await API.post(
        "/todos",
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await API.delete(`/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchTodos();
  };

  const startEdit = (todo: Todo) => {
    setText(todo.text);
    setEditId(todo._id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">My Todos</h1>

          <button
            onClick={logout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 flex-1 rounded"
            placeholder="Enter todo..."
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 rounded"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List */}
        <ul className="mt-4 space-y-2">
          {todos.map((t) => (
            <li
              key={t._id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{t.text}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(t)}
                  className="text-blue-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTodo(t._id)}
                  className="text-red-500"
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