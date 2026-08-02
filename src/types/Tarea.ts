export type EstadoTarea = "pendiente" | "completada";

export interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string;
  estado: EstadoTarea;
  fechaCreacion: string; // ISO date string
}

// Forma que envía el formulario al crear una tarea (sin campos generados por el servidor)
export type NuevaTarea = Pick<Tarea, "titulo" | "descripcion">;

// Forma que se envía al editar una tarea existente (campos parciales)
export type ActualizarTarea = Partial<Pick<Tarea, "titulo" | "descripcion" | "estado">>;
