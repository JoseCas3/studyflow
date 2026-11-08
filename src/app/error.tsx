'use client';
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <div className="panel empty" role="alert"><h1>Algo salió mal</h1><p>No pudimos mostrar esta página. Vuelve a intentarlo.</p><button className="button" onClick={reset}>Intentar de nuevo</button></div>; }
