'use client';

/**
 * HelpWidget — botón flotante + chat panel para soporte/feedback.
 *
 * Se integra en la app interna (layout (app)) y en la landing externa
 * (la copia de este archivo va al repo padelero-landing también).
 *
 * Flow:
 *  1. Botón flotante esquina inferior derecha (verde lima).
 *  2. Click → abre panel con chat. Primer turno del bot saluda.
 *  3. El user escribe. Cada turno hace POST /api/tickets/chat.
 *  4. Cuando el bot devuelve `ticket: { ready: true, ... }`, le pedimos
 *     contacto (si no hay sesión) y creamos el ticket vía POST /api/tickets.
 *  5. Mostramos confirmación con número de ticket.
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

interface HelpWidgetProps {
  /** 'app' | 'landing' | 'club-portal'. Se pasa a la API para tracking. */
  source?: 'app' | 'landing' | 'club-portal';
  /** Si está en un panel de club, lo pasamos. */
  clubId?: string;
  /** API base si el widget vive en otro dominio (ej. landing → app.padelero.app). */
  apiBase?: string;
  /** Posición del botón. */
  position?: 'bottom-right' | 'bottom-left';
}

const PRIMARY = '#C8F542'; // lima Padelero
const PRIMARY_DARK = '#a3d030';

export function HelpWidget({
  source = 'app',
  clubId,
  apiBase = '',
  position = 'bottom-right',
}: HelpWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [pendingTicket, setPendingTicket] = useState<TicketPayload | null>(null);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [submitted, setSubmitted] = useState<{ id: string } | null>(null);
  const [askingContact, setAskingContact] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Saludo inicial cuando se abre por primera vez
  useEffect(() => {
    if (open && messages.length === 0) {
      sendTurn([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Auto-scroll al fondo cuando aparece mensaje nuevo
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages.length, sending, pendingTicket]);

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
        const botMsg: ChatMessage = {
          role: 'bot',
          text: data.reply || '¿Podés repetirlo?',
          at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, botMsg]);
        if (data.ticket?.ready) {
          setPendingTicket(data.ticket);
          // Si no hay sesión visible, pedimos contacto
          // (lo sabemos porque el widget no recibe usuario_id directo —
          //  la API lo resuelve. Acá optamos por mostrar siempre el form
          //  si la sesión no se pudo confirmar.)
          setAskingContact(true);
        }
      } catch (err) {
        console.error('[chat]', err);
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text:
              'Tuve un problema técnico. ¿Lo reintentamos en un rato?',
            at: new Date().toISOString(),
          },
        ]);
      } finally {
        setSending(false);
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
    // Si pedimos contacto y no completó nada, exigir uno mínimo
    if (askingContact && !contactEmail && !contactPhone) {
      // Si la app ya tiene sesión real, la API va a aceptar sin contacto.
      // De todas formas igual mostramos confirm sin error si la API lo acepta.
    }
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
          { role: 'bot', text: data.error || 'No pude crearlo. ¿Lo reintentamos?', at: new Date().toISOString() },
        ]);
        return;
      }
      setSubmitted({ id: data.ticket_id });
    } catch (err) {
      console.error('[submit]', err);
    } finally {
      setSending(false);
    }
  };

  const close = () => {
    setOpen(false);
    // No reseteamos el estado por si quiere reabrir y seguir.
  };

  const reset = () => {
    setOpen(false);
    setMessages([]);
    setInput('');
    setPendingTicket(null);
    setContactEmail('');
    setContactPhone('');
    setSubmitted(null);
    setAskingContact(false);
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        type="button"
        aria-label="Abrir chat de soporte"
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          [position === 'bottom-right' ? 'right' : 'left']: 16,
          bottom: 80,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: PRIMARY,
          color: '#0a0a0a',
          border: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35), 0 0 0 4px rgba(200,245,66,0.15)',
          cursor: 'pointer',
          display: open ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2147483000,
          fontSize: 24,
        }}
      >
        💬
      </button>

      {/* Panel chat */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat de soporte Padelero"
          style={{
            position: 'fixed',
            [position === 'bottom-right' ? 'right' : 'left']: 16,
            bottom: 16,
            width: 360,
            maxWidth: 'calc(100vw - 32px)',
            height: 560,
            maxHeight: 'calc(100vh - 100px)',
            background: '#0f0f0f',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            boxShadow: '0 16px 48px rgba(0,0,0,0.55)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 2147483000,
            color: '#fff',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 14px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#0a0a0a',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: PRIMARY,
                color: '#0a0a0a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              P
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Soporte Padelero</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                Solemos responder en menos de 24h
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                fontSize: 20,
                padding: 4,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

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

            {/* Form de contacto + confirmar ticket */}
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
                <div style={{ fontSize: 12, color: PRIMARY, marginBottom: 6, fontWeight: 700 }}>
                  Tu ticket
                </div>
                <div style={{ fontSize: 13, marginBottom: 10 }}>
                  <b style={{ textTransform: 'uppercase', fontSize: 10, opacity: 0.7 }}>
                    {pendingTicket.tipo}
                  </b>
                  <div style={{ marginTop: 4 }}>{pendingTicket.descripcion}</div>
                </div>
                {askingContact && (
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
                  Lo revisamos en las próximas 24h y te avisamos.
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
                <button type="button" onClick={reset} style={{ ...secondaryBtn, marginTop: 12 }}>
                  Cerrar
                </button>
              </div>
            )}
          </div>

          {/* Input */}
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
      )}
    </>
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

const secondaryBtn: React.CSSProperties = {
  background: 'rgba(255,255,255,0.08)',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.12)',
  padding: '8px 14px',
  borderRadius: 10,
  fontSize: 13,
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

void PRIMARY_DARK; // reservado para hover si lo agregamos
