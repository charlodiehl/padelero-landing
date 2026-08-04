#!/usr/bin/env node
/**
 * tokens-to-ts.mjs — gemelo TypeScript de los tokens CSS.
 *
 * POR QUÉ EXISTE
 * Los 8 generadores de imagen (OG, share cards, stories), los emails y las
 * notificaciones push corren fuera del navegador: no tienen DOM, no tienen
 * hoja de estilos y por lo tanto NO PUEDEN leer var(--primary). Necesitan el
 * color como hex literal. Si ese hex se escribe a mano en cada generador, el
 * día que cambie la marca quedan 8 lugares desincronizados.
 *
 * Este script es la única fuente de verdad de esa conversión: parsea
 * styles/tokens/*.css y emite lib/theme/brand.ts.
 *
 * USO
 *   node scripts/brand/tokens-to-ts.mjs            # genera
 *   node scripts/brand/tokens-to-ts.mjs --check    # falla si brand.ts quedó viejo
 *
 * NO EDITES lib/theme/brand.ts a mano: se pisa.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const TOKENS_DIR = join(ROOT, 'styles/tokens');
const OUT = join(ROOT, 'lib/theme/brand.ts');

/** Tema → archivo y selector que hay que buscar dentro de ese archivo. */
const THEMES = [
  { name: 'lima', file: 'lima.css', selector: ':root' },
  { name: 'pino', file: 'pino.css', selector: ':root[data-theme="pino"]' },
];
const DEFAULT_THEME = 'lima';

