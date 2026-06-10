import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, ChevronRight, Clock3, MapPinned, MessageCircle, MoveRight, Phone, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import logoAsset from "@/assets/piv-logo.png.asset.json";
import heroAsset from "@/assets/piv-hero-v2.png.asset.json";

import operationsAsset from "@/assets/piv-operations.jpg.asset.json";
import metalsAsset from "@/assets/piv-metals.jpg.asset.json";
import beachAsset from "@/assets/piv-beach.jpg.asset.json";
import communityAsset from "@/assets/piv-community.jpg.asset.json";
import alliesAsset from "@/assets/piv-allies.jpg.asset.json";
import kidsAsset from "@/assets/piv-kids.jpg.asset.json";
import impactGraphicAsset from "@/assets/piv-impact-graphic.jpg.asset.json";
import {
  activeCampaigns,
  audience,
  communityActions,
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
  trustPillars,
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
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        delay: 0.45,
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
    </div>
  );
}

function SiteHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-3",
      )}
    >
      <div className="mx-auto flex w-[min(1280px,calc(100%-2rem))] items-center justify-between gap-4 rounded-full border border-white/10 px-4 py-2 md:px-6">
        <div
          className={cn(
            "absolute inset-0 -z-10 rounded-full transition-all duration-500",
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-[var(--shadow-elevated)]"
              : "bg-black/25 backdrop-blur-md",
          )}
        />
        <Link to="/" className="shrink-0" aria-label="Parque Industrial Verde, ir al inicio">
          <img src={logoAsset.url} alt="Logo de Parque Industrial Verde" className="h-20 w-auto object-contain md:h-28" loading="eager" />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] transition-colors",
                  scrolled
                    ? isActive
                      ? "bg-[var(--brand-navy)] text-white"
                      : "text-[var(--brand-navy)] hover:bg-[var(--brand-sky)]/50"
                    : isActive
                      ? "bg-[var(--brand-lime)] text-[var(--brand-ink)]"
                      : "text-white hover:bg-white/15",
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
          <Link to="/contacto" className="lg:hidden">
            <Button variant="hero" size="sm">Contacto</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-ink py-14 text-ink-foreground">
      <div className="mx-auto w-[min(1280px,calc(100%-2rem))] grid gap-12 lg:grid-cols-[1fr_1fr_1fr] lg:items-start">
        <div className="space-y-4">
          <img src={logoAsset.url} alt="Logo de Parque Industrial Verde" className="h-20 w-auto object-contain" loading="lazy" />
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted">
            {phoneLinks.map((item) => (
              <a key={item.href} href={item.href} className="story-link">{item.label}</a>
            ))}
          </div>
          <a href={emailLink.href} className="story-link block text-sm text-ink-muted">{emailLink.label}</a>
        </div>
        <div className="space-y-4">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--brand-lime)]">Navegación</p>
          <div className="grid grid-cols-2 gap-2 text-[0.78rem]">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to} className="story-link w-fit font-bold uppercase tracking-[0.14em] text-ink-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--brand-lime)]">Redes</p>
          <div className="grid gap-2 text-[0.78rem]">
            {socialLinks.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="story-link w-fit font-bold uppercase tracking-[0.14em] text-ink-foreground">
                {item.label}
              </a>
            ))}
          </div>
        </div>
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

