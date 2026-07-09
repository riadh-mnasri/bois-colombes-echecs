export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p
          className={`mb-3 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] ${
            light ? "text-gold-soft" : "text-wood"
          }`}
        >
          <span aria-hidden className={`h-px w-8 ${light ? "bg-gold-soft" : "bg-gold"}`} />
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance font-display text-3xl font-medium sm:text-4xl">{title}</h2>
      {description && (
        <p className={`mt-4 text-lg ${light ? "text-paper/75" : "text-ink-soft"}`}>{description}</p>
      )}
    </div>
  );
}
