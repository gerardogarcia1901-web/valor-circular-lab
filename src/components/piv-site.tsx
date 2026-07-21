import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AlertTriangle, ArrowUpRight, Award, Clock3, Droplets, Factory, Globe2, Layers3, MapPinned, Menu as MenuIcon, MessageCircle, MoveRight, Phone, Recycle, ShieldCheck, Sparkles, Sun, TrendingUp, Users, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroAsset from "@/assets/hero-1.png.asset.json";
import heroAboutAsset from "@/assets/piv-hero-v2.png.asset.json";
import propositoAsset from "@/assets/proposito.png.asset.json";
import logoAsset from "@/assets/piv-logo.png.asset.json";
import reciclinAsset from "@/assets/reciclin.png.asset.json";
import { ReciclinMascot } from "@/components/reciclin-mascot";
import { ConversionPopup } from "@/components/conversion-popup";
import { ReciclinHelper } from "@/components/reciclin-helper";
import { PartnersStrip } from "@/components/partners-strip";


import operationsAsset from "@/assets/piv-operations.jpg.asset.json";
import metalsAsset from "@/assets/piv-metals.jpg.asset.json";
import materialsHeroAsset from "@/assets/materiales-hero.jpg.asset.json";
import materialsMetalsPhotoAsset from "@/assets/materiales-metales-photo.png.asset.json";
import kidsAsset from "@/assets/piv-kids.jpg.asset.json";
import impactGraphicAsset from "@/assets/piv-impact-graphic.jpg.asset.json";
import teamAsset from "@/assets/piv-team.png.asset.json";
import materialPlasticAsset from "@/assets/materiales-plasticos.jpg.asset.json";
import materialPaperAsset from "@/assets/materiales-papel.jpg.asset.json";
import materialRaeeAsset from "@/assets/materiales-raee.jpg.asset.json";
import alcanceAsset from "@/assets/alcance.jpg.asset.json";
import rseHeroAsset from "@/assets/rse-hero.jpg.asset.json";
import reciclaGana1 from "@/assets/rse/recicla-y-gana-1.jpg.asset.json";
import reciclaGana2 from "@/assets/rse/recicla-y-gana-2.jpg.asset.json";
import reciclaGana3 from "@/assets/rse/recicla-y-gana-3.jpg.asset.json";
import campanasEmpresariales1 from "@/assets/rse/campanas-empresariales-1.jpg.asset.json";
import campanasEmpresariales2 from "@/assets/rse/campanas-empresariales-2.jpg.asset.json";
import campanasEmpresariales3 from "@/assets/rse/campanas-empresariales-3.jpg.asset.json";
import campanasEmpresariales4 from "@/assets/rse/campanas-empresariales-4.png.asset.json";
import campanasEmpresariales5 from "@/assets/rse/campanas-empresariales-5.png.asset.json";
import campanasEducativas1 from "@/assets/rse/campanas-educativas-1.jpg.asset.json";
import campanasEducativas2 from "@/assets/rse/campanas-educativas-2.jpg.asset.json";
import campanasEmpresarialesServiciosAsset from "@/assets/campanas-empresariales-servicios.png.asset.json";
import prepLimpiosAsset from "@/assets/preparacion/preparacion-limpios.jpg.asset.json";
import prepSecosAsset from "@/assets/preparacion/preparacion-secos.jpg.asset.json";
import prepSeparadosAsset from "@/assets/preparacion/preparacion-separados.jpg.asset.json";
import servicio1Asset from "@/assets/services/servicio-1.jpg.asset.json";
import servicio2Asset from "@/assets/services/servicio-2.jpg.asset.json";
import servicio3Asset from "@/assets/services/servicio-3.jpg.asset.json";
import servicio4Asset from "@/assets/services/servicio-4.jpg.asset.json";
import servicio5Asset from "@/assets/services/servicio-5.jpg.asset.json";
import servicio6Asset from "@/assets/services/servicio-6.jpg.asset.json";
import servicio7Asset from "@/assets/services/servicio-7.jpg.asset.json";
import servicio8Asset from "@/assets/services/servicio-8.jpg.asset.json";
import servicio9Asset from "@/assets/services/servicio-9.jpg.asset.json";
import servicio10Asset from "@/assets/services/servicio-10.jpg.asset.json";
import insemaLogo from "@/assets/timeline/insema-logo.png.asset.json";
import zartexLogo from "@/assets/timeline/zartex-logo.png.asset.json";
import pivLogoFull from "@/assets/timeline/piv-logo-full.png.asset.json";
import insema1 from "@/assets/timeline/insema-1.jpg.asset.json";
import insema2 from "@/assets/timeline/insema-2.jpg.asset.json";
import zartex1 from "@/assets/timeline/zartex-1.jpg.asset.json";
import zartex2 from "@/assets/timeline/zartex-2.jpg.asset.json";
import piv1 from "@/assets/timeline/piv-1.jpg.asset.json";
import {
  
  audience,
  
  disposalMaterials,
  emailLink,
  enterpriseBenefits,
  enterpriseServices,
  exportRegions,
  faqs,
  featuredServices,
  impactMetrics,
  locations,
  materialGroups,
  phoneLinks,
  pivStats,
  preparationSteps,
  socialLinks,
  timeline,
  whatsappHref,
} from "@/lib/piv-content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

gsap.registerPlugin(ScrollTrigger);

const navigation = [
  { label: "Inicio", to: "/" },
  { label: "Sobre Nosotros", to: "/sobre-nosotros" },
  { label: "Servicios", to: "/servicios" },
  { label: "Materiales", to: "/materiales" },
  { label: "RSE", to: "/rse" },
  { label: "Contacto", to: "/contacto" },
] as const;

const materialVisuals: Record<string, { image: string; alt: string; summary: string }> = {
  Plásticos: {
    image: materialPlasticAsset.url,
    alt: "Plásticos PET y HDPE clasificados para reciclaje industrial",
    summary: "Envases y resinas listas para clasificación.",
  },
  "No Ferrosos": {
    image: materialsMetalsPhotoAsset.url,
    alt: "Latas, aluminio, cobre y bronce clasificados en Parque Industrial Verde",
    summary: "Aluminio, cobre y bronce con ruta de valorización.",
  },
  Ferrosos: {
    image: metalsAsset.url,
    alt: "Materiales ferrosos: hierro lata y hierro sólido en planta de recuperación",
    summary: "Hierro lata y hierro sólido listos para valorización.",
  },
  "Papel y Cartón": {
    image: materialPaperAsset.url,
    alt: "Papel y cartón limpio agrupado para recuperación",
    summary: "Cartón y papel limpio para reincorporar a la cadena.",
  },
  RAEE: {
    image: materialRaeeAsset.url,
    alt: "Residuos electrónicos organizados para disposición responsable",
    summary: "Electrónicos y componentes con manejo especializado.",
  },
};

const rseCampaignSections = [
  {
    id: "recicla-y-gana",
    title: "Recicla y Gana",
    kicker: "Participación comunitaria",
    description: "Jornadas donde cada entrega de material se convierte en acción visible.",
    photos: [
      { url: reciclaGana1.url, alt: "Participante entregando latas en campaña Recicla y Gana" },
      { url: reciclaGana2.url, alt: "Participante con materiales plásticos durante Recicla y Gana" },
      { url: reciclaGana3.url, alt: "Materiales recuperados en sacos durante Recicla y Gana" },
    ],
  },
  {
    id: "campanas-empresariales",
    title: "Campañas Empresariales",
    kicker: "Activaciones corporativas",
    description: "Operación, marca y trazabilidad para que las empresas movilicen a sus equipos.",
    photos: [
      { url: campanasEmpresariales5.url, alt: "Campaña empresarial con materiales electrónicos recolectados" },
      { url: campanasEmpresariales3.url, alt: "Equipo empresarial en punto de recolección de Parque Industrial Verde" },
      { url: campanasEmpresariales2.url, alt: "Mesa informativa de Parque Industrial Verde en campaña empresarial" },
      { url: campanasEmpresariales1.url, alt: "Entrega de residuos electrónicos en campaña empresarial" },
      { url: campanasEmpresariales4.url, alt: "Entrega de plantas en campaña empresarial" },
    ],
  },
  {
    id: "campanas-educativas",
    title: "Campañas Educativas",
    kicker: "Aprendizaje ambiental",
    description: "Experiencias simples y memorables para convertir información en hábitos reales.",
    photos: [
      { url: campanasEducativas1.url, alt: "Persona participando en campaña educativa ambiental" },
      { url: campanasEducativas2.url, alt: "Participante con residuos electrónicos en campaña educativa" },
    ],
  },
] as const;


