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
import { ChatBot } from '@/components/help-widget/ChatBot';

const API_BASE = 'https://app.padelero.app';
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

const TIPO_EMOJI: Record<RoadmapItem['tipo'], string> = {
  bug: '🐛',
  idea: '💡',
  duda: '❓',
  urgente: '🔥',
  sin_clasificar: '✨',
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
      {/* Header */}
      <header
        style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          maxWidth: 980,
          margin: '0 auto',
        }}
      >
        <Link
          href="/"
          style={{
            color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
            fontSize: 13,
            display: 'inline-block',
            marginBottom: 12,
          }}
        >
          ← Volver al inicio
        </Link>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            margin: 0,
            background: `linear-gradient(135deg, ${GREEN}, #7ec800)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Roadmap
        </h1>
        <p
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 15,
            marginTop: 8,
            marginBottom: 0,
            maxWidth: 600,
          }}
        >
          Mejoras que la comunidad pidió. Votá las que más te gustan o sumá tu
          idea — vamos atacando las que más votos juntan.
        </p>
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
            {showChat ? 'Cerrar chat' : '+ Sugerí una mejora'}
          </button>
        </div>

        {/* Chat embebido */}
        {showChat && (
          <div style={{ marginBottom: 24, maxWidth: 600 }}>
            <ChatBot
              source="landing"
              apiBase={API_BASE}
              height={520}
              forceContact
              onTicketCreated={() => {
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
              padding: 60,
              textAlign: 'center',
              color: 'rgba(255,255,255,0.4)',
              border: '1px dashed rgba(255,255,255,0.1)',
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>💭</div>
            <div style={{ fontSize: 14 }}>
              Todavía no hay mejoras públicas {filtro !== 'todos' && 'en esta categoría'}.
            </div>
            <div style={{ fontSize: 12, marginTop: 4 }}>
              ¡Mandá la primera!
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: 12 }}>
          {filtered.map((it) => {
            const isVoted = voted.has(it.id);
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
                  <span style={{ fontSize: 14 }}>▲</span>
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
                    <span style={{ fontSize: 18 }}>{TIPO_EMOJI[it.tipo]}</span>
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
