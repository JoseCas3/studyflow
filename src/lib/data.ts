export type Task = { id: string; title: string; subject: string; priority: 'Alta' | 'Media' | 'Baja'; due: string; done: boolean };
export const subjects = [
  { id: 'programacion', name: 'Programación', color: '#7861da', icon: '⌘', description: 'Código, lógica y nuevas ideas.' },
  { id: 'matematicas', name: 'Matemáticas', color: '#d69731', icon: '∑', description: 'Un problema a la vez.' },
  { id: 'diseno', name: 'Diseño', color: '#d77691', icon: '✳', description: 'Creatividad con intención.' },
  { id: 'ingles', name: 'Inglés', color: '#3c9c8b', icon: 'Aa', description: 'Abre nuevas conversaciones.' },
];
export const initialTasks: Task[] = [
  { id: 'demo-1', title: 'Construir mi primera aplicación en Next.js', subject: 'programacion', priority: 'Alta', due: '', done: false },
  { id: 'demo-2', title: 'Resolver ejercicios de derivadas', subject: 'matematicas', priority: 'Media', due: '', done: false },
  { id: 'demo-3', title: 'Preparar un moodboard de referencias', subject: 'diseno', priority: 'Baja', due: '', done: false },
  { id: 'demo-4', title: 'Repasar vocabulario de la unidad', subject: 'ingles', priority: 'Media', due: '', done: true },
];
export function isTask(value: unknown): value is Task {
  if (!value || typeof value !== 'object') return false;
  const t = value as Task;
  return typeof t.id === 'string' && typeof t.title === 'string' && t.title.trim().length > 0 && t.title.length <= 120 && subjects.some(s => s.id === t.subject) && ['Alta','Media','Baja'].includes(t.priority) && typeof t.done === 'boolean' && typeof t.due === 'string' && (t.due === '' || (/^\d{4}-\d{2}-\d{2}$/.test(t.due) && !Number.isNaN(Date.parse(t.due))));
}
