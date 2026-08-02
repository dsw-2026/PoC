import { http, HttpResponse } from "msw";
import { tareas } from "./data";
import type { ActualizarTarea, NuevaTarea, Tarea } from "../types/Tarea";

const BASE_URL = "/api/tareas";

// Simula latencia de red real, para que la demo no se sienta "instantánea" e irreal
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const handlers = [
  // GET /tareas — listado completo
  http.get(BASE_URL, async () => {
    await delay();
    return HttpResponse.json(tareas);
  }),

  // GET /tareas/:id — detalle de una tarea puntual
  http.get(`${BASE_URL}/:id`, async ({ params }) => {
    await delay();
    const tarea = tareas.find((t) => t.id === params.id);
    if (!tarea) {
      return HttpResponse.json({ message: "Tarea no encontrada" }, { status: 404 });
    }
    return HttpResponse.json(tarea);
  }),

  // POST /tareas — crear una nueva tarea
  http.post(BASE_URL, async ({ request }) => {
    await delay();
    const body = (await request.json()) as NuevaTarea;

    if (!body.titulo || !body.titulo.trim()) {
      return HttpResponse.json(
        { message: "El título es obligatorio" },
        { status: 400 }
      );
    }

    const nuevaTarea: Tarea = {
      id: crypto.randomUUID(),
      titulo: body.titulo.trim(),
      descripcion: body.descripcion?.trim() || "",
      estado: "pendiente",
      fechaCreacion: new Date().toISOString(),
    };

    tareas.push(nuevaTarea);
    return HttpResponse.json(nuevaTarea, { status: 201 });
  }),

  // PUT/PATCH /tareas/:id — editar una tarea existente
  http.put(`${BASE_URL}/:id`, editarTarea),
  http.patch(`${BASE_URL}/:id`, editarTarea),

  // DELETE /tareas/:id — eliminar una tarea
  http.delete(`${BASE_URL}/:id`, async ({ params }) => {
    await delay();
    const index = tareas.findIndex((t) => t.id === params.id);
    if (index === -1) {
      return HttpResponse.json({ message: "Tarea no encontrada" }, { status: 404 });
    }
    tareas.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];

async function editarTarea({
  params,
  request,
}: {
  params: { id?: string };
  request: Request;
}) {
  await delay();
  const index = tareas.findIndex((t) => t.id === params.id);
  if (index === -1) {
    return HttpResponse.json({ message: "Tarea no encontrada" }, { status: 404 });
  }

  const cambios = (await request.json()) as ActualizarTarea;
  tareas[index] = { ...tareas[index], ...cambios };
  return HttpResponse.json(tareas[index]);
}