// ── HSL (triplete sin comas) → hex ────────────────────────────────────────
function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let rgb;
  if (h < 60) rgb = [c, x, 0];
  else if (h < 120) rgb = [x, c, 0];
  else if (h < 180) rgb = [0, c, x];
  else if (h < 240) rgb = [0, x, c];
  else if (h < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  return (
    '#' +
    rgb.map((v) => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('').toUpperCase()
  );
}

/** "146.8 51.4% 56.5%" → {h,s,l} · cualquier otra cosa → null */
const TRIPLET = /^(-?\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/;
function parseTriplet(value) {
  const m = TRIPLET.exec(value.trim());
  return m ? { h: +m[1], s: +m[2], l: +m[3] } : null;
}

/**
 * Extrae las custom properties del bloque cuyo selector coincide.
 * Parser deliberadamente chico: quita comentarios, corta el bloque por
 * llaves y lee los pares `--x: y;`. Alcanza porque el formato de los
 * archivos de tokens es fijo y está bajo nuestro control.
 */
function extractBlock(css, selector) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const at = clean.indexOf(selector);
  if (at === -1) throw new Error(`No encontré el selector ${selector}`);
  const open = clean.indexOf('{', at);
  const close = clean.indexOf('}', open);
  if (open === -1 || close === -1) throw new Error(`Bloque mal formado para ${selector}`);
  const body = clean.slice(open + 1, close);
  const out = {};
  for (const decl of body.split(';')) {
    const i = decl.indexOf(':');
    if (i === -1) continue;
    const prop = decl.slice(0, i).trim();
    if (!prop.startsWith('--')) continue;
    out[prop.slice(2)] = decl.slice(i + 1).trim();
  }
  return out;
}

// ── Leer los dos temas ────────────────────────────────────────────────────
const raw = {};
for (const t of THEMES) {
  raw[t.name] = extractBlock(readFileSync(join(TOKENS_DIR, t.file), 'utf8'), t.selector);
}

// ── Los dos temas TIENEN que declarar exactamente los mismos tokens ──────
const names = Object.keys(raw[DEFAULT_THEME]);
for (const t of THEMES) {
  const mine = Object.keys(raw[t.name]);
  const falta = names.filter((n) => !mine.includes(n));
  const sobra = mine.filter((n) => !names.includes(n));
  if (falta.length || sobra.length) {
    console.error(`✗ El tema "${t.name}" no está alineado con "${DEFAULT_THEME}".`);
    if (falta.length) console.error(`  Le faltan: ${falta.join(', ')}`);
    if (sobra.length) console.error(`  Le sobran: ${sobra.join(', ')}`);
    process.exit(1);
  }
}

// ── Partir en colores (triplete HSL) y escalares (--radius) ──────────────
const colorNames = names.filter((n) => parseTriplet(raw[DEFAULT_THEME][n]) !== null).sort();
const scalarNames = names.filter((n) => !colorNames.includes(n)).sort();

for (const t of THEMES) {
  for (const n of colorNames) {
    if (!parseTriplet(raw[t.name][n])) {
      console.error(
        `✗ ${t.name}.--${n} = "${raw[t.name][n]}" no es un triplete HSL.\n` +
          `  Los tokens de color DEBEN ser "H S% L%" sin comas o Tailwind pierde\n` +
          `  el modificador de opacidad (bg-primary/10). Ver cabecera de lima.css.`
      );
      process.exit(1);
    }
  }
}

// ── Emitir ────────────────────────────────────────────────────────────────
const q = (s) => `'${s}'`;
const key = (s) => (/^[a-z][a-zA-Z0-9]*$/.test(s) ? s : `'${s}'`);

const lines = [];
lines.push('/* eslint-disable */');
lines.push('/**');
lines.push(' * GENERADO AUTOMÁTICAMENTE — NO EDITAR A MANO.');
lines.push(' * Fuente: styles/tokens/lima.css + styles/tokens/pino.css');
lines.push(' * Regenerar: node scripts/brand/tokens-to-ts.mjs');
lines.push(' *');
lines.push(' * Para qué sirve: todo lo que corre FUERA del navegador y por lo tanto no');
lines.push(' * puede leer var(--primary) — los generadores de imagen (OG / share cards),');
lines.push(' * los emails HTML y el payload de las notificaciones push — necesita el');
lines.push(' * color como hex literal. Este archivo es ese hex, derivado de los mismos');
lines.push(' * tripletes HSL que consume el CSS, así que nunca se desincroniza.');
lines.push(' *');
lines.push(' * En el navegador NO uses esto: usá las clases de Tailwind (bg-primary,');
lines.push(' * text-muted-foreground) o hsl(var(--x)), que sí siguen al data-theme.');
lines.push(' */');
lines.push('');
lines.push(`export const THEMES = [${THEMES.map((t) => q(t.name)).join(', ')}] as const;`);
lines.push('export type ThemeName = (typeof THEMES)[number];');
lines.push(`export const DEFAULT_THEME: ThemeName = ${q(DEFAULT_THEME)};`);
lines.push('');
lines.push('export function isThemeName(value: unknown): value is ThemeName {');
lines.push('  return typeof value === \'string\' && (THEMES as readonly string[]).includes(value);');
lines.push('}');
lines.push('');
lines.push('export type ColorToken =');
lines.push(colorNames.map((n) => `  | ${q(n)}`).join('\n') + ';');
lines.push('');

// hex
lines.push('/** Color final en hex (#RRGGBB). Para imágenes, emails y push. */');
lines.push('export const BRAND: Record<ThemeName, Record<ColorToken, string>> = {');
for (const t of THEMES) {
  lines.push(`  ${t.name}: {`);
  for (const n of colorNames) {
    const { h, s, l } = parseTriplet(raw[t.name][n]);
    lines.push(`    ${key(n)}: ${q(hslToHex(h, s, l))},`);
  }
  lines.push('  },');
}
lines.push('};');
lines.push('');

// tripletes
lines.push('/** Triplete HSL crudo ("146.8 51.4% 56.5%"). Para componer hsl(x / alfa). */');
lines.push('export const BRAND_HSL: Record<ThemeName, Record<ColorToken, string>> = {');
for (const t of THEMES) {
  lines.push(`  ${t.name}: {`);
  for (const n of colorNames) lines.push(`    ${key(n)}: ${q(raw[t.name][n])},`);
  lines.push('  },');
}
lines.push('};');
lines.push('');

// escalares
if (scalarNames.length) {
  lines.push('/** Tokens que no son color (radius, etc.), tal cual salen del CSS. */');
  lines.push(
    `export const BRAND_SCALARS: Record<ThemeName, Record<${scalarNames
      .map(q)
      .join(' | ')}, string>> = {`
  );
  for (const t of THEMES) {
    lines.push(`  ${t.name}: {`);
    for (const n of scalarNames) lines.push(`    ${key(n)}: ${q(raw[t.name][n])},`);
    lines.push('  },');
  }
  lines.push('};');
  lines.push('');
}

lines.push('/** Hex de un token para el tema pedido (por defecto, el de producción). */');
lines.push('export function brandColor(token: ColorToken, theme: ThemeName = DEFAULT_THEME): string {');
lines.push('  return BRAND[theme][token];');
lines.push('}');
lines.push('');
lines.push('/** Color con alfa, listo para canvas/SVG: rgba() derivado del hex. */');
lines.push(
  'export function brandAlpha(token: ColorToken, alpha: number, theme: ThemeName = DEFAULT_THEME): string {'
);
lines.push('  const hex = BRAND[theme][token];');
lines.push('  const r = parseInt(hex.slice(1, 3), 16);');
lines.push('  const g = parseInt(hex.slice(3, 5), 16);');
lines.push('  const b = parseInt(hex.slice(5, 7), 16);');
lines.push('  return `rgba(${r}, ${g}, ${b}, ${alpha})`;');
lines.push('}');
lines.push('');

const output = lines.join('\n');

if (process.argv.includes('--check')) {
  const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
  if (current !== output) {
    console.error('✗ lib/theme/brand.ts está desactualizado respecto de los tokens CSS.');
    console.error('  Corré: node scripts/brand/tokens-to-ts.mjs');
    process.exit(1);
  }
  console.log('✓ brand.ts al día.');
  process.exit(0);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, output);
console.log(
  `✓ lib/theme/brand.ts — ${THEMES.length} temas × ${colorNames.length} colores` +
    (scalarNames.length ? ` + ${scalarNames.length} escalar(es)` : '')
);
