/* eslint-disable */
/**
 * GENERADO AUTOMÁTICAMENTE — NO EDITAR A MANO.
 * Fuente: styles/tokens/lima.css + styles/tokens/pino.css
 * Regenerar: node scripts/brand/tokens-to-ts.mjs
 *
 * Para qué sirve: todo lo que corre FUERA del navegador y por lo tanto no
 * puede leer var(--primary) — los generadores de imagen (OG / share cards),
 * los emails HTML y el payload de las notificaciones push — necesita el
 * color como hex literal. Este archivo es ese hex, derivado de los mismos
 * tripletes HSL que consume el CSS, así que nunca se desincroniza.
 *
 * En el navegador NO uses esto: usá las clases de Tailwind (bg-primary,
 * text-muted-foreground) o hsl(var(--x)), que sí siguen al data-theme.
 */

export const THEMES = ['lima', 'pino'] as const;
export type ThemeName = (typeof THEMES)[number];
export const DEFAULT_THEME: ThemeName = 'lima';

export function isThemeName(value: unknown): value is ThemeName {
  return typeof value === 'string' && (THEMES as readonly string[]).includes(value);
}

export type ColorToken =
  | 'accent'
  | 'accent-foreground'
  | 'accent-premium'
  | 'accent-premium-foreground'
  | 'background'
  | 'border'
  | 'border-strong'
  | 'brand-from'
  | 'brand-to'
  | 'brand-via'
  | 'card'
  | 'card-foreground'
  | 'destructive'
  | 'destructive-foreground'
  | 'foreground'
  | 'foreground-subtle'
  | 'glow'
  | 'info'
  | 'info-foreground'
  | 'input'
  | 'muted'
  | 'muted-foreground'
  | 'popover'
  | 'popover-foreground'
  | 'primary'
  | 'primary-foreground'
  | 'primary-hover'
  | 'primary-text'
  | 'ring'
  | 'scrim'
  | 'secondary'
  | 'secondary-foreground'
  | 'success'
  | 'success-foreground'
  | 'surface-2'
  | 'surface-3'
  | 'surface-sunken'
  | 'warning'
  | 'warning-foreground';

/** Color final en hex (#RRGGBB). Para imágenes, emails y push. */
export const BRAND: Record<ThemeName, Record<ColorToken, string>> = {
  lima: {
    accent: '#262626',
    'accent-foreground': '#F7F7F7',
    'accent-premium': '#2FD6C4',
    'accent-premium-foreground': '#08211E',
    background: '#0A0A0A',
    border: '#2E2E2E',
    'border-strong': '#474747',
    'brand-from': '#C8F542',
    'brand-to': '#2FD6C4',
    'brand-via': '#7EE0A0',
    card: '#171717',
    'card-foreground': '#F7F7F7',
    destructive: '#EF4343',
    'destructive-foreground': '#FFFFFF',
    foreground: '#F7F7F7',
    'foreground-subtle': '#C7C7C7',
    glow: '#C8F542',
    info: '#42A7F0',
    'info-foreground': '#0A1C29',
    input: '#212121',
    muted: '#212121',
    'muted-foreground': '#969CA6',
    popover: '#1A1A1A',
    'popover-foreground': '#F7F7F7',
    primary: '#C8F542',
    'primary-foreground': '#000000',
    'primary-hover': '#D2F764',
    'primary-text': '#C8F542',
    ring: '#C8F542',
    scrim: '#000000',
    secondary: '#262626',
    'secondary-foreground': '#F7F7F7',
    success: '#C8F542',
    'success-foreground': '#000000',
    'surface-2': '#262626',
    'surface-3': '#333333',
    'surface-sunken': '#050505',
    warning: '#F59F0A',
    'warning-foreground': '#000000',
  },
  pino: {
    accent: '#1E382C',
    'accent-foreground': '#F2F4EC',
    'accent-premium': '#C9B27E',
    'accent-premium-foreground': '#221C11',
    background: '#0E1A13',
    border: '#283E33',
    'border-strong': '#2E6B4A',
    'brand-from': '#57C98A',
    'brand-to': '#39D0C1',
    'brand-via': '#72CAAD',
    card: '#14241B',
    'card-foreground': '#F2F4EC',
    destructive: '#C0786E',
    'destructive-foreground': '#24130F',
    foreground: '#F2F4EC',
    'foreground-subtle': '#C6D2C8',
    glow: '#57C98A',
    info: '#52A5E0',
    'info-foreground': '#0C2231',
    input: '#1A2E24',
    muted: '#1A2E24',
    'muted-foreground': '#8DA092',
    popover: '#162C21',
    'popover-foreground': '#F2F4EC',
    primary: '#57C98A',
    'primary-foreground': '#0E3A26',
    'primary-hover': '#74D29E',
    'primary-text': '#57C98A',
    ring: '#57C98A',
    scrim: '#050B08',
    secondary: '#1E382C',
    'secondary-foreground': '#F2F4EC',
    success: '#39D0C1',
    'success-foreground': '#0A2926',
    'surface-2': '#163125',
    'surface-3': '#173A2B',
    'surface-sunken': '#05100A',
    warning: '#F2A92C',
    'warning-foreground': '#291E0A',
  },
};

