import Link from "next/link";
import { ReactNode } from "react";

type Variant = "solid" | "outline-light" | "outline-dark";

const base =
  "btn-sheen inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors";

const variants: Record<Variant, string> = {
  solid: "bg-gold text-ink hover:bg-gold-soft",
  "outline-light": "border border-paper/40 text-paper hover:bg-paper/10",
  "outline-dark": "border border-ink/30 text-ink hover:bg-ink/5",
};

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
