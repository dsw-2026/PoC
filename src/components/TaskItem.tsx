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

  const completada = tarea.estado === "completada";

  function guardarEdicion() {
    onEditar(tarea.id, {
      titulo: tituloEditado,
      descripcion: descripcionEditada,
    });
    setEnEdicion(false);
  }

  function alternarCompletada() {
    onEditar(tarea.id, {
      estado: completada ? "pendiente" : "completada",
    });
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
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", flex: 1 }}>
            <input
              type="checkbox"
              checked={completada}
              onChange={alternarCompletada}
              style={{ marginTop: "0.3rem" }}
            />
            <div style={{ textAlign: "left" }}>
              <span style={{ textDecoration: completada ? "line-through" : "none" }}>
                {tarea.titulo}
              </span>
              {tarea.descripcion && (
                <p
                  style={{
                    margin: "0.25rem 0 0",
                    color: "#aaa",
                    fontSize: "0.9rem",
                    textDecoration: completada ? "line-through" : "none",
                  }}
                >
                  {tarea.descripcion}
                </p>
              )}
            </div>
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