function usePremiumMotion(scopeRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-kicker]", { y: 36, opacity: 0, duration: 0.9, ease: "power3.out" });
      gsap.from("[data-hero-title]", { y: 48, opacity: 0, duration: 1.1, delay: 0.12, ease: "power3.out" });
      gsap.from("[data-hero-copy]", { y: 32, opacity: 0, duration: 1, delay: 0.22, ease: "power2.out" });
      gsap.from("[data-hero-actions]", { y: 28, opacity: 0, duration: 0.9, delay: 0.3, ease: "power2.out" });
      gsap.from("[data-hero-stat]", {
        y: 18,
        scale: 0.98,
        stagger: 0.06,
        duration: 0.65,
        delay: 0.3,
        ease: "power2.out",
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 52,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            scrub: true,
          },
        });
      });
    }, scope);

    return () => ctx.revert();
  }, [scopeRef]);
}

function useCountUp(target: number) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;
    const state = { value: 0 };
    let tween: gsap.core.Tween;
    tween = gsap.to(state, {
      value: target,
      duration: 1.8,
      ease: "power2.out",
      paused: true,
      onUpdate: () => setValue(Math.round(state.value)),
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
        onEnter: () => tween && tween.play(),
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target]);

  return { ref, value };
}

function formatMetric(value: number) {
  return new Intl.NumberFormat("es-SV").format(value);
}

function PageShell({ children }: { children: ReactNode }) {
  const pageRef = useRef<HTMLElement | null>(null);
  usePremiumMotion(pageRef);

  return (
    <div className="bg-background text-foreground">
      <SiteHeader />
      <main ref={pageRef}>{children}</main>
      
      <SiteFooter />
      <WhatsAppBubble />
      <ReciclinHelper />
      <ConversionPopup />
    </div>
  );
}



function SiteHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="relative mx-auto flex w-[min(1280px,calc(100%-2rem))] items-center justify-between gap-3 rounded-2xl px-3 py-2 md:px-5 md:py-3">
        <div
          className={cn(
            "absolute inset-0 -z-10 rounded-2xl transition-all duration-500",
            scrolled || mobileOpen
              ? "bg-white/90 backdrop-blur-xl shadow-[var(--shadow-elevated)] border border-white/40"
              : "bg-transparent",
          )}
        />
        <Link to="/" className="shrink-0 -my-4 md:-my-10 lg:-my-12" aria-label="Parque Industrial Verde, ir al inicio">
          <img
            src={logoAsset.url}
            alt="Parque Industrial Verde"
            className={cn(
              "h-16 w-auto object-contain transition-all duration-500 md:h-36 lg:h-44",
              scrolled || mobileOpen ? "" : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]",
            )}
          />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] transition-colors",
                  scrolled
                    ? isActive
                      ? "bg-[var(--brand-navy)] text-white"
                      : "text-[var(--brand-navy)] hover:bg-[var(--brand-sky)]/50"
                    : isActive
                      ? "bg-[var(--brand-lime)] text-[var(--brand-ink)]"
                      : "text-white hover:bg-white/15 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="hidden md:block">
            <Button variant="hero" size="sm">Cotizar</Button>
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--brand-navy)]/20 bg-white text-[var(--brand-navy)] shadow-[0_6px_18px_-6px_rgba(0,0,0,0.35)] transition-colors hover:bg-[var(--brand-lime)]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-white/50 bg-white/95 p-3 shadow-[var(--shadow-elevated)] backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col">
              {navigation.map((item) => {
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] transition-colors",
                      isActive
                        ? "bg-[var(--brand-navy)] text-white"
                        : "text-[var(--brand-navy)] hover:bg-[var(--brand-sky)]/40",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-2"
                onClick={() => setMobileOpen(false)}
              >
                <Button variant="hero" size="lg" className="w-full">Cotizar por WhatsApp</Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 py-10 text-white"
      style={{
        background:
          "linear-gradient(120deg, #0f3d3a 0%, #12526A 40%, #1e3a5f 75%, #273655 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(50% 40% at 10% 15%, rgba(195,235,87,0.14) 0%, transparent 60%), radial-gradient(45% 40% at 90% 90%, rgba(182,205,255,0.14) 0%, transparent 65%)",
        }}
      />
      <div className="relative mx-auto w-[min(1280px,calc(100%-2rem))] grid gap-8 md:grid-cols-4 md:items-start">
        <div className="space-y-3">
          <img src={logoAsset.url} alt="Parque Industrial Verde" className="h-16 w-auto object-contain md:h-20" loading="lazy" />
          <p className="text-xs leading-6 text-white/70 max-w-[16rem]">
            Economía circular con escala industrial en El Salvador.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--brand-lime)]">Navegación</p>
          <div className="grid gap-1.5 text-[0.78rem]">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to} className="story-link w-fit font-semibold uppercase tracking-[0.12em] text-white/90">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--brand-lime)]">Contacto</p>
          <div className="flex flex-col gap-1.5 text-[0.85rem] text-white/85">
            {phoneLinks.map((item) => (
              <a key={item.href} href={item.href} className="story-link w-fit">{item.label}</a>
            ))}
            <a href={emailLink.href} className="story-link w-fit break-all text-[0.78rem]">{emailLink.label}</a>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--brand-lime)]">Redes</p>
          <div className="grid gap-1.5 text-[0.78rem]">
            {socialLinks.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="story-link w-fit font-semibold uppercase tracking-[0.12em] text-white/90">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-8 w-[min(1280px,calc(100%-2rem))] border-t border-white/10 pt-4 text-[0.7rem] text-white/60">
        © {new Date().getFullYear()} Parque Industrial Verde. Todos los derechos reservados.
      </div>
    </footer>
  );
}

function WhatsAppBubble() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir a WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full border border-primary/30 bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-1"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

function Section({ eyebrow, title, description, children, className, titleClassName, containerClassName }: { eyebrow?: string; title: string; description?: ReactNode; children?: ReactNode; className?: string; titleClassName?: string; containerClassName?: string; }) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto w-[min(1280px,calc(100%-2rem))]">
        <div data-reveal className={cn("max-w-3xl space-y-5", containerClassName)}>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className={cn("text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl", titleClassName)}>{title}</h2>
          {description ? <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function MetricCard({ value, prefix, suffix, description, tone }: { value: number; prefix?: string; suffix?: string; description: string; tone?: { bg: string; fg: string; accent: string; muted: string; }; }) {
  const { ref, value: liveValue } = useCountUp(value);
  const t = tone ?? {
    bg: "var(--brand-sky)",
    fg: "var(--brand-navy)",
    accent: "var(--brand-teal)",
    muted: "color-mix(in oklab, var(--brand-navy) 70%, white)",
  };
  return (
    <article
      ref={ref}
      data-reveal
      className="metric-card"
      style={{ background: t.bg, color: t.fg, borderColor: "transparent" }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-4xl font-semibold leading-none tracking-tight md:text-5xl" style={{ color: t.fg }}>
          {prefix}
          {formatMetric(liveValue)}
        </span>
        {suffix && (
          <span className="text-base font-medium leading-tight tracking-tight md:text-lg" style={{ color: t.accent }}>
            {suffix.trim()}
          </span>
        )}
      </div>
      <p className="max-w-sm text-sm leading-7" style={{ color: t.muted }}>{description}</p>
    </article>
  );
}

function HeroStats() {
  const icons = [Award, Recycle, Globe2];
  const tones = [
    {
      bg: "linear-gradient(145deg, #C3EB57 0%, #DCF97D 100%)",
      fg: "var(--brand-ink)",
      chip: "var(--brand-ink)",
      chipFg: "var(--brand-lime)",
      accent: "var(--brand-teal)",
      border: "rgba(195,235,87,0.9)",
    },
    {
      bg: "linear-gradient(145deg, #FFFFFF 0%, #ECF3FF 100%)",
      fg: "var(--brand-navy)",
      chip: "var(--brand-teal)",
      chipFg: "#ffffff",
      accent: "var(--brand-teal)",
      border: "rgba(255,255,255,0.92)",
    },
    {
      bg: "linear-gradient(145deg, #273655 0%, #12526A 100%)",
      fg: "#ffffff",
      chip: "var(--brand-lime)",
      chipFg: "var(--brand-ink)",
      accent: "var(--brand-lime)",
      border: "rgba(195,235,87,0.4)",
    },
  ];
  return (
    <div className="relative lg:self-end">
      <img
        src={reciclinAsset.url}
        alt="Reciclin, mascota de Parque Industrial Verde"
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 z-10 hidden h-44 w-auto drop-shadow-[0_14px_30px_rgba(0,0,0,0.5)] animate-[reciclin-float_4s_ease-in-out_infinite] md:block lg:-top-40 lg:h-56"
      />
      <div className="grid gap-3 sm:grid-cols-3 md:gap-4">
        {pivStats.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <HeroStatCard
              key={item.label}
              item={item}
              Icon={Icon}
              index={i}
              tone={tones[i % tones.length]}
            />
          );
        })}
      </div>
    </div>
  );
}

