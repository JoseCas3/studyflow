import type { Metadata } from 'next';
import { TaskManager } from '@/components/tasks';
export const metadata: Metadata = { title: 'Mis tareas' };
export default function Page() { return <><div className="page-heading"><div><p className="eyebrow">PASO A PASO</p><h1>Mis tareas</h1><p>Convierte tus pendientes en pequeños logros.</p></div></div><TaskManager/></>; }
