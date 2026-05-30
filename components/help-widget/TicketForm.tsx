'use client';

/**
 * TicketForm — formulario simple para sugerir mejoras o reportar problemas.
 *
 * Reemplaza al ChatBot conversacional (más simple, sin LLM, sin costo
 * por mensaje). El usuario:
 *  1. Elige tipo: "Proponer mejora" o "Reportar problema".
 *  2. Pone un título.
 *  3. Describe (textarea).
 *  4. Adjunta una imagen (opcional).
 *  5. Si no hay sesión, deja email o WhatsApp.
 *  6. Submit → POST /api/tickets.
 *
 * Se embebe en /account/tickets (app) y /mejoras (landing).
 */

import { useState, useRef } from 'react';

interface TicketFormProps {
  source: 'app' | 'landing' | 'club-portal';
  clubId?: string;
  apiBase?: string;
  /** Si está en landing/sin sesión, mostrar inputs de contacto. */
  needsContact?: boolean;
  onSuccess?: (ticketId: string) => void;
}

const PRIMARY = '#C8F542';
const TIPOS = [
  {
    value: 'idea',
    label: 'Proponer una mejora',
    emoji: '💡',
    desc: 'Sugerí algo que querés que hagamos',
  },
  {
    value: 'bug',
    label: 'Reportar un problema',
    emoji: '🐛',
    desc: 'Algo no está funcionando bien',
  },
] as const;

