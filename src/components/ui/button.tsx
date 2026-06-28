import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-shine relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium cursor-pointer overflow-hidden transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_18px_40px_-12px_color-mix(in_oklab,var(--brand-lime)_70%,transparent)]",
        primary: "bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_18px_40px_-12px_color-mix(in_oklab,var(--brand-lime)_70%,transparent)]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:opacity-90 hover:-translate-y-0.5",
        outline:
          "border border-border bg-background text-foreground hover:border-primary hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-0.5",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        headerCta: "bg-panel text-foreground ring-1 ring-white/10 backdrop-blur-md hover:bg-panel-strong hover:-translate-y-0.5 hover:scale-[1.03]",
        hero: "bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[var(--shadow-elevated)]",
        heroSecondary:
          "bg-white/6 text-white ring-1 ring-white/18 backdrop-blur-md hover:bg-white/15 hover:-translate-y-1 hover:scale-[1.04] hover:ring-white/40",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-11 px-6 text-sm",
        xl: "h-13 px-7 text-sm uppercase tracking-[0.12em]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
