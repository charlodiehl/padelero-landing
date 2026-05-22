import type { Metadata } from 'next';

const TITLE = 'Padelero Pro — Tu club que crece solo con IA';
const DESC =
  'Activá los agentes de IA que llenan turnos vacíos, recuperan jugadores perdidos y suben tu facturación mes a mes. USD 100/mes + 3% de tu facturación.';
const OG_URL = 'https://padelero.app/landing/pro-og.jpg';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    url: 'https://padelero.app/pro',
    siteName: 'Padelero',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: OG_URL,
        width: 1200,
        height: 630,
        alt: 'Padelero Pro · Tu club que crece solo con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: [OG_URL],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
