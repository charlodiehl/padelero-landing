import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Torneos de Pádel · Padelero — Ranking, Categorías y Circuitos en Argentina',
  description: 'Competí en torneos de pádel organizados por tu club. Sumá puntos al ranking, acumulá en circuitos anuales y ascendé de categoría con el sistema de Padelero.',
  keywords: ['torneos padel argentina', 'ranking padel', 'circuito padel', 'categorías padel', 'inscripcion torneo padel'],
  openGraph: {
    title: 'Sistema de Torneos · Padelero',
    description: 'Competí, sumá puntos y ascendé de categoría. La plataforma más completa para torneos de pádel en Argentina.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Padelero',
  },
};

export default function TorneosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
