export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-16 bg-line" />
      <span className="text-base leading-none text-gold">&#9816;</span>
      <span className="h-px w-16 bg-line" />
    </div>
  );
}
