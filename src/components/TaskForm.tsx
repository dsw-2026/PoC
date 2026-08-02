import { useState } from "react";
import type { NuevaTarea } from "../types/Tarea";

interface TaskFormProps {
  onCrear: (nuevaTarea: NuevaTarea) => void;
}

export function TaskForm({ onCrear }: TaskFormProps) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (titulo.trim() === "") return;
    onCrear({ titulo, descripcion });
    setTitulo("");
    setDescripcion("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Título de la tarea"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}