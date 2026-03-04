import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#C8F542',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://padelero.app'),
  title: 'Padelero — La mejor app de pádel de la Argentina',
  description: 'La mejor app de pádel de la Argentina. Reservá canchas en segundos, armá partidos, subí tu ranking y conectá con jugadores de tu nivel.',
  keywords: ['padel', 'turnos', 'canchas', 'partidos', 'argentina', 'deportes', 'reservas'],
  openGraph: {
    title: 'Padelero — La mejor app de pádel de la Argentina',
    description: 'La mejor app de pádel de la Argentina. Reservá canchas, armá partidos y conectá con jugadores de tu nivel.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Padelero',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Padelero — La mejor app de pádel de la Argentina',
    description: 'La mejor app de pádel de la Argentina. Reservá canchas, armá partidos y conectá con jugadores de tu nivel.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
