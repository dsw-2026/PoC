import type { Tarea, ActualizarTarea } from "../types/Tarea";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tareas: Tarea[];
  onEditar: (id: string, cambios: ActualizarTarea) => void;
  onEliminar: (id: string) => void;
}

export function TaskList({ tareas, onEditar, onEliminar }: TaskListProps) {
  if (tareas.length === 0) {
    return <p>No hay tareas para mostrar.</p>;
  }

  return (
    <ul>
      {tareas.map((tarea) => (
        <TaskItem
          key={tarea.id}
          tarea={tarea}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </ul>
  );
}