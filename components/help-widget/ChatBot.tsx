'use client';

/**
 * ChatBot — chat conversacional reusable con el bot de soporte de Padelero.
 *
 * Se embebe en:
 *  - `/account/tickets` (app interna) → como panel embebido cuando el user
 *    hace click en "Nueva sugerencia".
 *  - `/mejoras` (landing) → como modal o panel cuando hacen click en
 *    "Sugerí una mejora".
 *
 * No es flotante. Lo embebés donde necesites.
 *
 * Llama a `/api/tickets/chat` para cada turno y crea el ticket con
 * `/api/tickets` al final. Mismo CORS / cookies que el widget anterior.
 */

import { useState, useEffect, useRef, useCallback } from 'react';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  at: string;
}

interface TicketPayload {
  tipo: 'duda' | 'bug' | 'idea' | 'urgente';
  descripcion: string;
  ready: boolean;
}

interface ChatBotProps {
  source: 'app' | 'landing' | 'club-portal';
  clubId?: string;
  apiBase?: string;
  /** Altura del contenedor del chat. Default 480px. */
  height?: number | string;
  /** Callback al crear ticket exitosamente. Si lo pasás, el panel no muestra
   *  el bloque de confirmación final (lo manejás vos en el padre). */
  onTicketCreated?: (ticketId: string) => void;
  /** Forzar pedir email/teléfono incluso si hay sesión (para landing). */
  forceContact?: boolean;
}

const PRIMARY = '#C8F542';

export function ChatBot({
  source,
  clubId,
  apiBase = '',
  height = 480,
  onTicketCreated,
  forceContact = false,
}: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [pendingTicket, setPendingTicket] = useState<TicketPayload | null>(null);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [submitted, setSubmitted] = useState<{ id: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Saludo inicial automático
  useEffect(() => {
    if (messages.length === 0) sendTurn([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages.length, sending, pendingTicket, submitted]);

  const sendTurn = useCallback(
    async (history: ChatMessage[]) => {
      setSending(true);
      try {
        const res = await fetch(`${apiBase}/api/tickets/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ messages: history }),
        });
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: data.reply || '¿Podés repetirlo?',
            at: new Date().toISOString(),
          },
        ]);
        if (data.ticket?.ready) {
          setPendingTicket(data.ticket);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: 'Tuve un problema técnico. ¿Lo reintentamos?',
            at: new Date().toISOString(),
          },
        ]);
      } finally {
        setSending(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    },
    [apiBase]
  );

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending || pendingTicket) return;
    const userMsg: ChatMessage = {
      role: 'user',
      text,
      at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    await sendTurn([...messages, userMsg]);
  };

  const submitTicket = async () => {
    if (!pendingTicket) return;
    setSending(true);
    try {
      const res = await fetch(`${apiBase}/api/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          source,
          club_id: clubId,
          tipo: pendingTicket.tipo,
          descripcion: pendingTicket.descripcion,
          transcript: messages,
          url_origen: typeof window !== 'undefined' ? window.location.href : null,
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
          contact_email: contactEmail || null,
          contact_phone: contactPhone || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: data.error || 'No pude crearlo. ¿Lo reintentamos?',
            at: new Date().toISOString(),
          },
        ]);
        return;
      }
      setSubmitted({ id: data.ticket_id });
      onTicketCreated?.(data.ticket_id);
    } finally {
      setSending(false);
    }
  };

  // Pedir contacto cuando es landing (sin sesión garantizada) o forceContact
  const necesitaContacto = forceContact || source === 'landing';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height,
        background: '#0f0f0f',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        overflow: 'hidden',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Mensajes */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 14,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          background:
            'radial-gradient(circle at top right, rgba(200,245,66,0.05), transparent 60%)',
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '8px 12px',
              borderRadius: 14,
              background: m.role === 'user' ? PRIMARY : 'rgba(255,255,255,0.08)',
              color: m.role === 'user' ? '#0a0a0a' : '#fff',
              fontSize: 14,
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {m.text}
          </div>
        ))}
        {sending && (
          <div
            style={{
              alignSelf: 'flex-start',
              padding: '8px 12px',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.08)',
              fontSize: 14,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            ●●●
          </div>
        )}

        {pendingTicket && !submitted && (
          <div
            style={{
              marginTop: 8,
              padding: 12,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(200,245,66,0.2)',
            }}
          >
            <div
              style={{ fontSize: 12, color: PRIMARY, marginBottom: 6, fontWeight: 700 }}
            >
              Tu ticket
            </div>
            <div style={{ fontSize: 13, marginBottom: 10 }}>
              <b style={{ textTransform: 'uppercase', fontSize: 10, opacity: 0.7 }}>
                {pendingTicket.tipo}
              </b>
              <div style={{ marginTop: 4 }}>{pendingTicket.descripcion}</div>
            </div>
            {necesitaContacto && (
              <>
                <div
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: 6,
                  }}
                >
                  ¿Por dónde te respondemos? (al menos uno)
                </div>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="tel"
                  placeholder="+54 9 ..."
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  style={{ ...inputStyle, marginTop: 6 }}
                />
              </>
            )}
            <button
              type="button"
              onClick={submitTicket}
              disabled={sending}
              style={{ ...primaryBtn, width: '100%', marginTop: 10 }}
            >
              {sending ? 'Enviando…' : 'Enviar ticket'}
            </button>
          </div>
        )}

        {submitted && (
          <div
            style={{
              marginTop: 8,
              padding: 14,
              borderRadius: 12,
              background: 'rgba(200,245,66,0.08)',
              border: '1px solid rgba(200,245,66,0.3)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>✅</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
              Listo, lo tenemos
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
              Lo revisamos en las próximas 24h.
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 10,
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'monospace',
              }}
            >
              #{submitted.id.slice(0, 8)}
            </div>
          </div>
        )}
      </div>

      {!pendingTicket && !submitted && (
        <div
          style={{
            padding: 10,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            gap: 6,
            background: '#0a0a0a',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Escribí tu mensaje…"
            disabled={sending}
            style={{
              flex: 1,
              border: '1px solid rgba(255,255,255,0.1)',
              background: '#1a1a1a',
              color: '#fff',
              padding: '10px 12px',
              borderRadius: 10,
              fontSize: 14,
              outline: 'none',
            }}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || sending}
            style={primaryBtn}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

const primaryBtn: React.CSSProperties = {
  background: PRIMARY,
  color: '#0a0a0a',
  border: 'none',
  padding: '10px 16px',
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.1)',
  background: '#1a1a1a',
  color: '#fff',
  fontSize: 13,
  outline: 'none',
};
