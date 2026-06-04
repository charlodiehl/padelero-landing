'use client';

/**
 * Roadmap público · padelero.app/mejoras
 *
 * Feed de mejoras propuestas por la comunidad con votos. Cualquiera puede
 * votar (anónimo con fingerprint). Botón "Sugerí una mejora" abre el
 * ChatBot embebido.
 */

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lightbulb,
  Bug,
  HelpCircle,
  AlertTriangle,
  Sparkles,
  Bot,
  Rocket,
  ChevronUp,
  Menu,
  X,
  type LucideIcon,
} from 'lucide-react';
import { TicketForm } from '@/components/help-widget/TicketForm';

const API_BASE = 'https://app.padelero.app';
const APP = 'https://app.padelero.app';
const GREEN = '#C8F542';

interface RoadmapItem {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'duda' | 'bug' | 'idea' | 'urgente' | 'sin_clasificar';
  estado: 'en_inbox' | 'en_progreso' | 'resuelto';
  votos: number;
  created_at: string;
}

type Filtro = 'todos' | 'en_inbox' | 'en_progreso' | 'resuelto';

const ESTADO_LABEL: Record<RoadmapItem['estado'], string> = {
  en_inbox: 'En consideración',
  en_progreso: 'En progreso',
  resuelto: 'Lanzado',
};

const ESTADO_COLOR: Record<RoadmapItem['estado'], string> = {
  en_inbox: '#a78bfa',
  en_progreso: GREEN,
  resuelto: '#34d399',
};

// Iconos propios (lucide) por tipo — mismo set que usa el resto de la app
// y la landing, en vez de emojis genéricos.
const TIPO_ICON: Record<RoadmapItem['tipo'], { Icon: LucideIcon; color: string }> = {
  bug: { Icon: Bug, color: '#f87171' },
  idea: { Icon: Lightbulb, color: GREEN },
  duda: { Icon: HelpCircle, color: '#60a5fa' },
  urgente: { Icon: AlertTriangle, color: '#fb923c' },
  sin_clasificar: { Icon: Sparkles, color: 'rgba(255,255,255,0.55)' },
};

// Fingerprint simple: hash del navigator + screen + timezone. No es
// privado pero suficiente para evitar doble voto desde un browser.
function getFingerprint(): string {
  if (typeof window === 'undefined') return 'ssr';
  const cached = localStorage.getItem('padelero_fp');
  if (cached) return cached;
  const raw = [
    navigator.userAgent,
    navigator.language,
    `${screen.width}x${screen.height}`,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    Math.random().toString(36).slice(2, 10),
  ].join('|');
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  const fp = `fp_${Math.abs(hash).toString(36)}_${Date.now().toString(36)}`;
  localStorage.setItem('padelero_fp', fp);
  return fp;
}

/* ─── Nav (mismo patrón que /torneos) ──────────────────────────────── */

