import type { Metadata } from 'next';
import { Subjects } from '@/components/dashboard';
export const metadata: Metadata = { title: 'Materias' };
export default function Page() { return <><div className="page-heading"><div><p className="eyebrow">CADA ÁREA, SU ESPACIO</p><h1>Mis materias</h1><p>Una vista clara de todo lo que estás aprendiendo.</p></div></div><Subjects/><div className="info-note">Selecciona una materia para ver sus tareas. Las cuatro materias iniciales te ayudan a empezar a organizar tu semestre.</div></>; }
