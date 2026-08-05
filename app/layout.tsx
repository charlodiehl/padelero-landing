import type { Metadata, Viewport } from 'next';
import { Hanken_Grotesk, Cormorant_Garamond, JetBrains_Mono, Pinyon_Script } from 'next/font/google';
import { BRAND, DEFAULT_THEME } from '@/lib/theme/brand';
import './globals.css';

// Tipografía del manual "Pino Nocturno" — igual que la app, para que los dos
// dominios se lean como el mismo producto. Se conservan los nombres de variable.
const inter = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--brand-display',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});
// Wordmark de marca. El manual la reserva EXCLUSIVAMENTE para el logotipo:
// nunca texto corrido, nunca por debajo de 32px (el trazo fino desaparece).
const pinyon = Pinyon_Script({
  subsets: ['latin'],
  variable: '--font-wordmark',
  display: 'swap',
  weight: ['400'],
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--brand-mono',
  display: 'swap',
  weight: ['400', '500'],
});

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
    <html lang="es" data-theme="pino" className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable} ${pinyon.variable}`}>
      <body>{children}</body>
    </html>
  );
}
