/**
 * Opacidad sobre un color que NO es hex.
 *
 * El patrón viejo era concatenar el alfa al hex: `${color}40`. Eso sólo
 * funciona si `color` es un hex de 6 dígitos. Desde que los colores son
 * tokens del design system (`hsl(var(--info))`), `${color}40` produce
 * `hsl(var(--info))40`, que es CSS inválido: el navegador **descarta la
 * declaración entera sin avisar**. Ahí no se ve un error, se ve otra cosa —
 * un `border-2` sin `borderColor` cae a `currentColor` y la tarjeta aparece
 * con borde blanco.
 *
 * `color-mix` acepta cualquier notación de color, así que sirve igual para
 * un token, un hex o un `hsl()` literal.
 *
 * @param color cualquier color CSS válido
 * @param pct   opacidad 0-100
 */
export function alfa(color: string, pct: number): string {
  return `color-mix(in srgb, ${color} ${pct}%, transparent)`;
}
