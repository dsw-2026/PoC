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
  const [descripcionEditada, setDescripcionEditada] = useState(tarea.descripcion ?? "");

  function guardarEdicion() {
    onEditar(tarea.id, {
      titulo: tituloEditado,
      descripcion: descripcionEditada,
    });
    setEnEdicion(false);
  }

return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        padding: "0.75rem 0",
        borderBottom: "1px solid #333",
      }}
    >
      {enEdicion ? (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", flex: 1 }}>
            <input
              value={tituloEditado}
              onChange={(e) => setTituloEditado(e.target.value)}
            />
            <input
              value={descripcionEditada}
              placeholder="Descripción (opcional)"
              onChange={(e) => setDescripcionEditada(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={guardarEdicion}>Guardar</button>
            <button onClick={() => setEnEdicion(false)}>Cancelar</button>
          </div>
        </>
      ) : (
        <>
          <div style={{ flex: 1 }}>
            <span>{tarea.titulo}</span>
            {tarea.descripcion && (
              <p style={{ margin: "0.25rem 0 0", color: "#aaa", fontSize: "0.9rem" }}>
                {tarea.descripcion}
              </p>
            )}
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
            <button onClick={() => setEnEdicion(true)}>Editar</button>
            <button onClick={() => onEliminar(tarea.id)}>Eliminar</button>
          </div>
        </>
      )}
    </li>
  );
}