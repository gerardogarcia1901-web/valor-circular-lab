import { partners } from "@/lib/piv-partners";

export function PartnersStrip({
  eyebrow = "Aliados",
  title = "Empresas que confían en Parque Industrial Verde",
  description = "Más de dos décadas operando junto a marcas líderes que han elegido la trazabilidad, la escala industrial y la economía circular real.",
  variant = "light",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  const loop = [...partners, ...partners];

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background: isDark
          ? "linear-gradient(180deg, var(--brand-ink) 0%, var(--brand-navy) 100%)"
          : "linear-gradient(180deg, #ffffff 0%, color-mix(in oklab, var(--brand-sky) 25%, white) 100%)",
      }}
    >
      <div className="mx-auto w-[min(1280px,calc(100%-2rem))]">
        <div data-reveal className="max-w-3xl space-y-4">
          <p
            className="text-[0.7rem] font-bold uppercase tracking-[0.2em]"
            style={{ color: isDark ? "var(--brand-lime)" : "var(--brand-teal)" }}
          >
            <span className="mr-2 inline-block h-px w-8 align-middle" style={{ background: isDark ? "var(--brand-lime)" : "var(--brand-teal)" }} />
            {eyebrow}
          </p>
          <h2
            className="text-balance text-3xl font-semibold tracking-tight md:text-5xl"
            style={{ color: isDark ? "#ffffff" : "var(--brand-navy)" }}
          >
            {title}
          </h2>
          <p
            className="max-w-2xl text-base leading-7"
            style={{ color: isDark ? "rgba(255,255,255,0.75)" : "color-mix(in oklab, var(--brand-navy) 70%, white)" }}
          >
            {description}
          </p>
        </div>

        {/* Marquee row */}
        <div
          data-reveal
          className="marquee-pause relative mt-14 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
          }}
        >
          <div className="marquee-track flex w-max gap-4">
            {loop.map((p, i) => (
              <LogoTile key={i} name={p.name} url={p.url} dark={isDark} />
            ))}
          </div>
        </div>

        {/* Static grid below for SEO + accessibility */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {partners.map((p) => (
            <LogoTile key={p.name} name={p.name} url={p.url} dark={isDark} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoTile({
  name,
  url,
  dark,
  compact,
}: {
  name: string;
  url: string;
  dark: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={[
        "group relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border transition-all duration-500",
        compact ? "h-24" : "h-28 min-w-[200px] md:h-32 md:min-w-[240px]",
        dark
          ? "border-white/10 bg-white/95 hover:bg-white"
          : "border-[var(--brand-navy)]/10 bg-white hover:border-[var(--brand-teal)]/40",
        "hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(18,82,106,0.45)]",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[var(--brand-teal)] via-[var(--brand-lime)] to-[var(--brand-sky)] transition-transform duration-500 group-hover:scale-x-100"
      />
      <img
        src={url}
        alt={`Logo ${name}`}
        loading="lazy"
        className="max-h-[64%] max-w-[78%] object-contain transition-transform duration-500 group-hover:scale-[1.05]"
      />
    </div>
  );
}