function Section({ eyebrow, title, description, children, className }: { eyebrow?: string; title: string; description?: string; children?: ReactNode; className?: string; }) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto w-[min(1280px,calc(100%-2rem))]">
        <div data-reveal className="max-w-3xl space-y-5">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">{title}</h2>
          {description ? <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function MetricCard({ value, prefix, suffix, description }: { value: number; prefix?: string; suffix?: string; description: string; }) {
  const { ref, value: liveValue } = useCountUp(value);
  return (
    <article ref={ref} data-reveal className="metric-card">
      <div className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
        {prefix}
        {formatMetric(liveValue)}
        {suffix}
      </div>
      <p className="max-w-sm text-sm leading-7 text-muted-foreground">{description}</p>
    </article>
  );
}

function AudienceStrip() {
  const palette = [
    { bg: "var(--brand-teal)", fg: "#FFFFFF" },
    { bg: "var(--brand-lime)", fg: "var(--brand-ink)" },
    { bg: "var(--brand-navy)", fg: "#FFFFFF" },
    { bg: "var(--brand-sky)", fg: "var(--brand-navy)" },
    { bg: "var(--brand-ink)", fg: "var(--brand-lime)" },
  ];
  return (
    <div className="mt-10 grid gap-3 md:grid-cols-5">
      {audience.map((item, i) => {
        const c = palette[i % palette.length];
        return (
          <div
            key={item}
            data-reveal
            className="rounded-full px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.1em] shadow-[var(--shadow-elevated)] transition-transform duration-300 hover:-translate-y-1"
            style={{ background: c.bg, color: c.fg }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

function ServicesGrid() {
  const palette = [
    "bg-gradient-to-br from-[var(--brand-teal)] to-[var(--brand-navy)] text-white",
    "bg-[var(--brand-lime)] text-[var(--brand-ink)]",
    "bg-[var(--brand-sky)] text-[var(--brand-navy)]",
    "bg-white text-[var(--brand-ink)] border border-[var(--brand-navy)]/15",
  ];
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {featuredServices.map((service, i) => (
        <article
          key={service.title}
          data-reveal
          className={cn(
            "group flex flex-col justify-between gap-6 rounded-3xl p-6 shadow-[var(--shadow-elevated)] transition-transform duration-300 hover:-translate-y-1",
            palette[i % palette.length],
          )}
        >
          <div className="space-y-3">
            <p className="text-lg font-bold tracking-tight md:text-xl">{service.title}</p>
            <p className="text-sm leading-6 opacity-85">{service.description}</p>
          </div>
          <MoveRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </article>
      ))}
    </div>
  );
}

function EnterpriseCommunity() {
  return (
    <section className="border-y border-border/70 bg-panel-subtle py-20 md:py-28">
      <div className="mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-8 lg:grid-cols-2">
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
        <article data-reveal className="editorial-panel editorial-panel--accent">
          <p className="eyebrow">Comunidad</p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl" style={{ color: "var(--brand-navy)" }}>Reciclar también transforma vidas.</h2>
          <div className="mt-8 grid gap-3">
            {communityActions.map((item) => (
              <div key={item} className="list-line">{item}</div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function TimelineRail() {
  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto w-[min(1280px,calc(100%-2rem))]">
        <div data-reveal className="max-w-3xl space-y-5">
          <p className="eyebrow">Evolución</p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">Una plataforma industrial construida por etapas, visión y escala.</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {timeline.map((item) => (
            <article key={item.year} data-reveal className="timeline-card">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{item.year}</p>
              <h3 className="mt-8 text-3xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <Section
      eyebrow="FAQ"
      title="La claridad operativa también construye confianza."
      description="Respuestas rápidas para empresas, campañas y personas que buscan una gestión responsable de sus materiales."
    >
      <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-reveal className="space-y-4">
          <p className="text-sm leading-7 text-muted-foreground">
            Si necesitas una ruta de recolección, certificación o validación de materiales, el equipo de PIV puede estructurar una propuesta según tu operación.
          </p>
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
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroAsset.url} alt="Operación real de Parque Industrial Verde dentro de una planta de reciclaje" className="h-full w-full object-cover" loading="eager" />
          <div className="hero-overlay" />
        </div>
        <div className="relative mx-auto flex min-h-screen w-[min(1280px,calc(100%-2rem))] items-end pb-12 pt-32 md:pb-20">
          <div className="grid w-full gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-6">
              <p data-hero-kicker className="eyebrow eyebrow--light">Economía circular con escala industrial</p>
              <h1 data-hero-title className="max-w-4xl text-balance text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-[5.2rem]">
                Transformamos residuos en oportunidades.
              </h1>
              <div data-hero-actions className="flex flex-wrap gap-3 pt-2">
                <a href={whatsappHref} target="_blank" rel="noreferrer"><Button variant="hero" size="xl">Cotizar</Button></a>
                <Link to="/materiales"><Button variant="heroSecondary" size="xl">Quiero reciclar</Button></Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:self-end">
              {pivStats.map((item) => (
                <div key={item.label} data-hero-stat className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                  <p className="text-4xl font-bold tracking-tight text-[var(--brand-lime)] md:text-5xl">
                    {item.prefix}{formatMetric(item.value)}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/85">{item.suffix}</p>
                  <p className="mt-3 text-xs leading-5 text-white/75">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Qué hacemos"
        title="La recuperación de materiales puede ser precisa, rentable y medible."
        description="Transformamos residuos en oportunidades. Gestionamos materiales reciclables para darles un nuevo valor, reduciendo el impacto ambiental y generando beneficios económicos."
      >
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article data-reveal className="surface-panel space-y-6">
            <p className="text-xl leading-9 text-foreground">
              PIV integra infraestructura, clasificación, procesamiento y exportación para reincorporar materiales a la cadena productiva con una lógica industrial y trazable.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {pivStats.map((item) => (
                <div key={item.label} className="border-l border-border pl-4">
                  <p className="text-2xl font-semibold tracking-tight text-foreground">{item.prefix}{formatMetric(item.value)}{item.suffix}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </article>
          <div data-reveal className="grid gap-4 md:grid-cols-2">
            <img src={operationsAsset.url} alt="Trabajador clasificando plásticos dentro de una línea de proceso industrial" className="image-tile image-tile--tall" loading="lazy" />
            <img src={metalsAsset.url} alt="Línea industrial de clasificación de aluminio y metales en Parque Industrial Verde" className="image-tile image-tile--short md:mt-12" loading="lazy" />
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Para quién"
        title="Trabajamos junto a quienes necesitan gestionar residuos con criterio operativo y responsabilidad real."
        description="Recolectores base, empresas, corporaciones, industrias y centros comerciales encuentran en PIV una red con capacidad para acompañar desde la recolección hasta la valorización final."
      >
        <AudienceStrip />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <img data-reveal src={communityAsset.url} alt="Familia y comunidad junto a materiales recuperados" className="image-tile h-64" loading="lazy" />
          <img data-reveal src={kidsAsset.url} alt="Niños participando en programa comunitario" className="image-tile h-64 md:translate-y-6" loading="lazy" />
          <img data-reveal src={alliesAsset.url} alt="Equipo aliado en una jornada de PIV" className="image-tile h-64" loading="lazy" />
        </div>
      </Section>

      <Section
        eyebrow="Por qué confiar"
        title="Confianza que se respalda con infraestructura, trazabilidad y permanencia."
        description="Más de dos décadas de operación, procesos transparentes y liderazgo nacional convierten a PIV en un socio ambiental con capacidad de ejecución real."
        className="bg-panel-subtle"
      >
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-6">
            {trustPillars.map((item) => (
              <div key={item} data-reveal className="surface-panel flex items-start gap-4">
                <ShieldCheck className="mt-1 h-5 w-5 text-primary" />
                <p className="text-base leading-7 text-foreground">{item}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {impactMetrics.map((metric) => (
              <MetricCard key={metric.description} {...metric} />
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Servicios destacados"
        title="Soluciones ambientales diseñadas para generar impacto."
        description="Desde recuperación de materiales hasta destrucción certificada y trazabilidad digital, cada servicio está pensado para integrarse a operaciones reales."
      >
        <ServicesGrid />
      </Section>

      <EnterpriseCommunity />

      <Section
        eyebrow="Alcance"
        title="Recuperamos materiales que vuelven a la economía con escala internacional."
        description="Clasificamos, procesamos y exportamos materiales a cinco regiones del mundo."
      >
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {exportRegions.map((region, i) => {
            const tones = [
              "bg-[var(--brand-teal)] text-white",
              "bg-[var(--brand-lime)] text-[var(--brand-ink)]",
              "bg-[var(--brand-navy)] text-white",
              "bg-[var(--brand-sky)] text-[var(--brand-navy)]",
              "bg-[var(--brand-ink)] text-[var(--brand-lime)]",
            ];
            return (
              <div key={region} data-reveal className={cn("flex items-center justify-between gap-3 rounded-2xl p-5 shadow-[var(--shadow-elevated)] transition-transform duration-300 hover:-translate-y-1", tones[i % tones.length])}>
                <span className="text-sm font-bold uppercase tracking-[0.12em]">{region}</span>
                <ArrowUpRight className="h-5 w-5" />
              </div>
            );
          })}
        </div>
      </Section>

      <TimelineRail />
      <FAQSection />

      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--gradient-accent)" }}>
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 20%, var(--brand-lime) 0%, transparent 45%), radial-gradient(circle at 80% 80%, var(--brand-sky) 0%, transparent 50%)" }} />
        <div className="relative mx-auto w-[min(1280px,calc(100%-2rem))] text-center">
          <div data-reveal className="mx-auto max-w-3xl space-y-6 text-white">
            <p className="eyebrow eyebrow--light justify-center">Hablemos</p>
            <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              Diseñemos la ruta circular de tu operación.
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
        <div className="relative mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-10 pb-16 md:pb-24 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div data-reveal className="space-y-6 text-white">
            <p className="eyebrow eyebrow--light">Sobre nosotros</p>
            <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-7xl">
              <span className="text-[var(--brand-lime)]">+23 años</span> transformando residuos en oportunidades.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/85">
              Desde INSEMA y ZARTEX hasta Parque Industrial Verde, hemos construido la red de reciclaje más grande de El Salvador: economía circular con respaldo industrial.
            </p>
            <div className="grid gap-3 sm:grid-cols-3 pt-4">
              {pivStats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-3xl font-bold text-[var(--brand-lime)]">{s.prefix}{formatMetric(s.value)}</p>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/85">{s.suffix}</p>
                </div>
              ))}
            </div>
          </div>
          <img data-reveal src={heroAsset.url} alt="Operación real de Parque Industrial Verde" className="image-tile h-[480px] md:h-[560px]" loading="eager" />
        </div>
      </section>
      <TimelineRail />
      <Section
        eyebrow="Propósito"
        title="Operar con escala industrial y convicción ambiental no son caminos separados."
        description="PIV articula tecnología, experiencia y una red de recuperación para convertir desechos en valor verificable."
      >
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <article data-reveal className="editorial-panel editorial-panel--teal">
            <p className="eyebrow">Misión</p>
            <p className="mt-6 text-xl leading-9">Ser una empresa líder en el mercado nacional del reciclaje de materiales, haciendo de los desechos una fuente de protección ambiental e incentivando prácticas responsables.</p>
          </article>
          <article data-reveal className="editorial-panel editorial-panel--lime">
            <p className="eyebrow">Visión</p>
            <p className="mt-6 text-xl leading-9">Ser reconocidos como la empresa de reciclaje más grande y confiable de El Salvador.</p>
          </article>
        </div>
      </Section>
      <Section
        eyebrow="Escala"
        title="Recuperación con impacto medible."
        description="En 2025 superamos los 75 millones de libras recuperadas, equivalentes a múltiples campos de fútbol llenos de material reincorporado a la economía."
        className="bg-panel-subtle"
      >
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-reveal className="surface-panel overflow-hidden p-0">
            <img src={impactGraphicAsset.url} alt="Visual de impacto con equivalencias de material recuperado" className="h-full w-full rounded-[1.75rem] object-cover" loading="lazy" />
          </div>
          <div className="grid gap-4">
            {impactMetrics.map((metric) => (
              <MetricCard key={metric.description} {...metric} />
            ))}
          </div>
        </div>
      </Section>
      <Section
        eyebrow="Confianza"
        title="El liderazgo se construye con capacidad real de respuesta."
        description="Procesos transparentes, cobertura nacional e infraestructura hacen posible una ejecución constante."
      >
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trustPillars.map((item, i) => {
            const tones = ["bg-[var(--brand-teal)] text-white", "bg-[var(--brand-lime)] text-[var(--brand-ink)]", "bg-[var(--brand-navy)] text-white", "bg-[var(--brand-sky)] text-[var(--brand-navy)]"];
            return (
              <article key={item} data-reveal className={cn("rounded-3xl p-6 shadow-[var(--shadow-elevated)]", tones[i % tones.length])}>
                <ShieldCheck className="h-6 w-6" />
                <p className="mt-6 text-base font-semibold leading-7">{item}</p>
              </article>
            );
          })}
        </div>
      </Section>
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
            <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-7xl">Soluciones ambientales diseñadas para generar impacto.</h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Diseñamos operaciones para recuperar valor, asegurar trazabilidad y facilitar decisiones ambientales con respaldo documental y capacidad industrial.
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
        title="Cada servicio se integra a una operación que busca orden, evidencia y resultados."
        description="Trabajamos con empresas, corporaciones e industrias que necesitan una solución ambiental alineada con cumplimiento, reputación e impacto medible."
      >
        <ServicesGrid />
      </Section>
      <EnterpriseCommunity />
    </PageShell>
  );
}

export function MaterialsPage() {
  const groupTones = [
    { card: "bg-gradient-to-br from-[var(--brand-teal)] to-[var(--brand-navy)] text-white", pill: "bg-white/15 text-white border border-white/20" },
    { card: "bg-[var(--brand-lime)] text-[var(--brand-ink)]", pill: "bg-[var(--brand-ink)] text-[var(--brand-lime)]" },
    { card: "bg-[var(--brand-sky)] text-[var(--brand-navy)]", pill: "bg-[var(--brand-navy)] text-white" },
    { card: "bg-[var(--brand-ink)] text-white", pill: "bg-[var(--brand-lime)] text-[var(--brand-ink)]" },
  ];
  return (
    <PageShell>
      <section className="relative overflow-hidden pt-36 md:pt-44" style={{ background: "var(--gradient-accent)" }}>
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 80% 20%, var(--brand-lime) 0%, transparent 45%), radial-gradient(circle at 20% 80%, var(--brand-sky) 0%, transparent 50%)" }} />
        <div className="relative mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-10 pb-16 md:pb-24 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div data-reveal className="space-y-6 text-white">
            <p className="eyebrow eyebrow--light">Materiales</p>
            <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-7xl">
              Cada material recuperado <span className="text-[var(--brand-lime)]">vuelve a la economía.</span>
            </h1>
            <p className="max-w-xl text-base leading-7 text-white/85">
              Clasificamos materiales según tipología, condición y ruta de valorización. Cuando corresponde, gestionamos disposición responsable por cobro.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={whatsappHref} target="_blank" rel="noreferrer"><Button variant="hero" size="xl">Cotizar</Button></a>
            </div>
          </div>
          <img data-reveal src={metalsAsset.url} alt="Clasificación de latas y materiales metálicos" className="image-tile h-[460px] md:h-[520px]" loading="eager" />
        </div>
      </section>
      <Section
        eyebrow="Categorías"
        title="Una estructura clara para preparar, separar y valorizar mejor."
        description="Agrupamos materiales para facilitar su recolección, clasificación y reincorporación a la cadena productiva."
      >
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {materialGroups.map((group, i) => {
            const t = groupTones[i % groupTones.length];
            return (
              <article key={group.title} data-reveal className={cn("rounded-3xl p-7 shadow-[var(--shadow-elevated)] transition-transform duration-300 hover:-translate-y-1", t.card)}>
                <h2 className="text-3xl font-bold tracking-tight">{group.title}</h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className={cn("rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em]", t.pill)}>{item}</span>
                  ))}
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
            const tones = ["bg-[var(--brand-teal)] text-white", "bg-[var(--brand-lime)] text-[var(--brand-ink)]", "bg-[var(--brand-navy)] text-white"];
            return (
              <article key={step} data-reveal className={cn("flex flex-col gap-4 rounded-3xl p-8 shadow-[var(--shadow-elevated)]", tones[i % tones.length])}>
                <span className="text-xs font-bold uppercase tracking-[0.18em] opacity-75">Paso {i + 1}</span>
                <p className="text-5xl font-bold tracking-tight">{step}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-10 rounded-3xl bg-[var(--brand-ink)] p-8 text-white shadow-[var(--shadow-elevated)]" data-reveal>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--brand-lime)]">Disposición responsable por cobro</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {disposalMaterials.map((item) => (
              <div key={item} className="rounded-2xl bg-white/5 p-4 text-sm leading-6 text-white/90">{item}</div>
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}

export function RsePage() {
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
          <img data-reveal src={communityAsset.url} alt="Programa comunitario de reciclaje y recuperación de materiales" className="image-tile h-[520px]" loading="eager" />
        </div>
      </section>
      <Section
        eyebrow="Campañas"
        title="Activaciones que conectan marca, territorio y cultura ambiental."
        description="Desde jornadas educativas hasta campañas empresariales, cada acción busca convertir la sostenibilidad en participación y resultados medibles."
      >
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {activeCampaigns.map((campaign) => (
            <article key={campaign} data-reveal className="editorial-panel editorial-panel--accent">
              <p className="text-2xl font-semibold tracking-tight">{campaign}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <img src={kidsAsset.url} alt="Niños y comunidad participando en un programa educativo de reciclaje" className="image-tile h-[360px]" loading="lazy" />
          <img src={beachAsset.url} alt="Jornada de limpieza y recuperación de residuos en la playa" className="image-tile h-[360px]" loading="lazy" />
        </div>
      </Section>
      <Section
        eyebrow="Impacto social"
        title="La economía circular también se construye desde la calle, la escuela y la costa."
        description="PIV trabaja con comunidades, empresas y territorios para activar hábitos, infraestructura y alianzas que multipliquen el efecto del reciclaje."
        className="bg-panel-subtle"
      >
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <img data-reveal src={alliesAsset.url} alt="Personas colaboradoras y aliadas participando en una iniciativa de Parque Industrial Verde" className="image-tile h-[460px]" loading="lazy" />
          <div className="grid gap-4">
            {communityActions.map((item) => (
              <article key={item} data-reveal className="surface-panel">
                <p className="text-lg font-medium text-foreground">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}

export function ContactPage() {
  return (
    <PageShell>
      <section className="pt-36 md:pt-44">
        <div className="mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <ContactFormCard />
          <LocationsPanel />
        </div>
      </section>
      <FAQSection />
    </PageShell>
  );
}
