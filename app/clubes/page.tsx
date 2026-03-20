'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Trophy, Users, MessageCircle, BarChart3,
  CheckCircle2, ArrowRight, ChevronDown, Menu, X,
  TrendingUp, Clock, Star, DollarSign, Building2,
  Bell, Activity, Target, Zap, Shield,
} from 'lucide-react';

/* ─── constants ──────────────────────────────────────────────────── */

const APP = 'https://app.padelero.app';
const GREEN = '#C8F542';
const WA = 'https://wa.me/5492324549325';

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
    left: 'translateX(-36px)',
    right: 'translateX(36px)',
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

/* ─── WhatsApp icon ──────────────────────────────────────────────── */

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── WApp mockup (club perspective) ────────────────────────────── */

const MSGS = [
  { u: 'user', t: 'Hola! Puedo reservar el jueves a las 20:30?', d: 400 },
  { u: 'bot',  t: '¡Hola Maxi! Tenés disponible:\n• Cancha 1 · $24.000 ✓\n• Cancha 3 · $24.000 ✓\n¿Cuál preferís?', d: 900 },
  { u: 'user', t: 'La 1 perfecto', d: 1500 },
  { u: 'bot',  t: '✅ ¡Reserva confirmada!\nJueves 20:30 · Cancha 1\n$24.000 · Te esperamos 🎾', d: 2000 },
];