/** Triplete HSL crudo ("146.8 51.4% 56.5%"). Para componer hsl(x / alfa). */
export const BRAND_HSL: Record<ThemeName, Record<ColorToken, string>> = {
  lima: {
    accent: '0 0% 15%',
    'accent-foreground': '0 0% 97%',
    'accent-premium': '173.5 67.1% 51.2%',
    'accent-premium-foreground': '174 60% 8%',
    background: '0 0% 4%',
    border: '0 0% 18%',
    'border-strong': '0 0% 28%',
    'brand-from': '75 90% 61%',
    'brand-to': '173.5 67.1% 51.2%',
    'brand-via': '140.8 61.2% 68.6%',
    card: '0 0% 9%',
    'card-foreground': '0 0% 97%',
    destructive: '0 84% 60%',
    'destructive-foreground': '0 0% 100%',
    foreground: '0 0% 97%',
    'foreground-subtle': '0 0% 78%',
    glow: '75 90% 61%',
    info: '205 85% 60%',
    'info-foreground': '205 60% 10%',
    input: '0 0% 13%',
    muted: '0 0% 13%',
    'muted-foreground': '220 8% 62%',
    popover: '0 0% 10%',
    'popover-foreground': '0 0% 97%',
    primary: '75 90% 61%',
    'primary-foreground': '0 0% 0%',
    'primary-hover': '75 90% 68%',
    'primary-text': '75 90% 61%',
    ring: '75 90% 61%',
    scrim: '0 0% 0%',
    secondary: '0 0% 15%',
    'secondary-foreground': '0 0% 97%',
    success: '75 90% 61%',
    'success-foreground': '0 0% 0%',
    'surface-2': '0 0% 15%',
    'surface-3': '0 0% 20%',
    'surface-sunken': '0 0% 2%',
    warning: '38 92% 50%',
    'warning-foreground': '0 0% 0%',
  },
  pino: {
    accent: '152 30% 17%',
    'accent-foreground': '75 27% 94%',
    'accent-premium': '42 41% 64%',
    'accent-premium-foreground': '40 35% 10%',
    background: '145 30% 7.8%',
    border: '150 22% 20%',
    'border-strong': '148 40% 30%',
    'brand-from': '146.8 51.4% 56.5%',
    'brand-to': '174 62% 52%',
    'brand-via': '160 45% 62%',
    card: '148 30% 11%',
    'card-foreground': '75 27% 94%',
    destructive: '7.3 39.4% 59.2%',
    'destructive-foreground': '10 40% 10%',
    foreground: '75 27% 94%',
    'foreground-subtle': '130 12% 80%',
    glow: '146.8 51.4% 56.5%',
    info: '205 70% 60%',
    'info-foreground': '205 60% 12%',
    input: '150 28% 14%',
    muted: '150 28% 14%',
    'muted-foreground': '136 9% 59%',
    popover: '150 34% 13%',
    'popover-foreground': '75 27% 94%',
    primary: '146.8 51.4% 56.5%',
    'primary-foreground': '152.7 61.1% 14.1%',
    'primary-hover': '146.8 51.4% 64%',
    'primary-text': '146.8 51.4% 56.5%',
    ring: '146.8 51.4% 56.5%',
    scrim: '150 40% 3%',
    secondary: '152 30% 17%',
    'secondary-foreground': '75 27% 94%',
    success: '174 62% 52%',
    'success-foreground': '174 60% 10%',
    'surface-2': '152 38% 14%',
    'surface-3': '154 43% 16%',
    'surface-sunken': '147 52% 4%',
    warning: '38 88% 56%',
    'warning-foreground': '38 60% 10%',
  },
};

/** Tokens que no son color (radius, etc.), tal cual salen del CSS. */
export const BRAND_SCALARS: Record<ThemeName, Record<'radius', string>> = {
  lima: {
    radius: '0.875rem',
  },
  pino: {
    radius: '0.875rem',
  },
};

/** Hex de un token para el tema pedido (por defecto, el de producción). */
export function brandColor(token: ColorToken, theme: ThemeName = DEFAULT_THEME): string {
  return BRAND[theme][token];
}

/** Color con alfa, listo para canvas/SVG: rgba() derivado del hex. */
export function brandAlpha(token: ColorToken, alpha: number, theme: ThemeName = DEFAULT_THEME): string {
  const hex = BRAND[theme][token];
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
