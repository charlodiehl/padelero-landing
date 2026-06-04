'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Trophy, Home, Sparkles, Rocket } from 'lucide-react';

const GREEN = '#C8F542';
const APP = 'https://app.padelero.app';
const WA = 'https://wa.me/5492324549325?text=' +
  encodeURIComponent('Hola Carlos! Vi la página de Padelero y quiero charlar.');

/* ── animación de entrada ───────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({ children, delay = 0, className = '', style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(28px)',
      transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ── nav (estilo del sitio) ─────────────────────────────────────────── */
function Nav() {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${sc ? 'bg-black/85 backdrop-blur-2xl border-b border-white/5 shadow-lg shadow-black/40' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src="/logo.png" alt="Padelero" width={28} height={28} className="rounded-md" />
          <span className="font-black text-white text-xl tracking-tight">Padelero</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/torneos" className="flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-lg transition-all hover:bg-[#C8F542]/10" style={{ color: GREEN }}>
            <Trophy size={14} /> Torneos
          </Link>
          <Link href="/clubes" className="flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-lg transition-all hover:bg-[#C8F542]/10" style={{ color: GREEN }}>
            <Home size={14} /> Clubes
          </Link>
          <Link href="/pro" className="flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-lg transition-all hover:bg-[#C8F542]/10" style={{ color: GREEN }}>
            <Sparkles size={14} /> Padelero Pro
          </Link>
          <Link href="/nosotros" className="flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-lg bg-[#C8F542]/10" style={{ color: GREEN }}>
            <Rocket size={14} /> Nosotros
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link href={`${APP}/login`} className="text-zinc-400 hover:text-white text-sm px-3 py-1.5 transition-colors">Ingresar</Link>
          <Link href={`${APP}/register`} className="bg-[#C8F542] text-black text-sm font-bold px-5 py-2 rounded-xl hover:bg-[#d4ff4a] transition-all hover:scale-105 shadow-md shadow-[#C8F542]/20">
            Empezar gratis
          </Link>
        </div>
        <button className="md:hidden text-zinc-300 hover:text-white" onClick={() => setOpen(v => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 px-5 pb-5">
          <Link href="/torneos" onClick={() => setOpen(false)} className="block py-2.5 border-b border-zinc-800/60 font-bold" style={{ color: GREEN }}>Torneos</Link>
          <Link href="/clubes" onClick={() => setOpen(false)} className="block py-2.5 border-b border-zinc-800/60 font-bold" style={{ color: GREEN }}>Clubes</Link>
          <Link href="/pro" onClick={() => setOpen(false)} className="block py-2.5 border-b border-zinc-800/60 font-bold" style={{ color: GREEN }}>Padelero Pro</Link>
          <Link href="/nosotros" onClick={() => setOpen(false)} className="block py-2.5 border-b border-zinc-800/60 font-bold" style={{ color: GREEN }}>Nosotros</Link>
          <div className="pt-3 space-y-2">
            <Link href={`${APP}/login`} className="block w-full text-center border border-zinc-700 text-white py-3 rounded-xl font-semibold">Ingresar</Link>
            <Link href={`${APP}/register`} className="block w-full text-center bg-[#C8F542] text-black py-3 rounded-xl font-black">Empezar gratis</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ── foto del fundador (fallback sobrio, sin iniciales/iconos) ──────── */
function FotoCarlos() {
  const [err, setErr] = useState(false);
  if (err) {
    return <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/equipo/carlos.jpg"
      alt="Carlos Diehl — fundador de Padelero"
      onError={() => setErr(true)}
      className="w-full h-full object-cover"
    />
  );
}

const AGENTES: { color: string; name: string; role: string }[] = [
  { color: '#a78bfa', name: 'Product Manager', role: 'Convierte ideas crudas en specs implementables.' },
  { color: '#60a5fa', name: 'Engineer',        role: 'Escribe el código, agrega tests y abre los PRs.' },
  { color: '#f59e0b', name: 'Reviewer',        role: 'Code review: bugs, regresiones, race conditions.' },
  { color: '#34d399', name: 'QA',              role: 'Prueba cada feature end-to-end, en producción.' },
  { color: '#22d3ee', name: 'Data Analyst',    role: 'Métricas, retención, GMV y reportes claros.' },
  { color: '#fb7185', name: 'Marketing',       role: 'Copys, campañas y contenido con voz de marca.' },
  { color: GREEN,     name: 'Support',         role: 'Responde a los clubes con el contexto del repo.' },
];

const FEATURES = ['Reservas y turnos', 'Torneos y ranking', 'Matchmaking y comunidad', 'Agentes Pro para clubes'];

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
      <div className="text-3xl md:text-4xl font-black" style={{ color: GREEN }}>{n}</div>
      <div className="text-xs md:text-sm text-zinc-400 mt-1 leading-tight">{label}</div>
    </div>
  );
}

/* eyebrow de sección, sin icono */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-zinc-300">
      {children}
    </span>
  );
}

export default function NosotrosPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Nav />

      {/* HERO */}
      <section className="relative isolate pt-32 pb-20 px-5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/landing/nosotros-hero.png" alt="" fill priority className="object-cover opacity-[0.65]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black" />
          <div className="absolute inset-0 opacity-60"
            style={{ background: `radial-gradient(60% 50% at 50% 0%, ${GREEN}18, transparent 70%)` }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal><Eyebrow>La oportunidad</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
              Una persona.<br />
              <span style={{ color: GREEN }}>Un equipo de agentes de IA.</span><br />
              Una misión.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg md:text-xl text-zinc-300 leading-relaxed">
              Construir <strong className="text-white">la mejor aplicación de pádel de Argentina</strong> —
              y demostrar que hoy se puede levantar una categoría entera con una sola persona
              y software que trabaja 24/7.
            </p>
          </Reveal>
        </div>
      </section>

      {/* EL PROYECTO */}
      <section className="px-5 py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-black mb-4">¿Qué es Padelero?</h2>
            <p className="text-zinc-300 text-lg leading-relaxed">
              La plataforma que une <strong className="text-white">jugadores y clubes</strong> de pádel en un solo lugar:
              reservas, torneos, ranking, partidos abiertos, matchmaking y comunidad. Y para los clubes,
              un sistema <span style={{ color: GREEN }}>Pro</span> con agentes que llenan canchas, recuperan jugadores
              y hacen crecer el negocio en piloto automático.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {FEATURES.map((t) => (
              <Reveal key={t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="h-1 w-8 rounded-full mb-3" style={{ background: GREEN }} />
                <div className="text-sm font-semibold leading-snug">{t}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LA HISTORIA */}
      <section className="px-5 py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-start">
          <Reveal>
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] aspect-square">
              <FotoCarlos />
            </div>
            <div className="mt-3 text-center">
              <div className="font-black text-lg">Carlos Diehl</div>
              <div className="text-sm" style={{ color: GREEN }}>Fundador · Solo founder</div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="text-2xl md:text-3xl font-black mb-4">La historia</h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                Antes de Padelero fundé una startup de <strong className="text-white">pagos en criptomonedas</strong> que
                levantó <strong style={{ color: GREEN }}>USD 2.2 millones</strong>. Aprendí a construir producto,
                equipo y negocio desde cero.
              </p>
              <p>
                En un viaje a <strong className="text-white">España</strong> me crucé con <strong className="text-white">Playtomic</strong>:
                la super-app que ordenó todo el pádel en Europa. Lo vi y pensé: <em>“esto en Argentina no existe… todavía”.</em>
              </p>
              <p>
                Así nació Padelero, con una apuesta distinta: hacerlo <strong className="text-white">solo</strong>,
                apalancado en agentes de inteligencia artificial para <em>todo</em> — el código, la gestión,
                el marketing, el soporte y el producto que atiende a cada club.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LA OPORTUNIDAD */}
      <section className="px-5 py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <Eyebrow>El mercado</Eyebrow>
            <h2 className="text-2xl md:text-3xl font-black mt-4 mb-4">Una categoría enorme, sin dueño local</h2>
            <p className="text-zinc-300 text-lg leading-relaxed">
              El pádel es uno de los deportes que más crece en el mundo, y Argentina es una de sus capitales:
              miles de canchas, una comunidad gigante… y <strong className="text-white">ningún jugador local</strong> que
              haya digitalizado la experiencia de punta a punta.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <Reveal className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">La referencia</div>
              <h3 className="text-xl font-black mb-2">Playtomic</h3>
              <p className="text-zinc-300 leading-relaxed text-sm">
                La app de pádel líder del mundo. Respaldada por fondos de primer nivel,
                <strong className="text-white"> valuada en cientos de millones de dólares</strong> y operada por
                un equipo de <strong className="text-white">+200 personas</strong>.
              </p>
            </Reveal>
            <Reveal delay={120} className="rounded-2xl border-2 p-6 bg-[#C8F542]/[0.04]" style={{ borderColor: `${GREEN}55` }}>
              <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GREEN }}>El experimento</div>
              <h3 className="text-xl font-black mb-2">Padelero</h3>
              <p className="text-zinc-300 leading-relaxed text-sm">
                Lo mismo, para Argentina y LatAm. Hecho por <strong className="text-white">1 persona</strong> +
                un equipo de <strong style={{ color: GREEN }}>agentes de IA</strong>. La pregunta que
                respondemos: <em className="text-white">¿cuánto puede construir hoy un solo founder?</em>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SOLO FOUNDER + IA */}
      <section className="px-5 py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-black mb-4">+200 personas vs. 1 persona + IA</h2>
            <p className="text-zinc-300 text-lg leading-relaxed">
              No es magia: es apalancamiento. Cada función que en una startup tradicional ocupa un equipo,
              acá la ejecuta un <strong className="text-white">agente de IA</strong> coordinado por una sola persona.
              Producto, ingeniería, QA, datos, marketing y soporte — corriendo en paralelo, todos los días.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ORGANIGRAMA */}
      <section className="px-5 py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black">El organigrama</h2>
            <p className="text-zinc-400 mt-2">Una cabeza humana. Un equipo de agentes ejecutando.</p>
          </Reveal>

          {/* Carlos arriba */}
          <Reveal className="flex flex-col items-center">
            <div className="rounded-2xl border-2 px-6 py-4 bg-[#C8F542]/[0.06] flex items-center gap-3" style={{ borderColor: `${GREEN}66` }}>
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 shrink-0" style={{ borderColor: GREEN }}>
                <FotoCarlos />
              </div>
              <div className="text-left">
                <div className="font-black">Carlos Diehl</div>
                <div className="text-xs text-zinc-400">Founder · estrategia y dirección</div>
              </div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-[11px] uppercase tracking-widest text-zinc-500 mb-6">Coordina a</div>
          </Reveal>

          {/* Agentes (acento de color, sin iconos) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {AGENTES.map((a, i) => (
              <Reveal key={a.name} delay={i * 60}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 border-l-4"
                style={{ borderLeftColor: a.color }}>
                <div className="font-bold text-sm" style={{ color: a.color }}>{a.name}</div>
                <div className="text-[12px] text-zinc-400 leading-snug mt-0.5">{a.role}</div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-6">
            <p className="text-sm text-zinc-500">
              + los agentes <span style={{ color: GREEN }}>Pro</span> que trabajan dentro del producto, uno por club,
              llenando canchas y recuperando jugadores.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TRACCIÓN */}
      <section className="px-5 py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <Eyebrow>Track record</Eyebrow>
            <h2 className="text-2xl md:text-3xl font-black mt-4 mb-8">Lo que pasó en 3 meses</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Reveal delay={0}><Stat n="3" label="meses de vida" /></Reveal>
            <Reveal delay={60}><Stat n="+1.000" label="jugadores reales" /></Reveal>
            <Reveal delay={120}><Stat n="1" label="persona en el equipo" /></Reveal>
            <Reveal delay={180}><Stat n="7+" label="agentes de IA trabajando" /></Reveal>
          </div>

          <Reveal delay={120}>
            <div className="mt-8 rounded-2xl border-2 p-6" style={{ borderColor: `${GREEN}55`, background: `${GREEN}0A` }}>
              <div className="text-sm text-zinc-400 uppercase tracking-wider font-bold">Próximo objetivo</div>
              <div className="text-xl md:text-2xl font-black mt-1">
                10.000 jugadores en los próximos 6 meses
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CIERRE */}
      <section className="px-5 py-20 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="text-2xl md:text-4xl font-black leading-tight">
              No pedimos nada.<br />
              <span style={{ color: GREEN }}>Mostramos lo que se puede construir hoy.</span>
            </h2>
            <p className="mt-5 text-zinc-300 text-lg leading-relaxed">
              Una categoría entera, operada por una persona y un ejército de agentes.
              Si esto te resuena —como jugador, como club o desde donde sea— hablemos.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={WA} target="_blank"
                className="inline-flex items-center justify-center bg-[#C8F542] text-black font-black px-6 py-3.5 rounded-xl hover:bg-[#d4ff4a] transition-all hover:scale-105">
                Hablemos
              </Link>
              <Link href={`${APP}/register`}
                className="inline-flex items-center justify-center border border-white/15 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-white/5 transition-all">
                Probar Padelero
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-5 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Padelero" width={24} height={24} className="rounded-md" />
            <span className="font-black text-white">Padelero</span>
          </Link>
          <div className="flex items-center gap-5 text-sm text-zinc-400">
            <Link href="/torneos" className="hover:text-white transition-colors">Torneos</Link>
            <Link href="/clubes" className="hover:text-white transition-colors">Clubes</Link>
            <Link href="/pro" className="hover:text-white transition-colors">Pro</Link>
            <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
          </div>
          <p className="text-xs text-zinc-600">© {2026} Padelero</p>
        </div>
      </footer>
    </main>
  );
}
