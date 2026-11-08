'use client';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Volume2, Leaf, Target, Coffee } from 'lucide-react';
const modes = [{ name: 'Enfoque', minutes: 25, Icon: Target }, { name: 'Descanso corto', minutes: 5, Icon: Coffee }, { name: 'Descanso largo', minutes: 15, Icon: Leaf }];
export function FocusTimer() {
  const [mode, setMode] = useState(0); const [remaining, setRemaining] = useState(1500); const [running, setRunning] = useState(false); const [completed, setCompleted] = useState(0); const [notice, setNotice] = useState('');
  const deadline = useRef(0);
  useEffect(() => {
    if (!running) return;
    function tick() { const seconds = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)); setRemaining(seconds); if (seconds === 0) { setRunning(false); setNotice(mode === 0 ? '¡Sesión completada! Es momento de un descanso.' : 'Descanso terminado. ¡Vamos con el siguiente paso!'); if (mode === 0) setCompleted(c => c + 1); } }
    const interval = window.setInterval(tick, 250); return () => window.clearInterval(interval);
  }, [running, mode]);
  function reset(next = mode) { setRunning(false); setMode(next); setRemaining(modes[next].minutes * 60); setNotice(''); }
  function toggle() { if (!running) { if (remaining <= 0) { reset(); return; } deadline.current = Date.now() + remaining * 1000; } setRunning(v => !v); }
  const progress = (1 - remaining / (modes[mode].minutes * 60)) * 100;
  return <><section className="panel timer-panel"><div className="tabs timer-tabs">{modes.map((m,i) => <button key={m.name} aria-pressed={mode === i} className={mode === i ? 'selected' : ''} onClick={() => reset(i)}><m.Icon size={15}/>{m.name}</button>)}</div><p className="eyebrow timer-label">{mode === 0 ? 'ESTE MOMENTO ES PARA TI' : 'RESPIRA. TAMBIÉN ES PARTE DEL PROCESO.'}</p><div className="timer-circle" style={{ background: `conic-gradient(#8064d9 ${progress}%, #eee9f8 0)` }}><div><span className="time" role="timer" aria-label="Tiempo restante">{String(Math.floor(remaining / 60)).padStart(2,'0')}<span>:</span>{String(remaining % 60).padStart(2,'0')}</span><small>{running ? 'Vas muy bien. Sigue así.' : 'Un pequeño paso hacia tu meta'}</small></div></div><div className="timer-controls"><button className="button" onClick={toggle}>{running ? <Pause size={18}/> : <Play size={18}/>} {running ? 'Pausar' : remaining === 0 ? 'Preparar otra sesión' : 'Comenzar'}</button><button className="icon-button reset-button" aria-label="Reiniciar temporizador" onClick={() => reset()}><RotateCcw size={20}/></button></div><p className="timer-notice" role="status">{notice || 'Deja las distracciones a un lado y empieza cuando quieras.'}</p><div className="timer-bottom"><span><Target size={16}/> {completed} sesiones completadas en esta visita</span><span><Volume2 size={16}/> Ambiente tranquilo</span></div></section><div className="tips"><div><span>01</span><h3>Elige una sola tarea</h3><p>Dale toda tu atención a algo concreto y alcanzable.</p></div><div><span>02</span><h3>Encuentra tu ritmo</h3><p>Trabaja durante 25 minutos. Puedes pausar si lo necesitas.</p></div><div><span>03</span><h3>Regálate una pausa</h3><p>Descansa 5 minutos. Después de 4 sesiones, toma 15.</p></div></div><p className="storage-note">Mantén esta página abierta para conservar la sesión. El temporizador se ajusta al reloj si cambias de pestaña.</p></>;
}
