import type { Metadata } from 'next';
import { StudyProvider } from '@/components/store';
import { Shell } from '@/components/shell';
import './globals.css';
export const metadata: Metadata = { title: { default: process.env.NEXT_PUBLIC_APP_NAME || 'StudyFlow', template: '%s | StudyFlow' }, description: 'Organiza tus tareas, conecta tus materias y encuentra tu ritmo de estudio.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body><StudyProvider><Shell>{children}</Shell></StudyProvider></body></html>; }
