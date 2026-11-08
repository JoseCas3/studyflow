'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ListTodo,
  BookOpen,
  Timer,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import styles from './shell.module.css';
const links = [
  { href: '/', text: 'Mi resumen', Icon: LayoutDashboard },
  { href: '/tareas', text: 'Mis tareas', Icon: ListTodo },
  { href: '/materias', text: 'Materias', Icon: BookOpen },
  { href: '/enfoque', text: 'Tiempo de enfoque', Icon: Timer },
];
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo}>
          <span>
            <BookOpen size={23} />
          </span>
          studyflow<span className={styles.dot}>.</span>
        </Link>
        <div className={styles.label}>TU ESPACIO DE ESTUDIO</div>
        <nav aria-label="Navegación principal">
          {links.map(({ href, text, Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? 'page' : undefined}
              className={path === href ? styles.active : ''}
            >
              <Icon size={19} />
              {text}
            </Link>
          ))}
        </nav>
        <div className={styles.note}>
          <Sparkles size={22} />
          <strong>
            Los pequeños pasos
            <br />
            también cuentan.
          </strong>
          <p>Haz espacio para aprender algo nuevo hoy.</p>
          <Link href="/enfoque">
            Encuentra tu enfoque <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className={styles.profile}>
          <span>E</span>
          <div>
            <strong>Mi espacio personal</strong>
            <small>Aprende a tu ritmo</small>
          </div>
        </div>
      </aside>
      <div className={styles.content}>
        <header className={styles.topbar}>
          <span>Un poco de orden. Mucho potencial.</span>
          <span className={styles.status}>
            <i />
            Tu próximo gran paso empieza aquí
          </span>
        </header>
        <main>{children}</main>
        <footer>
          Hecho para aprender, un día a la vez. <span>StudyFlow © 2026</span>
        </footer>
      </div>
    </div>
  );
}
