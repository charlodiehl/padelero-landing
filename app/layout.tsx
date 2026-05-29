import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { HelpWidget } from '@/components/help-widget/HelpWidget';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#C8F542',
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
      <body>
        {children}
        {/* Widget de soporte/feedback flotante. La landing es dominio
            distinto de la app, así que el widget llama a app.padelero.app
            para crear tickets. */}
        <HelpWidget source="landing" apiBase="https://app.padelero.app" />
      </body>
    </html>
  );
}