export function TicketForm({
  source,
  clubId,
  apiBase = '',
  needsContact = false,
  onSuccess,
}: TicketFormProps) {
  const [tipo, setTipo] = useState<'idea' | 'bug'>('idea');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ id: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pickFile = () => fileInputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (!f) {
      setFile(null);
      setFilePreview(null);
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError('La imagen pesa más de 5MB');
      return;
    }
    if (!f.type.startsWith('image/')) {
      setError('Solo imágenes (jpg, png, webp, gif)');
      return;
    }
    setError(null);
    setFile(f);
    setFilePreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (submitting) return;

    setError(null);
    if (!titulo.trim() || titulo.trim().length < 4) {
      setError('Ponele un título corto (mínimo 4 caracteres)');
      return;
    }
    if (!descripcion.trim() || descripcion.trim().length < 5) {
      setError('Contanos un poco más en la descripción');
      return;
    }
    if (needsContact && !contactEmail && !contactPhone) {
      setError('Dejanos email o WhatsApp para responderte');
      return;
    }

    setSubmitting(true);
    try {
      // 1) Subir imagen si hay
      let screenshotUrl: string | null = null;
      if (file) {
        const fd = new FormData();
        fd.append('file', file);
        const upRes = await fetch(`${apiBase}/api/tickets/upload`, {
          method: 'POST',
          credentials: 'include',
          body: fd,
        });
        const upData = await upRes.json();
        if (!upRes.ok) {
          setError(upData.error || 'No pudimos subir la imagen');
          setSubmitting(false);
          return;
        }
        screenshotUrl = upData.url;
      }

      // 2) Crear ticket. El "descripcion" en DB es el cuerpo. Acá
      //    incorporamos el título arriba para que el agente de triage
      //    lo lea junto.
      const descripcionFull = `${titulo.trim()}\n\n${descripcion.trim()}`;

      const res = await fetch(`${apiBase}/api/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          source,
          club_id: clubId,
          tipo,
          descripcion: descripcionFull,
          screenshot_url: screenshotUrl,
          url_origen: typeof window !== 'undefined' ? window.location.href : null,
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
          contact_email: contactEmail || null,
          contact_phone: contactPhone || null,
          transcript: [], // sin chat
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No pudimos guardar tu mensaje');
        setSubmitting(false);
        return;
      }
      setSubmitted({ id: data.ticket_id });
      onSuccess?.(data.ticket_id);
    } catch (err) {
      console.error('[TicketForm]', err);
      setError('Tuve un problema al enviar. Reintentá.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          background: '#0f0f0f',
          border: '1px solid rgba(200,245,66,0.3)',
          borderRadius: 16,
          padding: 28,
          textAlign: 'center',
          color: '#fff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>
          Listo, lo tenemos
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 14,
          }}
        >
          Lo revisamos en las próximas 24h y, si suma votos, lo construimos.
        </div>
        <div
          style={{
            fontSize: 11,
            fontFamily: 'monospace',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          #{submitted.id.slice(0, 8)}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#0f0f0f',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: 18,
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Tipo */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {TIPOS.map((t) => {
          const selected = tipo === t.value;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setTipo(t.value)}
              style={{
                background: selected ? `${PRIMARY}15` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${selected ? PRIMARY : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 12,
                padding: 14,
                textAlign: 'left',
                color: selected ? PRIMARY : 'rgba(255,255,255,0.85)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 4 }}>{t.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{t.label}</div>
              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: 2,
                }}
              >
                {t.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Título */}
      <label style={labelStyle}>Título</label>
      <input
        type="text"
        placeholder={
          tipo === 'idea'
            ? 'Ej: Reservar serie de partidos'
            : 'Ej: La app no carga el ranking'
        }
        value={titulo}
        maxLength={100}
        onChange={(e) => setTitulo(e.target.value)}
        style={inputStyle}
      />

      {/* Descripción */}
      <label style={labelStyle}>
        Descripción
        <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400, marginLeft: 6 }}>
          (qué pasó / qué querés)
        </span>
      </label>
      <textarea
        placeholder={
          tipo === 'idea'
            ? 'Contanos la mejora con detalle. ¿En qué pantalla? ¿Para qué casos?'
            : 'Pasos para reproducir, qué esperabas y qué pasó.'
        }
        value={descripcion}
        maxLength={1500}
        rows={5}
        onChange={(e) => setDescripcion(e.target.value)}
        style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
      />
      <div
        style={{
          fontSize: 10,
          textAlign: 'right',
          color: 'rgba(255,255,255,0.3)',
          marginTop: -6,
          marginBottom: 4,
        }}
      >
        {descripcion.length}/1500
      </div>

      {/* Imagen */}
      <label style={labelStyle}>
        Imagen
        <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400, marginLeft: 6 }}>
          (opcional, hasta 5MB)
        </span>
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
      {!filePreview ? (
        <button
          type="button"
          onClick={pickFile}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.03)',
            border: '1px dashed rgba(255,255,255,0.15)',
            borderRadius: 12,
            padding: '18px 14px',
            color: 'rgba(255,255,255,0.55)',
            fontSize: 13,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          📎 Adjuntar imagen
        </button>
      ) : (
        <div
          style={{
            position: 'relative',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#000',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={filePreview}
            alt="adjunto"
            style={{
              width: '100%',
              maxHeight: 240,
              objectFit: 'contain',
              display: 'block',
            }}
          />
          <button
            type="button"
            onClick={() => {
              setFile(null);
              setFilePreview(null);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'rgba(0,0,0,0.7)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 28,
              height: 28,
              cursor: 'pointer',
              fontSize: 16,
              lineHeight: 1,
            }}
            aria-label="Quitar imagen"
          >
            ×
          </button>
        </div>
      )}

      {/* Contacto si no hay sesión */}
      {needsContact && (
        <>
          <div
            style={{
              marginTop: 14,
              padding: 12,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.65)',
                marginBottom: 8,
                textTransform: 'uppercase',
                letterSpacing: 1,
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
              style={inputStyle}
            />
          </div>
        </>
      )}

      {/* Error */}
      {error && (
        <div
          style={{
            marginTop: 12,
            padding: '8px 12px',
            background: 'rgba(248,113,113,0.1)',
            border: '1px solid rgba(248,113,113,0.3)',
            borderRadius: 8,
            color: '#fca5a5',
            fontSize: 12,
          }}
        >
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        style={{
          width: '100%',
          marginTop: 14,
          background: PRIMARY,
          color: '#0a0a0a',
          border: 'none',
          padding: '12px 16px',
          borderRadius: 12,
          fontSize: 15,
          fontWeight: 700,
          cursor: submitting ? 'wait' : 'pointer',
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? 'Enviando…' : 'Enviar'}
      </button>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 700,
  color: 'rgba(255,255,255,0.7)',
  textTransform: 'uppercase',
  letterSpacing: 1,
  marginTop: 16,
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 12px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.1)',
  background: '#1a1a1a',
  color: '#fff',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'inherit',
  marginBottom: 6,
};
