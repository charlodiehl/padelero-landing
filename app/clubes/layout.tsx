import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Padelero para Clubes — Más reservas. Cero llamadas.',
  description:
    'Digitalizá tu club de pádel en 24 horas. Agente WhatsApp IA, gestión de torneos, rankings y métricas en tiempo real. Más reservas, menos gestión.',
  openGraph: {
    title: 'Padelero para Clubes — Más reservas. Cero llamadas.',
    description:
      'Reservas automáticas por WhatsApp, torneos sin Excel, rankings que retienen jugadores y métricas de tu negocio. Todo en una sola plataforma.',
    type: 'website',
  },
};

export default function ClubesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
