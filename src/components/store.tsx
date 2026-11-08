'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { isTask, type Task } from '@/lib/data';
type Store = {
  tasks: Task[];
  loading: boolean;
  error: string;
  retry: () => void;
  save: (task: Omit<Task, 'id'>, id?: string) => Promise<void>;
  toggle: (id: string) => void;
  remove: (id: string) => void;
};
const Context = createContext<Store | null>(null);
const key = 'studyflow.tasks.v1';
export function StudyProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError('');
      try {
        const stored = localStorage.getItem(key);
        if (stored !== null) {
          const parsed: unknown = JSON.parse(stored);
          if (!Array.isArray(parsed) || !parsed.every(isTask))
            throw new Error(
              'Los datos guardados no son válidos. Exporta o elimina los datos del sitio desde tu navegador.',
            );
          setTasks(parsed);
        } else {
          const response = await fetch('/api/tareas', {
            signal: controller.signal,
          });
          if (!response.ok)
            throw new Error(
              'No pudimos cargar tus tareas. Inténtalo otra vez.',
            );
          const data = await response.json();
          if (!Array.isArray(data.tasks) || !data.tasks.every(isTask))
            throw new Error('La API devolvió datos inválidos.');
          localStorage.setItem(key, JSON.stringify(data.tasks));
          setTasks(data.tasks);
        }
      } catch (e) {
        if (!controller.signal.aborted)
          setError(
            e instanceof Error
              ? e.message
              : 'No se pudo acceder al almacenamiento.',
          );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [attempt]);
  function persist(next: Task[]) {
    localStorage.setItem(key, JSON.stringify(next));
    setTasks(next);
  }
  async function save(task: Omit<Task, 'id'>, id?: string) {
    const response = await fetch('/api/tareas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'No se pudo guardar.');
    persist(
      id
        ? tasks.map((t) => (t.id === id ? { ...data.task, id } : t))
        : [...tasks, data.task],
    );
  }
  function toggle(id: string) {
    try {
      persist(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    } catch {
      setError('No se pudo guardar el cambio en este navegador.');
    }
  }
  function remove(id: string) {
    try {
      persist(tasks.filter((t) => t.id !== id));
    } catch {
      setError('No se pudo eliminar la tarea.');
    }
  }
  return (
    <Context.Provider
      value={{
        tasks,
        loading,
        error,
        retry: () => setAttempt((a) => a + 1),
        save,
        toggle,
        remove,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useStudy() {
  const value = useContext(Context);
  if (!value) throw new Error('Falta StudyProvider');
  return value;
}
