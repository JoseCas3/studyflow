# Verificación de StudyFlow

Fecha: 8 de noviembre de 2026. Entorno local: Windows, Node.js 24.22.1, Next.js 16.4.5.

## Resultados ejecutados

- Instalación: completada; auditoría de npm sin vulnerabilidades reportadas en las dependencias instaladas.
- `npm run build`: compilación de producción completada, páginas prerenderizadas y API dinámica.
- `npm run typecheck`: completado sin errores.
- `npm run test:smoke`: **14 pruebas aprobadas, 0 fallidas**, contra el servidor local de producción en el puerto 3012.

Las pruebas HTTP cubren las cuatro páginas con 200, una ruta inexistente con 404, GET de datos iniciales, POST válido con título recortado e ID generado y rechazo de título vacío, título demasiado largo, materia desconocida, prioridad incorrecta, fecha imposible, estado incorrecto y JSON malformado.

## Flujo comprobado en navegador

| Acción                                     | Resultado observado                                                                     |
| ------------------------------------------ | --------------------------------------------------------------------------------------- |
| Abrir el resumen                           | 3 tareas pendientes, 1 completada y progreso de 25 %                                    |
| Crear tarea                                | La lista pasó de 4 a 5 tareas                                                           |
| Editar el título                           | El título actualizado apareció en la lista                                              |
| Completar y recargar                       | La tarea editada conservó el estado completado                                          |
| Buscar «derivadas»                         | La lista mostró una tarea                                                               |
| Eliminar el registro creado para pruebas   | La lista volvió a 4 tareas                                                              |
| Seleccionar Programación desde una tarjeta | Se abrió `/tareas?materia=programacion`, con una tarea y el filtro seleccionado         |
| Iniciar y pausar Pomodoro                  | El contador bajó de 25:00 a 24:43 y se pausó                                            |
| Reiniciar y elegir descanso corto          | El contador mostró 05:00                                                                |
| Revisar en un viewport de 390 px           | Navegación superior, tarjetas en dos columnas y contenido sin desbordamiento horizontal |

Se restauraron los datos iniciales al eliminar únicamente la tarea creada durante la prueba. Las capturas utilizadas para revisión son evidencia de la interfaz real.

## Límites de esta verificación

No se esperó una sesión completa de 25 minutos; se comprobaron inicio, cuenta regresiva, pausa, reinicio y cambio de modalidad. No se probaron todos los navegadores, lectores de pantalla ni errores de almacenamiento del dispositivo. La existencia de `error.tsx` se revisó en código; no se forzó una excepción artificial en producción.

## Repetir la prueba HTTP

En una terminal:

```bash
npm run build
npm start -- -p 3012
```

En otra:

```bash
npm run test:smoke
```

Para probar una URL diferente desde PowerShell:

```powershell
$env:BASE_URL = 'https://tu-proyecto.vercel.app'
npm run test:smoke
```

Los POST de esta prueba no crean registros compartidos: la API no tiene persistencia remota.

## Guion breve para demostrar el proyecto

1. Presentar el problema: organizar estudio, pendientes y sesiones de concentración.
2. Mostrar las cuatro rutas y la adaptación al móvil.
3. Crear una tarea, editarla, completarla y comprobar el cambio de progreso.
4. Filtrar por materia y explicar el catálogo inicial.
5. Iniciar, pausar y reiniciar el Pomodoro.
6. Mostrar `route.ts`, el uso de `useEffect`, los Server Components y los Client Components.
7. Explicar la persistencia por navegador y las variables de entorno.
8. Revisar los commits, los prompts reales y las iteraciones registradas en `VIBE_CODING.md`.
9. Abrir la URL pública y el repositorio entregado.

## Publicación

Aplicación pública: https://studyflow-blush-mu.vercel.app. Vercel confirmó el estado READY en producción, con Next.js 16.4.5. Se volvieron a ejecutar las 14 pruebas HTTP contra esta URL sin autenticación: 14 aprobadas y 0 fallidas. El navegador mostró correctamente el panel publicado. El código desplegado corresponde al commit 019ba3485ffba0a6810b4281f9be4d19c7d867f5; los commits posteriores de documentación registran esta evidencia.
