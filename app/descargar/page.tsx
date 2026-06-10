'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const IOS = 'https://apps.apple.com/ar/app/padelero/id6768067562';
const ANDROID = 'https://play.google.com/store/apps/details?id=com.padelero.app';
const WEB = 'https://app.padelero.app';

/**
 * /descargar — detecta el sistema del celular y redirige a la tienda que
 * corresponde (App Store / Google Play). En desktop u otros, abre la web app.
 * Es el destino del QR de la landing: un solo código que lleva a cada uno a
 * donde tiene que bajar la app.
 */
export default function Descargar() {
  const [redirigiendo, setRedirigiendo] = useState(true);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || '';
    const esAndroid = /android/i.test(ua);
    const esIOS =
      /iphone|ipad|ipod/i.test(ua) ||
      // iPadOS 13+ se reporta como Mac con touch
      (/macintosh/i.test(ua) && typeof document !== 'undefined' && 'ontouchend' in document);

    const dest = esAndroid ? ANDROID : esIOS ? IOS : WEB;
    // Pequeño delay para que se vea la marca antes de saltar.
    const t = setTimeout(() => {
      window.location.replace(dest);
    }, 700);
    // Si en 2.5s seguimos acá (popup bloqueado, etc.), mostramos las opciones.
    const t2 = setTimeout(() => setRedirigiendo(false), 2500);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-6 text-center">
      <Image src="/logo.png" alt="Padelero" width={56} height={56} className="rounded-2xl mb-5" />
      <h1 className="text-2xl font-black tracking-tight">Descargá Padelero</h1>
      <p className="text-zinc-400 mt-2 text-sm">
        {redirigiendo ? 'Te estamos llevando a tu tienda…' : 'Elegí dónde querés bajar la app:'}
      </p>

      <div className="flex flex-col gap-3 mt-7 w-full max-w-xs">
        <a href={IOS} className="flex items-center justify-center gap-2 bg-white text-black font-bold py-3.5 rounded-2xl hover:bg-zinc-200 transition-colors">
          App Store
        </a>
        <a href={ANDROID} className="flex items-center justify-center gap-2 bg-white text-black font-bold py-3.5 rounded-2xl hover:bg-zinc-200 transition-colors">
          Google Play
        </a>
        <a href={WEB} className="flex items-center justify-center gap-2 border border-white/20 bg-white/5 text-white font-semibold py-3.5 rounded-2xl hover:bg-white/10 transition-colors">
          Usar en la web
        </a>
      </div>

      <p className="text-zinc-600 text-xs mt-8">padelero.app</p>
    </main>
  );
}
