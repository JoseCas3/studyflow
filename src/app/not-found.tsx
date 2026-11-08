import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="panel empty">
      <p className="eyebrow">404</p>
      <h1>Este camino aún no existe</h1>
      <p>Regresa a tu espacio para seguir avanzando.</p>
      <Link className="button" href="/">
        Volver al resumen
      </Link>
    </div>
  );
}
