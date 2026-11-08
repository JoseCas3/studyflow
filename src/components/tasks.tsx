'use client';
import { useEffect, useRef, useState } from 'react';
import { Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { subjects, type Task } from '@/lib/data';
import { useStudy } from './store';
import { DataState, TaskRow } from './dashboard';
export function TaskManager() {
  const { tasks, loading, error, save, remove } = useStudy();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todas');
  const [subject, setSubject] = useState('');
  const [editing, setEditing] = useState<Task | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get('materia');
    if (subjects.some((s) => s.id === value)) setSubject(value!);
    if (params.get('nueva')) dialog.current?.showModal();
  }, []);
  function open(task: Task | null = null) {
    setEditing(task);
    setFormError('');
    form.current?.reset();
    dialog.current?.showModal();
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFormError('');
    const data = new FormData(event.currentTarget);
    try {
      await save(
        {
          title: String(data.get('title')),
          subject: String(data.get('subject')),
          priority: data.get('priority') as Task['priority'],
          due: String(data.get('due')),
          done: editing?.done ?? false,
        },
        editing?.id,
      );
      dialog.current?.close();
    } catch (e) {
      setFormError(
        e instanceof Error ? e.message : 'No pudimos guardar la tarea.',
      );
    } finally {
      setSaving(false);
    }
  }
  const visible = tasks.filter(
    (t) =>
      t.title
        .toLocaleLowerCase('es')
        .includes(search.toLocaleLowerCase('es')) &&
      (!subject || t.subject === subject) &&
      (filter === 'Todas' || (filter === 'Completadas' ? t.done : !t.done)),
  );
  return (
    <>
      <div className="task-toolbar">
        <div className="tabs" aria-label="Estado de las tareas">
          {['Todas', 'Pendientes', 'Completadas'].map((f) => (
            <button
              aria-pressed={f === filter}
              className={f === filter ? 'selected' : ''}
              key={f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          disabled={loading || !!error}
          className="button"
          onClick={() => open()}
        >
          <Plus size={16} /> Nueva tarea
        </button>
      </div>
      <div className="filters">
        <label className="search">
          <Search size={17} />
          <input
            aria-label="Buscar tareas"
            placeholder="Buscar una tarea…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <select
          aria-label="Filtrar por materia"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">Todas las materias</option>
          {subjects.map((s) => (
            <option value={s.id} key={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      {loading || error ? (
        <DataState />
      ) : (
        <section className="panel">
          <div className="section-heading">
            <h2>
              {visible.length} {visible.length === 1 ? 'tarea' : 'tareas'}
            </h2>
            <span className="muted">Tu plan, a tu ritmo</span>
          </div>
          {visible.length ? (
            visible.map((t) => (
              <div className="editable-task" key={t.id}>
                <TaskRow task={t} />
                <div className="row-actions">
                  <button
                    className="icon-button"
                    aria-label={`Editar ${t.title}`}
                    onClick={() => open(t)}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    className="icon-button danger"
                    aria-label={`Eliminar ${t.title}`}
                    onClick={() => {
                      if (window.confirm(`¿Eliminar la tarea «${t.title}»?`))
                        remove(t.id);
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty">
              <Search size={30} />
              <h3>Un espacio para un nuevo comienzo</h3>
              <p>
                No hay tareas con estos filtros. Crea una o cambia la búsqueda.
              </p>
            </div>
          )}
        </section>
      )}
      <p className="storage-note">
        Tus tareas se guardan en este navegador. Puedes editar los ejemplos o
        crear tu propio plan.
      </p>
      <dialog
        ref={dialog}
        onCancel={(e) => {
          if (saving) e.preventDefault();
        }}
      >
        <form key={editing?.id || 'new'} ref={form} onSubmit={submit}>
          <div className="section-heading">
            <h2>{editing ? 'Editar tarea' : 'Un nuevo paso'}</h2>
            <button
              type="button"
              disabled={saving}
              className="icon-button"
              aria-label="Cerrar formulario"
              onClick={() => dialog.current?.close()}
            >
              <X size={20} />
            </button>
          </div>
          <label>
            Título
            <input
              name="title"
              placeholder="¿Qué quieres lograr?"
              required
              maxLength={120}
              defaultValue={editing?.title}
              autoFocus
            />
          </label>
          <label>
            Materia
            <select
              name="subject"
              defaultValue={editing?.subject || subject || subjects[0].id}
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <div className="form-grid">
            <label>
              Prioridad
              <select
                name="priority"
                defaultValue={editing?.priority || 'Media'}
              >
                {['Alta', 'Media', 'Baja'].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
            <label>
              Fecha límite
              <input type="date" name="due" defaultValue={editing?.due} />
            </label>
          </div>
          {formError ? (
            <p role="alert" className="error-box">
              {formError}
            </p>
          ) : null}
          <button disabled={saving} className="button full" type="submit">
            {saving
              ? 'Guardando…'
              : editing
                ? 'Guardar cambios'
                : 'Crear tarea'}
          </button>
        </form>
      </dialog>
    </>
  );
}
