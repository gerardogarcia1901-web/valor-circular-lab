import { useEffect, useState } from "react";
import { X } from "lucide-react";
import reciclinAsset from "@/assets/reciclin.png.asset.json";

const SHOWN_KEY = "piv_reciclin_helper_shown";

export function ReciclinHelper() {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setOpen(true);
      try {
        if (sessionStorage.getItem(SHOWN_KEY) === "1") setBubble(false);
        else sessionStorage.setItem(SHOWN_KEY, "1");
      } catch {}
      // auto-hide bubble after a few seconds
      const t2 = window.setTimeout(() => setBubble(false), 8000);
      return () => window.clearTimeout(t2);
    }, 4500);
    return () => window.clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 flex items-end gap-2 md:bottom-6 md:left-6">
      <button
        type="button"
        onClick={() => setBubble((v) => !v)}
        aria-label="Reciclin"
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
      </button>

      {bubble && (
        <div className="pointer-events-auto relative max-w-[16rem] rounded-2xl border border-[var(--brand-navy)]/10 bg-white px-4 py-3 text-sm leading-6 text-[var(--brand-navy)] shadow-xl animate-fade-in">
          <button
            type="button"
            onClick={() => setBubble(false)}
            aria-label="Cerrar"
            className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-[var(--brand-navy)] text-white shadow"
          >
            <X className="h-3 w-3" />
          </button>
          <p>
            <strong className="text-[var(--brand-teal)]">¡Hola! Soy Reciclin.</strong>{" "}
            ¿Te ayudo a reciclar con tu empresa o comunidad?
          </p>
          <span
            aria-hidden
            className="absolute -left-1.5 bottom-4 h-3 w-3 rotate-45 border-b border-l border-[var(--brand-navy)]/10 bg-white"
          />
        </div>
      )}
    </div>
  );
}
