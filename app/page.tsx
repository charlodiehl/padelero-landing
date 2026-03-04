'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar, Trophy, Users, MessageCircle, BarChart3,
  CheckCircle2, ArrowRight, Star, ChevronDown, Smartphone,
  Clock, Shield, TrendingUp, Menu, X,
} from 'lucide-react';

// ─── Imagen map ───────────────────────────────────────────────────────────────
const IMG = {
  hero:       '/landing/hero-pampa.jpg',       // 2: pampa sunset + bandera
  aerial:     '/landing/aerial-barrio.jpg',    // 1: vista aérea barrio porteño
  lifestyle:  '/landing/lifestyle-mates.jpg',  // 5: amigos post partido con mates
  clubInt:    '/landing/club-interior.jpg',    // 6: galpón industrial verde lima
  torneo:     '/landing/torneo-bracket.jpg',   // 3: torneo con bracket FAP
  rooftop:    '/landing/rooftop-ba.jpg',       // 4: cancha en rooftop CABA
  asado:      '/landing/asado-quincho.jpg',    // 7: cancha + asado quincho
  night:      '/landing/court-night.jpg',      // 8: noche con reflectores + bandera
};

// ─── Hooks ───────────────────────────────────────────────────────────────────
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

function useCounter(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let v = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [target, duration, active]);
  return count;
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, from = 'bottom', className = '' }: {
  children: React.ReactNode; delay?: number;
  from?: 'bottom' | 'left' | 'right'; className?: string;
}) {
  const { ref, inView } = useInView();
  const t: Record<string, string> = { bottom:'translateY(36px)', left:'translateX(-36px)', right:'translateX(36px)' };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : t[from],
      transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms`,
    }}>{children}</div>
  );
}

// ─── Stat ────────────────────────────────────────────────────────────────────
function Stat({ n, label, suffix='+', active }: { n:number; label:string; suffix?:string; active:boolean }) {
  const v = useCounter(n, 1600, active);
  return (
    <div className="text-center">
      <div className="text-4xl md:text-6xl font-black text-[#C8F542] tabular-nums">{v.toLocaleString('es-AR')}{suffix}</div>
      <div className="text-[11px] text-zinc-400 mt-2 font-bold uppercase tracking-[.2em]">{label}</div>
    </div>
  );
}

// ─── Feature card ─────────────────────────────────────────────────────────────
function Card({ icon:Icon, title, desc, delay }:{ icon:React.ElementType; title:string; desc:string; delay:number }) {
  return (
    <Reveal delay={delay}>
      <div className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-[#C8F542]/40 transition-all duration-300 hover:-translate-y-1 h-full">
        <div className="w-10 h-10 bg-[#C8F542]/15 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#C8F542]/25 transition-colors">
          <Icon className="w-5 h-5 text-[#C8F542]" />
        </div>
        <h3 className="text-white font-bold text-sm mb-1.5">{title}</h3>
        <p className="text-zinc-400 text-xs leading-relaxed">{desc}</p>
      </div>
    </Reveal>
  );
}

// ─── WhatsApp mockup ─────────────────────────────────────────────────────────
const MSGS = [
  { u:'user', t:'Quiero reservar una cancha para mañana', d:400 },
  { u:'bot',  t:'¡Hola! Para mañana tengo:\n• 19:00 hs — Cancha 1 · $20.000\n• 20:30 hs — Cancha 2 · $22.000\n¿Cuál te queda bien?', d:900 },
  { u:'user', t:'19:00 perfecto', d:1500 },
  { u:'bot',  t:'✅ *Reserva confirmada*\nMañana 19:00 hs · Cancha 1 · $20.000 🎾', d:2000 },
];
function WApp() {
  const { ref, inView } = useInView(.2);
  return (
    <div ref={ref} className="relative mx-auto max-w-[280px]">
      <div className="bg-[#111] rounded-[2.5rem] border-2 border-zinc-700 p-2.5 shadow-2xl">
        <div className="rounded-[2rem] overflow-hidden bg-[#0e1117]">
          <div className="bg-[#075E54] px-4 py-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#C8F542] rounded-full flex items-center justify-center text-black font-black text-xs">P</div>
            <div><div className="text-white text-xs font-bold">Padelero</div><div className="text-green-400 text-[10px]">en línea</div></div>
          </div>
          <div className="min-h-[300px] p-2.5 space-y-2">
            {MSGS.map((m,i) => (
              <div key={i} className={`flex ${m.u==='user'?'justify-end':'justify-start'}`}
                style={{ opacity:inView?1:0, transform:inView?'none':'translateY(6px)', transition:`opacity .4s ease ${m.d}ms, transform .4s ease ${m.d}ms` }}>
                <div className={`max-w-[88%] rounded-xl px-2.5 py-1.5 text-[10px] whitespace-pre-line leading-relaxed ${m.u==='user'?'bg-[#005C4B] text-white rounded-tr-none':'bg-[#202C33] text-zinc-100 rounded-tl-none'}`}>
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
      <div className="absolute -inset-6 bg-[#C8F542]/8 rounded-full blur-3xl -z-10 pointer-events-none" />
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${sc?'bg-black/85 backdrop-blur-2xl border-b border-white/5 shadow-lg shadow-black/40':''}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src="/logo.png" alt="Padelero" width={28} height={28} className="rounded-md" />
          <span className="font-black text-white text-xl tracking-tight">Padelero</span>
        </Link>
        <div className="hidden md:flex items-center gap-7">
          {[['#jugadores','Jugadores'],['#clubes','Clubes'],['#funciones','Funciones']].map(([h,l])=>(
            <a key={h} href={h} className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">{l}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link href="https://padelero.app/login" className="text-zinc-400 hover:text-white text-sm px-3 py-1.5 transition-colors">Ingresar</Link>
          <Link href="https://padelero.app/register" className="bg-[#C8F542] text-black text-sm font-bold px-5 py-2 rounded-xl hover:bg-[#d4ff4a] transition-all hover:scale-105 shadow-md shadow-[#C8F542]/20">
            Empezar gratis
          </Link>
        </div>
        <button className="md:hidden text-zinc-300 hover:text-white" onClick={()=>setOpen(v=>!v)}>
          {open?<X size={22}/>:<Menu size={22}/>}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 px-5 pb-5">
          {[['#jugadores','Jugadores'],['#clubes','Clubes'],['#funciones','Funciones']].map(([h,l])=>(
            <a key={h} href={h} onClick={()=>setOpen(false)} className="block text-zinc-200 py-2.5 border-b border-zinc-800/60 last:border-0 font-medium">{l}</a>
          ))}
          <div className="pt-3 space-y-2">
            <Link href="https://padelero.app/login" className="block w-full text-center border border-zinc-700 text-white py-3 rounded-xl font-semibold">Ingresar</Link>
            <Link href="https://padelero.app/register" className="block w-full text-center bg-[#C8F542] text-black py-3 rounded-xl font-black">Empezar gratis</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Landing ─────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsOn, setStatsOn] = useState(false);
  useEffect(()=>{
    const el = statsRef.current; if(!el) return;
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ setStatsOn(true); obs.disconnect(); } },{ threshold:.2 });
    obs.observe(el); return ()=>obs.disconnect();
  },[]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Nav />

      {/* ══ HERO — cancha en la Pampa con bandera ══════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMG.hero} alt="Cancha de pádel en la Pampa" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />
        </div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[#C8F542]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 mb-8 text-sm font-semibold text-white">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8F542] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8F542]" />
            </span>
            228+ jugadores activos en Argentina
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-[90px] font-black leading-[.92] mb-6 tracking-tight drop-shadow-2xl">
            <span className="block text-white">Tu pádel.</span>
            <span className="block mt-1" style={{ background:'linear-gradient(135deg,#C8F542 0%,#7ec800 60%,#C8F542 100%)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shimmer 4s linear infinite' }}>
              Sin fricción.
            </span>
          </h1>
          <p className="text-base md:text-xl text-zinc-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Reservá canchas en segundos, armá partidos, subí tu ranking y conectá con jugadores de tu nivel en todo el país.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://padelero.app/register" className="group flex items-center justify-center gap-2 bg-[#C8F542] text-black font-black text-base px-9 py-4 rounded-2xl hover:bg-[#d4ff4a] transition-all hover:scale-105 shadow-xl shadow-[#C8F542]/30">
              Empezar gratis <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#jugadores" className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white font-semibold text-base px-9 py-4 rounded-2xl hover:bg-white/20 transition-all">
              Ver cómo funciona
            </a>
          </div>
        </div>
        <a href="#stats" className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-1 text-white/40 hover:text-white/60 transition-colors" style={{ animation:'bounce 2s infinite' }}>
          <span className="text-[10px] uppercase tracking-[.3em]">Descubrí más</span>
          <ChevronDown size={15} />
        </a>
      </section>

      {/* ══ STATS — vista aérea barrio porteño ═════════════════════════════ */}
      <section id="stats" className="relative border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMG.aerial} alt="Club de pádel visto desde el aire" fill className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div ref={statsRef} className="relative max-w-3xl mx-auto px-5 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <Stat n={228}  label="Jugadores"  active={statsOn} />
          <Stat n={12}   label="Clubes"     active={statsOn} />
          <Stat n={1400} label="Reservas"   active={statsOn} />
          <Stat n={48}   label="Torneos"    active={statsOn} />
        </div>
      </section>

      {/* ══ JUGADORES — amigos con mates ════════════════════════════════════ */}
      <section id="jugadores" className="relative py-28 overflow-hidden">
        {/* Imagen de fondo suave */}
        <div className="absolute inset-0">
          <Image src={IMG.lifestyle} alt="Jugadores argentinos" fill className="object-cover opacity-10" />
          <div className="absolute inset-0 bg-black/90" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5">
          <Reveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-[#C8F542]/10 border border-[#C8F542]/20 rounded-full px-4 py-1 text-[#C8F542] text-xs font-bold uppercase tracking-widest mb-5">Para jugadores</div>
              <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                Todo lo que necesitás
                <span style={{ background:'linear-gradient(135deg,#C8F542,#7ec800)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}> para jugar más</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-lg mx-auto">Sin llamadas, sin esperas. Tu cancha a un mensaje de distancia.</p>
            </div>
          </Reveal>

          {/* Split: imagen + features */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <Reveal from="left">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <Image src={IMG.lifestyle} alt="Amigos jugando pádel en Argentina" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur border border-white/10 rounded-xl px-4 py-2">
                  <div className="text-[#C8F542] font-black text-lg">30 seg</div>
                  <div className="text-zinc-400 text-xs">para reservar tu cancha</div>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-3">
              <Card delay={0}   icon={Calendar}     title="Reservá en 30 segundos"   desc="Elegí club, cancha y horario desde el celu. Confirmación instantánea." />
              <Card delay={60}  icon={Users}         title="Armá el partido"           desc="Encontrá rivales de tu nivel e invitá amigos para completar parejas." />
              <Card delay={120} icon={Trophy}        title="Subí tu ranking"           desc="Jugá torneos, acumulá puntos y seguí tu progreso frente a tu ciudad." />
              <Card delay={180} icon={MessageCircle} title="WhatsApp 24/7"             desc="Reservá y cancelá directo por WhatsApp. El bot responde al instante." />
              <Card delay={240} icon={BellIcon}      title="Alertas de disponibilidad" desc="¿Se liberó un turno? Te avisamos antes que nadie para que no pierdas." />
              <Card delay={300} icon={Smartphone}    title="App instalable"            desc="En tu pantalla de inicio sin descargar nada. Rápida como una app nativa." />
            </div>
          </div>
        </div>
      </section>

      {/* ══ CÓMO FUNCIONA — 3 pasos ═════════════════════════════════════════ */}
      <section className="py-20 bg-zinc-950/80 px-5">
        <div className="max-w-5xl mx-auto">
          <Reveal><div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Reservar es así de fácil</h2>
            <p className="text-zinc-400">Tres pasos y estás en la cancha</p>
          </div></Reveal>
          <div className="grid md:grid-cols-3 gap-5 relative">
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-gradient-to-r from-transparent via-[#C8F542]/25 to-transparent" />
            {[
              { n:'01', icon:Smartphone,   t:'Abrí Padelero',    d:'Desde padelero.app o directo por WhatsApp. Sin descargar nada. Listo en 30 segundos.' },
              { n:'02', icon:Calendar,     t:'Elegí tu horario', d:'Mirá disponibilidad en tiempo real y elegí el turno que te queda bien.' },
              { n:'03', icon:CheckCircle2, t:'¡Listo!',          d:'Recibís confirmación al instante con todos los detalles. El turno es tuyo.' },
            ].map((s,i)=>(
              <Reveal key={i} delay={i*100}>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="relative w-18 h-18 rounded-full border-2 border-zinc-700 bg-zinc-900 flex items-center justify-center mb-5 w-20 h-20">
                    <s.icon className="w-7 h-7 text-[#C8F542]" />
                    <span className="absolute -top-1.5 -right-1.5 bg-[#C8F542] text-black text-[9px] font-black rounded-full w-5 h-5 flex items-center justify-center">{s.n}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{s.t}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHATSAPP DEMO ════════════════════════════════════════════════════ */}
      <section className="py-28 px-5 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal from="left">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#C8F542]/10 border border-[#C8F542]/20 rounded-full px-4 py-1 text-[#C8F542] text-xs font-bold uppercase tracking-widest mb-5">Agente WhatsApp con IA</div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Reservás sin <br />
                <span style={{ background:'linear-gradient(135deg,#C8F542,#7ec800)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>salir de WhatsApp</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">Mandá un mensaje a cualquier hora. En segundos tenés tu turno confirmado, cancelado o consultado. Sin hablar con nadie.</p>
              <div className="space-y-3 mb-8">
                {['Reserva y cancelación instantánea','Consulta horarios disponibles','Ver tus turnos activos','Disponible las 24 hs, los 7 días'].map(t=>(
                  <div key={t} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C8F542] flex-shrink-0" />
                    <span className="text-zinc-300 text-sm">{t}</span>
                  </div>
                ))}
              </div>
              <Link href="https://padelero.app/register" className="inline-flex items-center gap-2 bg-[#C8F542] text-black font-bold px-7 py-3.5 rounded-xl hover:bg-[#d4ff4a] transition-all hover:scale-105 shadow-lg shadow-[#C8F542]/20">
                Probalo gratis <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
          <Reveal from="right" delay={80}><WApp /></Reveal>
        </div>
      </section>

      {/* ══ CLUBES — galpón industrial ════════════════════════════════════════ */}
      <section id="clubes" className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMG.clubInt} alt="Club de pádel galpón porteño" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal from="left">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1 text-white text-xs font-bold uppercase tracking-widest mb-5">Para clubes</div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Digitalizá tu club. <br />
                  <span style={{ background:'linear-gradient(135deg,#C8F542,#7ec800)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>En 24 horas.</span>
                </h2>
                <p className="text-zinc-300 text-lg mb-8 leading-relaxed">Dejá de gestionar todo por WhatsApp. Padelero administra tu agenda, jugadores y torneos en un solo lugar.</p>
                <div className="space-y-3 mb-8">
                  {[
                    { icon:Calendar,     t:'Agenda automática',        d:'Canchas, horarios y precios configurados una vez.' },
                    { icon:MessageCircle,t:'Bot WhatsApp para tu club', d:'Asistente IA que responde reservas 24/7.' },
                    { icon:Trophy,       t:'Torneos sin Excel',         d:'Brackets automáticos con canchas optimizadas.' },
                    { icon:BarChart3,    t:'Métricas en tiempo real',   d:'Ocupación, ingresos y jugadores activos.' },
                  ].map((f,i)=>(
                    <Reveal key={f.t} delay={i*70}>
                      <div className="flex gap-3 p-3.5 bg-white/5 backdrop-blur border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#C8F542]/30 transition-all">
                        <div className="w-8 h-8 bg-[#C8F542]/15 rounded-lg flex items-center justify-center flex-shrink-0">
                          <f.icon className="w-4 h-4 text-[#C8F542]" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">{f.t}</div>
                          <div className="text-zinc-400 text-xs mt-0.5">{f.d}</div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <a href="mailto:hola@padelero.app" className="group inline-flex items-center gap-2 bg-[#C8F542] text-black font-black px-7 py-3.5 rounded-xl hover:bg-[#d4ff4a] transition-all hover:scale-105 shadow-xl shadow-[#C8F542]/20">
                  Quiero digitalizar mi club <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </Reveal>
            <Reveal from="right" delay={150}>
              <div className="grid grid-cols-2 gap-3 max-w-xs ml-auto">
                {[
                  { v:'0',   l:'llamadas manuales',  s:'Tu agenda se gestiona sola' },
                  { v:'24/7',l:'disponible',          s:'El bot nunca duerme' },
                  { v:'+40%',l:'más reservas',        s:'Promedio en clubes digitalizados' },
                  { v:'∞',   l:'torneos posibles',    s:'Brackets automáticos' },
                ].map(s=>(
                  <div key={s.l} className="bg-black/60 backdrop-blur border border-white/10 rounded-2xl p-4 text-center hover:border-[#C8F542]/30 transition-colors">
                    <div className="text-[#C8F542] font-black text-2xl mb-0.5">{s.v}</div>
                    <div className="text-white text-xs font-bold leading-tight">{s.l}</div>
                    <div className="text-zinc-500 text-[9px] mt-1">{s.s}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ TORNEOS — bracket con rooftop CABA ════════════════════════════════ */}
      <section className="py-24 px-5 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal from="left">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group">
                <Image src={IMG.torneo} alt="Torneo de pádel argentino" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur border border-white/10 rounded-xl px-4 py-2.5">
                  <div className="text-[#C8F542] font-black">Torneo de Primavera</div>
                  <div className="text-zinc-400 text-xs">Bracket automático · Padelero</div>
                </div>
              </div>
            </Reveal>
            <Reveal from="right" delay={100}>
              <div>
                <div className="inline-flex items-center gap-2 bg-[#C8F542]/10 border border-[#C8F542]/20 rounded-full px-4 py-1 text-[#C8F542] text-xs font-bold uppercase tracking-widest mb-5">Torneos</div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">Organizá torneos sin Excel ni papel</h2>
                <p className="text-zinc-400 mb-6 leading-relaxed">Cargás las parejas y Padelero arma los grupos, genera el bracket, asigna canchas y optimiza horarios para usar todas las canchas en paralelo.</p>
                {['Grupos automáticos por nivel','Bracket de fases visuales','Resultados en tiempo real para todos','Notificaciones a los participantes'].map(t=>(
                  <div key={t} className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C8F542] flex-shrink-0" />
                    <span className="text-zinc-300 text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ ROOFTOP CABA — vibe urbano ═════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMG.rooftop} alt="Cancha de pádel en rooftop Buenos Aires" fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1 text-white text-xs font-bold uppercase tracking-widest mb-6">Buenos Aires · Córdoba · Rosario</div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
              Padelero está donde<br />
              <span style={{ background:'linear-gradient(135deg,#C8F542,#7ec800)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>vos jugás</span>
            </h2>
            <p className="text-zinc-300 text-lg max-w-xl mx-auto mb-10">Desde una cancha en el conurbano hasta un rooftop en Palermo. La plataforma que conecta a todos los jugadores de Argentina.</p>
            <Link href="https://padelero.app/clubes" className="inline-flex items-center gap-2 border border-white/30 bg-white/5 backdrop-blur text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/15 transition-all">
              Ver todos los clubes <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ FUNCIONES — grid ════════════════════════════════════════════════════ */}
      <section id="funciones" className="py-20 px-5 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <Reveal><div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Todo incluido</h2>
            <p className="text-zinc-400">Una sola plataforma para jugadores y clubes</p>
          </div></Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon:Calendar,     l:'Reservas online' },
              { icon:Users,        l:'Partidos entre jugadores' },
              { icon:Trophy,       l:'Torneos y brackets' },
              { icon:TrendingUp,   l:'Ranking por nivel' },
              { icon:MessageCircle,l:'Agente IA en WhatsApp' },
              { icon:Clock,        l:'Turnos fijos recurrentes' },
              { icon:Shield,       l:'Notificaciones push' },
              { icon:BarChart3,    l:'Métricas para clubes' },
              { icon:Star,         l:'Reseñas de jugadores' },
            ].map((f,i)=>(
              <Reveal key={f.l} delay={i*40}>
                <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 hover:bg-zinc-800/70 transition-all">
                  <f.icon className="w-4 h-4 text-[#C8F542] flex-shrink-0" />
                  <span className="text-zinc-300 text-sm font-medium">{f.l}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NOCHE — cancha con reflectores y bandera ═══════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMG.night} alt="Cancha de pádel de noche en Argentina" fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5">
          <Reveal><div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">A cualquier hora, en cualquier cancha</h2>
            <p className="text-zinc-400 max-w-lg mx-auto">El agente de Padelero responde de noche, de madrugada o un domingo a las 7. Tu cancha no espera.</p>
          </div></Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name:'Agustín D.', role:'Jugador · Buenos Aires', text:'Antes llamaba al club y era un caos. Ahora reservo en 30 segundos por WhatsApp. No puedo creer que sea gratis.' },
              { name:'Gonzalo M.', role:'Admin de club · Córdoba',  text:'Padelero nos ahorró horas de gestión por semana. Los jugadores reservan solos y el sistema se encarga de todo.' },
              { name:'Lucía R.',   role:'Jugadora · Rosario',       text:'La función de buscar partidos es genial. Encontré gente de mi nivel para días que antes me quedaba sin rival.' },
            ].map((t,i)=>(
              <Reveal key={t.name} delay={i*80}>
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">{[1,2,3,4,5].map(j=><Star key={j} size={12} className="fill-[#C8F542] text-[#C8F542]" />)}</div>
                  <p className="text-zinc-300 text-sm leading-relaxed flex-1 mb-5">&quot;{t.text}&quot;</p>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-zinc-500 text-xs mt-0.5">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL — cancha con asado quincho ═══════════════════════════════ */}
      <section className="relative py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMG.asado} alt="Pádel y asado argentino" fill className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C8F542]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-5 text-center">
          <Reveal>
            <div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[.92] tracking-tight">
                Empezá a jugar <br />
                <span style={{ background:'linear-gradient(135deg,#C8F542,#7ec800,#C8F542)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shimmer 4s linear infinite' }}>hoy mismo</span>
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl mb-10">Gratis para jugadores. Sin tarjeta de crédito.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://padelero.app/register" className="group flex items-center justify-center gap-2 bg-[#C8F542] text-black font-black text-lg px-10 py-4 rounded-2xl hover:bg-[#d4ff4a] transition-all hover:scale-105 shadow-2xl shadow-[#C8F542]/25">
                  Crear cuenta gratis <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="mailto:hola@padelero.app" className="flex items-center justify-center border border-zinc-600 text-white font-semibold text-lg px-10 py-4 rounded-2xl hover:border-zinc-400 hover:bg-white/5 transition-all">
                  Contacto para clubes
                </a>
              </div>
              <p className="text-zinc-600 text-sm mt-8">🇦🇷 Ya somos 228+ jugadores. Unite a la comunidad.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
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
              <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-[.15em]">Producto</h4>
              <div className="space-y-2.5 text-sm text-zinc-400">
                <Link href="https://padelero.app/register" className="block hover:text-white transition-colors">Crear cuenta</Link>
                <Link href="https://padelero.app/login"    className="block hover:text-white transition-colors">Ingresar</Link>
                <a href="#funciones"   className="block hover:text-white transition-colors">Funciones</a>
                <a href="#clubes"      className="block hover:text-white transition-colors">Para clubes</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-[.15em]">Contacto</h4>
              <div className="space-y-2.5 text-sm text-zinc-400">
                <a href="mailto:hola@padelero.app" className="block hover:text-white transition-colors">hola@padelero.app</a>
                <a href="https://instagram.com/padeleroapp" className="block hover:text-white transition-colors">@padeleroapp</a>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
            <span>© 2025 Padelero. Todos los derechos reservados.</span>
            <div className="flex gap-6"><a href="#" className="hover:text-zinc-400 transition-colors">Términos</a><a href="#" className="hover:text-zinc-400 transition-colors">Privacidad</a></div>
          </div>
        </div>
      </footer>

      <style>{`@keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}`}</style>
    </div>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}
