import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Padelero Pro — Tu club que crece solo con IA',
  description:
    'Activá los agentes de IA que llenan turnos vacíos, recuperan jugadores perdidos y suben tu facturación mes a mes. USD 100/mes + 3% de tu facturación.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
