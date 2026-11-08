import { NextResponse } from 'next/server';
import { initialTasks, isTask } from '@/lib/data';
export async function GET() {
  return NextResponse.json({ tasks: initialTasks });
}
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object')
      return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 });
    const task = { ...body, id: crypto.randomUUID() };
    if (!isTask(task))
      return NextResponse.json(
        { error: 'Revisa el título, la materia, la prioridad y la fecha.' },
        { status: 400 },
      );
    return NextResponse.json(
      { task: { ...task, title: task.title.trim() } },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: 'El cuerpo debe ser JSON válido.' },
      { status: 400 },
    );
  }
}
