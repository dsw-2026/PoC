import { useEffect, useState } from "react";
import type { Tarea } from "./types/Tarea";
import { tareasApi } from "./api/tareas";
import "./App.css";

// Punto 1 (scaffold): esta pantalla solo valida que el mock de la API
// responde correctamente. Los componentes (TaskForm, TaskList, FilterBar)
// se arman en el siguiente paso.
function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    tareasApi
      .listar()
      .then(setTareas)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  return (
    <main style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>To-Do List (scaffold)</h1>
      <p>Verificación de que la API mockeada con MSW responde correctamente.</p>

      {cargando && <p>Cargando tareas...</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <strong>{tarea.titulo}</strong> — {tarea.estado}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