function Nav() {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links: [string, string][] = [
    ['/', 'Inicio'],
    ['/torneos', 'Torneos'],
    ['/pro', 'Pro'],
    ['/nosotros', 'Nosotros'],
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        sc ? 'bg-black/85 backdrop-blur-2xl border-b border-white/5 shadow-lg shadow-black/40' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Padelero" width={26} height={26} className="rounded-md" />
            <span className="font-black text-white text-lg tracking-tight">Padelero</span>
          </Link>
          <span className="hidden md:block text-zinc-600">/</span>
          <span className="hidden md:flex items-center gap-1.5 text-sm font-bold" style={{ color: GREEN }}>
            <Lightbulb size={13} /> Mejoras
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {links.map(([h, l]) => (
            <Link
              key={h}
              href={h}
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
            >
              {l}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href={`${APP}/login`}
            className="text-zinc-400 hover:text-white text-sm px-3 py-1.5 transition-colors"
          >
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

        <button className="md:hidden text-zinc-300 hover:text-white" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 px-5 pb-5">
          {links.map(([h, l]) => (
            <Link
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className="block text-zinc-200 py-2.5 border-b border-zinc-800/60 last:border-0 font-medium"
            >
              {l}
            </Link>
          ))}
          <div className="pt-3 space-y-2">
            <Link
              href={`${APP}/login`}
              className="block w-full text-center border border-zinc-700 text-white py-3 rounded-xl font-semibold"
            >
              Ingresar
            </Link>
            <Link
              href={`${APP}/register`}
              className="block w-full text-center py-3 rounded-xl font-black"
              style={{ background: GREEN, color: '#000' }}
            >
              Empezar gratis
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function RoadmapPage() {
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [voted, setVoted] = useState<Set<string>>(new Set());
  const [showChat, setShowChat] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/tickets/roadmap`);
      const data = await res.json();
      setItems(data.tickets || []);
      // Recuperar votos previos del localStorage
      const cached = localStorage.getItem('padelero_voted');
      if (cached) {
        try {
          setVoted(new Set(JSON.parse(cached)));
        } catch {}
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const vote = async (id: string) => {
    if (voted.has(id)) return;
    const fingerprint = getFingerprint();
    try {
      const res = await fetch(`${API_BASE}/api/tickets/${id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fingerprint }),
      });
      const data = await res.json();
      if (res.ok) {
        setItems((prev) =>
          prev.map((it) => (it.id === id ? { ...it, votos: data.votos } : it))
        );
        const newVoted = new Set(voted);
        newVoted.add(id);
        setVoted(newVoted);
        localStorage.setItem(
          'padelero_voted',
          JSON.stringify(Array.from(newVoted))
        );
      }
    } catch {
      // best-effort
    }
  };

  const filtered =
    filtro === 'todos' ? items : items.filter((i) => i.estado === filtro);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <Nav />

      {/* Header / Hero con imagen de IA */}
      <header
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderBottom: `1px solid ${GREEN}1f`,
          isolation: 'isolate',
        }}
      >
        {/* Imagen de fondo generada con IA */}
        <Image
          src="/landing/roadmap-agentes.jpg"
          alt="Agentes de IA construyendo el logo de Padelero"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center 42%',
            zIndex: -2,
          }}
        />
        {/* Overlays para legibilidad del texto */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.72) 55%, #0a0a0a 100%)',
          }}
        />
        <div
          style={{
            maxWidth: 980,
            margin: '0 auto',
            padding: '104px 20px 44px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(10,10,10,0.55)',
              backdropFilter: 'blur(4px)',
              border: `1px solid ${GREEN}55`,
              color: GREEN,
              padding: '6px 12px',
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            <Bot size={14} strokeWidth={2.5} />
            Construido por agentes de IA
          </div>
          <h1
            style={{
              fontSize: 38,
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.05,
              background: `linear-gradient(135deg, ${GREEN}, #7ec800)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Roadmap
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 15,
              marginTop: 12,
              marginBottom: 0,
              maxWidth: 600,
              lineHeight: 1.55,
              textShadow: '0 1px 12px rgba(0,0,0,0.6)',
            }}
          >
            Padelero lo codean agentes de IA: vos mandás tu mejora, el equipo de
            agentes la analiza y la puede construir sin agencia ni esperas
            eternas. Mientras más votos junta una idea, antes la atacamos.
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 13,
              marginTop: 8,
              marginBottom: 0,
              maxWidth: 600,
              textShadow: '0 1px 12px rgba(0,0,0,0.6)',
            }}
          >
            Abierto a jugadores, clubes, dueños, profes — cualquiera puede
            proponer.
          </p>
        </div>
      </header>

      <div
        style={{ maxWidth: 980, margin: '0 auto', padding: '24px 20px 80px' }}
      >
        {/* CTA + filtros */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['todos', 'en_inbox', 'en_progreso', 'resuelto'] as Filtro[]).map(
              (f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFiltro(f)}
                  style={{
                    background:
                      filtro === f ? GREEN : 'rgba(255,255,255,0.05)',
                    color: filtro === f ? '#0a0a0a' : '#fff',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '8px 14px',
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {f === 'todos'
                    ? 'Todos'
                    : ESTADO_LABEL[f as RoadmapItem['estado']]}
                </button>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowChat((s) => !s)}
            style={{
              background: GREEN,
              color: '#0a0a0a',
              border: 'none',
              padding: '10px 18px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {showChat ? 'Cerrar' : '+ Sugerí una mejora'}
          </button>
        </div>

        {/* Form embebido */}
        {showChat && (
          <div style={{ marginBottom: 24, maxWidth: 600 }}>
            <TicketForm
              source="landing"
              apiBase={API_BASE}
              needsContact
              onSuccess={() => {
                setTimeout(() => {
                  fetchItems();
                  setShowChat(false);
                }, 2500);
              }}
            />
          </div>
        )}

        {/* Lista */}
        {loading && (
          <div
            style={{
              padding: 60,
              textAlign: 'center',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            Cargando…
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div
            style={{
              padding: '50px 24px',
              textAlign: 'center',
              border: `1px dashed ${GREEN}33`,
              borderRadius: 14,
              background: `${GREEN}06`,
            }}
          >
            <div style={{ marginBottom: 14, display: 'flex', justifyContent: 'center' }}>
              <Rocket size={40} color={GREEN} strokeWidth={1.5} />
            </div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: '#fff',
                marginBottom: 6,
              }}
            >
              {filtro === 'todos'
                ? 'El roadmap está esperando tu idea'
                : 'Nada en esta categoría todavía'}
            </div>
            <div
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.55)',
                maxWidth: 380,
                margin: '0 auto 18px',
                lineHeight: 1.5,
              }}
            >
              Sé el primero en proponer algo. Los agentes van a leerlo y, si
              suma votos, lo construimos.
            </div>
            <button
              type="button"
              onClick={() => setShowChat(true)}
              style={{
                background: GREEN,
                color: '#0a0a0a',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              + Sugerí la primera mejora
            </button>
          </div>
        )}

        <div style={{ display: 'grid', gap: 12 }}>
          {filtered.map((it) => {
            const isVoted = voted.has(it.id);
            const { Icon: TipoIcon, color: tipoColor } = TIPO_ICON[it.tipo];
            return (
              <div
                key={it.id}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12,
                  padding: 16,
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                {/* Vote button */}
                <button
                  type="button"
                  onClick={() => vote(it.id)}
                  disabled={isVoted}
                  style={{
                    minWidth: 56,
                    padding: '8px 4px',
                    background: isVoted
                      ? `${GREEN}22`
                      : 'rgba(255,255,255,0.05)',
                    border: isVoted
                      ? `1px solid ${GREEN}`
                      : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10,
                    color: isVoted ? GREEN : '#fff',
                    cursor: isVoted ? 'default' : 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <ChevronUp size={18} strokeWidth={2.5} />
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {it.votos}
                  </span>
                </button>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      marginBottom: 6,
                      flexWrap: 'wrap',
                    }}
                  >
                    <TipoIcon size={18} color={tipoColor} strokeWidth={2} />
                    <span
                      style={{
                        fontSize: 10,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        padding: '3px 8px',
                        borderRadius: 999,
                        background: `${ESTADO_COLOR[it.estado]}22`,
                        color: ESTADO_COLOR[it.estado],
                        fontWeight: 700,
                      }}
                    >
                      {ESTADO_LABEL[it.estado]}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      margin: 0,
                      marginBottom: 4,
                    }}
                  >
                    {it.titulo}
                  </h3>
                  {it.descripcion && it.descripcion !== it.titulo && (
                    <p
                      style={{
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.65)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {it.descripcion.slice(0, 240)}
                      {it.descripcion.length > 240 ? '…' : ''}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
