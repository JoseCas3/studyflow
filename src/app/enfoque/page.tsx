import type { Metadata } from 'next';
import { FocusTimer } from '@/components/timer';
export const metadata: Metadata = { title: 'Tiempo de enfoque' };
export default function Page() {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">MENOS DISTRACCIONES, MÁS PRESENTE</p>
          <h1>Encuentra tu enfoque</h1>
          <p>Una cosa a la vez. Tu atención merece su propio espacio.</p>
        </div>
      </div>
      <FocusTimer />
    </>
  );
}
