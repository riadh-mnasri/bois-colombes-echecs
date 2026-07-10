import type { ScheduleRow } from "@/lib/content";

export function ScheduleCard({ title, rows }: { title: string; rows: ScheduleRow[] }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-8 shadow-sm">
      <div className="flex items-baseline justify-between border-b border-line pb-5">
        <h3 className="font-display text-2xl font-medium">{title}</h3>
        <span aria-hidden className="text-base leading-none text-gold">&#9816;</span>
      </div>
      <ul className="divide-y divide-line/70">
        {rows.map((row) => (
          <li
            key={`${row.what}-${row.when}`}
            className="flex flex-wrap items-baseline gap-x-3 py-4"
          >
            <span className="font-medium text-ink">{row.what}</span>
            <span aria-hidden className="min-w-8 flex-1 self-center border-b border-dotted border-line" />
            <span className="text-right text-sm text-ink-soft">
              <span className="font-medium text-wood">{row.when}</span>
              {row.time && <> &middot; {row.time}</>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
