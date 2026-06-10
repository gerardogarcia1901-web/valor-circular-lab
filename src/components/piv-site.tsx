import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, ChevronRight, Clock3, MapPinned, MessageCircle, MoveRight, Phone, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import logoAsset from "@/assets/piv-logo.png.asset.json";
import heroAsset from "@/assets/piv-hero.jpg.asset.json";
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

const heroStats = [
  "+23 años",
  "+1,000 millones de libras recuperadas",
  "3 sucursales",
];

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
    const tween = gsap.to(state, {
      value: target,
      duration: 1.8,
      ease: "power2.out",
      paused: true,
      onUpdate: () => setValue(Math.round(state.value)),
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
        onEnter: () => tween.play(),
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
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="mx-auto flex w-[min(1280px,calc(100%-2rem))] items-center justify-between gap-4 rounded-full border border-white/10 px-4 py-3 md:px-6">
        <div
          className={cn(
            "absolute inset-0 -z-10 rounded-full transition-all duration-500",
            scrolled
              ? "bg-panel/80 backdrop-blur-md shadow-[var(--shadow-elevated)]"
              : "bg-transparent backdrop-blur-0",
          )}
        />
        <Link to="/" className="shrink-0" aria-label="Parque Industrial Verde, ir al inicio">
          <img src={logoAsset.url} alt="Logo de Parque Industrial Verde" className="h-14 w-auto object-contain md:h-16" loading="eager" />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "nav-link",
                pathname === item.to && "text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="hidden md:block">
            <Button variant="headerCta" size="sm">Solicitar recolección</Button>
          </a>
          <Link to="/contacto" className="lg:hidden">
            <Button variant="headerCta" size="sm">Contacto</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-ink py-16 text-ink-foreground">
      <div className="mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-5">
          <img src={logoAsset.url} alt="Logo de Parque Industrial Verde" className="h-16 w-auto object-contain" loading="lazy" />
          <p className="max-w-xl text-sm leading-7 text-ink-muted">
            Infraestructura, trazabilidad y recuperación de materiales para impulsar una economía circular tangible en El Salvador.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-ink-muted">
            {phoneLinks.map((item) => (
              <a key={item.href} href={item.href} className="story-link">{item.label}</a>
            ))}
            <a href={emailLink.href} className="story-link">{emailLink.label}</a>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">Navegación</p>
          <div className="grid gap-3 text-sm">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to} className="story-link w-fit text-ink-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">Redes</p>
          <div className="grid gap-3 text-sm">
            {socialLinks.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="story-link w-fit text-ink-foreground">
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
  return (
    <div className="mt-10 grid gap-3 md:grid-cols-5">
      {audience.map((item) => (
        <div key={item} data-reveal className="audience-pill">{item}</div>
      ))}
    </div>
  );
}

function ServicesGrid() {
  return (
    <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {featuredServices.map((service) => (
        <article key={service} data-reveal className="service-card">
          <p className="text-base font-medium text-foreground">{service}</p>
          <MoveRight className="h-4 w-4 text-primary" />
        </article>
      ))}
    </div>
  );
}

function EnterpriseCommunity() {
  return (
    <section className="border-y border-border/70 bg-panel-subtle py-20 md:py-28">
      <div className="mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-8 lg:grid-cols-2">
        <article data-reveal className="editorial-panel">
          <p className="eyebrow">Empresas</p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">Soluciones ambientales para empresas.</h2>
          <div className="mt-8 grid gap-3">
            {enterpriseServices.map((item) => (
              <div key={item} className="list-line">{item}</div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {enterpriseBenefits.map((item) => (
              <span key={item} className="benefit-pill">{item}</span>
            ))}
          </div>
        </article>
        <article data-reveal className="editorial-panel editorial-panel--accent">
          <p className="eyebrow">Comunidad</p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">Reciclar también transforma vidas.</h2>
          <div className="mt-8 grid gap-3">
            {communityActions.map((item) => (
              <div key={item} className="list-line">{item}</div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <img src={communityAsset.url} alt="Familia y comunidad junto a materiales recuperados durante una jornada de reciclaje" className="image-tile" loading="lazy" />
            <img src={kidsAsset.url} alt="Niños participando en recuperación de plásticos dentro de un programa comunitario" className="image-tile" loading="lazy" />
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
        <div className="relative mx-auto flex min-h-screen w-[min(1280px,calc(100%-2rem))] items-end py-18 md:py-24">
          <div className="grid w-full gap-10 pb-8 pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="space-y-7">
              <p data-hero-kicker className="eyebrow text-white/88">Economía circular con escala industrial</p>
              <h1 data-hero-title className="max-w-4xl text-balance text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-[5.6rem]">
                Transformamos residuos en oportunidades.
              </h1>
              <p data-hero-copy className="max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
                Gestionamos materiales reciclables para darles una nueva vida, reduciendo el impacto ambiental y generando valor económico para empresas y comunidades.
              </p>
              <div data-hero-actions className="flex flex-wrap gap-3">
                <Link to="/servicios"><Button variant="hero" size="xl">Soy empresa</Button></Link>
                <Link to="/materiales"><Button variant="heroSecondary" size="xl">Quiero reciclar</Button></Link>
              </div>
            </div>
            <div className="grid gap-3 self-end lg:justify-self-end">
              {heroStats.map((item) => (
                <div key={item} data-hero-stat className="hero-stat">{item}</div>
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
        eyebrow="Impacto"
        title="Los materiales recuperados vuelven a la economía con una lógica de escala internacional."
        description="Clasificamos, procesamos y exportamos materiales para reincorporarlos a la cadena productiva en América del Norte, Centroamérica, Sudamérica, Europa y Asia."
      >
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div data-reveal className="surface-panel overflow-hidden">
            <img src={impactGraphicAsset.url} alt="Visual de impacto de Parque Industrial Verde con equivalencias de material recuperado" className="h-full w-full rounded-[1.25rem] object-cover" loading="lazy" />
          </div>
          <div className="grid gap-4">
            {exportRegions.map((region) => (
              <div key={region} data-reveal className="region-card">
                <span>{region}</span>
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </div>
            ))}
            <img src={alliesAsset.url} alt="Equipo operativo de Parque Industrial Verde en planta industrial" className="image-tile h-[320px]" loading="lazy" />
          </div>
        </div>
      </Section>

      <TimelineRail />
      <FAQSection />

      <section className="border-t border-border/70 bg-panel-subtle py-20 md:py-28">
        <div className="mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <ContactFormCard />
          <LocationsPanel />
        </div>
      </section>
    </PageShell>
  );
}

export function AboutPage() {
  return (
    <PageShell>
      <section className="pt-36 md:pt-44">
        <div className="mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div data-reveal className="space-y-6 pb-8">
            <p className="eyebrow">Sobre nosotros</p>
            <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-7xl">Transformando residuos en oportunidades desde hace más de dos décadas.</h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Más de 23 años liderando el reciclaje en El Salvador. Desde nuestros inicios con INSEMA y ZARTEX hasta la creación de Parque Industrial Verde, hemos trabajado para transformar residuos en oportunidades, impulsando una economía circular que beneficia al medio ambiente, las empresas y las comunidades.
            </p>
          </div>
          <img data-reveal src={heroAsset.url} alt="Persona dentro de la planta de Parque Industrial Verde mostrando el entorno real de operación" className="image-tile h-[520px]" loading="eager" />
        </div>
      </section>
      <TimelineRail />
      <Section
        eyebrow="Propósito"
        title="Operar con escala industrial y convicción ambiental no son caminos separados."
        description="PIV articula tecnología, experiencia y una red de recuperación para convertir desechos en valor verificable."
      >
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <article data-reveal className="editorial-panel">
            <p className="eyebrow">Misión</p>
            <p className="mt-6 text-xl leading-9 text-foreground">Ser una empresa líder en el mercado nacional del reciclaje de materiales, haciendo de los desechos una fuente de protección ambiental e incentivando prácticas responsables.</p>
          </article>
          <article data-reveal className="editorial-panel editorial-panel--accent">
            <p className="eyebrow">Visión</p>
            <p className="mt-6 text-xl leading-9 text-foreground">Ser reconocidos como la empresa de reciclaje más grande y confiable de El Salvador.</p>
          </article>
        </div>
      </Section>
      <Section
        eyebrow="Confianza"
        title="El liderazgo se construye con capacidad real de respuesta."
        description="Procesos transparentes, cobertura nacional e infraestructura hacen posible una ejecución constante para aliados corporativos y comunidades."
        className="bg-panel-subtle"
      >
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trustPillars.map((item) => (
            <article key={item} data-reveal className="surface-panel">
              <p className="text-base leading-7 text-foreground">{item}</p>
            </article>
          ))}
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
              <a href={whatsappHref} target="_blank" rel="noreferrer"><Button variant="primary" size="lg">Solicitar recolección</Button></a>
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
  return (
    <PageShell>
      <section className="pt-36 md:pt-44">
        <div className="mx-auto grid w-[min(1280px,calc(100%-2rem))] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal className="space-y-6">
            <p className="eyebrow">Materiales</p>
            <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-7xl">Cada material recuperado representa un recurso que vuelve a la economía.</h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Clasificamos materiales según tipología, condición y ruta de valorización. Cuando corresponde, también gestionamos disposición responsable por cobro.
            </p>
          </div>
          <img data-reveal src={metalsAsset.url} alt="Clasificación de latas y materiales metálicos dentro de un proceso industrial" className="image-tile h-[520px]" loading="eager" />
        </div>
      </section>
      <Section
        eyebrow="Categorías"
        title="Una estructura clara para preparar, separar y valorizar mejor."
        description="Agrupamos materiales para facilitar su recolección, clasificación y reincorporación a la cadena productiva."
      >
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {materialGroups.map((group) => (
            <article key={group.title} data-reveal className="surface-panel">
              <h2 className="text-2xl font-semibold tracking-tight">{group.title}</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="material-pill">{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="Cómo preparar los materiales"
        title="La eficiencia del proceso empieza antes de la recolección."
        description="Preparar correctamente los materiales mejora la clasificación, reduce rechazos y acelera el aprovechamiento."
        className="bg-panel-subtle"
      >
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {preparationSteps.map((step) => (
            <article key={step} data-reveal className="editorial-panel">
              <p className="text-3xl font-semibold tracking-tight">{step}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 surface-panel" data-reveal>
          <p className="eyebrow">Disposición responsable por cobro</p>
          <div className="mt-5 grid gap-3">
            {disposalMaterials.map((item) => (
              <div key={item} className="list-line">{item}</div>
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
