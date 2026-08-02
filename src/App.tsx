import { useEffect, useMemo, useState } from "react";
import type { Tarea, ActualizarTarea, NuevaTarea } from "./types/Tarea";
import type { EstadoFiltro } from "./types/Filtro";
import { tareasApi } from "./api/tareas";
import  FilterBar from "./components/filterBar";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import "./App.css";

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<EstadoFiltro>("todas");

  useEffect(() => {
    tareasApi
      .listar()
      .then(setTareas)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  const tareasFiltradas = useMemo(() => {
    if (filtro === "todas") return tareas;
    return tareas.filter((t) => t.estado === filtro);
  }, [tareas, filtro]);

  const handleCrear = (nuevaTarea: NuevaTarea) => {
    tareasApi
      .crear(nuevaTarea)
      .then((tareaCreada) => {
        setTareas((prev) => [...prev, tareaCreada]);
      })
      .catch((e) => setError(e.message));
  };

  const handleActualizar = (id: string, cambios: ActualizarTarea) => {
    tareasApi
      .actualizar(id, cambios)
      .then((tareaActualizada) => {
        setTareas((prev) =>
          prev.map((t) => (t.id === id ? tareaActualizada : t))
        );
      })
      .catch((e) => setError(e.message));
  };

  const handleEliminar = (id: string) => {
    tareasApi
      .eliminar(id)
      .then(() => {
        setTareas((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((e) => setError(e.message));
  };

  return (
    <main style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>To-Do List</h1>

      {cargando && <p>Cargando tareas...</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

      {!cargando && !error && (
        <>
          <TaskForm onCrear={handleCrear} />
          <FilterBar filtro={filtro} onFiltroChange={setFiltro} />
          <TaskList
            tareas={tareasFiltradas}
            onEditar={handleActualizar}
            onEliminar={handleEliminar}
          />
        </>
      )}
    </main>
  );
}

export default App;