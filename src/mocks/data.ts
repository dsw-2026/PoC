import type { Tarea } from "../types/Tarea";

// Simula una "base de datos" en memoria. Vive mientras dura la sesión del navegador.
export let tareas: Tarea[] = [
  {
    id: crypto.randomUUID(),
    titulo: "Investigar Virtual DOM y Fiber",
    descripcion: "Repasar la arquitectura de reconciliación de React para la sección 5.1.1",
    estado: "completada",
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    titulo: "Armar la demo con MSW",
    descripcion: "CRUD de tareas consumiendo la API mockeada",
    estado: "pendiente",
    fechaCreacion: new Date().toISOString(),
  },
];

export function resetTareas(nuevasTareas: Tarea[]) {
  tareas = nuevasTareas;
}
