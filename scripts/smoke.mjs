import assert from 'node:assert/strict';
import test from 'node:test';

const base = process.env.BASE_URL || 'http://localhost:3012';
const valid = {
  title: '  Prueba de integración  ',
  subject: 'programacion',
  priority: 'Alta',
  due: '2026-11-20',
  done: false,
};
for (const path of ['/', '/tareas', '/materias', '/enfoque']) {
  test(`Página ${path} responde 200`, async () => {
    const response = await fetch(base + path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);
  });
}
test('Una ruta inexistente responde 404', async () => {
  assert.equal((await fetch(base + '/ruta-inexistente')).status, 404);
});
test('GET ofrece cuatro tareas iniciales', async () => {
  const response = await fetch(base + '/api/tareas');
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.tasks.length, 4);
  assert.ok(
    data.tasks.every(
      (t) => typeof t.id === 'string' && typeof t.done === 'boolean',
    ),
  );
});
test('POST valida, recorta el título y genera un identificador', async () => {
  const response = await fetch(base + '/api/tareas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(valid),
  });
  assert.equal(response.status, 201);
  const { task } = await response.json();
  assert.equal(task.title, 'Prueba de integración');
  assert.match(task.id, /^[a-f0-9-]{36}$/);
});
for (const [name, changes] of [
  ['título vacío', { title: ' ' }],
  ['título muy largo', { title: 'a'.repeat(121) }],
  ['materia desconocida', { subject: 'invalida' }],
  ['prioridad inválida', { priority: 'Urgente' }],
  ['fecha imposible', { due: '2026-02-30' }],
  ['estado incorrecto', { done: 'false' }],
]) {
  test(`POST rechaza ${name}`, async () => {
    const response = await fetch(base + '/api/tareas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...valid, ...changes }),
    });
    assert.equal(response.status, 400);
    assert.equal(typeof (await response.json()).error, 'string');
  });
}
test('POST rechaza JSON malformado', async () => {
  const response = await fetch(base + '/api/tareas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{',
  });
  assert.equal(response.status, 400);
});
