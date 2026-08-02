import { useState } from "react";
import type { Tarea, ActualizarTarea } from "../types/Tarea";

interface TaskItemProps {
  tarea: Tarea;
  onEditar: (id: string, cambios: ActualizarTarea) => void;
  onEliminar: (id: string) => void;
}

export function TaskItem({ tarea, onEditar, onEliminar }: TaskItemProps) {
  const [enEdicion, setEnEdicion] = useState(false);
  const [tituloEditado, setTituloEditado] = useState(tarea.titulo);

  function guardarEdicion() {
    onEditar(tarea.id, { titulo: tituloEditado });
    setEnEdicion(false);
  }

  return (
    <li>
      {enEdicion ? (
        <>
          <input
            value={tituloEditado}
            onChange={(e) => setTituloEditado(e.target.value)}
          />
          <button onClick={guardarEdicion}>Guardar</button>
          <button onClick={() => setEnEdicion(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <span>{tarea.titulo}</span>
          <button onClick={() => setEnEdicion(true)}>Editar</button>
          <button onClick={() => onEliminar(tarea.id)}>Eliminar</button>
        </>
      )}
    </li>
  );
}