function WAppClub() {
  const { ref, inView } = useInView(0.2);
  return (
    <div ref={ref} className="relative mx-auto max-w-[280px]">
      <div className="bg-[#111] rounded-[2.5rem] border-2 border-zinc-700 p-2.5 shadow-2xl">
        <div className="rounded-[2rem] overflow-hidden bg-[#0e1117]">
          <div className="bg-[#075E54] px-4 py-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-black font-black text-xs" style={{ background: GREEN }}>A</div>
            <div>
              <div className="text-white text-xs font-bold">Club Arena</div>
              <div className="text-green-400 text-[10px]">Bot de reservas · en línea</div>
            </div>
          </div>
          <div className="min-h-[300px] p-2.5 space-y-2">
            {MSGS.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.u === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'none' : 'translateY(6px)',
                  transition: `opacity .4s ease ${m.d}ms, transform .4s ease ${m.d}ms`,
                }}
              >
                <div className={`max-w-[88%] rounded-xl px-2.5 py-1.5 text-[10px] whitespace-pre-line leading-relaxed ${m.u === 'user' ? 'bg-[#005C4B] text-white rounded-tr-none' : 'bg-[#202C33] text-zinc-100 rounded-tl-none'}`}>
                  {m.t}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#1a1a1a] px-3 py-2 border-t border-white/5">
            <div className="bg-[#2a2a2a] rounded-full px-3 py-1.5 text-zinc-600 text-[10px]">Escribí un mensaje...</div>
          </div>
        </div>
      </div>
      <div className="absolute -inset-6 rounded-full blur-3xl -z-10 pointer-events-none" style={{ background: `${GREEN}08` }} />
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
    ['#agenda', 'Reservas'],
    ['#partidos', 'Partidos'],
    ['#torneos', 'Torneos'],
    ['#ranking', 'Rankings'],
    ['#metricas', 'Métricas'],
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
            <Building2 size={13} /> Para Clubes
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {links.map(([h, l]) => (
            <a key={h} href={h} className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">{l}</a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-bold px-5 py-2 rounded-xl transition-all hover:scale-105 shadow-md"
            style={{ background: GREEN, color: '#000', boxShadow: `0 4px 20px ${GREEN}33` }}
          >
            <WhatsAppIcon className="w-3.5 h-3.5" /> Hablar con nosotros
          </a>
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
          <div className="pt-3">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-black"
              style={{ background: GREEN, color: '#000' }}
            >
              <WhatsAppIcon className="w-4 h-4" /> Hablar con nosotros
            </a>
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
        <Image src="/landing/club-lleno.jpg" alt="Club de pádel lleno de noche" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[120px] pointer-events-none" style={{ background: `${GREEN}15` }} />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 mb-8 text-sm font-semibold text-white">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: GREEN }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: GREEN }} />
          </span>
          Plataforma para Clubes · Padelero
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[82px] font-black leading-[.92] mb-6 tracking-tight drop-shadow-2xl">
          <span className="block text-white">Más reservas.</span>
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
            Cero llamadas.
          </span>
          <span className="block text-white">En 24 horas.</span>
        </h1>

        <p className="text-base md:text-xl text-zinc-300 max-w-xl mx-auto mb-10 leading-relaxed">
          El sistema completo para tu club de pádel: reservas automáticas por WhatsApp, torneos, rankings y métricas en tiempo real. Sin llamadas, sin Excel, sin caos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 font-black text-base px-9 py-4 rounded-2xl transition-all hover:scale-105 shadow-2xl"
            style={{ background: GREEN, color: '#000', boxShadow: `0 8px 40px ${GREEN}40` }}
          >
            <WhatsAppIcon className="w-5 h-5" /> Consultá por tu club <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#agenda"
            className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white font-semibold text-base px-9 py-4 rounded-2xl hover:bg-white/20 transition-all"
          >
            Ver funciones
          </a>
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {[
            { v: '0', l: 'llamadas manuales', icon: MessageCircle },
            { v: '+40%', l: 'más reservas', icon: TrendingUp },
            { v: '24/7', l: 'bot activo', icon: Zap },
          ].map(({ v, l, icon: Icon }) => (
            <div key={l} className="bg-black/50 backdrop-blur border border-white/10 rounded-2xl p-3.5 text-center">
              <Icon className="mx-auto mb-1.5" size={15} style={{ color: GREEN }} />
              <p className="text-xl font-black text-white">{v}</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <a href="#dolor" className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-1 text-white/40 hover:text-white/60 transition-colors" style={{ animation: 'bounce 2s infinite' }}>
        <span className="text-[10px] uppercase tracking-[.3em]">Explorar</span>
        <ChevronDown size={15} />
      </a>
    </section>
  );
}

/* ─── Dolor ──────────────────────────────────────────────────────── */

function Dolor() {
  return (
    <section id="dolor" className="py-24 px-5 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: '#ef444418', border: '1px solid #ef444435', color: '#f87171' }}
            >
              El problema
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              ¿Te suena familiar?
            </h2>
            <p className="text-zinc-400 text-lg max-w-lg mx-auto">
              Así gestionan sus clubes la mayoría. Hay una forma mejor.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            {
              icon: MessageCircle,
              title: 'Mensajes a las 11pm',
              desc: '"¿Hay cancha mañana a las 20?" — tu celular no descansa nunca.',
              color: '#f87171',
              bg: '#ef444418',
            },
            {
              icon: Calendar,
              title: 'Agenda en papel o WhatsApp',
              desc: 'Turnos mal anotados, grupos saturados, confusiones y cancelaciones de último momento.',
              color: '#fb923c',
              bg: '#f9731618',
            },
            {
              icon: Trophy,
              title: 'Torneos en Excel',
              desc: 'Cuadros a mano, inscripciones por mensaje, resultados que hay que cargar uno por uno.',
              color: '#facc15',
              bg: '#facc1518',
            },
            {
              icon: BarChart3,
              title: 'Sin datos del negocio',
              desc: 'No sabés cuál cancha rinde más, qué horario llena siempre o cuánto facturaste este mes.',
              color: '#a78bfa',
              bg: '#a78bfa18',
            },
          ].map(({ icon: Icon, title, desc, color, bg }, i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-600 transition-colors h-full">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: bg }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div
            className="rounded-3xl p-8 text-center"
            style={{ background: `${GREEN}10`, border: `1px solid ${GREEN}30` }}
          >
            <p className="text-xl md:text-2xl font-black text-white mb-2">
              Padelero lo resuelve todo. <span style={{ color: GREEN }}>En uno.</span>
            </p>
            <p className="text-zinc-400">Reservas, torneos, rankings y métricas — en una sola plataforma para tu club.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Agente WhatsApp ────────────────────────────────────────────── */

function AgenteWApp() {
  return (
    <section className="py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal from="left">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-5"
                style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}35`, color: GREEN }}
              >
                Agente WhatsApp con IA
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Tu club atiende solo. <br />
                <span style={{ background: `linear-gradient(135deg,${GREEN},#7ec800)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Las 24 hs. Los 7 días.
                </span>
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                El bot de Padelero recibe reservas, consulta disponibilidad y confirma turnos por WhatsApp — sin que vos tengas que levantar el teléfono. Ni de día, ni de noche.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Reserva, cancela y consulta disponibilidad automáticamente',
                  'Responde en segundos, a cualquier hora del día',
                  'Gestiona múltiples canchas y horarios sin errores',
                  'Notifica al jugador con todos los detalles al instante',
                  'Libera slots cancelados y avisa a jugadores en lista de espera',
                ].map(t => (
                  <div key={t} className="flex items-start gap-3">
                    <CheckCircle2 size={16} style={{ color: GREEN }} className="flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-black px-7 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg"
                  style={{ background: GREEN, color: '#000', boxShadow: `0 4px 20px ${GREEN}33` }}
                >
                  <WhatsAppIcon className="w-4 h-4" /> Quiero esto para mi club
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal from="right" delay={80}>
            <div className="space-y-5">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] mb-4">
                <Image src="/landing/club-wapp-bot.jpg" alt="Reserva de pádel por WhatsApp" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 max-w-[280px] mx-auto">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${GREEN}20` }}>
                  <Zap size={14} style={{ color: GREEN }} />
                </div>
                <p className="text-xs text-zinc-400"><strong className="text-white">0 mensajes manuales</strong> — el bot manejó esta reserva solo.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Agenda y Reservas ──────────────────────────────────────────── */

function Agenda() {
  return (
    <section id="agenda" className="relative py-24 px-5 bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/landing/club-interior.jpg" alt="Interior de club de pádel" fill className="object-cover opacity-8" />
        <div className="absolute inset-0 bg-black/93" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Mock agenda */}
          <Reveal from="left">
            <div className="space-y-3">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <p className="font-bold text-white">Agenda · Jueves 20 Mar</p>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: `${GREEN}25`, color: GREEN }}>3 canchas</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { hora: '18:00', cancha: 'Cancha 1', jugador: 'Martín G. + 3', estado: 'confirmado', color: GREEN },
                    { hora: '18:00', cancha: 'Cancha 2', jugador: 'Disponible', estado: 'libre', color: '#27272a' },
                    { hora: '19:30', cancha: 'Cancha 1', jugador: 'Lucas M. + 3', estado: 'confirmado', color: GREEN },
                    { hora: '19:30', cancha: 'Cancha 2', jugador: 'Partido abierto · 2/4', estado: 'parcial', color: '#3b82f6' },
                    { hora: '19:30', cancha: 'Cancha 3', jugador: 'Facundo R. + 3', estado: 'confirmado', color: GREEN },
                    { hora: '21:00', cancha: 'Cancha 1', jugador: 'Turno fijo · Club Palmares', estado: 'fijo', color: '#a78bfa' },
                    { hora: '21:00', cancha: 'Cancha 2', jugador: 'Diego S. + 3', estado: 'confirmado', color: GREEN },
                  ].map(({ hora, cancha, jugador, estado, color }) => (
                    <div key={`${hora}-${cancha}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: '#27272a' }}>
                      <div className="flex-shrink-0 text-right w-10">
                        <p className="text-xs font-bold text-white">{hora}</p>
                      </div>
                      <div className="w-px h-6 bg-zinc-700 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase">{cancha}</p>
                        <p className="text-xs font-medium text-zinc-200 truncate">{jugador}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { v: '7/9', l: 'Canchas ocupadas', c: GREEN },
                  { v: '78%', l: 'Ocupación', c: GREEN },
                  { v: '2', l: 'Turnos fijos', c: '#a78bfa' },
                ].map(({ v, l, c }) => (
                  <div key={l} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 text-center">
                    <p className="text-lg font-black" style={{ color: c }}>{v}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{l}</p>
                  </div>
                ))}
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
                Reservas y Agenda
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Tu agenda, en piloto automático
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Configurás tus canchas, horarios y precios una sola vez. Padelero hace el resto: gestiona reservas, envía recordatorios y mantiene tu agenda actualizada al segundo.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Calendar, t: 'Configuración simple', d: 'Canchas, precios por horario y días disponibles en minutos.' },
                  { icon: Clock, t: 'Turnos fijos recurrentes', d: 'Jugadores con turno semanal se reservan automáticamente cada semana.' },
                  { icon: Bell, t: 'Recordatorios automáticos', d: 'El sistema avisa a los jugadores antes de su turno. Sin que hagas nada.' },
                  { icon: Activity, t: 'Disponibilidad en tiempo real', d: 'Todos ven los slots libres al instante. Nadie te llama para preguntar.' },
                ].map(({ icon: Icon, t, d }) => (
                  <div key={t} className="flex gap-3 p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-all">
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Partidos ───────────────────────────────────────────────────── */

function Partidos() {
  return (
    <section id="partidos" className="relative py-24 px-5 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/landing/partidos-activos.jpg" alt="Partidos activos en club de pádel" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}35`, color: GREEN }}
            >
              Partidos
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              Más partidos = <span style={{ color: GREEN }}>más ingresos</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Los jugadores arman sus propios partidos en Padelero. Cada partido organizado es una cancha vendida — sin que vos hagas nada.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {[
            {
              tipo: 'Partido Abierto',
              icon: Users,
              color: GREEN,
              bg: `${GREEN}20`,
              badge: 'Más popular',
              badgeBg: `${GREEN}25`,
              badgeColor: GREEN,
              desc: 'Un jugador crea el partido y los restantes se anotan solos desde la app. La cancha se llena sola.',
              detalle: ['Lucía R. · 5ta', 'Juan P. · 5ta', '2 lugares disponibles →'],
            },
            {
              tipo: 'Partido Privado',
              icon: Shield,
              color: '#60a5fa',
              bg: '#3b82f620',
              badge: 'Invitación',
              badgeBg: '#3b82f620',
              badgeColor: '#60a5fa',
              desc: 'El creador elige quiénes juegan. Ideal para grupos de amigos que quieren reservar juntos.',
              detalle: ['Marcos V. · 4ta', 'Diego R. · 4ta', 'Nicolás P. · 4ta', 'Matías G. · 4ta'],
            },
            {
              tipo: 'Por Categoría',
              icon: Target,
              color: '#fb923c',
              bg: '#f9731620',
              badge: 'Filtrado',
              badgeBg: '#f9731620',
              badgeColor: '#fb923c',
              desc: 'Se filtra por nivel. Solo jugadores de la categoría indicada pueden sumarse al partido.',
              detalle: ['Solo 6ta Caballeros', 'Andrés G. · 6.2', '3 lugares disponibles →'],
            },
          ].map(({ tipo, icon: Icon, color, bg, badge, badgeBg, badgeColor, desc, detalle }, i) => (
            <Reveal key={tipo} delay={i * 80}>
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-zinc-600 transition-colors h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: bg }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: badgeBg, color: badgeColor }}>{badge}</span>
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{tipo}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">{desc}</p>
                <div className="space-y-1.5 p-3 rounded-xl bg-black/40 border border-white/5">
                  {detalle.map((d, j) => (
                    <p key={j} className="text-[11px]" style={{ color: j === detalle.length - 1 ? color : '#d4d4d8' }}>{d}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="rounded-3xl p-8 text-center" style={{ background: `${GREEN}10`, border: `1px solid ${GREEN}28` }}>
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[
                { v: '+40%', l: 'más reservas en clubes digitalizados' },
                { v: '3x', l: 'más partidos por semana que sin app' },
                { v: '∞', l: 'canchas llenas de forma orgánica' },
              ].map(({ v, l }) => (
                <div key={v} className="text-center">
                  <p className="text-3xl font-black" style={{ color: GREEN }}>{v}</p>
                  <p className="text-zinc-400 text-xs mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Torneos teaser ─────────────────────────────────────────────── */

function TorneosTeaser() {
  return (
    <section id="torneos" className="py-10 px-5 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Link
            href="/torneos"
            className="group relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-center hover:scale-[1.01] transition-transform duration-300 block"
          >
            <div className="relative w-full md:w-[420px] aspect-[16/9] md:aspect-[4/3] flex-shrink-0">
              <Image src="/landing/torneo-accion.png" alt="Sistema de torneos Padelero" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900 md:hidden" />
            </div>
            <div className="flex-1 bg-zinc-900 border border-zinc-800 group-hover:border-[#C8F542]/30 transition-colors md:rounded-r-3xl md:-ml-1 p-8 md:p-10 w-full">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-5"
                style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}35`, color: GREEN }}
              >
                <Trophy className="w-3 h-3" /> Sistema de Torneos
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
                Organizá torneos sin<br />Excel ni papel
              </h2>
              <p className="text-zinc-400 mb-6 leading-relaxed text-sm md:text-base">
                Creá torneos, gestioná inscripciones, cargá resultados y observá ascensos — todo desde el panel de organizador. Brackets automáticos, puntos calculados al instante.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-7">
                {[
                  { v: '9', l: 'Categorías' },
                  { v: '2', l: 'Formatos de juego' },
                  { v: '∞', l: 'Circuitos anuales' },
                  { v: '1 clic', l: 'Para ascender' },
                ].map(({ v, l }) => (
                  <div key={l} className="bg-black/40 rounded-xl p-3 text-center border border-white/5">
                    <p className="text-lg font-black" style={{ color: GREEN }}>{v}</p>
                    <p className="text-[10px] text-zinc-500">{l}</p>
                  </div>
                ))}
              </div>
              <div
                className="inline-flex items-center gap-2 font-black px-6 py-3 rounded-xl transition-colors"
                style={{ background: GREEN, color: '#000' }}
              >
                Ver sistema completo de torneos <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Ranking ────────────────────────────────────────────────────── */

function Ranking() {
  const players = [
    { rank: 1, name: 'Marcos V.', pts: 340, cat: '5ta', club: true },
    { rank: 2, name: 'Lucía R.', pts: 290, cat: '5ta', club: true },
    { rank: 3, name: 'Diego S.', pts: 260, cat: '5ta', club: false },
    { rank: 4, name: 'Facundo A.', pts: 220, cat: '5ta', club: true },
    { rank: 5, name: 'Valentina P.', pts: 190, cat: '5ta', club: false },
  ];

  return (
    <section id="ranking" className="relative py-24 px-5 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0">
        <Image src="/landing/club-ranking-board.jpg" alt="Ranking board en club de pádel" fill className="object-cover opacity-10" />
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
                Rankings
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Tus jugadores compiten. <br />
                <span style={{ background: `linear-gradient(135deg,${GREEN},#7ec800)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Tu club retiene.
                </span>
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                El ranking es el motor de retención. Jugadores que siguen su posición vuelven más seguido, participan en más torneos y reservan más canchas.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: Building2, t: 'Ranking del club', d: 'Quién lidera la competencia interna de tu club, por categoría y género.' },
                  { icon: TrendingUp, t: 'Ranking global Argentina', d: 'Tus jugadores compiten contra toda la plataforma nacional.' },
                  { icon: Star, t: 'Sistema "Observado"', d: 'Marcás a un jugador como candidato a ascenso. Aparece en su perfil público.' },
                  { icon: Activity, t: 'Actualización automática', d: 'Cada resultado de torneo actualiza los rankings en tiempo real, sin carga manual.' },
                ].map(({ icon: Icon, t, d }) => (
                  <div key={t} className="flex gap-3 p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-all">
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
              <Link
                href="/torneos#ranking"
                className="inline-flex items-center gap-2 font-bold text-sm"
                style={{ color: GREEN }}
              >
                Ver cómo funciona el ranking completo <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>

          {/* Mock */}
          <Reveal from="right" delay={100}>
            <div className="space-y-3">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-white">Ranking · 5ta categoría</p>
                </div>
                <div className="flex gap-2 mb-5 flex-wrap">
                  {['Club Arena', 'General ARG', '5ta', 'Caballeros'].map((f, i) => (
                    <span
                      key={f}
                      className="text-[11px] font-bold px-3 py-1 rounded-full"
                      style={i === 0 ? { background: GREEN, color: '#000' } : { background: '#27272a', color: '#71717a' }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="space-y-3.5">
                  {players.map(({ rank, name, pts, cat, club }) => {
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
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-white truncate">{name}</p>
                            {club && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${GREEN}25`, color: GREEN }}>tu club</span>
                            )}
                          </div>
                          <p className="text-[10px] text-zinc-500">{cat}</p>
                        </div>
                        <p className="text-base font-black" style={{ color: GREEN }}>{pts} pts</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black" style={{ color: GREEN }}>3/5</p>
                  <p className="text-xs text-zinc-400 mt-1">jugadores del top 5 son de tu club</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black text-amber-400">↑ 12%</p>
                  <p className="text-xs text-zinc-400 mt-1">más reservas por jugadores con ranking</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Métricas ───────────────────────────────────────────────────── */

function Metricas() {
  return (
    <section id="metricas" className="relative py-24 px-5 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/landing/club-admin-dashboard.jpg" alt="Admin revisando métricas del club" fill className="object-cover opacity-12" />
        <div className="absolute inset-0 bg-black/90" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Mock dashboard */}
          <Reveal from="left">
            <div className="space-y-3">
              {/* KPIs */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Ocupación hoy', value: '78%', sub: '+12% vs sem. ant.', color: GREEN, icon: Activity },
                  { label: 'Ingresos del mes', value: '$1.24M', sub: '+8% vs mes ant.', color: '#60a5fa', icon: DollarSign },
                  { label: 'Jugadores activos', value: '89', sub: '23 reservaron esta semana', color: '#fb923c', icon: Users },
                  { label: 'Reservas hoy', value: '14', sub: '3 pendientes de confirmar', color: '#a78bfa', icon: Calendar },
                ].map(({ label, value, sub, color, icon: Icon }) => (
                  <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={13} style={{ color }} />
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wide">{label}</p>
                    </div>
                    <p className="text-2xl font-black text-white">{value}</p>
                    <p className="text-[10px] mt-1" style={{ color }}>{sub}</p>
                  </div>
                ))}
              </div>

              {/* Occupancy by time slot */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Ocupación por horario · esta semana</p>
                <div className="space-y-2.5">
                  {[
                    { hora: '08:00 — 10:00', pct: 35, label: 'Baja' },
                    { hora: '10:00 — 14:00', pct: 62, label: 'Media' },
                    { hora: '17:00 — 19:00', pct: 88, label: 'Alta' },
                    { hora: '19:00 — 21:30', pct: 97, label: 'Pico', peak: true },
                    { hora: '21:30 — 23:00', pct: 71, label: 'Media-alta' },
                  ].map(({ hora, pct, peak }) => (
                    <div key={hora} className="flex items-center gap-3">
                      <span className="text-[10px] text-zinc-500 w-28 flex-shrink-0">{hora}</span>
                      <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: peak ? GREEN : '#52525b' }}
                        />
                      </div>
                      <span className="text-[10px] font-black w-8 text-right" style={{ color: peak ? GREEN : '#71717a' }}>{pct}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-zinc-600 mt-3">🔑 Horario 19-21:30 genera el 54% de tus ingresos semanales.</p>
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
                Métricas
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Tomá decisiones con <br />
                <span style={{ background: `linear-gradient(135deg,${GREEN},#7ec800)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  datos reales
                </span>
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                ¿Cuál es tu cancha más rentable? ¿Qué horario siempre está lleno? ¿Cuánto facturaste este mes? Padelero te lo muestra en tiempo real, sin planillas.
              </p>
              <div className="space-y-3">
                {[
                  'Ocupación por cancha, horario y día de la semana',
                  'Ingresos del mes y comparativa vs mes anterior',
                  'Jugadores más activos y top reservadores',
                  'Torneos: inscriptos, ingresos y resultado por categoría',
                  'Alertas cuando un horario pico queda libre',
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

/* ─── Onboarding ─────────────────────────────────────────────────── */

function Onboarding() {
  return (
    <section className="py-24 px-5 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}35`, color: GREEN }}
            >
              Cómo empezar
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              Arrancás en <span style={{ color: GREEN }}>24 horas</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-lg mx-auto">
              Sin curva de aprendizaje. Sin IT. Sin meses de implementación.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 relative">
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px" style={{ background: `${GREEN}20` }} />
          {[
            {
              n: '01',
              icon: MessageCircle,
              title: 'Nos contactás',
              desc: 'Mandanos un WhatsApp. En menos de 24 hs configuramos tus canchas, horarios y precios en la plataforma.',
              color: GREEN,
              bg: `${GREEN}20`,
            },
            {
              n: '02',
              icon: Zap,
              title: 'Tu bot empieza a atender',
              desc: 'El agente de WhatsApp ya está activo. Tus jugadores reservan solos. Vos no movés un dedo.',
              color: '#60a5fa',
              bg: '#3b82f620',
            },
            {
              n: '03',
              icon: TrendingUp,
              title: 'Tu club crece',
              desc: 'Torneos, rankings, partidos y métricas. Todos los jugadores en un solo lugar, tu negocio con datos reales.',
              color: '#a78bfa',
              bg: '#a78bfa20',
            },
          ].map(({ n, icon: Icon, title, desc, color, bg }) => (
            <Reveal key={n} delay={parseInt(n) * 80}>
              <div className="flex flex-col items-center text-center p-6 relative">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center border-2 mb-5 relative z-10"
                  style={{ borderColor: color, background: bg }}
                >
                  <Icon size={28} style={{ color }} />
                  <span
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
                    style={{ background: color, color: '#000' }}
                  >
                    {n}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 text-center">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-black text-lg px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-2xl"
              style={{ background: GREEN, color: '#000', boxShadow: `0 8px 40px ${GREEN}40` }}
            >
              <WhatsAppIcon className="w-5 h-5" /> Empezar ahora <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── CTA final ──────────────────────────────────────────────────── */

function CTA() {
  return (
    <section className="relative py-36 px-5 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/landing/club-exterior-golden.jpg" alt="Club de pádel al atardecer en Buenos Aires" fill className="object-cover object-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/65 to-black" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: `${GREEN}10` }} />
      <div className="relative max-w-2xl mx-auto text-center">
        <Reveal>
          <div>
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: `${GREEN}25`, border: `1px solid ${GREEN}40` }}>
              <Building2 size={28} style={{ color: GREEN }} />
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[.92] tracking-tight">
              Tu club merece <br />
              <span style={{ background: `linear-gradient(135deg,${GREEN},#7ec800,${GREEN})`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 4s linear infinite' }}>
                la mejor herramienta
              </span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl mb-10">
              Sin costo de implementación. Sin permanencia. En 24 hs estás operando.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 font-black text-lg px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-2xl"
                style={{ background: GREEN, color: '#000', boxShadow: `0 8px 40px ${GREEN}40` }}
              >
                <WhatsAppIcon className="w-5 h-5" /> Consultá por tu club <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href={APP}
                className="flex items-center justify-center gap-2 border border-zinc-600 text-white font-semibold text-lg px-10 py-4 rounded-2xl hover:border-zinc-400 hover:bg-white/5 transition-all"
              >
                Ver la plataforma
              </Link>
            </div>
            <p className="text-zinc-600 text-sm mt-8">🇦🇷 Ya son más de 12 clubes usando Padelero en Argentina.</p>
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
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">La plataforma de pádel en Argentina. Reservas, torneos, rankings y comunidad en un solo lugar.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-[.15em]">Para Clubes</h4>
            <div className="space-y-2.5 text-sm text-zinc-400">
              <a href="#agenda" className="block hover:text-white transition-colors">Reservas y Agenda</a>
              <a href="#partidos" className="block hover:text-white transition-colors">Partidos</a>
              <a href="#torneos" className="block hover:text-white transition-colors">Torneos</a>
              <a href="#ranking" className="block hover:text-white transition-colors">Rankings</a>
              <a href="#metricas" className="block hover:text-white transition-colors">Métricas</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-[.15em]">Contacto</h4>
            <div className="space-y-2.5 text-sm text-zinc-400">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">WhatsApp +54 9 2324 549325</a>
              <a href="mailto:padeleroapp@gmail.com" className="block hover:text-white transition-colors">padeleroapp@gmail.com</a>
              <a href="https://instagram.com/padeleroapp" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">@padeleroapp</a>
              <Link href="/" className="block hover:text-white transition-colors">Inicio</Link>
              <Link href="/torneos" className="block hover:text-white transition-colors" style={{ color: GREEN }}>Sistema de Torneos</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <span>© 2026 Padelero. Todos los derechos reservados.</span>
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

export default function ClubesLanding() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Nav />
      <Hero />
      <Dolor />
      <AgenteWApp />
      <Agenda />
      <Partidos />
      <TorneosTeaser />
      <Ranking />
      <Metricas />
      <Onboarding />
      <CTA />
      <Footer />
      <style>{`@keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}`}</style>
    </div>
  );
}
