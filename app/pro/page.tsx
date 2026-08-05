'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const IMG = {
  hero: '/landing/pro-hero.jpg',
  nightCourts: '/landing/pro-night-courts.jpg',
  clubOwner: '/landing/pro-club-owner.jpg',
};
import {
  Sparkles, ArrowRight, MessageCircle, CheckCircle2,
  Menu, X, Home, Trophy, Zap, Megaphone, Users, Heart,
  Repeat, ShieldCheck, RefreshCw, TrendingUp, GraduationCap,
  Building2, Calendar, Brain, Gauge, Cog,
  type LucideIcon,
} from 'lucide-react';
import { alfa } from '@/lib/color';

const GREEN = 'hsl(var(--primary))';
const WA = 'https://wa.me/5492324549325';
const WA_MSG = (clubName = '') =>
  `${WA}?text=${encodeURIComponent(
    clubName
      ? `Hola Carlos! Soy de ${clubName}. Quiero saber más sobre Padelero Pro.`
      : 'Hola Carlos! Quiero saber más sobre Padelero Pro para mi club.'
  )}`;

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

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(28px)',
        transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Nav() {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${sc ? 'bg-background/85 backdrop-blur-2xl border-b border-foreground/5 shadow-lg shadow-scrim/40' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="font-wordmark text-foreground text-3xl leading-none">Padelero</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/torneos" className="flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-lg transition-all hover:bg-primary/10" style={{ color: GREEN }}>
            <Trophy size={14} /> Torneos
          </Link>
          <Link href="/clubes" className="flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-lg transition-all hover:bg-primary/10" style={{ color: GREEN }}>
            <Home size={14} /> Clubes
          </Link>
          <Link href="/pro" className="flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-lg bg-primary/10" style={{ color: GREEN }}>
            <Sparkles size={14} /> Padelero Pro
          </Link>
          <Link href="/nosotros" className="flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-lg transition-all hover:bg-primary/10" style={{ color: GREEN }}>
            <Users size={14} /> Nosotros
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link href="https://app.padelero.app/login" className="text-muted-foreground hover:text-foreground text-sm px-3 py-1.5 transition-colors">Ingresar</Link>
          <Link href="https://app.padelero.app/register" className="bg-primary text-primary-foreground text-sm font-bold px-5 py-2 rounded-xl hover:bg-primary-hover transition-all hover:scale-105 shadow-md shadow-primary/20">
            Empezar gratis
          </Link>
        </div>
        <button className="md:hidden text-foreground-subtle hover:text-foreground" onClick={() => setOpen(v => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-foreground/5 px-5 pb-5">
          <Link href="/torneos" onClick={() => setOpen(false)} className="block py-2.5 border-b border-border/60 font-bold" style={{ color: GREEN }}>🏆 Torneos</Link>
          <Link href="/clubes" onClick={() => setOpen(false)} className="block py-2.5 border-b border-border/60 font-bold" style={{ color: GREEN }}>🏠 Clubes</Link>
          <Link href="/pro" onClick={() => setOpen(false)} className="block py-2.5 border-b border-border/60 font-bold" style={{ color: GREEN }}>✨ Padelero Pro</Link>
          <Link href="/nosotros" onClick={() => setOpen(false)} className="block py-2.5 border-b border-border/60 font-bold" style={{ color: GREEN }}>🚀 Nosotros</Link>
          <div className="pt-3 space-y-2">
            <Link href="https://app.padelero.app/login" className="block w-full text-center border border-border-strong text-foreground py-3 rounded-xl font-semibold">Ingresar</Link>
            <Link href="https://app.padelero.app/register" className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-xl font-bold">Empezar gratis</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

interface Tool {
  icon: React.ComponentType<{ className?: string }>;
  emoji: string;
  title: string;
  desc: string;
  example: string;
}

const TOOLS: Tool[] = [
  { icon: Zap,            emoji: '⚡', title: 'Promo Flash',                desc: 'Detecta turnos que van a quedar vacíos y lanza promo con cupo limitado a tu base.', example: 'Jueves 14hs sin reservas → "20% off, primeros 2"' },
  { icon: Megaphone,      emoji: '📣', title: 'Promos segmentadas',         desc: 'WhatsApp a jugadores según su comportamiento: frecuentes, casuales, inactivos, nuevos.', example: 'Inactivos 30+ días: "25% off esta semana"' },
  { icon: Users,          emoji: '🎾', title: 'Cancha abierta automática',  desc: 'Llena turnos sueltos con jugadores compatibles del club que buscan partido.', example: 'Sábado 21hs queda 1 cancha → arma 4 jugadores nivel 5' },
  { icon: Heart,          emoji: '🤝', title: 'Match Maker',                 desc: 'Sugiere partidos amistosos entre jugadores que ya jugaron juntos antes.', example: '"Pedro, te invitamos a jugar con Juan el sábado 18hs"' },
  { icon: RefreshCw,      emoji: '💌', title: 'Recuperar inactivos',         desc: 'Detecta jugadores que dejaron de venir 30+ días y los reactiva con incentivo personalizado.', example: 'Mensaje cálido + 30% off válido 1 semana' },
  { icon: Sparkles,       emoji: '🎁', title: 'Incentivos personalizados',   desc: 'Descuentos quirúrgicos a jugadores específicos según su comportamiento histórico.', example: 'VIP que dejó de venir → cupón personalizado' },
  { icon: Repeat,         emoji: '🔄', title: 'Convertir tráfico en favoritos', desc: 'A los jugadores que ya jugaron en tu club pero no te tienen como favorito, los invita a marcarte.', example: '"Jugaste hace 60 días — ¿querés que te avisemos las promos?"' },
  { icon: ShieldCheck,    emoji: '✅', title: 'Anti no-show',                desc: 'Confirmación proactiva 4hs antes. Libera el slot si el jugador no puede venir.', example: 'No responde → reasigna a lista de espera' },
  { icon: Repeat,         emoji: '🔁', title: 'Reagendado automático',       desc: 'Convierte cancelaciones en reservas reprogramadas. No perdés la facturación.', example: '"Te perdés martes — ¿te sirve miércoles?"' },
  { icon: TrendingUp,     emoji: '📈', title: 'Pricing inteligente',         desc: 'Surge en horarios saturados, descuento en flojos. Con piso y techo configurables.', example: 'Viernes 21hs +15% · Martes 14hs -20%' },
  { icon: GraduationCap,  emoji: '📚', title: 'Llenar clases',                desc: 'Avisa a alumnos potenciales cuando hay cupo en clases con profesores.', example: '"Hay 1 lugar miércoles 18hs con Profe Juan"' },
  { icon: Building2,      emoji: '🏢', title: 'Referidos entre clubes',      desc: 'Si traés otro club que activa Pro, ganás 1% de su facturación mensual por 12 meses.', example: '5 clubes referidos × $5M GMV → +$25k/mes' },
];

export default function ProPage() {
  const [gmv, setGmv] = useState(5_000_000);
  // ── Calculadora ROI versión "vendedora" — número anual gigante ────
  // Asume +20% mensual conservador. En el modelo de créditos el costo es por
  // uso (centavos por acción), no una cuota fija — el número grande es el
  // crecimiento bruto que genera el agente.
  const CRECIMIENTO_PCT = 20;
  const crecimientoMensual = Math.round((gmv * CRECIMIENTO_PCT) / 100);
  const crecimientoAnual = crecimientoMensual * 12;
  // Desglose narrado del mes 1 — herramientas ACTUALES.
  const breakdown = {
    promoFlash: Math.round(gmv * 0.05),
    recuperar: Math.round(gmv * 0.05),
    llenarCanchas: Math.round(gmv * 0.04),
    torneoExtra: Math.round(gmv * 0.04),
    antiNoShow: Math.round(gmv * 0.02),
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-5 overflow-hidden">
        {/* Imagen de fondo (cancha en la pampa con hologramas) */}
        <div className="absolute inset-0">
          <Image
            src={IMG.hero}
            alt="Padelero Pro — cancha de pádel en la pampa argentina con visualizaciones IA"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
        </div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6 text-sm font-bold uppercase tracking-widest" style={{ color: GREEN }}>
              <Sparkles className="w-4 h-4" /> Padelero Pro
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[.95] mb-6 tracking-tight">
              Tu club que <span style={{ background: `linear-gradient(135deg, ${GREEN}, hsl(var(--brand-deep)))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>crece solo</span><br />con inteligencia artificial.
            </h1>
            <p className="text-base sm:text-lg text-foreground-subtle max-w-2xl mx-auto mb-3 leading-relaxed">
              Padelero gratis te da todo lo que tienen las otras apps. <strong className="text-foreground">Con Pro</strong>, activás un agente de IA que vende más turnos vacíos, recupera jugadores perdidos y sube tu facturación mes a mes — desde el mismo WhatsApp que ya usás.
            </p>
            <p className="text-sm text-muted-foreground/70 mb-10 italic">
              Sin app extra. Sin número nuevo. Sin instalación.
            </p>
          </Reveal>

          <Reveal delay={150}>
            {/* Precio — modelo de créditos */}
            <div className="inline-flex flex-col items-center gap-1 mb-8 rounded-2xl border border-foreground/10 bg-foreground/5 px-6 py-4 max-w-md">
              <span className="text-3xl sm:text-4xl font-bold">Pagás por uso</span>
              <span className="text-sm text-foreground-subtle">Comprás créditos y el agente trabaja mientras tengas saldo</span>
              <span className="text-xs text-muted-foreground/70">Sin cuota fija ni % de tu facturación · cada acción cuesta centavos</span>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={WA_MSG()} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary text-foreground font-bold text-base px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-xl shadow-primary/20">
                <MessageCircle className="w-5 h-5" />
                Hablá con Carlos por WhatsApp
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#tools" className="inline-flex items-center justify-center gap-2 bg-foreground/5 border border-foreground/10 text-foreground font-semibold px-8 py-4 rounded-2xl hover:bg-foreground/10 transition-all">
                Ver qué hace el agente
              </a>
            </div>

            <p className="text-xs text-muted-foreground/70 italic mt-5">
              Carlos Diehl · Especialista en agentes de inteligencia artificial
            </p>
          </Reveal>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="relative py-20 px-5 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMG.nightCourts}
            alt="Canchas de pádel al aire libre con bordes verde lima de noche"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-3">¿Cómo funciona?</h2>
            <p className="text-muted-foreground text-center mb-14">3 pasos y tu club empieza a crecer solo.</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5 relative">
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
            {[
              { n: '01', icon: MessageCircle, t: 'Hablamos por WhatsApp', d: '15-20 min de conversación. Vemos tu club, tu facturación, tus horarios débiles. Configuramos los agentes según tu realidad.' },
              { n: '02', icon: Sparkles,      t: 'Activamos los agentes', d: 'Cada 6 horas, el agente analiza tus turnos, jugadores y facturación. Te propone acciones en el panel. Vos aprobás (o las dejás automáticas).' },
              { n: '03', icon: TrendingUp,    t: 'Tu facturación sube',    d: 'Los mensajes a tus jugadores salen del WhatsApp único de Padelero, identificados como tu club. Vos seguís operando normal.' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="relative w-20 h-20 rounded-full border-2 border-border-strong bg-card flex items-center justify-center mb-5">
                    <s.icon className="w-7 h-7 text-primary" />
                    <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{s.n}</span>
                  </div>
                  <h3 className="text-foreground font-bold text-lg mb-2">{s.t}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGRAMA DE AGENTES */}
      <section id="agentes" className="py-20 px-5 bg-gradient-to-b from-background via-background to-background">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                Arquitectura
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold mb-3 leading-tight">
                4 agentes especializados trabajando <span style={{ background: `linear-gradient(135deg, ${GREEN}, hsl(var(--brand-deep)))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>en serie</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Un <strong className="text-foreground">Cerebro</strong> planea, <strong className="text-foreground">3 Trabajadores</strong> ejecutan, un <strong className="text-foreground">Validador</strong> revisa antes de mandar nada al jugador.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <AgentDiagramLanding />
          </Reveal>

          {/* WORKERS DETALLE */}
          <div className="grid md:grid-cols-3 gap-5 mt-16">
            <WorkerCardLanding
              icon={Gauge}
              color="hsl(var(--primary))"
              title="Ocupación"
              subtitle="Llena canchas + ajusta precio"
              description="Detecta horarios flojos y los ataca con promo flash o ajuste de precio dentro de tu piso/techo."
              tools={['Promo Flash', 'Precio Dinámico']}
            />
            <WorkerCardLanding
              icon={Heart}
              color="hsl(var(--info))"
              title="Fidelización"
              subtitle="Cuida tus jugadores"
              description="Rescata jugadores que dejaron de venir, los incentiva con un beneficio y los saluda en su cumpleaños."
              tools={['Recuperar Inactivos', 'Incentivo Personalizado', 'Cumpleaños']}
            />
            <WorkerCardLanding
              icon={Megaphone}
              color="hsl(var(--warning))"
              title="Promoción"
              subtitle="Atrae nueva demanda"
              description="Crea cancha abierta cuando hay hueco, arma equipos compatibles, llena clases con cupo libre."
              tools={['Cancha Abierta', 'Match Maker', 'Llenar Clases']}
            />
          </div>

          {/* OPS BOX */}
          <Reveal delay={180}>
            <div className="mt-8 rounded-2xl border border-premium/30 bg-premium/5 p-6 md:p-8 grid md:grid-cols-[auto_1fr] gap-6 items-center">
              <div className="w-16 h-16 rounded-2xl bg-premium/20 border-2 border-premium/40 flex items-center justify-center flex-shrink-0">
                <Cog className="w-8 h-8 text-premium" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-premium">Trabajador Operaciones · reacciona a eventos</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Además del loop cada 6 horas, hay tareas que se disparan en tiempo real:
                </p>
                <div className="mt-3 grid sm:grid-cols-2 gap-3">
                  <div className="text-sm">
                    <span className="text-premium font-bold">🛡️ Anti No-Show.</span>{' '}
                    <span className="text-foreground-subtle">4h antes pide confirmación. Si no, libera la cancha automáticamente.</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-premium font-bold">🔁 Reagendado Auto.</span>{' '}
                    <span className="text-foreground-subtle">Cuando alguien cancela, le ofrece 3 horarios alternativos antes de soltar el slot.</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* MODOS */}
          <Reveal delay={240}>
            <div className="mt-12">
              <h3 className="text-center text-lg font-bold text-foreground-subtle mb-6">Vos decidís el nivel de autonomía por cada herramienta</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-border-strong bg-card/50 p-5 text-center">
                  <div className="text-4xl mb-3">🔴</div>
                  <h4 className="font-bold text-base mb-1">Apagado</h4>
                  <p className="text-xs text-muted-foreground">La herramienta está desactivada. El agente nunca la usa.</p>
                </div>
                <div className="rounded-2xl border border-warning/40 bg-warning/5 p-5 text-center">
                  <div className="text-4xl mb-3">🟡</div>
                  <h4 className="font-bold text-base mb-1 text-warning">Sugerir</h4>
                  <p className="text-xs text-muted-foreground">Propone y vos aprobás. Por defecto el primer mes.</p>
                </div>
                <div className="rounded-2xl border border-primary/40 bg-primary/5 p-5 text-center">
                  <div className="text-4xl mb-3">🟢</div>
                  <h4 className="font-bold text-base mb-1 text-primary">Auto-seguro</h4>
                  <p className="text-xs text-muted-foreground">Ejecuta solo, siempre pasando por el validador crítico.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                Las 12 capacidades
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold mb-3 leading-tight">
                Todo lo que hace el agente <span style={{ background: `linear-gradient(135deg, ${GREEN}, hsl(var(--brand-deep)))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>por vos</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Cada acción está pensada para una situación específica. El agente las combina según tu club lo necesita.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS.map((t, i) => (
              <Reveal key={t.title} delay={i * 30}>
                <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-5 hover:bg-foreground/10 transition-colors h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{t.emoji}</div>
                    <h3 className="font-bold text-base">{t.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t.desc}</p>
                  <p className="text-[11px] text-primary/80 italic mt-3 border-t border-foreground/5 pt-3">
                    Ej: {t.example}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULADORA — versión vendedora · número anual gigante */}
      <section className="py-20 bg-background/80 px-5">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-3 py-1 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                Tu plata real
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold mb-3 leading-tight">
                Cuánto <span style={{ background: `linear-gradient(135deg, ${GREEN}, hsl(var(--brand-deep)))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>se mete</span> tu club por año
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                Moviendo el slider con tu facturación mensual ves cuánto te dejamos extra a vos en 12 meses.
                Estimado conservador <strong className="text-foreground">(+20% mensual)</strong> sobre clubes argentinos reales.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border-2 border-foreground/10 bg-gradient-to-br from-foreground/[0.03] via-primary/[0.02] to-foreground/[0.03] p-6 sm:p-10 space-y-6">
              {/* Slider GMV */}
              <div>
                <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Tu facturación mensual por Padelero:</span>
                  <span className="text-2xl sm:text-3xl font-bold tabular-nums">${gmv.toLocaleString('es-AR')}</span>
                </div>
                <input
                  type="range"
                  min={500_000}
                  max={20_000_000}
                  step={100_000}
                  value={gmv}
                  onChange={(e) => setGmv(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground/70 mt-1">
                  <span>$500k</span>
                  <span>$5M</span>
                  <span>$20M</span>
                </div>
              </div>

              {/* DISPLAY GIGANTE — número anual */}
              <div className="rounded-3xl border-2 p-6 md:p-10 text-center relative overflow-hidden border-primary/50 bg-gradient-to-br from-primary/20 via-primary/15 to-primary/5 shadow-2xl shadow-primary/10">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-10 left-1/4 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: `hsl(var(--primary) / 0.314)` }} />
                  <div className="absolute -bottom-10 right-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
                </div>
                <div className="relative">
                  <div className="text-[10px] uppercase tracking-widest font-bold mb-3 flex items-center justify-center gap-2" style={{ color: GREEN }}>
                    <Sparkles className="w-3.5 h-3.5" />
                    Lo que el agente te genera de más
                  </div>
                  <div className="text-5xl md:text-7xl font-bold tabular-nums leading-none drop-shadow-2xl" style={{ color: GREEN }}>
                    +${crecimientoAnual.toLocaleString('es-AR')}
                  </div>
                  <div className="text-xl md:text-2xl font-extrabold text-foreground mt-3">
                    por año
                  </div>
                  <div className="text-sm text-foreground-subtle mt-4 max-w-xl mx-auto">
                    Estimado conservador: <strong className="text-foreground">+20% de crecimiento mensual</strong> sobre tu facturación. Son{' '}
                    <strong style={{ color: GREEN }}>+${crecimientoMensual.toLocaleString('es-AR')}/mes</strong>. El agente <strong className="text-foreground">se paga solo</strong> con créditos por uso.
                  </div>
                </div>
              </div>

              {/* CASO NARRADO mes 1 */}
              <div className="rounded-2xl border border-foreground/10 bg-background/30 p-5 sm:p-6 space-y-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-bold mb-1">
                    Lo que pasa típicamente · mes 1
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-foreground">
                    De dónde sale ese{' '}
                    <span style={{ color: GREEN }}>+${crecimientoMensual.toLocaleString('es-AR')}</span>{' '}
                    de crecimiento
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Estimación basada en clubes argentinos mid-size. Tu caso puede variar arriba o abajo.
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { emoji: '⚡', label: 'Promo flash llena slots vacíos', detail: '~14 slots non-peak rescatados / mes', amount: breakdown.promoFlash },
                    { emoji: '💌', label: 'Recuperar jugadores inactivos', detail: '~28 jugadores que dejaron de venir vuelven', amount: breakdown.recuperar },
                    { emoji: '🎾', label: 'Cancha abierta + match maker', detail: 'Arma equipos compatibles y llena los huecos', amount: breakdown.llenarCanchas },
                    { emoji: '🏆', label: 'Torneo automático extra', detail: '32 jug × $25k inscripción (segmentado por nivel)', amount: breakdown.torneoExtra },
                    { emoji: '✅', label: 'Anti no-show', detail: 'Confirma turnos 4h antes y recupera cancelaciones', amount: breakdown.antiNoShow },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-3 py-1">
                      <div className="text-base flex-shrink-0">{row.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground">{row.label}</div>
                        <div className="text-[11px] text-muted-foreground/70">{row.detail}</div>
                      </div>
                      <div className="text-sm font-bold tabular-nums flex-shrink-0" style={{ color: GREEN }}>
                        +${row.amount.toLocaleString('es-AR')}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-foreground/10 pt-3 flex items-center justify-between">
                  <div className="text-sm font-semibold text-foreground">Crecimiento total mes 1</div>
                  <div className="text-xl font-extrabold tabular-nums" style={{ color: GREEN }}>
                    +${crecimientoMensual.toLocaleString('es-AR')}
                  </div>
                </div>
                <div className="rounded-xl bg-primary/5 border border-primary/20 p-3">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Sin cuota fija ni % de tu facturación.</strong> El agente se paga con créditos por uso: cada acción cuesta centavos. Cargás el saldo que quieras y recargás cuando se agota.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* VOS sin Pro vs Vos con Pro */}
          <Reveal delay={200}>
            <div className="mt-10 rounded-3xl border-2 border-foreground/10 bg-card/40 overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-foreground/10">
                <h3 className="font-bold text-xl sm:text-2xl text-foreground">
                  Vos sin Pro <span className="text-muted-foreground/70">·</span> Vos con Pro
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Lo que cambia el día que activás el agente.
                </p>
              </div>
              <div className="divide-y divide-foreground/5">
                {[
                  { task: 'Marketing por WhatsApp',  before: 'Mandás manual cuando te acordás (5-8h/sem)', after: 'Auto. Cada acción pasa por validador antes.' },
                  { task: 'Recuperar inactivos',     before: 'Nada o muy poco. Se van y no vuelven.',       after: 'Auto. 28 rescates/mes con mensaje personalizado.' },
                  { task: 'Cancha abierta',          before: 'Llenás a ~70%, manualmente',                  after: 'Match maker arma equipos compatibles, llenás al 100%.' },
                  { task: 'Torneos',                 before: '2/finde a 75% de llenado · o delegás al 80% a externo',  after: 'Match maker llena al 100% · capturás el 100% de la comisión.' },
                  { task: 'Clases con cupo libre',   before: 'Quedan vacías o las regalás',                  after: 'Auto. Invita al segmento ideal del club.' },
                  { task: 'Precios',                 before: 'Fijo todo el año. Plata sobre la mesa.',       after: 'Surge en peak, descuento en flojo. Piso/techo configurables.' },
                  { task: 'Decisiones de gestión',   before: 'A "ojímetro". No sabés qué funciona.',        after: 'Reflexión semanal automatizada con learnings.' },
                ].map((row, i) => (
                  <div key={i} className="px-6 sm:px-8 py-4 grid grid-cols-1 sm:grid-cols-[180px_1fr_1fr] gap-2 sm:gap-4 items-start">
                    <div className="text-sm font-bold text-foreground">{row.task}</div>
                    <div className="flex items-start gap-2 text-xs">
                      <X className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground/70 line-through">{row.before}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: GREEN }} />
                      <span className="text-foreground-subtle font-medium">{row.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Costo de inacción */}
          <Reveal delay={300}>
            <div className="mt-6 rounded-2xl border-2 border-destructive/30 bg-destructive/[0.05] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-destructive/15 grid place-items-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-base text-foreground">Cada mes que esperás cuesta plata</div>
                  <p className="text-sm text-foreground-subtle mt-1 leading-relaxed">
                    Si esperás 6 meses para activar Pro, son{' '}
                    <strong className="text-destructive tabular-nums">−${(crecimientoMensual * 6).toLocaleString('es-AR')}</strong>{' '}
                    que el agente te hubiera dejado en el bolsillo. La competencia que active antes te lleva ventaja en data y diferenciación.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TORNEOS · EL CASO MÁS GRANDE */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/30 rounded-full px-3 py-1 text-warning text-xs font-bold uppercase tracking-widest mb-4">
                🏆 El caso más grande
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold mb-3 leading-tight">
                Los torneos son <span className="text-warning">$6,4 millones/mes</span><br className="hidden sm:block"/> que hoy se te escapan
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                Datos típicos de clubes argentinos mid-size: 2 torneos por fin de semana,
                32 jugadores cada uno, $25.000 de inscripción.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            {/* La cuenta del mercado */}
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-5 sm:p-6 mb-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-bold">Torneos</div>
                  <div className="text-2xl sm:text-3xl font-bold tabular-nums mt-1 text-foreground">8/mes</div>
                  <div className="text-[11px] text-muted-foreground/70 mt-1">2 por finde</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-bold">Jugadores</div>
                  <div className="text-2xl sm:text-3xl font-bold tabular-nums mt-1 text-foreground">32</div>
                  <div className="text-[11px] text-muted-foreground/70 mt-1">por torneo</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-bold">Inscripción</div>
                  <div className="text-2xl sm:text-3xl font-bold tabular-nums mt-1 text-foreground">$25k</div>
                  <div className="text-[11px] text-muted-foreground/70 mt-1">por jugador</div>
                </div>
                <div className="bg-warning/10 rounded-xl py-2 -my-2">
                  <div className="text-[10px] uppercase tracking-widest text-warning font-bold">Potencial</div>
                  <div className="text-2xl sm:text-3xl font-bold text-warning tabular-nums mt-1">$6,4M</div>
                  <div className="text-[11px] text-muted-foreground/70 mt-1">por mes</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              {/* Sin Pro */}
              <div className="rounded-2xl border-2 border-destructive/30 bg-destructive/[0.06] p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <X className="w-5 h-5 text-destructive" />
                  <h3 className="font-bold text-base text-foreground">Hoy sin Pro</h3>
                </div>
                <ul className="space-y-3 text-sm text-foreground-subtle">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive flex-shrink-0 mt-0.5">•</span>
                    <div>
                      <strong className="text-foreground">~25% no se llenan completos.</strong>
                      <div className="text-xs text-muted-foreground/70 mt-0.5">
                        Quedan 4-8 cupos vacíos por torneo · $200k+ que dejás en la mesa
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive flex-shrink-0 mt-0.5">•</span>
                    <div>
                      <strong className="text-foreground">O delegás al organizador externo.</strong>
                      <div className="text-xs text-muted-foreground/70 mt-0.5">
                        Te llevás solo el 20% de la inscripción · el 80% se va afuera
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive flex-shrink-0 mt-0.5">•</span>
                    <div>
                      <strong className="text-foreground">Mucho tiempo armando convocatorias.</strong>
                      <div className="text-xs text-muted-foreground/70 mt-0.5">
                        4-6h por torneo entre WhatsApp, listas y categorías
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-destructive/20 text-center">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-bold">Te quedás con</div>
                  <div className="text-3xl font-bold text-destructive tabular-nums mt-1">~$960k/mes</div>
                  <div className="text-[11px] text-muted-foreground/70 mt-1">si delegás al 80%</div>
                </div>
              </div>

              {/* Con Pro */}
              <div
                className="rounded-2xl border-2 p-5 sm:p-6 relative overflow-hidden shadow-2xl"
                style={{
                  borderColor: `hsl(var(--primary) / 0.4)`,
                  background: `linear-gradient(135deg, hsl(var(--primary) / 0.082), hsl(var(--primary) / 0.02), transparent)`,
                  boxShadow: `0 25px 50px -12px hsl(var(--primary) / 0.102)`,
                }}
              >
                <div className="absolute -top-10 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `hsl(var(--primary) / 0.188)` }} />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5" style={{ color: GREEN }} />
                    <h3 className="font-bold text-base text-foreground">Con Padelero Pro</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-foreground-subtle">
                    <li className="flex items-start gap-2">
                      <span style={{ color: GREEN }} className="flex-shrink-0 mt-0.5">•</span>
                      <div>
                        <strong className="text-foreground">Match Maker llena al 100%.</strong>
                        <div className="text-xs text-muted-foreground/70 mt-0.5">
                          Detecta jugadores compatibles y los invita por WhatsApp segmentado
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: GREEN }} className="flex-shrink-0 mt-0.5">•</span>
                      <div>
                        <strong className="text-foreground">Capturás el 100% de la comisión.</strong>
                        <div className="text-xs text-muted-foreground/70 mt-0.5">
                          El agente reemplaza al organizador externo · te quedás con todo
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: GREEN }} className="flex-shrink-0 mt-0.5">•</span>
                      <div>
                        <strong className="text-foreground">+ 1 torneo extra/mes automático.</strong>
                        <div className="text-xs text-muted-foreground/70 mt-0.5">
                          Segmentado por nivel · armado y promocionado solo
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t text-center" style={{ borderColor: `hsl(var(--primary) / 0.2)` }}>
                    <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: GREEN }}>Te quedás con</div>
                    <div className="text-3xl font-bold tabular-nums mt-1" style={{ color: GREEN }}>~$7,2M/mes</div>
                    <div className="text-[11px] text-muted-foreground/70 mt-1">capturando el 100%</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div
              className="mt-5 rounded-2xl border-2 p-5 sm:p-6 text-center shadow-2xl"
              style={{
                borderColor: `hsl(var(--primary) / 0.4)`,
                background: `linear-gradient(135deg, hsl(var(--primary) / 0.145), hsl(var(--primary) / 0.082), hsl(var(--primary) / 0.02))`,
                boxShadow: `0 25px 50px -12px hsl(var(--primary) / 0.102)`,
              }}
            >
              <div className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2">
                💰 Solo de torneos, si hoy delegás al 80%
              </div>
              <div className="text-4xl md:text-6xl font-bold tabular-nums" style={{ color: GREEN }}>
                +$6.240.000 / mes
              </div>
              <div className="text-sm text-foreground-subtle mt-3 max-w-xl mx-auto">
                Eso son <strong className="text-foreground">+$74.880.000/año</strong> que hoy se van
                afuera del club. Con Pro, se quedan en tu bolsillo (menos el costo del Pro,
                que se paga solo varias veces).
              </div>
            </div>
          </Reveal>

          <p className="text-[11px] text-muted-foreground/70 text-center mt-4 italic max-w-2xl mx-auto">
            Si vos hoy organizás los torneos sin delegar, el agente igual te ayuda a llenarlos al
            100% (+$1,6M/mes) y a hacer un torneo extra cada mes (+$800k). Cualquier caso,
            convertís lo que hoy es esfuerzo en plata.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-12">Preguntas frecuentes</h2>
          </Reveal>
          <div className="space-y-3">
            {[
              { q: '¿Cómo se cobra?', a: 'Por transferencia o Mercado Pago, a mes vencido. Te facturamos el plan + 3% del GMV del mes anterior. Si cancelás antes de que pase un mes completo, solo pagás el % del tiempo activo.' },
              { q: '¿Necesito un WhatsApp nuevo?', a: 'No. El agente Pro habla con tus jugadores desde el mismo número de Padelero que ya usás. Cada mensaje arranca con "Te escribimos de parte de {tu club}" para que sepan que sos vos.' },
              { q: '¿Cómo controlo lo que dice el agente?', a: 'Primer mes el agente está en modo "Sugerir": te propone acciones, vos aprobás antes de mandar. Después podés pasar a "Automático seguro" con guardrails (precio piso/techo, máximo de promos por semana).' },
              { q: '¿Y si no me sirve?', a: 'Cancelás cuando quieras, sin penalidad. Toda la plataforma sigue gratis — perdés solo los agentes Pro.' },
              { q: '¿Qué cuenta como GMV para el 3%?', a: 'Toda la facturación que pasa por Padelero: reservas via app, turnos fijos y caja (cuando está conectada). El cálculo es transparente — lo ves en tu panel cada mes.' },
              { q: '¿Cuánto se demora en activar?', a: 'Una vez que hablamos por WhatsApp y configuramos juntos: 24 horas. El agente empieza a trabajar al día siguiente.' },
              { q: '¿A los jugadores no les molesta recibir mensajes?', a: 'Solo le mandamos a jugadores que tienen tu club marcado como favorito (= dieron opt-in implícito). Y respetamos un máximo de 2 mensajes por jugador por semana entre todos los clubes que use Padelero. Anti-spam por diseño.' },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 50}>
                <details className="rounded-xl border border-foreground/10 bg-foreground/5 p-4">
                  <summary className="cursor-pointer font-bold text-sm">{f.q}</summary>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-20 px-5 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMG.clubOwner}
            alt="Dueño de un club de pádel en la pampa argentina, atardecer"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <Reveal>
            <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 to-card/60 backdrop-blur-sm p-8 sm:p-12 text-center space-y-6">
              <Sparkles className="w-12 h-12 mx-auto" style={{ color: GREEN }} />
              <h3 className="text-2xl sm:text-3xl font-bold">
                ¿Activamos Padelero Pro en tu club?
              </h3>
              <p className="text-sm sm:text-base text-foreground-subtle max-w-md mx-auto">
                Te escribo por WhatsApp. Conocemos tu club juntos y, si cierra, configuramos los agentes. Empiezan a trabajar al día siguiente.
              </p>
              <a href={WA_MSG()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary text-foreground font-bold text-base px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-xl shadow-primary/20">
                <MessageCircle className="w-5 h-5" />
                wa.me/2324549325
                <ArrowRight size={18} />
              </a>
              <p className="text-xs text-muted-foreground italic">
                Carlos Diehl · Especialista en agentes de IA
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="border-t border-foreground/5 py-10 px-5 text-center text-xs text-muted-foreground/70">
        <Link href="/" className="hover:text-foreground">← Volver a Padelero</Link>
        <p className="mt-3">© {new Date().getFullYear()} Padelero · Argentina 🇦🇷</p>
      </footer>
    </div>
  );
}

// Calendar is imported but unused in this file — keep TS happy
void Calendar;

/* ── DIAGRAMA DE AGENTES ─────────────────────────────────────────────── */

function AgentDiagramLanding() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Orchestrator */}
      <div className="flex justify-center">
        <div className="rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent px-6 py-4 shadow-xl shadow-primary/10 text-center min-w-[240px]">
          <div className="flex items-center justify-center gap-2">
            <Brain className="h-5 w-5" style={{ color: GREEN }} />
            <span className="font-bold text-base text-foreground">Cerebro</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">Planea tareas cada 6 horas</div>
          <div className="text-[10px] text-muted-foreground/70 mt-0.5 uppercase tracking-wider">Claude Sonnet</div>
        </div>
      </div>

      {/* Conector */}
      <div className="flex justify-center my-2">
        <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-surface-3" />
      </div>

      {/* Línea horizontal + 3 workers */}
      <div className="relative">
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[66%] h-px bg-surface-3" />
        <div className="hidden md:flex justify-around absolute top-0 left-[16%] right-[16%]">
          <div className="w-px h-4 bg-surface-3" />
          <div className="w-px h-4 bg-surface-3" />
          <div className="w-px h-4 bg-surface-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 pt-4 md:pt-6">
          <MiniWorker icon={Gauge} color="hsl(var(--primary))" name="Ocupación" hint="Llena canchas vacías" />
          <MiniWorker icon={Heart} color="hsl(var(--info))" name="Fidelización" hint="Cuida jugadores" />
          <MiniWorker icon={Megaphone} color="hsl(var(--warning))" name="Promoción" hint="Atrae demanda" />
        </div>
      </div>

      {/* Workers → Validator */}
      <div className="flex justify-center my-2 mt-4">
        <div className="w-px h-8 bg-gradient-to-b from-surface-3 to-premium/60" />
      </div>

      {/* Validator */}
      <div className="flex justify-center">
        <div className="rounded-2xl border-2 border-premium/50 bg-gradient-to-br from-premium/15 via-premium/5 to-transparent px-6 py-4 shadow-xl shadow-premium/10 text-center min-w-[280px]">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="h-5 w-5 text-premium" />
            <span className="font-bold text-base text-foreground">Validador</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">Reglas estrictas + IA crítica</div>
          <div className="text-[10px] text-muted-foreground/70 mt-0.5 uppercase tracking-wider">Aprueba o rechaza</div>
        </div>
      </div>

      {/* Validator → Acción */}
      <div className="flex justify-center my-2">
        <div className="w-px h-8 bg-gradient-to-b from-premium/60 to-primary/60" />
      </div>

      {/* Acciones */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-primary/50 bg-gradient-to-r from-primary/20 to-primary/10 px-5 py-2 shadow-md">
          <Zap className="h-4 w-4 text-primary fill-primary/30" />
          <span className="font-bold text-sm text-primary">Acciones ejecutadas</span>
        </div>
      </div>
    </div>
  );
}

function MiniWorker({ icon: Icon, color, name, hint }: { icon: LucideIcon; color: string; name: string; hint: string }) {
  return (
    <div
      className="rounded-2xl border-2 p-4 shadow-sm transition-all hover:shadow-md bg-foreground/5"
      style={{ borderColor: alfa(color, 25) }}
    >
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-xl grid place-items-center shadow-inner flex-shrink-0"
          style={{ backgroundColor: alfa(color, 15), border: `2px solid ${alfa(color, 31)}` }}
        >
          <Icon className="h-5 w-5" style={{ color }} aria-hidden />
        </div>
        <div>
          <div className="font-bold text-sm text-foreground">{name}</div>
          <div className="text-[11px] text-muted-foreground leading-tight">{hint}</div>
        </div>
      </div>
    </div>
  );
}

function WorkerCardLanding({
  icon: Icon, color, title, subtitle, description, tools,
}: {
  icon: LucideIcon; color: string; title: string; subtitle: string;
  description: string; tools: string[];
}) {
  return (
    <div
      className="rounded-2xl border-2 p-5 bg-foreground/5 backdrop-blur-sm transition-all hover:bg-foreground/[0.07]"
      style={{ borderColor: alfa(color, 25) }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="h-12 w-12 rounded-xl grid place-items-center"
          style={{ backgroundColor: alfa(color, 15), border: `2px solid ${alfa(color, 31)}` }}
        >
          <Icon className="h-6 w-6" style={{ color }} aria-hidden />
        </div>
        <div>
          <h3 className="font-bold text-base text-foreground">{title}</h3>
          <p className="text-[11px] text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <p className="text-sm text-foreground-subtle leading-relaxed">{description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tools.map((t) => (
          <span
            key={t}
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md"
            style={{ backgroundColor: alfa(color, 12), color, border: `1px solid ${alfa(color, 25)}` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
