import { useState } from "react";
import { Todo } from "../src/types";
import { TodoList } from "../src/components/TodoList";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const addTodo = () => {
    if (text === "") return;
    if (editingId) {
      editTodo(editingId, text);
      setEditingId(null);
    }
    else
    {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: text,
        completed: false,
      };
      setTodos((prev) => [...prev, newTodo]);
    }
    setText("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const onEdit = (id: string ) => {
    setEditingId(id);
  }

  const editTodo = (id: string, text: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: text } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="App bg-gray-600 text-white min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <input
        className="border p-2 rounded text-black"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your todo..."
      />
      <button className="mx-3 hover:text-green-400" onClick={addTodo}>Add</button>
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onEdit={onEdit}
        onDelete={deleteTodo}
      />
    </div>
  );
}
