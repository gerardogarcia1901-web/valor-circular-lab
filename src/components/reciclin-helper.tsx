import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import reciclinAsset from "@/assets/reciclin.png.asset.json";
import { whatsappHref } from "@/lib/piv-content";

const SHOWN_KEY_PREFIX = "piv_reciclin_helper_shown:";

const messagesByRoute: Record<string, { title: string; body: string }> = {
  "/": {
    title: "¡Hola! Soy Reciclin",
    body: "¿Querés ser parte del cambio? Escribime y te conecto con el equipo.",
  },
  "/sobre-nosotros": {
    title: "+23 años recuperando",
    body: "¿Te cuento cómo nació Parque Industrial Verde? Tap aquí para chatear.",
  },
  "/servicios": {
    title: "¿Qué servicio necesitás?",
    body: "Recolección, destrucción certificada o desalojo: te ayudo a cotizar.",
  },
  "/materiales": {
    title: "¿Qué material reciclás?",
    body: "PET, cartón, metales, papel… ¡pregúntame por tu material!",
  },
  "/rse": {
    title: "Sumate al impacto",
    body: "Comunidad, educación y trazabilidad. ¿Conversamos sobre RSE?",
  },
  "/contacto": {
    title: "¡Estoy a un clic!",
    body: "Escribime por WhatsApp y respondemos enseguida.",
  },
};

export function ReciclinHelper() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);

  const msg = useMemo(
    () => messagesByRoute[pathname] ?? messagesByRoute["/"],
    [pathname],
  );

  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  // Show bubble once per route per session
  useEffect(() => {
    if (!open) return;
    const key = SHOWN_KEY_PREFIX + pathname;
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(key) === "1";
    } catch {}
    if (alreadyShown) return;
    setBubble(true);
    try {
      sessionStorage.setItem(key, "1");
    } catch {}
    const t = window.setTimeout(() => setBubble(false), 9000);
    return () => window.clearTimeout(t);
  }, [pathname, open]);

  if (!open) return null;

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 flex items-end gap-2 md:bottom-6 md:left-6">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chatea con Reciclin por WhatsApp"
        className="pointer-events-auto group relative grid h-16 w-16 place-items-center rounded-full bg-[var(--brand-lime)] shadow-[0_14px_30px_-10px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1 hover:scale-105 md:h-20 md:w-20"
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[var(--brand-lime)] opacity-60"
          style={{ animation: "pulse-ring 2.4s ease-out infinite" }}
        />
        <img
          src={reciclinAsset.url}
          alt="Reciclin"
          className="relative h-[88%] w-auto object-contain"
          style={{ animation: "reciclin-float 4s ease-in-out infinite" }}
        />
      </a>

      {bubble && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto relative block max-w-[17rem] rounded-2xl border border-[var(--brand-navy)]/10 bg-white px-4 py-3 text-sm leading-6 text-[var(--brand-navy)] shadow-xl transition-transform hover:-translate-y-0.5 animate-fade-in"
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setBubble(false);
            }}
            aria-label="Cerrar"
            className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-[var(--brand-navy)] text-white shadow"
          >
            <X className="h-3 w-3" />
          </button>
          <p className="font-bold text-[var(--brand-teal)]">{msg.title}</p>
          <p className="mt-0.5">{msg.body}</p>
          <span className="mt-1 inline-block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--brand-lime-strong,var(--brand-teal))]">
            Tap para WhatsApp →
          </span>
          <span
            aria-hidden
            className="absolute -left-1.5 bottom-4 h-3 w-3 rotate-45 border-b border-l border-[var(--brand-navy)]/10 bg-white"
          />
        </a>
      )}
    </div>
  );
}
