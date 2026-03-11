'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Trophy, Star, Award, TrendingUp, Users, Calendar,
  CheckCircle2, ArrowRight, ChevronDown, Menu, X,
  Target, Crown, BarChart3, Shield, Zap, Clock,
  DollarSign, ChevronUp,
} from 'lucide-react';

/* ─── constants ──────────────────────────────────────────────────── */

const APP = 'https://app.padelero.app';
const GREEN = '#C8F542';

/* ─── hooks ──────────────────────────────────────────────────────── */

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

/* ─── Reveal ─────────────────────────────────────────────────────── */

function Reveal({
  children, delay = 0, from = 'bottom', className = '',
}: {
  children: React.ReactNode; delay?: number;
  from?: 'bottom' | 'left' | 'right'; className?: string;
}) {
  const { ref, inView } = useInView();
  const t: Record<string, string> = {
    bottom: 'translateY(36px)',
    left:   'translateX(-36px)',
    right:  'translateX(36px)',
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : t[from],
      transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Nav ────────────────────────────────────────────────────────── */

function Nav() {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    ['#formatos', 'Formatos'],
    ['#ranking', 'Ranking'],
    ['#categorias', 'Categorías'],
    ['#clubes', 'Para clubes'],
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${sc ? 'bg-black/85 backdrop-blur-2xl border-b border-white/5 shadow-lg shadow-black/40' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Padelero" width={26} height={26} className="rounded-md" />
            <span className="font-black text-white text-lg tracking-tight">Padelero</span>
          </Link>
          <span className="hidden md:block text-zinc-600">/</span>
          <span className="hidden md:flex items-center gap-1.5 text-sm font-bold" style={{ color: GREEN }}>
            <Trophy size={13} /> Torneos
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {links.map(([h, l]) => (
            <a key={h} href={h} className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">{l}</a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href={`${APP}/login`} className="text-zinc-400 hover:text-white text-sm px-3 py-1.5 transition-colors">
            Ingresar
          </Link>
          <Link
            href={`${APP}/register`}
            className="text-sm font-bold px-5 py-2 rounded-xl transition-all hover:scale-105 shadow-md"
            style={{ background: GREEN, color: '#000', boxShadow: `0 4px 20px ${GREEN}33` }}
          >
            Empezar gratis
          </Link>
        </div>

        <button className="md:hidden text-zinc-300 hover:text-white" onClick={() => setOpen(v => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 px-5 pb-5">
          {links.map(([h, l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block text-zinc-200 py-2.5 border-b border-zinc-800/60 last:border-0 font-medium">{l}</a>
          ))}
          <div className="pt-3 space-y-2">
            <Link href={`${APP}/login`} className="block w-full text-center border border-zinc-700 text-white py-3 rounded-xl font-semibold">Ingresar</Link>
            <Link href={`${APP}/register`} className="block w-full text-center py-3 rounded-xl font-black" style={{ background: GREEN, color: '#000' }}>Empezar gratis</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-16 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/landing/torneo-accion.png" alt="Torneo de pádel" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[120px] pointer-events-none" style={{ background: `${GREEN}18` }} />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 mb-8 text-sm font-semibold text-white">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: GREEN }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: GREEN }} />
          </span>
          Sistema de Torneos · Padelero
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[82px] font-black leading-[.92] mb-6 tracking-tight drop-shadow-2xl">
          <span className="block text-white">Competí.</span>
          <span
            className="block mt-1"
            style={{
              background: `linear-gradient(135deg,${GREEN} 0%,#7ec800 60%,${GREEN} 100%)`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 4s linear infinite',
            }}
          >
            Sumá puntos.
          </span>
          <span className="block text-white">Ascendé.</span>
        </h1>

        <p className="text-base md:text-xl text-zinc-300 max-w-xl mx-auto mb-10 leading-relaxed">
          La plataforma más completa para torneos de pádel en Argentina. Ranking, circuitos anuales y un sistema de categorías real.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href={`${APP}/register`}
            className="group flex items-center justify-center gap-2 font-black text-base px-9 py-4 rounded-2xl transition-all hover:scale-105 shadow-2xl"
            style={{ background: GREEN, color: '#000', boxShadow: `0 8px 40px ${GREEN}40` }}
          >
            Crear cuenta gratis <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href={`${APP}/login`}
            className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white font-semibold text-base px-9 py-4 rounded-2xl hover:bg-white/20 transition-all"
          >
            Ya tengo cuenta
          </Link>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {[
            { v: '9', l: 'Categorías', icon: Trophy },
            { v: '100', l: 'Pts al ganar', icon: Crown },
            { v: '∞', l: 'Circuitos', icon: Award },
          ].map(({ v, l, icon: Icon }) => (
            <div key={l} className="bg-black/50 backdrop-blur border border-white/10 rounded-2xl p-3.5 text-center">
              <Icon className="mx-auto mb-1.5" size={15} style={{ color: GREEN }} />
              <p className="text-xl font-black text-white">{v}</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <a href="#formatos" className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-1 text-white/40 hover:text-white/60 transition-colors" style={{ animation: 'bounce 2s infinite' }}>
        <span className="text-[10px] uppercase tracking-[.3em]">Explorar</span>
        <ChevronDown size={15} />
      </a>
    </section>
  );
}

/* ─── Formatos ───────────────────────────────────────────────────── */

function Formatos() {
  return (
    <section id="formatos" className="py-24 px-5 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}35`, color: GREEN }}
            >
              Formatos de juego
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              Dos formatos, una sola plataforma
            </h2>
            <p className="text-zinc-400 text-lg max-w-lg mx-auto">
              Elegí el que mejor se adapta a tu nivel y disponibilidad.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {/* Eliminación */}
          <Reveal from="left">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-600 transition-colors h-full">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${GREEN}20` }}>
                <Trophy size={24} style={{ color: GREEN }} />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-bold text-white">3 Sets · Eliminación</h3>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: `${GREEN}25`, color: GREEN }}>Más puntos</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Cuadro de llave tradicional. Perdés y quedás eliminado. Cada partido a 3 sets completos.
              </p>
              <div className="space-y-2.5">
                {[
                  { pos: 'Campeón', pts: 100, color: '#facc15' },
                  { pos: 'Finalista', pts: 80, color: '#d1d5db' },
                  { pos: 'Semifinalista', pts: 60, color: '#d97706' },
                  { pos: 'Cuartos de final', pts: 40, color: '#9ca3af' },
                  { pos: 'Octavos de final', pts: 20, color: '#6b7280' },
                  { pos: '16avos · 32avos', pts: 10, color: '#4b5563' },
                ].map(({ pos, pts, color }) => (
                  <div key={pos} className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color }}>{pos}</span>
                    <span className="text-sm font-black" style={{ color: GREEN }}>{pts} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Americano */}
          <Reveal from="right">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-600 transition-colors h-full">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-blue-500/20">
                <Users size={24} className="text-blue-400" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-bold text-white">Americano · Cortos</h3>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400">Más social</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Todos juegan contra todos. Sets cortos, rotación de parejas. Ideal para conocer nuevos jugadores.
              </p>
              <div className="space-y-2.5">
                {[
                  { pos: 'Campeón', pts: 80, color: '#facc15' },
                  { pos: 'Finalista', pts: 60, color: '#d1d5db' },
                  { pos: 'Semifinalista', pts: 40, color: '#d97706' },
                  { pos: 'Cuartos de final', pts: 30, color: '#9ca3af' },
                  { pos: 'Fase de grupos', pts: 15, color: '#6b7280' },
                ].map(({ pos, pts, color }) => (
                  <div key={pos} className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color }}>{pos}</span>
                    <span className="text-sm font-black text-blue-400">{pts} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Suma tournaments */}
        <Reveal>
          <div className="bg-zinc-900 border border-orange-500/25 rounded-3xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Target size={20} className="text-orange-400" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-white text-lg">Torneos &ldquo;Suma de categorías&rdquo;</h3>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400">Especial</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                  La suma de las categorías de la pareja debe alcanzar un mínimo definido. Por ejemplo, en un <strong className="text-white">Suma 13</strong>: 7ma + 6ta = 13 ✓, pero 8va + 7ma = 15 ✗ (excede). También puede ser <strong className="text-white">Suma mínima 13</strong> donde se necesita ≥ 13. Estos torneos <strong className="text-white">no otorgan puntos de ranking ni de circuito</strong>. Los torneos Mixtos tampoco dan puntos.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Inscripcion ────────────────────────────────────────────────── */

function Inscripcion() {
  return (
    <section className="relative py-24 px-5 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/landing/torneo-organizador.png" alt="Organizador con bracket" fill className="object-cover opacity-12" />
        <div className="absolute inset-0 bg-black/88" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <Reveal from="left">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-5"
                style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}35`, color: GREEN }}
              >
                Inscripción
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Inscribite en minutos
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Buscá a tu compañero en la app, elegí el día que preferís jugar y adjuntá el comprobante de pago. Todo desde el celular.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Ambos jugadores deben tener cuenta en Padelero',
                  'Solo podés inscribirte en torneos de tu categoría o peores',
                  'Elegí tu día preferido: Viernes, Sábado, Domingo o Cualquiera',
                  'El club verifica el comprobante y aprueba tu inscripción',
                ].map(t => (
                  <div key={t} className="flex items-start gap-3">
                    <CheckCircle2 size={16} style={{ color: GREEN }} className="flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
              <Link
                href={`${APP}/register`}
                className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg"
                style={{ background: GREEN, color: '#000', boxShadow: `0 4px 20px ${GREEN}33` }}
              >
                Crear cuenta <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          {/* Mock card */}
          <Reveal from="right" delay={100}>
            <div className="space-y-3">
              <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy size={16} style={{ color: GREEN }} />
                  <p className="font-bold text-white">Copa Primavera · 6ta Caballeros</p>
                </div>
                <div className="flex gap-2 flex-wrap mb-4">
                  {[
                    { l: '6ta', bg: `${GREEN}25`, c: GREEN },
                    { l: 'Caballeros', bg: '#3b82f620', c: '#60a5fa' },
                    { l: '3 sets', bg: '#f9731625', c: '#fb923c' },
                  ].map(({ l, bg, c }) => (
                    <span key={l} className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: bg, color: c }}>{l}</span>
                  ))}
                </div>
                <div className="border-t border-white/5 pt-4 space-y-3">
                  {[
                    { icon: Users, label: 'Tu compañero', value: 'Lucas M. · 6.4' },
                    { icon: Clock, label: 'Día preferido', value: 'Sábado' },
                    { icon: DollarSign, label: 'Comprobante', value: '✓ Adjuntado' },
                    { icon: Calendar, label: 'Vencimiento inscripción', value: '14 Mar' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Icon size={12} />{label}
                      </div>
                      <span className="text-xs font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="mt-5 w-full py-3 rounded-xl text-sm font-black transition-all hover:scale-[1.02]"
                  style={{ background: GREEN, color: '#000' }}
                >
                  Confirmar inscripción
                </button>
              </div>

              {/* Gender rules */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { l: 'Caballeros', sub: 'Da puntos ✓', border: `${GREEN}40`, text: GREEN },
                  { l: 'Damas', sub: 'Da puntos ✓', border: '#3b82f640', text: '#60a5fa' },
                  { l: 'Mixto', sub: 'No da puntos', border: '#ffffff15', text: '#71717a' },
                ].map(({ l, sub, border, text }) => (
                  <div key={l} className="rounded-2xl p-3 border text-center bg-zinc-900" style={{ borderColor: border }}>
                    <p className="text-xs font-bold text-white">{l}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: text }}>{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Ranking ────────────────────────────────────────────────────── */

function Ranking() {
  const players = [
    { rank: 1, name: 'Marcos V.', pts: 240, torneos: 4, rating: '6.1' },
    { rank: 2, name: 'Lucas M.', pts: 210, torneos: 5, rating: '6.2' },
    { rank: 3, name: 'Diego R.', pts: 180, torneos: 3, rating: '6.3', obs: true },
    { rank: 4, name: 'Nicolás P.', pts: 160, torneos: 4, rating: '6.5' },
    { rank: 5, name: 'Matías G.', pts: 140, torneos: 2, rating: '6.7' },
  ];

  return (
    <section id="ranking" className="py-24 px-5 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Mock */}
          <Reveal from="left">
            <div className="space-y-3">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-white">Ranking General · 6ta</p>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400">Caballeros</span>
                </div>
                {/* Filters */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {['General', '6ta', 'Club BsAs'].map((f, i) => (
                    <span key={f} className="text-[11px] font-bold px-3 py-1 rounded-full" style={i === 0 ? { background: GREEN, color: '#000' } : { background: '#27272a', color: '#71717a' }}>{f}</span>
                  ))}
                </div>
                <div className="space-y-3.5">
                  {players.map(({ rank, name, pts, torneos, rating, obs }) => {
                    const rankColor = rank === 1 ? '#facc15' : rank === 2 ? '#d1d5db' : rank === 3 ? '#d97706' : '#71717a';
                    return (
                      <div key={rank} className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black" style={{ background: `${GREEN}20`, color: GREEN }}>
                            {name.slice(0, 2)}
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black" style={{ background: rankColor, color: rank <= 2 ? '#000' : '#fff' }}>
                            {rank}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-zinc-500">{rating}</span>
                            {obs && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400">Observado</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-black" style={{ color: GREEN }}>{pts}</p>
                          <p className="text-[10px] text-zinc-600">{torneos} torneos</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                <Star size={16} style={{ color: GREEN }} className="flex-shrink-0" />
                <p className="text-xs text-zinc-400">Los puntos son <strong className="text-white">por jugador</strong>, no por pareja. Cada uno acumula sus puntos individualmente.</p>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal from="right" delay={100}>
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-5"
                style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}35`, color: GREEN }}
              >
                Ranking
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Tu posición, en tiempo real
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Cada resultado suma puntos al ranking general y al ranking de tu club. Filtrá por categoría, género o club.
              </p>
              <div className="space-y-3">
                {[
                  'Puntos individuales — cada jugador acumula los suyos',
                  'Ranking general + ranking por club en simultáneo',
                  'Filtrá por categoría, género o circuito anual',
                  'Si un club te observa, aparece el label "Observado" en tu perfil',
                  'Solo torneos puros (no Mixto, no Suma) dan puntos de ranking',
                ].map(t => (
                  <div key={t} className="flex items-start gap-3">
                    <CheckCircle2 size={16} style={{ color: GREEN }} className="flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Circuito ───────────────────────────────────────────────────── */

function Circuito() {
  return (
    <section className="relative py-24 px-5 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/landing/torneo-accion.png" alt="Circuito anual" fill className="object-cover opacity-8" />
        <div className="absolute inset-0 bg-black/92" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}35`, color: GREEN }}
            >
              Circuito anual
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">Un año entero de competencia</h2>
            <p className="text-zinc-400 text-lg max-w-lg mx-auto">
              Los clubes arman circuitos con múltiples fechas. Cada torneo del circuito acumula puntos para un ranking del año.
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative mb-12">
          <div className="absolute top-6 left-0 right-0 h-px hidden md:block" style={{ background: `${GREEN}20` }} />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { n: 1, mes: 'Marzo', pts: 100, pos: '🥇 Campeón', done: true },
              { n: 2, mes: 'Mayo',  pts: 60,  pos: '🥉 Semifinal', done: true },
              { n: 3, mes: 'Julio', pts: 80,  pos: '🥈 Finalista', done: true },
              { n: 4, mes: 'Sept',  pts: null, pos: '⏳ Próxima',  done: false },
              { n: 5, mes: 'Nov',   pts: null, pos: '⏳ Próxima',  done: false },
            ].map(({ n, mes, pts, pos, done }) => (
              <Reveal key={n} delay={n * 80}>
                <div className={`flex flex-col items-center text-center ${done ? '' : 'opacity-35'}`}>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm mb-3 relative z-10"
                    style={done ? { background: GREEN, color: '#000' } : { background: '#27272a', color: '#71717a', border: '1px solid #3f3f46' }}
                  >
                    F{n}
                  </div>
                  <p className="text-xs font-bold text-white">Fecha {n}</p>
                  <p className="text-[10px] text-zinc-500">{mes}</p>
                  {done && pts && (
                    <>
                      <p className="text-[10px] text-zinc-400 mt-1">{pos}</p>
                      <p className="text-sm font-black mt-1" style={{ color: GREEN }}>+{pts} pts</p>
                    </>
                  )}
                  {!done && <p className="text-[10px] text-zinc-600 mt-1">{pos}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Summary */}
        <Reveal>
          <div className="rounded-3xl p-8 md:p-12 text-center" style={{ background: `${GREEN}12`, border: `1px solid ${GREEN}30` }}>
            <Award className="mx-auto mb-4" size={32} style={{ color: GREEN }} />
            <p className="text-5xl font-black mb-2" style={{ color: GREEN }}>240 pts</p>
            <p className="text-zinc-400 mb-6">Acumulados en 3 fechas · Circuito 2025 · 6ta Caballeros</p>
            <div className="flex items-center justify-center gap-2">
              <Crown size={18} className="text-yellow-400" />
              <span className="font-bold text-white text-lg">#1 en el ranking del circuito</span>
            </div>
            <p className="text-zinc-500 text-sm mt-4">2 fechas restantes — seguís acumulando puntos</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Categorias ─────────────────────────────────────────────────── */

function Categorias() {
  const [faqOpen, setFaqOpen] = useState(false);
  const cats = ['9na', '8va', '7ma', '6ta', '5ta', '4ta', '3ra', '2da', '1ra'];

  return (
    <section id="categorias" className="py-24 px-5 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <Reveal from="left">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-5"
                style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}35`, color: GREEN }}
              >
                Categorías
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Un sistema de niveles real
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                De 9na (principiante) a 1ra (élite). Dentro de cada categoría tenés un <strong className="text-white">rating decimal</strong> que muestra exactamente qué tan cerca estás de ascender.
              </p>

              {/* Rating bar */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Ejemplo · 6ta categoría</p>
                <div className="space-y-3">
                  {[
                    { rating: '6.1', label: 'Listo para ascender', pct: '8%', color: GREEN },
                    { rating: '6.4', label: 'En la media', pct: '40%', color: '#60a5fa' },
                    { rating: '6.7', label: 'Recién llegó a la categoría', pct: '70%', color: '#fb923c' },
                  ].map(({ rating, label, pct, color }) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm font-black w-9 flex-shrink-0" style={{ color }}>{rating}</span>
                      <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: pct, background: color }} />
                      </div>
                      <span className="text-[10px] text-zinc-500 w-32 text-right">{label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-zinc-600 mt-3">← Menor número = más cerca de ascender</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  'Solo podés anotarte en torneos de tu categoría o peores (numéricamente mayores)',
                  'El rating se actualiza automáticamente después de cada torneo',
                  'No hay descenso de categoría involuntario',
                ].map(t => (
                  <div key={t} className="flex items-start gap-3">
                    <CheckCircle2 size={16} style={{ color: GREEN }} className="flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <button
                onClick={() => setFaqOpen(v => !v)}
                className="w-full flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
              >
                <span>¿Cómo me asignan la categoría inicial?</span>
                {faqOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {faqOpen && (
                <div className="bg-zinc-900/70 border border-zinc-800 border-t-0 rounded-b-xl px-4 py-3 text-sm text-zinc-400 leading-relaxed -mt-px">
                  Un administrador del club evalúa tu nivel y te asigna la categoría inicial. A partir de ahí, tu rating varía con cada torneo que jugás.
                </div>
              )}
            </div>
          </Reveal>

          {/* Scale */}
          <Reveal from="right" delay={100}>
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-5">Escala completa de categorías</p>
              <div className="space-y-2">
                {cats.map((cat, i) => {
                  const isHighlight = cat === '6ta';
                  const pct = ((cats.length - 1 - i) / (cats.length - 1)) * 100;
                  return (
                    <div
                      key={cat}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                      style={isHighlight ? { background: `${GREEN}18`, border: `1px solid ${GREEN}40` } : { background: '#27272a' }}
                    >
                      <span className="text-sm font-black w-8 flex-shrink-0" style={{ color: isHighlight ? GREEN : '#71717a' }}>{cat}</span>
                      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: isHighlight ? GREEN : '#3f3f46' }} />
                      </div>
                      <span className="text-[10px] text-zinc-600 w-20 text-right">
                        {i === 0 ? 'Principiante' : i === cats.length - 1 ? 'Élite' : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-zinc-600 mt-3 px-1">
                <span>← 9na: nivel inicial</span>
                <span>1ra: élite →</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Ascensos ───────────────────────────────────────────────────── */

function Ascensos() {
  return (
    <section className="relative py-24 px-5 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/landing/torneo-celebracion.png" alt="Celebración de ascenso" fill className="object-cover object-top opacity-15" />
        <div className="absolute inset-0 bg-black/88" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}35`, color: GREEN }}
            >
              Sistema de ascensos
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              Ascendé cuando lo merecés
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Los clubes detectan jugadores destacados y los promueven de categoría directamente. Sin votos, sin esperas.
            </p>
          </div>
        </Reveal>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {[
            { step: '01', icon: Star, title: 'Club te observa', desc: 'El administrador del club marca tu perfil como candidato a ascenso. Aparece el label "Observado" en tu ranking.', color: '#facc15', bg: '#facc1520' },
            { step: '02', icon: Shield, title: 'Club decide ascenderte', desc: 'Un solo club puede ejecutar el ascenso directamente. No necesitás la aprobación de múltiples clubes.', color: GREEN, bg: `${GREEN}20` },
            { step: '03', icon: Crown, title: '¡Nueva categoría!', desc: 'Empezás en X.7 de la nueva categoría. El 50% de tus puntos de circuito se transfieren. Recibís una notificación al instante.', color: '#a78bfa', bg: '#a78bfa20' },
          ].map(({ step, icon: Icon, title, desc, color, bg }) => (
            <Reveal key={step} delay={parseInt(step) * 80}>
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 relative hover:border-zinc-600 transition-colors h-full">
                <span className="absolute top-5 right-5 text-5xl font-black text-white/4">{step}</span>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: bg }}>
                  <Icon size={24} style={{ color }} />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Visual */}
        <Reveal>
          <div className="rounded-3xl p-8 md:p-12" style={{ background: `${GREEN}08`, border: `1px solid ${GREEN}25` }}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="text-center">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">Antes</p>
                <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center border-2 border-zinc-700 bg-zinc-900">
                  <span className="text-2xl font-black text-white">6ta</span>
                  <span className="text-xs text-zinc-500">6.2</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ArrowRight size={28} style={{ color: GREEN }} />
                <p className="text-xs font-black" style={{ color: GREEN }}>ASCENSO</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">Después</p>
                <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center" style={{ border: `2px solid ${GREEN}60`, background: `${GREEN}15` }}>
                  <span className="text-2xl font-black" style={{ color: GREEN }}>5ta</span>
                  <span className="text-xs" style={{ color: `${GREEN}80` }}>5.7</span>
                </div>
              </div>
              <div className="space-y-2.5 md:ml-8">
                {[
                  'Empezás en X.7 de la nueva categoría',
                  '50% de puntos de circuito transferidos',
                  'Categoría mínima bloqueada (no bajás)',
                  'Recibís notificación + modal de festejo 🎉',
                ].map(t => (
                  <div key={t} className="flex items-center gap-3">
                    <CheckCircle2 size={15} style={{ color: GREEN }} />
                    <span className="text-sm text-zinc-300">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Para clubes ────────────────────────────────────────────────── */

function ParaClubes() {
  return (
    <section id="clubes" className="relative py-24 px-5 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/landing/torneo-organizador.png" alt="Organizador de torneos" fill className="object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/92 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/70" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal from="left">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1 text-white text-xs font-bold uppercase tracking-widest mb-5">
                Para organizadores
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Organizá torneos <br />
                <span style={{ background: `linear-gradient(135deg,${GREEN},#7ec800)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  sin Excel ni papel
                </span>
              </h2>
              <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                El panel de organizador te da control total sobre torneos, inscripciones y el sistema de categorías de tus jugadores.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: Trophy, t: 'Crear torneos', d: 'Formato, categoría, género, fechas y precio de inscripción.' },
                  { icon: Users, t: 'Gestionar inscriptos', d: 'Verificá comprobantes de pago y aprobá inscripciones.' },
                  { icon: BarChart3, t: 'Cargar resultados', d: 'Los puntos de ranking se calculan automáticamente.' },
                  { icon: TrendingUp, t: 'Observar y ascender', d: 'Marcá candidatos y ejecutá ascensos con un clic.' },
                  { icon: Award, t: 'Circuitos anuales', d: 'Múltiples fechas con puntos acumulados automáticamente.' },
                ].map(({ icon: Icon, t, d }) => (
                  <div key={t} className="flex gap-3 p-3.5 bg-white/5 backdrop-blur border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${GREEN}20` }}>
                      <Icon size={15} style={{ color: GREEN }} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{t}</p>
                      <p className="text-zinc-400 text-xs mt-0.5">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/5492324549325"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-black px-7 py-3.5 rounded-xl transition-all hover:scale-105 shadow-xl"
                style={{ background: GREEN, color: '#000', boxShadow: `0 8px 30px ${GREEN}35` }}
              >
                Consultá por tu club <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>

          <Reveal from="right" delay={150}>
            <div className="grid grid-cols-2 gap-3 max-w-xs ml-auto">
              {[
                { v: '9', l: 'categorías', s: 'De 9na a 1ra' },
                { v: '2', l: 'formatos', s: 'Eliminación / Americano' },
                { v: '∞', l: 'circuitos', s: 'Puntos acumulados' },
                { v: '1', l: 'clic', s: 'Para ascender un jugador' },
              ].map(({ v, l, s }) => (
                <div key={l} className="bg-black/60 backdrop-blur border border-white/10 rounded-2xl p-4 text-center hover:border-white/25 transition-colors">
                  <div className="text-2xl font-black mb-0.5" style={{ color: GREEN }}>{v}</div>
                  <div className="text-white text-xs font-bold leading-tight">{l}</div>
                  <div className="text-zinc-500 text-[9px] mt-1">{s}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA final ──────────────────────────────────────────────────── */

function CTA() {
  return (
    <section className="relative py-36 px-5 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/landing/torneo-celebracion.png" alt="Campeones de pádel" fill className="object-cover object-top opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/65 to-black" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: `${GREEN}12` }} />
      <div className="relative max-w-2xl mx-auto text-center">
        <Reveal>
          <div>
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: `${GREEN}25`, border: `1px solid ${GREEN}40` }}>
              <Trophy size={28} style={{ color: GREEN }} />
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[.92] tracking-tight">
              ¿Listo para <br />
              <span style={{ background: `linear-gradient(135deg,${GREEN},#7ec800,${GREEN})`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 4s linear infinite' }}>
                competir?
              </span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl mb-10">
              Gratis para jugadores. Sin tarjeta de crédito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`${APP}/register`}
                className="group flex items-center justify-center gap-2 font-black text-lg px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-2xl"
                style={{ background: GREEN, color: '#000', boxShadow: `0 8px 40px ${GREEN}40` }}
              >
                Crear cuenta gratis <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`${APP}/torneos`}
                className="flex items-center justify-center gap-2 border border-zinc-600 text-white font-semibold text-lg px-10 py-4 rounded-2xl hover:border-zinc-400 hover:bg-white/5 transition-all"
              >
                Ver torneos activos
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-5 py-14">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="Padelero" width={26} height={26} className="rounded-md" />
              <span className="font-black text-white text-lg">Padelero</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">La plataforma de pádel en Argentina. Reservas, torneos y comunidad en un solo lugar.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-[.15em]">Torneos</h4>
            <div className="space-y-2.5 text-sm text-zinc-400">
              <a href="#formatos" className="block hover:text-white transition-colors">Formatos</a>
              <a href="#ranking" className="block hover:text-white transition-colors">Ranking</a>
              <a href="#categorias" className="block hover:text-white transition-colors">Categorías</a>
              <a href="#clubes" className="block hover:text-white transition-colors">Para clubes</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-[.15em]">App</h4>
            <div className="space-y-2.5 text-sm text-zinc-400">
              <Link href={`${APP}/register`} className="block hover:text-white transition-colors">Crear cuenta</Link>
              <Link href={`${APP}/login`} className="block hover:text-white transition-colors">Ingresar</Link>
              <Link href="/" className="block hover:text-white transition-colors">Inicio</Link>
              <a href="https://wa.me/5492324549325" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <span>© 2025 Padelero. Todos los derechos reservados.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">Términos</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main ───────────────────────────────────────────────────────── */

export default function TorneosLanding() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Nav />
      <Hero />
      <Formatos />
      <Inscripcion />
      <Ranking />
      <Circuito />
      <Categorias />
      <Ascensos />
      <ParaClubes />
      <CTA />
      <Footer />
      <style>{`@keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}`}</style>
    </div>
  );
}
