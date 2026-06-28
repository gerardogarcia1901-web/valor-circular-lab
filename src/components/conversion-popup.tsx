import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/piv-content";
import reciclinAsset from "@/assets/reciclin.png.asset.json";

const STORAGE_KEY = "piv_conversion_popup_dismissed";

export function ConversionPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {}

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
    };

    const timer = window.setTimeout(show, 20000);

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      if (scrolled >= 0.5) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in md:items-center"
      onClick={dismiss}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-scale-in"
      >
        <button
          onClick={dismiss}
          aria-label="Cerrar"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[var(--brand-navy)] shadow-md transition-transform hover:scale-110 active:scale-95"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
          <div
            className="relative flex items-end justify-center overflow-hidden p-4 pt-8 md:p-6"
            style={{
              background:
                "radial-gradient(circle at 50% 80%, var(--brand-lime) 0%, var(--brand-sky) 55%, var(--brand-teal) 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,white_0%,transparent_45%),radial-gradient(circle_at_80%_30%,white_0%,transparent_40%)]" />
            <img
              src={reciclinAsset.url}
              alt="Reciclin, mascota de Parque Industrial Verde"
              className="relative h-56 w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] md:h-72 animate-[reciclin-float_3.6s_ease-in-out_infinite]"
            />
          </div>
          <div className="space-y-5 p-6 md:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-lime)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--brand-ink)]">
              <Sparkles className="h-3 w-3" /> Hola, soy Reciclin
            </span>
            <h3 className="text-balance text-3xl font-semibold tracking-tight text-[var(--brand-navy)] md:text-4xl">
              ¿Quisieras ser parte del cambio?
            </h3>
            <p className="text-sm leading-7 text-foreground/75">
              Sumate a la economía circular: recolectamos, clasificamos y damos nueva
              vida a tus materiales con trazabilidad real.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a href={whatsappHref} target="_blank" rel="noreferrer" onClick={dismiss}>
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Quiero participar
                </Button>
              </a>
              <button onClick={dismiss} type="button">
                <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                  <span>Ahora no</span>
                </Button>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
