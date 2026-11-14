# Verificación de StudyFlow en AWS

Fecha: 13 de noviembre de 2026.

URL pública: https://qw7pxfb069ht6p90.hq5.lambda-web.us-east-2.on.aws

- Región: us-east-2.
- Servicio: AWS Lambda Web Functions.
- Función: studyflow-web.
- Endpoint: public; estado Active.
- Runtime: Node.js 24; Linux arm64.
- Acceso público HTTPS (ApplicationManaged).
- Límite de escalado: dos entornos; límite de solicitudes: 100 por segundo.
- Variables runtime: NODE_ENV=production, NEXT_TELEMETRY_DISABLED=1.
- Variable pública de build: NEXT_PUBLIC_APP_NAME=StudyFlow.

## Flujo y evidencia

| Comprobación                            | Resultado                                                                     |
| --------------------------------------- | ----------------------------------------------------------------------------- |
| Build Next.js 16.4.5 y TypeScript       | Correcto                                                                      |
| Paquete Linux arm64                     | Servidor de producción arrancó correctamente                                  |
| Pruebas HTTP locales                    | 14 aprobadas; 0 fallidas                                                      |
| Pruebas HTTP URL AWS                    | 14 aprobadas; 0 fallidas                                                      |
| Páginas /, /tareas, /materias, /enfoque | HTTP 200                                                                      |
| Ruta inexistente                        | HTTP 404                                                                      |
| API GET /api/tareas                     | Cuatro tareas iniciales                                                       |
| API POST /api/tareas                    | HTTP 201, título recortado e identificador generado                           |
| Entradas inválidas                      | Rechazadas con HTTP 400                                                       |
| Navegador                               | Creación de una tarea mediante la API, completado y persistencia tras recarga |
| Temporizador                            | Inició en 25:00, avanzó a 24:54 y se pausó                                    |
| Consola del navegador                   | Sin errores capturados                                                        |

Las tareas se almacenan en localStorage. La API valida solicitudes y no persiste tareas en memoria del servidor ni en una base de datos. La prueba de navegador se realizó con datos sintéticos. No se afirma sincronización entre dispositivos ni se midió disponibilidad bajo carga.

## Archivos

- [Salida real de las pruebas HTTP públicas](docs/aws-http-tests.txt)
- [Captura del resumen](docs/aws-dashboard.png)
- [Captura de la tarea completada tras recargar](docs/aws-tareas.png)
- [Captura del temporizador pausado](docs/aws-enfoque.png)

## Entrega

- [Aplicación pública AWS](https://qw7pxfb069ht6p90.hq5.lambda-web.us-east-2.on.aws)
- [Repositorio público](https://github.com/JoseCas3/studyflow)
