# Proceso de Vibe Coding — StudyFlow

## Contexto y participación

Actividad: construir una aplicación funcional con Next.js 16 o superior, TypeScript y App Router utilizando IA como copiloto. Herramienta utilizada: Codex (asistente de OpenAI). Fecha de trabajo: 8 de noviembre de 2026.

El estudiante proporcionó la rúbrica completa, aceptó la propuesta de StudyFlow y creó el repositorio público. El asistente generó la estructura, los componentes, los estilos y la documentación; ejecutó verificaciones y corrigió aspectos técnicos. El estudiante debe revisar el resultado, practicar la demostración y registrar aquí cualquier ajuste propio posterior. Este archivo no afirma que el estudiante haya escrito manualmente el código generado.

## Prompts principales reales

1. **Inicio:** «Puedes ayudarme con esta actividad es otro proyecto», seguido de la actividad con sus requisitos y entregables.
2. **Aceptación y ejecución:** «Si esta bien la idea continuemos con esa por favor», después de proponer StudyFlow con resumen, tareas, materias y enfoque.
3. **Repositorio:** el estudiante proporcionó `https://github.com/JoseCas3/studyflow.git` para subir el proyecto.

### Brief técnico derivado por la IA

El siguiente texto resume las instrucciones de implementación que se derivaron de esos mensajes. No es una cita de un mensaje adicional del estudiante:

> Construir StudyFlow como proyecto independiente con Next.js 16, TypeScript y App Router. Crear cuatro páginas, una API interna para tareas, componentes de servidor para páginas y metadatos y componentes cliente para interacciones. Guardar las tareas por navegador, validar las entradas en el servidor, incluir carga y errores, hacer el diseño responsive y documentar decisiones y verificaciones reales.

## Iteraciones realizadas

### 1. Definición y arquitectura

Se eligió un organizador de estudios porque ofrece un alcance demostrable con cuatro rutas y un flujo completo de tareas. Se creó una carpeta independiente para no mezclar el trabajo con otros proyectos. Se definieron los tipos de tarea, cuatro materias iniciales y la separación entre API, páginas y componentes.

### 2. Estructura y API

Se implementaron App Router, layout, metadatos, Route Handler, validación compartida y un proveedor de estado. `GET /api/tareas` sirve las tareas iniciales y `POST /api/tareas` valida y devuelve una tarea con ID. La aplicación no guarda registros en memoria del servidor porque ese almacenamiento sería inconsistente en un despliegue serverless.

### 3. Funciones y diseño

Se generaron el panel de progreso, lista editable con búsqueda y filtros, tarjetas por materia y Pomodoro. Se eligió una interfaz violeta con fondo claro, ilustración en CSS y navegación adaptable. El formulario usa un diálogo nativo y las acciones tienen nombres accesibles.

### 4. Revisión y validación

Se compiló la aplicación con Next.js 16.4.5 y TypeScript estricto. Se hicieron solicitudes HTTP a las cuatro páginas, la página inexistente y la API, incluyendo entradas válidas e inválidas. Se abrió el navegador para revisar el diseño y probar la creación y edición de tareas. Los resultados completos se registran en `VERIFICACION.md`.

### 5. Preparación de entrega

Se añadió documentación de instalación, matriz de requisitos, `.env.example`, limitaciones de persistencia y guía para exponer. Se conservaron commits descriptivos por etapas y se preparó el despliegue en Vercel. Los enlaces definitivos y el estado de publicación deben coincidir con el README.

## Decisiones técnicas

| Decisión                  | Justificación                                                        |
| ------------------------- | -------------------------------------------------------------------- |
| Next.js 16 con App Router | Cumple el framework requerido y separa páginas, carga, errores y API |
| TypeScript estricto       | Detecta inconsistencias de datos y props durante la compilación      |
| React Context             | Comparte tareas entre vistas sin una librería adicional              |
| localStorage versionado   | Persistencia individual sencilla sin claves o servicios de pago      |
| Route Handlers            | Demuestra consumo de API interna y validación del lado servidor      |
| CSS Modules y CSS global  | Aísla la estructura principal y comparte estilos de componentes      |
| Lucide React              | Iconos consistentes sin descargar imágenes externas                  |
| Hora límite para Pomodoro | Evita depender de que cada intervalo ocurra exactamente a tiempo     |
| Sin autenticación         | El alcance es un organizador personal por navegador                  |

## Desafíos y soluciones

- **npm no estaba en PATH:** se encontró una instalación local de npm ya disponible y se utilizó su ejecutable con Node.js. El README mantiene los comandos estándar para un equipo con Node.js instalado normalmente.
- **Persistencia en serverless:** se evitó un arreglo global mutable del servidor. La API genera y valida; el navegador conserva el estado. Una siguiente versión podría usar una base de datos con usuarios.
- **Datos locales inválidos o almacenamiento bloqueado:** se valida el esquema al cargar y se muestra un error accionable; no se sobrescriben silenciosamente los datos inválidos.
- **Temporizador en segundo plano:** se calcula el tiempo restante comparando `Date.now()` con una hora límite.
- **Entrega verificable:** no se incluyen capturas inventadas, pruebas no ejecutadas ni afirmaciones de persistencia en una base de datos.

## Reflexión para la defensa

El beneficio de la IA fue acelerar la estructura, las vistas y la revisión. El control humano consiste en definir el producto, revisar las decisiones y contrastar la entrega con la rúbrica. La apariencia por sí sola no prueba que una aplicación funcione: por eso se verifican compilación, rutas, respuestas inválidas y acciones en navegador.

Antes de entregar, el estudiante debe poder explicar qué hace `useEffect`, por qué se necesita `'use client'`, dónde se valida una tarea y qué diferencia hay entre guardar datos localmente y en un servidor. Conviene añadir después una reflexión personal sobre lo aprendido y cualquier iteración solicitada durante la revisión.
