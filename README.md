# StudyFlow

Organizador de estudios construido con Next.js 16, App Router y TypeScript como actividad de Vibe Coding.

- **Repositorio público:** https://github.com/JoseCas3/studyflow
- **Producción:** [https://studyflow-blush-mu.vercel.app](https://studyflow-blush-mu.vercel.app).
- **Proceso con IA:** [VIBE_CODING.md](VIBE_CODING.md).

## Ejecutar el proyecto

Necesitas Node.js 20.9 o superior y npm. Se verificó con Node.js 24.

```bash
git clone https://github.com/JoseCas3/studyflow.git
cd studyflow
npm ci
```

Copia `.env.example` a `.env.local` (en PowerShell: `Copy-Item .env.example .env.local`). La aplicación funciona sin claves; `NEXT_PUBLIC_APP_NAME` es opcional. Reinicia el servidor si cambias variables.

```bash
npm run dev
```

Abre http://localhost:3000. Para comprobar la versión de producción:

```bash
npm run typecheck
npm run build
npm start
```

## Funciones y rutas

| Ruta        | Función                                                         |
| ----------- | --------------------------------------------------------------- |
| `/`         | Resumen de pendientes, tareas completadas, materias y progreso  |
| `/tareas`   | Crear, editar, completar y eliminar tareas; buscar y filtrar    |
| `/materias` | Consultar el progreso de cuatro materias y acceder a sus tareas |
| `/enfoque`  | Pomodoro de 25 minutos y descansos de 5 o 15 minutos            |

El primer inicio incluye cuatro tareas de ejemplo que puedes modificar o eliminar. Crea una tarea con **Nueva tarea**, completa el formulario y guárdala. Usa el cuadro junto al título para completar una tarea y el lápiz para editarla. El temporizador permite iniciar, pausar, reiniciar y cambiar de modalidad.

## Arquitectura y requisitos de la actividad

| Requisito                            | Evidencia en el código                                          |
| ------------------------------------ | --------------------------------------------------------------- |
| Next.js 16 + TypeScript + App Router | `package.json`, `tsconfig.json`, `src/app/`                     |
| Cuatro páginas distintas             | `page.tsx` en las cuatro rutas                                  |
| Server Components                    | Páginas y layout; metadatos del servidor                        |
| Client Components y hooks            | `store.tsx`, `tasks.tsx`, `timer.tsx`, `shell.tsx`              |
| API interna con Route Handlers       | `src/app/api/tareas/route.ts`                                   |
| `useState`                           | Estado de tareas, filtros, formulario y temporizador            |
| `useEffect`                          | Carga desde API/localStorage y limpieza del temporizador        |
| Responsive                           | Media queries en `globals.css` y `shell.module.css`             |
| Carga y errores                      | `loading.tsx`, `error.tsx`, `DataState`, errores de formularios |
| Variables de entorno                 | `.env.example`, `.gitignore`, metadatos del layout              |
| Iteración con IA                     | `VIBE_CODING.md` e historial de commits                         |

### Flujo de datos

1. `StudyProvider` revisa `localStorage` en el navegador.
2. Si es la primera visita, obtiene los ejemplos desde `GET /api/tareas`.
3. Al crear o editar, envía el formulario a `POST /api/tareas`.
4. El servidor valida título, materia, prioridad, fecha y estado; responde con la tarea y un identificador generado mediante `crypto.randomUUID()`.
5. El cliente guarda la respuesta en `localStorage` y actualiza el resumen y las materias.

**Persistencia:** la API valida y genera datos; no tiene una base de datos. Las tareas se guardan exclusivamente en el navegador bajo `studyflow.tasks.v1`. No se sincronizan entre dispositivos y se pierden al borrar los datos del sitio. Completar y eliminar son operaciones locales. Esta decisión permite una entrega funcional sin credenciales ni infraestructura adicional. No se utiliza memoria global del servidor como almacenamiento.

**Materias:** el catálogo es fijo (Programación, Matemáticas, Diseño e Inglés). La página organiza y muestra el progreso; no incluye creación de materias.

**Pomodoro:** cuenta las sesiones completadas durante la visita. Al salir de la página o recargar se reinicia. Usa la hora límite real para evitar que una pestaña en segundo plano retrase el contador. El aviso al terminar es visual.

### Contrato de la API

`GET /api/tareas`: responde `200` con `{ "tasks": [...] }`.

`POST /api/tareas` recibe:

```json
{
  "title": "Preparar exposición",
  "subject": "programacion",
  "priority": "Alta",
  "due": "2026-11-20",
  "done": false
}
```

Devuelve `201` con `{ "task": { "id": "...", ... } }`. Devuelve `400` con `{ "error": "..." }` si el JSON o los campos son inválidos. La fecha puede ser vacía. La edición conserva el identificador local; esta API no promete almacenamiento remoto ni ofrece PUT o DELETE.

## Diseño y accesibilidad

Interfaz en español con CSS Modules para la estructura y CSS global para los componentes. Usa etiquetas de formulario, botones semánticos, foco visible, estado accesible para tareas, diálogo nativo, avisos de carga y error y respeto a movimiento reducido. Los iconos son de Lucide y la ilustración de la portada se dibuja con CSS. Las fuentes DM Sans y Manrope se solicitan a Google Fonts con respaldo local en Arial.

## Despliegue en Vercel

Importa este repositorio en Vercel, selecciona Next.js, directorio raíz del repositorio, `npm run build` y Node.js 24.x. No necesitas base de datos ni variables obligatorias. Puedes agregar `NEXT_PUBLIC_APP_NAME=StudyFlow` en producción. Publica la rama `main` y verifica las cuatro rutas y la API. La entrega actual se publicó directamente mediante la API de Vercel desde el mismo código del repositorio. La conexión automática con GitHub requiere agregar una Login Connection en la cuenta de Vercel; por ahora un push por sí solo no publica cambios. El enlace de producción de esta entrega ya está registrado al inicio.

## Validación

Consulta [VERIFICACION.md](VERIFICACION.md) para los resultados reales y una guía de demostración. `npm run format` aplica el formato y `npm run format:check` lo verifica.

## Referencias

- [Instalación de Next.js](https://nextjs.org/docs/app/getting-started/installation)
- [Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route)
- [Server y Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Despliegue con Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
