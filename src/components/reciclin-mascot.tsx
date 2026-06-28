import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import reciclinAsset from "@/assets/reciclin.png.asset.json";

type ReciclinMascotProps = {
  message: ReactNode;
  size?: "sm" | "md" | "lg";
  side?: "left" | "right";
  tone?: "lime" | "navy" | "white";
  className?: string;
  float?: boolean;
};

const sizeMap = {
  sm: "h-24 md:h-28",
  md: "h-36 md:h-44",
  lg: "h-48 md:h-60",
};

const toneMap = {
  lime: "bg-[var(--brand-lime)] text-[var(--brand-ink)] border-[var(--brand-ink)]/10",
  navy: "bg-[var(--brand-navy)] text-white border-white/15",
  white: "bg-white text-[var(--brand-navy)] border-[var(--brand-navy)]/10",
};

export function ReciclinMascot({
  message,
  size = "md",
  side = "left",
  tone = "lime",
  className,
  float = true,
}: ReciclinMascotProps) {
  return (
    <div
      className={cn(
        "flex items-end gap-3 md:gap-4",
        side === "right" && "flex-row-reverse",
        className,
      )}
    >
      <img
        src={reciclinAsset.url}
        alt="Reciclin, mascota de Parque Industrial Verde"
        className={cn(
          "w-auto shrink-0 drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)]",
          sizeMap[size],
          float && "animate-[reciclin-float_4s_ease-in-out_infinite]",
        )}
      />
      <div
        className={cn(
          "relative max-w-xs rounded-2xl border px-4 py-3 text-sm font-medium leading-6 shadow-lg",
          toneMap[tone],
        )}
      >
        {/* tail */}
        <span
          aria-hidden
          className={cn(
            "absolute bottom-4 h-3 w-3 rotate-45 border",
            toneMap[tone],
            side === "left"
              ? "-left-1.5 border-r-0 border-t-0"
              : "-right-1.5 border-l-0 border-b-0",
          )}
        />
        {message}
      </div>
    </div>
  );
}
