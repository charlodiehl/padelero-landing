import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad — Padelero',
  description:
    'Política de privacidad de Padelero. Cómo recolectamos, usamos y protegemos tus datos personales.',
};

const LAST_UPDATED = '7 de mayo de 2026';
const CONTACT_EMAIL = 'padeleroapp@gmail.com';

export default function PrivacidadPage() {
  return (
    <main
      style={{
        maxWidth: '768px',
        margin: '0 auto',
        padding: '48px 24px',
        color: '#fff',
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
        Política de Privacidad
      </h1>
      <p style={{ fontSize: '14px', color: '#888', marginBottom: '32px' }}>
        Última actualización: {LAST_UPDATED}
      </p>

      <section>
        <p>
          <strong>Padelero</strong> es un servicio operado por{' '}
          <strong>VIRTUALADVICE S.A.</strong>, sociedad constituida en la República Argentina,
          con domicilio legal en la Ciudad Autónoma de Buenos Aires (en adelante,
          &quot;Padelero&quot;, &quot;nosotros&quot; o &quot;la aplicación&quot;). Nos tomamos
          muy en serio la privacidad de nuestros usuarios. Esta política describe qué
          información recolectamos, cómo la usamos y los derechos que tenés sobre tus datos
          personales.
        </p>

        <H2>1. Información que recolectamos</H2>
        <p>Cuando usás Padelero podemos recolectar:</p>
        <ul style={ulStyle}>
          <li>
            <strong>Datos de cuenta:</strong> nombre, email, número de teléfono, foto de perfil.
          </li>
          <li>
            <strong>Datos de juego:</strong> nivel, ranking, historial de partidos, torneos
            inscriptos, resultados, club al que pertenecés.
          </li>
          <li>
            <strong>Datos de pagos:</strong> historial de transacciones realizadas a través de
            MercadoPago. <em>No almacenamos datos de tarjetas de crédito.</em>
          </li>
          <li>
            <strong>Datos técnicos:</strong> tipo de dispositivo, sistema operativo, dirección
            IP, identificadores de notificaciones push.
          </li>
          <li>
            <strong>Datos de WhatsApp:</strong> si te comunicás con nuestro bot, guardamos los
            mensajes para mejorar el servicio.
          </li>
        </ul>

        <H2>2. Cómo usamos tu información</H2>
        <p>Usamos los datos para:</p>
        <ul style={ulStyle}>
          <li>Proveer y mejorar el servicio (matchmaking, ranking, torneos, reservas).</li>
          <li>Enviarte notificaciones relevantes (partidos, torneos, resultados).</li>
          <li>Procesar pagos a través de MercadoPago.</li>
          <li>Prevenir fraude y mantener la seguridad de la plataforma.</li>
          <li>Cumplir con obligaciones legales.</li>
        </ul>

        <H2>3. Con quién compartimos tu información</H2>
        <p>
          Padelero <strong>no vende</strong> tus datos personales. Compartimos información
          únicamente con los siguientes proveedores, en la medida estrictamente necesaria para
          operar el servicio:
        </p>
        <ul style={ulStyle}>
          <li>
            <strong>Supabase</strong> — almacenamiento de base de datos y autenticación.
          </li>
          <li>
            <strong>Vercel</strong> — hosting y entrega de la aplicación.
          </li>
          <li>
            <strong>MercadoPago</strong> — procesamiento de pagos.
          </li>
          <li>
            <strong>OpenAI / OpenRouter</strong> — funcionalidades asistidas por IA.
          </li>
          <li>
            <strong>Kapso (WhatsApp Business API)</strong> — comunicación vía WhatsApp.
          </li>
          <li>
            <strong>Apple / Google</strong> — distribución de la app y notificaciones push.
          </li>
        </ul>
        <p>
          Algunos torneos públicos exhiben información tuya (nombre, foto, ranking, resultados)
          a otros usuarios, ya que esa es la naturaleza del servicio.
        </p>

        <H2>4. Tus derechos</H2>
        <p>Tenés derecho a:</p>
        <ul style={ulStyle}>
          <li>Acceder a la información que tenemos sobre vos.</li>
          <li>Solicitar la corrección o actualización de datos inexactos.</li>
          <li>Solicitar la eliminación de tu cuenta y datos asociados.</li>
          <li>Oponerte al tratamiento de tus datos en ciertos casos.</li>
          <li>Retirar tu consentimiento en cualquier momento.</li>
        </ul>
        <p>
          Para ejercer cualquiera de estos derechos escribinos a{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>

        <H2>5. Retención de datos</H2>
        <p>
          Conservamos tu información mientras tengas una cuenta activa. Si solicitás eliminar tu
          cuenta, borramos tus datos personales en un plazo máximo de 30 días, salvo aquellos
          que debamos conservar por obligación legal (por ejemplo, comprobantes de pago).
        </p>

        <H2>6. Seguridad</H2>
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger tu información:
          encriptación en tránsito (HTTPS), control de accesos, auditoría de actividad y
          segregación de entornos. Ninguna medida es 100% infalible, pero trabajamos
          continuamente para minimizar riesgos.
        </p>

        <H2>7. Menores de edad</H2>
        <p>
          Padelero no está dirigido a menores de 13 años. Si sos menor de 18, necesitás
          consentimiento de un adulto responsable para usar la plataforma.
        </p>

        <H2>8. Cambios a esta política</H2>
        <p>
          Podemos actualizar esta política de tiempo en tiempo. Las modificaciones se publicarán
          en esta misma página con la fecha de última actualización. Si los cambios son
          significativos, te avisaremos por email o dentro de la aplicación.
        </p>

        <H2>9. Marco legal aplicable</H2>
        <p>
          Esta política se rige por la Ley 25.326 de Protección de Datos Personales de la
          República Argentina y demás normativa aplicable.
        </p>

        <H2>10. Contacto</H2>
        <p>
          <strong>Responsable del tratamiento de datos:</strong> VIRTUALADVICE S.A., con
          domicilio legal en la Ciudad Autónoma de Buenos Aires, Argentina.
        </p>
        <p>
          Por consultas, reclamos o ejercicio de derechos, escribinos a{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>
    </main>
  );
}

const ulStyle: React.CSSProperties = {
  paddingLeft: '24px',
  margin: '12px 0',
};

const linkStyle: React.CSSProperties = {
  color: '#C8F542',
  textDecoration: 'underline',
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '32px', marginBottom: '12px' }}>
      {children}
    </h2>
  );
}
