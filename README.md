# PoC React — To-Do List

Demo técnica del grupo **React** para la Prueba de Concepto (PoC) del bloque temático **"FE Frameworks"** — Desarrollo de Software, UTN FRRo (2026).

Compara React frente a Vue y Angular mediante la implementación de una misma mini-aplicación equivalente en cada tecnología. El desarrollo completo del análisis (cómo funciona, aspectos técnicos, ecosistema, ventajas/desventajas) está en el informe del bloque.

## Integrantes

- Altamirano, Marianela
- Spirce, Yasmín
- Sayago, Nair Valentina

## Stack

- **React 19** + **TypeScript**
- **Vite** (bundler y dev server)
- **MSW (Mock Service Worker)** — simula la API REST sin backend real

## Alcance funcional

Aplicación de gestión de tareas (to-do list):

- CRUD completo de tareas (crear, ver, editar, eliminar)
- Listado con filtro por estado (`pendiente` / `completada`)
- Consumo de una API REST mockeada (`GET /tareas`, `GET /tareas/:id`, `POST /tareas`, `PUT`/`PATCH /tareas/:id`, `DELETE /tareas/:id`)

Fuera de alcance (a propósito, para mantener la comparación acotada entre los 3 grupos): autenticación, roles, categorías/etiquetas y persistencia en base de datos real.

## Estructura del proyecto

```
src/
├── types/       # Modelo de datos (Tarea)
├── api/         # Cliente que consume la API REST
├── mocks/       # Handlers de MSW (API simulada) y datos semilla
└── components/  # TaskForm, TaskList, TaskItem, FilterBar
```

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre en `http://localhost:5173`. La API mockeada arranca automáticamente al cargar la app (no requiere backend ni base de datos).

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Levanta el entorno de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Sirve el build de producción localmente |

## Documentación relacionada

- Informe completo de la PoC (bloque "FE Frameworks"): React, Vue y Angular — comparación conjunta y conclusiones.
- Repositorio de la cátedra: [utnfrrodsw/poc](https://github.com/utnfrrodsw/poc)
