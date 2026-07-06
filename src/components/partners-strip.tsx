import { partners } from "@/lib/piv-partners";

export function PartnersStrip({
  eyebrow = "Aliados estratégicos",
  title = "Empresas que confían en Parque Industrial Verde",
  variant = "light",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  const loopA = [...partners, ...partners];
  const loopB = [...partners.slice().reverse(), ...partners.slice().reverse()];

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background: isDark
          ? "linear-gradient(180deg, var(--brand-ink) 0%, var(--brand-navy) 100%)"
          : "linear-gradient(180deg, #ffffff 0%, color-mix(in oklab, var(--brand-sky) 30%, white) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--brand-lime)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: isDark ? "var(--brand-teal)" : "var(--brand-sky)" }}
      />

      <div className="relative mx-auto w-[min(1320px,calc(100%-2rem))]">
        <div data-reveal className="max-w-3xl space-y-4">
          <p
            className="inline-flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.22em]"
            style={{ color: isDark ? "var(--brand-lime)" : "var(--brand-teal)" }}
          >
            <span className="inline-block h-px w-10" style={{ background: isDark ? "var(--brand-lime)" : "var(--brand-teal)" }} />
            {eyebrow}
          </p>
          <h2
            className="text-balance text-3xl font-semibold tracking-tight md:text-5xl"
            style={{ color: isDark ? "#ffffff" : "var(--brand-navy)" }}
          >
            {title}
          </h2>
        </div>

        </div>

        {/* Marquee — fila 1 (logos grandes) */}
        <div
          data-reveal
          className="marquee-pause relative mt-16 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
          }}
        >
          <div className="marquee-track flex w-max gap-6">
            {loopA.map((p, i) => (
              <LogoTile key={`a-${i}`} name={p.name} url={p.url} dark={isDark} />
            ))}
          </div>
        </div>

        {/* Marquee — fila 2 (dirección inversa) */}
        <div
          data-reveal
          className="marquee-pause relative mt-6 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
          }}
        >
          <div className="marquee-track-reverse flex w-max gap-6">
            {loopB.map((p, i) => (
              <LogoTile key={`b-${i}`} name={p.name} url={p.url} dark={isDark} accent />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label, dark }: { number: string; label: string; dark: boolean }) {
  return (
    <div className="flex flex-col">
      <span
        className="text-2xl font-black tracking-tight md:text-3xl"
        style={{ color: dark ? "var(--brand-lime)" : "var(--brand-teal)" }}
      >
        {number}
      </span>
      <span
        className="text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
        style={{ color: dark ? "rgba(255,255,255,0.7)" : "color-mix(in oklab, var(--brand-navy) 65%, white)" }}
      >
        {label}
      </span>
    </div>
  );
}

function LogoTile({
  name,
  url,
  dark,
  accent,
}: {
  name: string;
  url: string;
  dark: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "group relative flex h-44 w-72 shrink-0 items-center justify-center overflow-hidden rounded-3xl border transition-all duration-500 md:h-52 md:w-80",
        dark
          ? "border-white/10 bg-white"
          : accent
            ? "border-[var(--brand-navy)]/10 bg-gradient-to-br from-white to-[color-mix(in_oklab,var(--brand-sky)_45%,white)]"
            : "border-[var(--brand-navy)]/10 bg-white",
        "hover:-translate-y-2 hover:shadow-[0_28px_60px_-22px_rgba(18,82,106,0.55)] hover:border-[var(--brand-teal)]/50",
      ].join(" ")}
    >
      {/* corner accent */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 rounded-full transition-transform duration-500 group-hover:scale-150"
        style={{ background: "var(--brand-lime)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -bottom-px h-[3px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-[var(--brand-teal)] via-[var(--brand-lime)] to-[var(--brand-sky)] transition-transform duration-500 group-hover:scale-x-100"
      />
      <img
        src={url}
        alt={`Logo ${name}`}
        loading="lazy"
        className="max-h-[92%] max-w-[92%] object-contain transition-transform duration-500 group-hover:scale-[1.08]"
      />
    </div>
  );
}
