import { useState, useEffect } from "react";
import { Todo } from "../src/types";
import { TodoList } from "../src/components/TodoList";

// Helper function to load initial todos
const loadInitialTodos = (): Todo[] => {
  try {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      return JSON.parse(storedTodos);
    }
    return [];
  } catch (error) {
    console.error("Error loading todos from localStorage:", error);
    return [];
  }
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadInitialTodos);
  const [text, setText] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "complete" | "incomplete">("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isEditing: true } : t))
    );
  }

  const editTodo = (id: string, text: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: text, isEditing: false } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const getFilteredTodos = () => {
    if (selectedFilter === "all") return todos;
    if (selectedFilter === "complete") return todos.filter(t => t.completed);
    if (selectedFilter === "incomplete") return todos.filter(t => !t.completed);
    return todos;
  }

  return (
    <div className="App bg-gray-600 text-white min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <select
        className="border p-2 rounded text-black"
        value={selectedFilter}
        onChange={(e) => {setSelectedFilter(e.target.value as "all" | "complete" | "incomplete")}}
      >
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <div className="my-2 flex flex-center justify-start">
        <input
          className="border p-2 rounded text-black"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
          placeholder={editingId ? "Edit todo here..." : "Enter your todo..."}
        />
        <button className="mx-3 hover:text-green-400" onClick={addTodo}>Add</button>
      </div>
      
      <TodoList
        todos={getFilteredTodos()}
        onToggle={toggleTodo}
        onEdit={onEdit}
        onDelete={deleteTodo}
      />
    </div>
  );
}
