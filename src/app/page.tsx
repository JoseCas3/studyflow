import { Dashboard } from '@/components/dashboard';
export default function Page() {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">TU DÍA, CON INTENCIÓN</p>
          <h1>
            Un buen día para avanzar <span className="wave">✦</span>
          </h1>
          <p>Organiza tus ideas, encuentra tu ritmo y celebra cada paso.</p>
        </div>
        <span className="pill">Tu espacio para crecer</span>
      </div>
      <Dashboard />
    </>
  );
}
