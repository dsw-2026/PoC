import { useState, useEffect } from "react";
import type { Tarea, ActualizarTarea } from "../types/Tarea";
import { tareasApi } from "../api/tareas";
import { TaskItem } from "./TaskItem";

export function TaskList() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    tareasApi.listar()
      .then((datos) => setTareas(datos))
      .finally(() => setCargando(false));
  }, []);

  async function manejarEditar(id: string, cambios: ActualizarTarea) {
    const tareaActualizada = await tareasApi.actualizar(id, cambios);
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? tareaActualizada : t))
    );
  }

  async function manejarEliminar(id: string) {
    const confirmar = window.confirm("¿Seguro que querés eliminar esta tarea?");
    if (!confirmar) return;

    await tareasApi.eliminar(id);
    setTareas((prev) => prev.filter((t) => t.id !== id));
  }

  if (cargando) return <p>Cargando tareas...</p>;

  return (
    <ul>
      {tareas.map((tarea) => (
        <TaskItem
          key={tarea.id}
          tarea={tarea}
          onEditar={manejarEditar}
          onEliminar={manejarEliminar}
        />
      ))}
    </ul>
  );
}