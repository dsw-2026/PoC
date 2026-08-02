import type { ActualizarTarea, NuevaTarea, Tarea } from "../types/Tarea";

const BASE_URL = "/api/tareas";

async function manejarRespuesta<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message ?? "Error al comunicarse con la API");
  }
  // 204 No Content (DELETE) no tiene body
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const tareasApi = {
  listar(): Promise<Tarea[]> {
    return fetch(BASE_URL).then((res) => manejarRespuesta<Tarea[]>(res));
  },

  obtener(id: string): Promise<Tarea> {
    return fetch(`${BASE_URL}/${id}`).then((res) => manejarRespuesta<Tarea>(res));
  },

  crear(nuevaTarea: NuevaTarea): Promise<Tarea> {
    return fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaTarea),
    }).then((res) => manejarRespuesta<Tarea>(res));
  },

  actualizar(id: string, cambios: ActualizarTarea): Promise<Tarea> {
    return fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cambios),
    }).then((res) => manejarRespuesta<Tarea>(res));
  },

  eliminar(id: string): Promise<void> {
    return fetch(`${BASE_URL}/${id}`, { method: "DELETE" }).then((res) =>
      manejarRespuesta<void>(res)
    );
  },
};
