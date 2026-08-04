import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { BRAND, DEFAULT_THEME } from '@/lib/theme/brand';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // El <meta name="theme-color"> lo parsea el navegador antes de que exista
  // CSS: no puede ser hsl(var(--primary)). Sale del gemelo en hex de los
  // mismos tripletes (lib/theme/brand.ts), así que no se desincroniza.
  themeColor: BRAND[DEFAULT_THEME].primary,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://padelero.app'),
  title: 'Padelero - La mejor App de Pádel de la Argentina',
  description: 'La mejor App de Pádel de la Argentina. Reservá canchas en segundos, armá partidos, subí tu ranking y conectá con jugadores de tu nivel.',
  keywords: ['padel', 'turnos', 'canchas', 'partidos', 'argentina', 'deportes', 'reservas'],
  openGraph: {
    title: 'Padelero - La mejor App de Pádel de la Argentina',
    description: 'La mejor App de Pádel de la Argentina. Reservá canchas, armá partidos y conectá con jugadores de tu nivel.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Padelero',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Padelero - La mejor App de Pádel de la Argentina',
    description: 'La mejor App de Pádel de la Argentina. Reservá canchas, armá partidos y conectá con jugadores de tu nivel.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
