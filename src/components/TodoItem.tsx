import { Todo } from "../types";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  return (
    <li className="flex w-1/3 items-center justify-start gap-2 p-2 border-b border-gray-500">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {todo.text}
      <button className="text-yellow-400" onClick={() => onEdit(todo.id)}>Edit</button>
      <button className="text-red-400" onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}