function HeroStatCard({
  item,
  Icon,
  index,
  tone,
}: {
  item: (typeof pivStats)[number];
  Icon: React.ComponentType<{ className?: string }>;
  index: number;
  tone: { bg: string; fg: string; chip: string; chipFg: string; accent: string; border: string };
}) {
  const { ref, value } = useCountUp(item.value);
  return (
    <div
      ref={ref}
      data-hero-stat
      className="group relative isolate grid min-h-[10.5rem] content-between overflow-hidden rounded-[1.35rem] border p-4 opacity-100 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] md:min-h-[11rem] xl:min-h-[11.5rem]"
      style={{
        background: tone.bg,
        color: tone.fg,
        borderColor: tone.border,
        opacity: 1,
        boxShadow:
          "0 28px 70px -22px rgba(0,0,0,0.68), 0 0 0 1px rgba(255,255,255,0.28) inset, inset 0 1px 0 rgba(255,255,255,0.55)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-5 -top-8 -z-10 text-[6rem] font-black leading-none text-current opacity-[0.14] transition-transform duration-500 group-hover:scale-110"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-75 rounded-full transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: tone.accent }}
      />

      <div className="relative flex items-center justify-between">
        <span
          className="grid h-10 w-10 place-items-center rounded-2xl shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
          style={{ background: tone.chip, color: tone.chipFg }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span
          className="rounded-full px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.18em] shadow-sm"
          style={{ background: tone.chip, color: tone.chipFg }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div>
      <p className="relative mt-4 flex items-baseline gap-1 font-black tracking-tight">
        <span className="text-2xl md:text-3xl" style={{ color: tone.accent }}>
          {item.prefix}
        </span>
        <span
          className="whitespace-nowrap tabular-nums text-4xl leading-none md:text-5xl xl:text-6xl"
          style={{ color: tone.fg }}
        >
          {formatMetric(value)}
        </span>
      </p>
      <p
        className="relative mt-1 text-xs font-black uppercase tracking-[0.14em] md:text-sm"
        style={{ color: tone.accent }}
      >
        {item.suffix}
      </p>

      <span
        aria-hidden
        className="relative mt-3 block h-[3px] w-14 origin-left rounded-full transition-all duration-500 group-hover:w-24"
        style={{ background: tone.accent }}
      />
      <p
        className="relative mt-3 text-xs font-bold leading-5 md:text-[0.82rem] xl:text-sm"
        style={{ color: tone.fg }}
      >
        {item.label}
      </p>
      </div>
    </div>
  );
}




function ElSalvadorMap() {
  // Simplified but recognizable El Salvador silhouette (viewBox 0 0 1000 420).
  // Coordinates approximated so pins align with real departments (west→east).
  const pins = [
    { name: "Santa Ana", x: 205, y: 175, sub: "Occidente" },
    { name: "San Salvador", x: 495, y: 210, sub: "Sede central" },
    { name: "La Paz", x: 615, y: 290, sub: "Costa del Sol" },
  ];
  const countryPath =
    "M40,205 C90,150 170,120 260,118 C330,116 380,145 430,140 C500,132 560,110 640,115 C720,120 800,140 870,175 C925,200 965,225 960,265 C950,315 895,345 820,355 C755,363 705,345 640,340 C560,335 500,360 430,362 C355,363 295,345 235,345 C175,345 115,335 75,300 C45,275 25,240 40,205 Z";
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2.5rem] opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, color-mix(in oklab, var(--brand-lime) 25%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-white/90 p-4 shadow-[var(--shadow-elevated)] backdrop-blur md:p-6">
        <div className="mb-3 flex items-center justify-between text-[0.65rem] font-black uppercase tracking-[0.24em] text-[var(--brand-navy)]">
          <span>El Salvador</span>
          <span className="rounded-full bg-[var(--brand-lime)] px-2.5 py-1 text-[var(--brand-ink)]">Cobertura activa</span>
        </div>
        <svg viewBox="0 0 1000 420" className="h-auto w-full" role="img" aria-label="Mapa de cobertura en El Salvador">
          <defs>
            <linearGradient id="es-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#12526A" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#273655" stopOpacity="0.24" />
            </linearGradient>
            <radialGradient id="pin-glow">
              <stop offset="0%" stopColor="#C3EB57" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#C3EB57" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d={countryPath} fill="url(#es-fill)" stroke="#12526A" strokeWidth="2.5" strokeOpacity="0.7" strokeLinejoin="round" />
          {pins.map((p) => (
            <g key={p.name}>
              <circle cx={p.x} cy={p.y} r="34" fill="url(#pin-glow)">
                <animate attributeName="r" values="20;40;20" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.6s" repeatCount="indefinite" />
              </circle>
              <circle cx={p.x} cy={p.y} r="9" fill="#C3EB57" stroke="#273655" strokeWidth="2.5" />
              <text x={p.x + 16} y={p.y - 2} fontSize="18" fontWeight="800" fill="#273655" style={{ fontFamily: "var(--font-display)" }}>{p.name}</text>
              <text x={p.x + 16} y={p.y + 16} fontSize="12" fontWeight="600" fill="#12526A" style={{ fontFamily: "var(--font-display)" }}>{p.sub}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}


function AudienceStrip() {
  return (
    <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {audience.map((item, i) => (
        <article
          key={item}
          data-reveal
          className="group relative isolate overflow-hidden rounded-2xl border border-[var(--brand-navy)]/10 bg-white p-5 shadow-[var(--shadow-elevated)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--brand-lime)]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -top-4 text-[4.5rem] font-black leading-none tracking-tighter text-[var(--brand-navy)]/[0.06]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[var(--brand-teal)]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-3 text-lg font-semibold leading-snug tracking-tight text-[var(--brand-navy)] md:text-xl">
            {item}
          </p>
          <span
            aria-hidden
            className="mt-4 block h-[3px] w-10 origin-left rounded-full bg-[var(--brand-lime)] transition-all duration-500 group-hover:w-20"
          />
        </article>
      ))}
    </div>
  );
}


const SERVICE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "Recuperación de materiales": Recycle,
  "Educación ambiental": Award,
  "Gestión integral de residuos": ShieldCheck,
  "Trazabilidad digital": Globe2,
  "Apoyo en campañas": MessageCircle,
  "Charlas ambientales": Award,
  "Recolección a domicilio": MapPinned,
  "Certificados de destrucción": ShieldCheck,
  "Desalojo de bodegas": MoveRight,
  "Destrucción de maquinaria": Clock3,
};

const SERVICE_TAGLINES: Record<string, string> = {
  "Recuperación de materiales": "Plásticos, metales, papel y RAEE.",
  "Educación ambiental": "Programas y talleres a medida.",
  "Gestión integral de residuos": "Diagnóstico, rutas y reportes.",
  "Trazabilidad digital": "Evidencia auditable end-to-end.",
  "Apoyo en campañas": "Activaciones y jornadas operativas.",
  "Charlas ambientales": "Sesiones para equipos y aliados.",
  "Recolección a domicilio": "Rutas programadas a tu medida.",
  "Certificados de destrucción": "Cumplimiento y auditoría.",
  "Desalojo de bodegas": "Liberación responsable de espacios.",
  "Destrucción de maquinaria": "Disposición segura de equipos.",
};

const SERVICE_IMAGES: string[] = [
  servicio1Asset.url,
  servicio2Asset.url,
  servicio3Asset.url,
  servicio4Asset.url,
  servicio5Asset.url,
  servicio6Asset.url,
  servicio7Asset.url,
  servicio8Asset.url,
  servicio9Asset.url,
  servicio10Asset.url,
];

function ServicesGrid() {
  const [index, setIndex] = useState(0);
  const total = featuredServices.length;
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused, total]);

  const go = (dir: number) => setIndex((prev) => (prev + dir + total) % total);
  const service = featuredServices[index];
  const tagline = SERVICE_TAGLINES[service.title] ?? "";

  return (
    <div
      className="mt-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-elevated)]" style={{ background: "var(--brand-ink)" }}>
        <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
          {SERVICE_IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={featuredServices[i].title}
              className={cn(
                "absolute inset-0 h-full w-full transition-opacity duration-[900ms] ease-out",
                i === 1 ? "object-contain" : "object-cover",
                i === index ? "opacity-100" : "opacity-0",
              )}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,13,13,0.15) 0%, rgba(13,13,13,0.35) 45%, rgba(13,13,13,0.85) 100%)",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 text-white sm:p-10 md:p-14">
            <h3 className="max-w-3xl text-balance text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {service.title}
            </h3>
            {tagline ? (
              <p className="max-w-2xl text-sm font-semibold uppercase tracking-[0.18em] opacity-90 sm:text-base">
                {tagline}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Servicio anterior"
            className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30 sm:left-6 sm:h-12 sm:w-12"
          >
            <MoveRight className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Siguiente servicio"
            className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30 sm:right-6 sm:h-12 sm:w-12"
          >
            <MoveRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto px-4 py-4 sm:px-6" style={{ background: "color-mix(in oklab, var(--brand-ink) 92%, black)" }}>
          {featuredServices.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition",
                i === index
                  ? "border-transparent text-[var(--brand-ink)]"
                  : "border-white/20 text-white/70 hover:text-white",
              )}
              style={i === index ? { background: "var(--brand-lime)" } : undefined}
            >
              {String(i + 1).padStart(2, "0")} · {s.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


function EnterpriseCommunity() {
  return (
    <section className="border-y border-border/70 bg-panel-subtle py-20 md:py-28">
      <div className="mx-auto w-[min(1280px,calc(100%-2rem))]">
        <article data-reveal className="editorial-panel editorial-panel--teal">
          <p className="eyebrow">Empresas</p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">Soluciones ambientales para empresas.</h2>
          <div className="mt-8 grid gap-3">
            {enterpriseServices.map((item) => (
              <div key={item} className="list-line">{item}</div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {enterpriseBenefits.map((item) => (
              <span key={item} className="rounded-full bg-[var(--brand-lime)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-ink)]">{item}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

const TIMELINE_MEDIA = [
  {
    logo: insemaLogo.url,
    images: [insema1.url, insema2.url],
    tag: "Origen · Materiales ferrosos",
    accent: "#B6CDFF",
  },
  {
    logo: zartexLogo.url,
    images: [zartex1.url, zartex2.url],
    tag: "Especialización · RAEE",
    accent: "#C3EB57",
  },
  {
    logo: pivLogoFull.url,
    images: [piv1.url],
    tag: "Consolidación · Plataforma nacional",
    accent: "#C3EB57",
    logoScale: 4,
  },
];

function TimelineRail() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const scope = rootRef.current;
    if (!scope || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Draw the spine as user scrolls
      const spine = scope.querySelector<HTMLDivElement>("[data-tl-spine]");
      if (spine) {
        gsap.fromTo(
          spine,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scope,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.6,
            },
          },
        );
      }

      // Animate each timeline article: card + image side + node pop
      scope.querySelectorAll<HTMLElement>("[data-tl-item]").forEach((el) => {
        const card = el.querySelector<HTMLElement>("[data-tl-card]");
        const media = el.querySelector<HTMLElement>("[data-tl-media]");
        const node = el.querySelector<HTMLElement>("[data-tl-node]");
        const images = el.querySelectorAll<HTMLElement>("[data-tl-img]");
        const isRight = el.dataset.tlSide === "right";

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            once: true,
          },
        });

        if (node) {
          tl.fromTo(
            node,
            { scale: 0, rotate: -90, opacity: 0 },
            { scale: 1, rotate: 0, opacity: 1, duration: 0.7, ease: "back.out(2)" },
            0,
          );
        }
        if (card) {
          tl.fromTo(
            card,
            { x: isRight ? 60 : -60, y: 30, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
            0.1,
          );
        }
        if (media) {
          tl.fromTo(
            media,
            { x: isRight ? -60 : 60, y: 30, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
            0.15,
          );
        }
        if (images.length) {
          tl.fromTo(
            images,
            { scale: 1.15, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.12 },
            0.25,
          );
        }
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          "radial-gradient(1200px 600px at 15% 10%, color-mix(in oklab, var(--brand-lime) 10%, transparent) 0%, transparent 60%), radial-gradient(1000px 500px at 90% 90%, color-mix(in oklab, var(--brand-navy) 14%, transparent) 0%, transparent 60%)",
      }}
    >
      {/* Grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--brand-ink) 1px, transparent 1px), linear-gradient(90deg, var(--brand-ink) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto w-[min(1280px,calc(100%-2rem))]">
        <div data-reveal className="max-w-3xl space-y-5">
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Nuestra evolución
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Contamos con un centro integral para el acopio y gestión de residuos valorizables, donde personas, empresas e instituciones encuentran una alternativa eficiente para su correcta disposición y aprovechamiento.
          </p>
        </div>

        <div className="relative mt-20">
          {/* Vertical spine with animated shimmer */}
          <div
            aria-hidden
            data-tl-spine
            className="pointer-events-none absolute left-4 top-0 bottom-0 w-[2px] md:left-1/2 md:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, var(--brand-lime) 8%, var(--brand-navy) 50%, var(--brand-lime) 92%, transparent 100%)",
            }}
          />

          <div className="space-y-24 md:space-y-32">
            {timeline.map((item, i) => {
              const media = TIMELINE_MEDIA[i];
              const isRight = i % 2 === 1;
              const stepNumber = String(i + 1).padStart(2, "0");
              const logoScale = media.logoScale ?? 1;
              return (
                <article
                  key={item.year}
                  data-tl-item
                  data-tl-side={isRight ? "right" : "left"}
                  className="relative grid gap-10 md:grid-cols-2 md:items-center md:gap-16"
                >
                  {/* Node on spine */}
                  <div
                    aria-hidden
                    data-tl-node
                    className="absolute left-4 top-4 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                  >
                    <div className="relative">
                      <div
                        className="absolute inset-0 animate-ping rounded-full opacity-30"
                        style={{ background: media.accent }}
                      />
                      <div
                        className="relative grid h-10 w-10 place-items-center rounded-full text-[0.65rem] font-black ring-4 ring-background"
                        style={{ background: media.accent, color: "var(--brand-ink)" }}
                      >
                        {stepNumber}
                      </div>
                    </div>
                  </div>

                  {/* Text side */}
                  <div
                    className={cn(
                      "pl-14 md:pl-0",
                      isRight ? "md:order-2 md:pl-16" : "md:order-1 md:pr-16 md:text-right",
                    )}
                  >
                    <div
                      data-tl-card
                      className={cn(
                        "flex flex-col gap-5 rounded-3xl border border-border/60 bg-background/80 p-6 backdrop-blur md:p-8 shadow-[var(--shadow-elevated)]",
                        isRight ? "" : "md:items-end",
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center",
                          isRight ? "justify-start" : "md:justify-end",
                        )}
                        style={{ minHeight: `${64 * Math.min(logoScale, 2)}px` }}
                      >
                        <img
                          src={media.logo}
                          alt={`${item.title} logo`}
                          className="w-auto object-contain"
                          style={{ maxHeight: `${64 * logoScale}px` }}
                        />
                      </div>

                      <div className="flex items-baseline gap-3">
                        <span
                          className="text-5xl font-black leading-none tracking-tight md:text-6xl"
                          style={{ color: "var(--brand-navy)" }}
                        >
                          {item.year}
                        </span>
                        <span
                          className="h-[2px] flex-1"
                          style={{ background: media.accent }}
                        />
                      </div>

                      <p className="max-w-md text-base leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Image side */}
                  <div
                    className={cn(
                      "pl-14 md:pl-0",
                      isRight ? "md:order-1 md:pr-16" : "md:order-2 md:pl-16",
                    )}
                  >
                    <div
                      data-tl-media
                      className={cn(
                        "grid gap-3",
                        media.images.length === 2 ? "grid-cols-2" : "grid-cols-1",
                      )}
                    >
                      {media.images.map((src, idx) => (
                        <div
                          data-tl-img
                          key={src}
                          className={cn(
                            "group relative overflow-hidden rounded-2xl bg-panel-subtle shadow-[var(--shadow-elevated)]",
                            media.images.length === 2 ? "aspect-[4/5]" : "aspect-[4/3]",
                            idx === 1 ? "translate-y-6" : "",
                          )}
                        >
                          <img
                            src={src}
                            alt={item.title}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            style={{
                              background: `linear-gradient(180deg, transparent 40%, color-mix(in oklab, ${media.accent} 60%, black) 100%)`,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <Section
      eyebrow="FAQ"
      title="Detrás de cada material recuperado hay un servicio que responde, acompaña y genera confianza."
      description="Trabajamos para ofrecer soluciones ágiles a empresas y personas comprometidas con el reciclaje."
    >
      <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-reveal className="space-y-6">
          <p className="text-sm leading-7 text-muted-foreground">
            Si necesitas una ruta de recolección, certificación o validación de materiales, el equipo de PIV puede estructurar una propuesta según tu operación.
          </p>
          <ReciclinMascot
            size="md"
            tone="lime"
            message={<><strong>¡Hola!</strong> ¿Tenés dudas? Yo te pongo en contacto con el equipo.</>}
          />
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            <Button variant="primary" size="lg">Hablar por WhatsApp</Button>
          </a>
        </div>
        <div data-reveal className="surface-panel">
          <Accordion type="single" collapsible>
            {faqs.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger className="text-base font-medium text-foreground hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}

function ContactFormCard() {
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    telefono: "",
    servicio: "",
    mensaje: "",
  });

  const whatsappMessage = useMemo(() => {
    const lines = [
      "Hola Parque Industrial Verde, quiero solicitar información.",
      `Nombre: ${form.nombre || "-"}`,
      `Empresa: ${form.empresa || "-"}`,
      `Correo: ${form.correo || "-"}`,
      `Teléfono: ${form.telefono || "-"}`,
      `Servicio requerido: ${form.servicio || "-"}`,
      `Mensaje: ${form.mensaje || "-"}`,
    ];
    return `https://wa.me/50379484108?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [form]);

  const updateField = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <div data-reveal className="surface-panel space-y-6">
      <div className="space-y-2">
        <p className="eyebrow">Contacto</p>
        <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">Comencemos a generar impacto juntos.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Nombre" value={form.nombre} onChange={(event) => updateField("nombre", event.target.value)} />
        <Input placeholder="Empresa" value={form.empresa} onChange={(event) => updateField("empresa", event.target.value)} />
        <Input type="email" placeholder="Correo" value={form.correo} onChange={(event) => updateField("correo", event.target.value)} />
        <Input placeholder="Teléfono" value={form.telefono} onChange={(event) => updateField("telefono", event.target.value)} />
        <Input className="md:col-span-2" placeholder="Servicio requerido" value={form.servicio} onChange={(event) => updateField("servicio", event.target.value)} />
        <Textarea className="min-h-36 md:col-span-2" placeholder="Mensaje" value={form.mensaje} onChange={(event) => updateField("mensaje", event.target.value)} />
      </div>
      <div className="flex flex-wrap gap-3">
        <a href={whatsappMessage} target="_blank" rel="noreferrer">
          <Button variant="primary" size="lg">Enviar por WhatsApp</Button>
        </a>
        <a href={emailLink.href}>
          <Button variant="outline" size="lg">Escribir por correo</Button>
        </a>
      </div>
    </div>
  );
}

function LocationsPanel() {
  return (
    <div data-reveal className="space-y-6">
      <div className="surface-panel grid gap-5">
        <div className="flex items-start gap-3">
          <MapPinned className="mt-1 h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Tres ubicaciones estratégicas</p>
            <p className="mt-1 text-sm leading-7 text-muted-foreground">Soyapango, Chalchuapa y Costa del Sol.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock3 className="mt-1 h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Horario de atención</p>
            <p className="mt-1 text-sm leading-7 text-muted-foreground">Lunes a viernes, 8:00 a.m. a 5:00 p.m.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="mt-1 h-5 w-5 text-primary" />
          <div className="flex flex-wrap gap-3 text-sm leading-7 text-muted-foreground">
            {phoneLinks.map((item) => (
              <a key={item.href} href={item.href} className="story-link">{item.label}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        {locations.map((location) => (
          <article key={location.name} className="surface-panel">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{location.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{location.description}</p>
              </div>
              <MapPinned className="h-5 w-5 text-primary" />
            </div>
            <iframe
              title={`Mapa de ${location.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-56 w-full rounded-[1.25rem] border border-border/70"
            />
          </article>
        ))}
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <PageShell>
      <section className="relative min-h-[100svh] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(125deg, #0f3d3a 0%, #12526A 40%, #1e3a5f 75%, #273655 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 45% at 15% 20%, rgba(195,235,87,0.18) 0%, transparent 60%), radial-gradient(55% 45% at 85% 85%, rgba(182,205,255,0.20) 0%, transparent 65%)",
          }}
        />


        <div className="relative mx-auto flex min-h-[100svh] w-[min(1280px,calc(100%-2rem))] flex-col justify-end pb-10 pt-28 md:justify-between md:pb-16 md:pt-36">
          <div data-hero-kicker className="hidden items-center gap-3 md:flex">
            <span className="h-[2px] w-10 bg-[var(--brand-lime)]" />
            <span className="text-[0.7rem] font-black uppercase tracking-[0.32em] text-[var(--brand-lime)]">
              Economía circular · Escala industrial
            </span>
          </div>

          <div className="max-w-3xl space-y-6 md:mt-auto md:pb-10">
            <span
              data-hero-kicker
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.22em] text-[var(--brand-lime)] backdrop-blur md:hidden"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-lime)]" /> Economía circular
            </span>
            <h1
              data-hero-title
              className="text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl xl:text-[5.5rem]"
              style={{ textShadow: "0 2px 30px rgba(0,0,0,0.55)" }}
            >
              Transformamos residuos en{" "}
              <span className="italic text-[var(--brand-lime)]">oportunidades</span>.
            </h1>
            <p
              data-hero-copy
              className="max-w-xl text-base leading-7 text-white/85 md:text-lg md:leading-8"
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.55)" }}
            >
              Impulsamos el aprovechamiento de materiales reciclables mediante su recuperación, procesamiento y valorización, en alianza con recolectores, empresas y comunidades.
            </p>
            <div data-hero-actions className="flex flex-wrap gap-3 pt-2">
              <Link to="/servicios">
                <Button variant="heroSecondary" size="lg">Ver servicios</Button>
              </Link>
            </div>
          </div>

          <div
            data-hero-stat
            className="mt-10 grid grid-cols-1 divide-y divide-white/15 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            {pivStats.map((item, i) => (
              <div key={item.label} className="flex flex-col gap-2 p-5 md:p-6">
                <span className="text-[0.6rem] font-black uppercase tracking-[0.22em] text-[var(--brand-lime)]">
                  {String(i + 1).padStart(2, "0")} · {item.suffix.trim()}
                </span>
                <span className="text-4xl font-semibold leading-none tracking-tight text-white md:text-5xl">
                  {item.prefix}
                  {formatMetric(item.value)}
                </span>
                <span className="text-sm leading-6 text-white/75">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>



      <Section
        eyebrow="Qué hacemos"
        title="La recuperación de materiales puede ser precisa, rentable y medible."
      />

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="mx-auto w-[min(1280px,calc(100%-2rem))]">
          <AudienceStrip />
        </div>
      </section>


      <Section
        eyebrow="Servicios destacados"
        title="Soluciones integrales que facilitan la recuperación, clasificación y valorización de materiales."
        titleClassName="text-3xl leading-snug md:text-5xl"
        containerClassName="max-w-4xl"
        description="Desde recuperación de materiales hasta destrucción certificada y trazabilidad digital, cada servicio está pensado para integrarse a operaciones reales."
      >
        <ServicesGrid />
      </Section>

      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px 320px at 12% 15%, color-mix(in oklab, var(--brand-lime) 35%, transparent) 0%, transparent 65%), radial-gradient(700px 380px at 88% 90%, color-mix(in oklab, var(--brand-sky) 45%, transparent) 0%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">Territorio</p>
            <h3 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight text-[var(--brand-navy)] md:text-5xl">
              Brindamos cobertura en diferentes zonas del país.
            </h3>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
              Nuestros servicios de recuperación y manejo de materiales llegan de forma oportuna a quienes desean disponer de sus materiales de manera responsable y eficiente.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "San Salvador",
                "La Libertad",
                "Santa Ana",
                "San Miguel",
                "Sonsonate",
                "La Paz",
              ].map((z) => (
                <li key={z} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white/80 px-4 py-3 text-sm font-semibold text-[var(--brand-navy)] backdrop-blur">
                  <span className="grid h-2.5 w-2.5 place-items-center rounded-full bg-[var(--brand-lime)] ring-4 ring-[var(--brand-lime)]/25" />
                  {z}
                </li>
              ))}
            </ul>
          </div>
          <ElSalvadorMap />
        </div>
      </section>



      <section className="relative overflow-hidden py-24 md:py-32">
        <img
          src={alcanceAsset.url}
          alt="Alcance internacional de Parque Industrial Verde: fardos de aluminio compactado listos para exportación"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, color-mix(in oklab, var(--brand-ink) 82%, transparent) 0%, color-mix(in oklab, var(--brand-navy) 65%, transparent) 55%, color-mix(in oklab, var(--brand-ink) 40%, transparent) 100%)",
          }}
        />
        <div className="relative mx-auto w-[min(1280px,calc(100%-2rem))] text-white">
          <div data-reveal className="max-w-3xl space-y-6">
            <p className="eyebrow eyebrow--light">Alcance</p>
            <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}>
              Nuestro trabajo trasciende fronteras.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-white/90 md:text-lg" style={{ textShadow: "0 2px 14px rgba(0,0,0,0.55)" }}>
              Llevamos materiales reciclables a diferentes regiones del mundo, donde continúan su aprovechamiento, contribuyendo a su incorporación en cadenas globales de valor.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-20 md:grid-cols-5">
            {exportRegions.map((region, i) => (
              <div
                key={region}
                data-reveal
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[var(--brand-lime)]/60 hover:bg-white/[0.14]"
              >
                <span className="block text-[0.65rem] font-black uppercase tracking-[0.28em] text-[var(--brand-lime)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 block text-lg font-semibold tracking-tight text-white md:text-xl">
                  {region}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-x-5 bottom-4 h-[2px] origin-left scale-x-0 bg-[var(--brand-lime)] transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <TimelineRail />



      <section className="relative h-[380px] w-full overflow-hidden md:h-[460px]">
        <img src={teamAsset.url} alt="Equipo de Parque Industrial Verde en planta" className="h-full w-full object-cover object-[center_top]" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(265deg, color-mix(in oklab, var(--brand-teal) 80%, transparent) 0%, color-mix(in oklab, var(--brand-ink) 40%, transparent) 70%, transparent 100%)" }} />
        <div className="absolute inset-0 mx-auto flex w-[min(1280px,calc(100%-2rem))] items-end justify-end pb-12 md:pb-16">
          <div className="max-w-md text-right">
            <p className="eyebrow eyebrow--light justify-end">Aliados</p>
            <h3 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">Una red que convierte voluntad en infraestructura.</h3>
          </div>
        </div>
      </section>

      <PartnersStrip variant="light" />

      <FAQSection />


      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--gradient-accent)" }}>
        <img
          src={reciclinAsset.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -bottom-6 left-4 z-10 hidden h-48 w-auto drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)] animate-[reciclin-float_4.5s_ease-in-out_infinite] md:block lg:left-10 lg:h-64"
        />
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 20%, var(--brand-lime) 0%, transparent 45%), radial-gradient(circle at 80% 80%, var(--brand-sky) 0%, transparent 50%)" }} />
        <div className="relative mx-auto w-[min(1280px,calc(100%-2rem))] text-center">
          <div data-reveal className="mx-auto max-w-3xl space-y-6 text-white">
            <p className="eyebrow eyebrow--light justify-center">Hablemos</p>
            <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              Encuentra una solución integral para el manejo de tus residuos.
            </h2>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <Button variant="hero" size="xl">Cotizar por WhatsApp</Button>
              </a>
              <Link to="/contacto">
                <Button variant="heroSecondary" size="xl">Ir a contacto</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export function AboutPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden pt-36 md:pt-44" style={{ background: "var(--gradient-accent)" }}>
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 15% 25%, var(--brand-lime) 0%, transparent 45%), radial-gradient(circle at 85% 75%, var(--brand-sky) 0%, transparent 50%)" }} />
        <div className="relative mx-auto w-[min(1280px,calc(100%-2rem))] pb-16 md:pb-24">
          <div data-reveal className="max-w-4xl space-y-6 text-white">
            <p className="eyebrow eyebrow--light">Sobre nosotros</p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              Trabajamos por un futuro más sostenible a través del <span className="text-[var(--brand-lime)]">reciclaje y la valorización</span> de materiales.
            </h1>
          </div>
        </div>
      </section>
      <div data-reveal className="mx-auto -mt-10 w-[min(1280px,calc(100%-2rem))] md:-mt-14">
        <img src={heroAboutAsset.url} alt="Operación real de Parque Industrial Verde, vista panorámica de planta" className="image-tile h-auto w-full object-contain md:h-[420px] md:object-cover md:object-[center_30%]" loading="eager" />
      </div>
      <TimelineRail />
      <Section
        eyebrow="Nuestra identidad"
        title="Reciclaje con escala industrial y propósito real."
        description="Una operación pensada para que cada material recuperado vuelva a generar valor — local, regional y globalmente."
      >
        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              Icon: Recycle,
              kicker: "¿Qué hacemos?",
              title: "Transformamos materiales en oportunidades.",
              body: "Procesos especializados de recuperación y gestión que fortalecen la economía circular.",
              tone: "bg-[var(--brand-navy)] text-white",
              chip: "bg-[var(--brand-lime)] text-[var(--brand-ink)]",
            },
            {
              Icon: Users,
              kicker: "¿Para quién?",
              title: "Empresas, industrias, comercios y recolectores.",
              body: "Acompañamos a instituciones y aliados con prácticas responsables de materiales reciclables.",
              tone: "bg-[var(--brand-lime)] text-[var(--brand-ink)]",
              chip: "bg-[var(--brand-ink)] text-[var(--brand-lime)]",
            },
            {
              Icon: Globe2,
              kicker: "Alcance",
              title: "Cobertura nacional con destino internacional.",
              body: "Nuestros materiales se incorporan a cadenas globales de valor.",
              tone: "bg-[var(--brand-teal)] text-white",
              chip: "bg-white text-[var(--brand-teal)]",
            },
            {
              Icon: TrendingUp,
              kicker: "Evolución",
              title: "La recicladora más grande de El Salvador.",
              body: "Crecimiento constante, mayor capacidad operativa y una operación más eficiente.",
              tone: "bg-[var(--brand-lime)] text-[var(--brand-ink)]",
              chip: "bg-[var(--brand-ink)] text-[var(--brand-lime)]",
            },
          ].map((card, i) => {
            const Icon = card.Icon;
            return (
              <article
                key={card.kicker}
                data-reveal
                className={cn("group relative isolate flex flex-col gap-4 overflow-hidden rounded-2xl p-5 shadow-[var(--shadow-elevated)] transition-transform duration-500 hover:-translate-y-1.5", card.tone)}
              >
                <span aria-hidden className="pointer-events-none absolute -bottom-3 -right-1 text-[5rem] font-black leading-none tracking-tighter opacity-[0.08]">0{i + 1}</span>
                <div className="flex items-center justify-between">
                  <span className={cn("grid h-11 w-11 place-items-center rounded-xl shadow-md transition-transform duration-500 group-hover:-rotate-6", card.chip)}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[0.58rem] font-black uppercase tracking-[0.2em] opacity-80">{card.kicker}</span>
                </div>
                <div>
                  <h3 className="text-balance text-base font-bold leading-snug tracking-tight md:text-lg">{card.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-5 opacity-85">{card.body}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div data-reveal className="mt-10 overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-[var(--brand-navy)] via-[var(--brand-teal)] to-[var(--brand-lime)] p-[1px] shadow-[var(--shadow-elevated)]">
          <div className="flex flex-col items-center gap-4 rounded-[1.65rem] bg-white px-8 py-14 text-center md:py-16">
            <Sparkles className="h-8 w-8 text-[var(--brand-teal)]" />
            <p className="text-balance text-2xl font-black uppercase leading-tight tracking-[0.02em] text-[var(--brand-navy)] md:text-4xl lg:text-5xl">
              EL RECICLAJE SE CONSTRUYE DESDE PEQUEÑAS ACCIONES QUE, JUNTAS, GENERAN UN <span className="text-[var(--brand-teal)]">IMPACTO POSITIVO.</span>
            </p>
          </div>
        </div>
      </Section>
      <section className="relative overflow-hidden py-24 md:py-32">
        <img
          src={propositoAsset.url}
          alt="Propósito de Parque Industrial Verde: intercambio de un equipo electrónico por una planta como símbolo del ciclo de valor"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, color-mix(in oklab, var(--brand-ink) 88%, transparent) 0%, color-mix(in oklab, var(--brand-navy) 78%, transparent) 45%, color-mix(in oklab, var(--brand-ink) 35%, transparent) 100%)",
          }}
        />
        <div className="relative mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div data-reveal className="max-w-2xl text-white">
            <p className="eyebrow eyebrow--light">Propósito</p>
            <h2
              className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-6xl"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}
            >
              Convertir cada material reciclable en una oportunidad para generar un impacto positivo.
            </h2>
            <p
              className="mt-6 max-w-xl text-base leading-8 text-white/90 md:text-lg"
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.55)" }}
            >
              PIV articula tecnología, experiencia y una red de recuperación para convertir desechos en valor verificable.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <article data-reveal className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 text-white backdrop-blur-md">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[var(--brand-lime)]">Misión</p>
              <p className="mt-4 text-sm leading-7 md:text-base">
                Ser una empresa líder en el mercado nacional del reciclaje de materiales, haciendo de los desechos una fuente de protección ambiental e incentivando prácticas responsables.
              </p>
            </article>
            <article data-reveal className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 text-white backdrop-blur-md">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[var(--brand-lime)]">Visión</p>
              <p className="mt-4 text-sm leading-7 md:text-base">
                Ser reconocidos como la empresa de reciclaje más grande y confiable de El Salvador.
              </p>
            </article>
          </div>
        </div>
      </section>

    </PageShell>
  );
}

export function ServicesPage() {
  return (
    <PageShell>
      <section className="pt-36 md:pt-44">
        <div className="mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div data-reveal className="space-y-6">
            <p className="eyebrow">Servicios</p>
            <p className="max-w-2xl text-2xl leading-snug font-semibold tracking-tight text-[var(--brand-navy)] md:text-3xl">
              Cada servicio se integra a una operación que busca orden, evidencia y resultados.
            </p>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Trabajamos con empresas, corporaciones e industrias que necesitan una solución ambiental alineada con cumplimiento, reputación e impacto medible.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={whatsappHref} target="_blank" rel="noreferrer"><Button variant="primary" size="lg">Cotizar</Button></a>
              <Link to="/contacto"><Button variant="outline" size="lg">Hablar con un asesor</Button></Link>
            </div>
          </div>
          <img data-reveal src={operationsAsset.url} alt="Operación industrial de clasificación de plásticos y materiales recuperables" className="image-tile h-[520px]" loading="eager" />
        </div>
      </section>
      <Section
        eyebrow="Capacidades"
        title="Soluciones integrales que facilitan la recuperación, clasificación y valorización de materiales."
        titleClassName="text-3xl leading-snug md:text-5xl"
        containerClassName="max-w-4xl"
        description="Brindamos soluciones que garantizan la recuperación de materiales, la trazabilidad de los procesos y el respaldo necesario para una gestión responsable."
      >
        <ServicesGrid />
      </Section>
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{
          background:
            "linear-gradient(120deg, #0f3d3a 0%, #12526A 45%, #1e3a5f 80%, #273655 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(50% 40% at 10% 20%, rgba(195,235,87,0.18) 0%, transparent 60%), radial-gradient(50% 40% at 90% 85%, rgba(182,205,255,0.18) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto w-[min(1280px,calc(100%-2rem))] text-center text-white" data-reveal>
          <p className="text-[0.7rem] font-black uppercase tracking-[0.24em] text-[var(--brand-lime)]">Campañas empresariales</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Creamos espacios que <span className="text-[var(--brand-lime)]">inspiran a las personas</span> a participar y actuar a favor del reciclaje.
          </h2>
        </div>
      </section>
      <EnterpriseCommunity />


    </PageShell>
  );
}

export function MaterialsPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden pt-36 md:pt-44" style={{ background: "var(--gradient-accent)" }}>
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 80% 20%, var(--brand-lime) 0%, transparent 45%), radial-gradient(circle at 20% 80%, var(--brand-sky) 0%, transparent 50%)" }} />
        <div className="relative mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-10 pb-16 md:pb-24 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div data-reveal className="space-y-6 text-white">
            <p className="eyebrow eyebrow--light">Materiales</p>
            <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-7xl">
              Cada material recuperado <span className="text-[var(--brand-lime)]">vuelve a ser parte de nuevos procesos.</span>
            </h1>
            <p className="max-w-xl text-base leading-7 text-white/85">
              Clasificamos cada material de acuerdo con sus características para darle el manejo adecuado, ya sea mediante aprovechamiento o disposición final responsable.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={whatsappHref} target="_blank" rel="noreferrer"><Button variant="hero" size="xl">Cotizar</Button></a>
            </div>
          </div>
          <img data-reveal src={materialsHeroAsset.url} alt="Persona recibiendo caja con discos duros para disposición responsable en Parque Industrial Verde" className="image-tile h-[460px] md:h-[520px]" loading="eager" />
        </div>
      </section>
      <Section
        eyebrow="Categorías"
        title="Una estructura clara para preparar, separar y valorizar mejor."
        description="Agrupamos materiales para facilitar su recolección, clasificación y reincorporación a la cadena productiva."
      >
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {materialGroups.map((group, i) => {
            const visual = materialVisuals[group.title];
            return (
              <article
                key={group.title}
                data-reveal
                className="group relative min-h-[26rem] overflow-hidden rounded-3xl bg-[var(--brand-ink)] shadow-[var(--shadow-elevated)] transition-transform duration-500 hover:-translate-y-2"
              >
                <img
                  src={visual.image}
                  alt={visual.alt}
                  width={1280}
                  height={960}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-ink)] via-[var(--brand-ink)]/45 to-transparent" />
                <div className="relative flex h-full min-h-[26rem] flex-col justify-end p-5 text-white">
                  <span className="mb-auto w-fit rounded-full bg-[var(--brand-lime)] px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.16em] text-[var(--brand-ink)]">
                    0{i + 1}
                  </span>
                  <h2 className="text-3xl font-bold tracking-tight">{group.title}</h2>
                  <p className="mt-2 text-sm font-medium leading-6 text-white/82">{visual.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.slice(0, 6).map((item) => (
                      <span key={item} className="rounded-full border border-white/18 bg-white/12 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.08em] backdrop-blur">
                        {item}
                      </span>
                    ))}
                    {group.items.length > 6 ? (
                      <span className="rounded-full bg-[var(--brand-lime)] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.08em] text-[var(--brand-ink)]">
                        +{group.items.length - 6}
                      </span>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>
      <Section
        eyebrow="Cómo preparar los materiales"
        title="La eficiencia del proceso empieza antes de la recolección."
        description="Preparar correctamente los materiales mejora la clasificación, reduce rechazos y acelera el aprovechamiento."
        className="bg-panel-subtle"
      >
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {preparationSteps.map((step, i) => {
            const config = [
              {
                tone: "bg-[var(--brand-teal)] text-white",
                Icon: Droplets,
                bg: prepLimpiosAsset.url,
                desc: "Enjuaga envases, latas y empaques para retirar restos de alimentos, bebidas o residuos orgánicos.",
                tips: ["Sin residuos líquidos", "Sin restos de comida", "Sin grasa ni aceites"],
              },
              {
                tone: "bg-[var(--brand-lime)] text-[var(--brand-ink)]",
                Icon: Sun,
                bg: prepSecosAsset.url,
                desc: "Deja escurrir y secar los materiales antes de almacenarlos para evitar contaminación y malos olores.",
                tips: ["Bien escurridos", "Libres de humedad", "Listos para almacenar"],
              },
              {
                tone: "bg-[var(--brand-navy)] text-white",
                Icon: Layers3,
                bg: prepSeparadosAsset.url,
                desc: "Clasifica por tipo de material: plásticos, metales, papel y RAEE en bolsas o cajas independientes.",
                tips: ["Por categoría", "Sin mezclar tipos", "Identificados"],
              },
            ];
            const d = config[i];
            const Icon = d.Icon;
            const isDark = !d.tone.includes("brand-lime");
            return (
              <article key={step} data-reveal className={cn("group relative isolate flex min-h-[28rem] flex-col gap-4 overflow-hidden rounded-3xl p-8 shadow-[var(--shadow-elevated)]", d.tone)}>
                <img
                  src={d.bg}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                />
                <span aria-hidden className={cn("absolute inset-0 -z-10", isDark ? "bg-gradient-to-t from-black/85 via-black/55 to-black/25" : "bg-gradient-to-t from-[var(--brand-lime)]/95 via-[var(--brand-lime)]/70 to-[var(--brand-lime)]/30")} />
                <span aria-hidden className="absolute -right-6 -top-6 text-[8rem] font-black leading-none opacity-15">0{i + 1}</span>
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="relative text-xs font-bold uppercase tracking-[0.18em] opacity-80">Paso {i + 1}</span>
                <p className="relative text-4xl font-bold tracking-tight">{step}</p>
                <p className="relative text-sm leading-6 opacity-90">{d.desc}</p>
                <ul className="relative mt-2 space-y-1.5 text-sm font-medium">
                  {d.tips.map((t) => (
                    <li key={t} className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 opacity-80" />{t}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl bg-[var(--brand-ink)] shadow-[var(--shadow-elevated)]" data-reveal>
          <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative flex flex-col justify-between gap-6 p-8 text-white">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--brand-lime)] text-[var(--brand-ink)]">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--brand-lime)]">Disposición responsable por cobro</p>
              </div>
              <h3 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Materiales delicados que requieren <span className="text-[var(--brand-lime)]">manejo especializado.</span>
              </h3>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="w-fit">
                <Button variant="hero" size="lg">Cotizar disposición</Button>
              </a>
            </div>
            <div className="grid gap-3 bg-white/[0.04] p-6 sm:grid-cols-1">
              {disposalMaterials.map((item, idx) => {
                const Icons = [AlertTriangle, ShieldCheck, Recycle];
                const Icon = Icons[idx % Icons.length];
                return (
                  <div key={item} className="flex items-start gap-4 rounded-2xl bg-white/5 p-4 text-white/90 ring-1 ring-white/10">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--brand-lime)]/15 text-[var(--brand-lime)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm leading-6">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}

export function RsePage() {
  const [activeSection, setActiveSection] = useState<(typeof rseCampaignSections)[number]["id"] | null>(null);
  const selectedSection = rseCampaignSections.find((section) => section.id === activeSection) ?? null;

  return (
    <PageShell>
      <section className="pt-36 md:pt-44">
        <div className="mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div data-reveal className="space-y-6 pb-8">
            <p className="eyebrow">RSE</p>
            <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-7xl">El reciclaje también transforma comunidades.</h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Educación ambiental, campañas, activaciones comunitarias y acompañamiento empresarial forman parte de una estrategia de impacto que va más allá de la recuperación de materiales.
            </p>
          </div>
          <img data-reveal src={rseHeroAsset.url} alt="Jornada comunitaria de recolección de materiales reciclables organizada por Parque Industrial Verde" className="image-tile h-[520px] object-cover" loading="eager" />
        </div>
      </section>
      <Section
        eyebrow="Campañas"
        title="Activaciones que conectan marca, territorio y cultura ambiental."
        description="Desde jornadas educativas hasta campañas empresariales, cada acción busca convertir la sostenibilidad en participación y resultados medibles."
      >
        <div className="mt-14 grid gap-4 md:grid-cols-3" role="tablist" aria-label="Seleccionar campaña RSE">
          {rseCampaignSections.map((campaign) => {
            const selected = campaign.id === activeSection;
            return (
              <button
                key={campaign.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${campaign.id}`}
                onClick={() => {
                  setActiveSection(campaign.id);
                  requestAnimationFrame(() => {
                    document.getElementById(`panel-${campaign.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  });
                }}
                data-reveal
                className={cn(
                  "group overflow-hidden rounded-3xl border p-0 text-left shadow-[var(--shadow-elevated)] transition-all duration-500 hover:-translate-y-1",
                  selected
                    ? "border-[var(--brand-lime)] bg-[var(--brand-navy)] text-white"
                    : "border-[var(--brand-navy)]/10 bg-white text-[var(--brand-navy)] hover:border-[var(--brand-teal)]/35",
                )}
              >
                <img
                  src={campaign.photos[0].url}
                  alt={campaign.photos[0].alt}
                  loading="lazy"
                  className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="block p-5">
                  <span className={cn("text-[0.65rem] font-black uppercase tracking-[0.18em]", selected ? "text-[var(--brand-lime)]" : "text-[var(--brand-teal)]")}>{campaign.kicker}</span>
                  <span className="mt-2 block text-2xl font-semibold tracking-tight">{campaign.title}</span>
                </span>
              </button>
            );
          })}
        </div>
        {selectedSection ? (
          <div id={`panel-${selectedSection.id}`} role="tabpanel" className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <article data-reveal className="rounded-3xl bg-[var(--brand-ink)] p-7 text-white shadow-[var(--shadow-elevated)]">
              <p className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-[var(--brand-lime)]">{selectedSection.kicker}</p>
              <h3 className="mt-5 text-balance text-4xl font-semibold tracking-tight">{selectedSection.title}</h3>
              <p className="mt-4 text-base leading-7 text-white/78">{selectedSection.description}</p>
              <button
                type="button"
                onClick={() => setActiveSection(null)}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--brand-lime)] hover:text-[var(--brand-ink)]"
              >
                <X className="h-3.5 w-3.5" /> Cerrar
              </button>
            </article>
            <div data-reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {selectedSection.photos.map((photo) => (
                <div
                  key={photo.url}
                  className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[var(--shadow-elevated)]"
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p data-reveal className="mt-8 rounded-3xl border border-dashed border-[var(--brand-navy)]/15 bg-white/60 px-6 py-8 text-center text-sm font-medium text-[var(--brand-navy)]/70">
            Selecciona una campaña arriba para ver fotos y detalles.
          </p>
        )}
      </Section>
    </PageShell>
  );
}

export function ContactPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden pt-36 md:pt-44" style={{ background: "var(--gradient-accent)" }}>
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 20%, var(--brand-lime) 0%, transparent 45%), radial-gradient(circle at 80% 80%, var(--brand-sky) 0%, transparent 50%)" }} />
        <div className="relative mx-auto w-[min(1280px,calc(100%-2rem))] pb-12 md:pb-16">
          <div data-reveal className="max-w-3xl space-y-5 text-white">
            <p className="eyebrow eyebrow--light">Contacto</p>
            <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-7xl">
              Hablemos de tu <span className="text-[var(--brand-lime)]">próxima ruta circular.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/85">
              Cotizaciones, recolecciones, campañas y alianzas. Te respondemos con una propuesta clara y operativa.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={whatsappHref} target="_blank" rel="noreferrer"><Button variant="hero" size="xl">WhatsApp</Button></a>
              <a href={emailLink.href}><Button variant="heroSecondary" size="xl">Escribir correo</Button></a>
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden py-16 md:py-24" style={{ background: "linear-gradient(180deg, var(--brand-sky) 0%, color-mix(in oklab, var(--brand-sky) 35%, white) 60%, white 100%)" }}>
        <div className="mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <ContactFormCard />
          <LocationsPanel />
        </div>
      </section>
      <FAQSection />
    </PageShell>
  );
}

