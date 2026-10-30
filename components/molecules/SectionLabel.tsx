/**
 * Editorial chapter label used across the landing page, e.g. "02 — The menu".
 * `tone="dark"` is for labels sitting on the deep-green sections.
 */
export function SectionLabel({
  index,
  children,
  tone = "light",
  className = "",
  as: Tag = "p",
}: {
  index: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
  /** Use "h2" when the label is the section's only heading */
  as?: "p" | "h2";
}) {
  const accent = tone === "dark" ? "text-[#C9A24A]" : "text-[#7D6020]"; // ≥5:1 on every cream used
  const text = tone === "dark" ? "text-white/70" : "text-primary/70";
  const rule = tone === "dark" ? "bg-white/25" : "bg-primary/25";
  return (
    <Tag className={`flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] ${text} ${className}`}>
      <span className={`tabular-nums ${accent}`}>{index}</span>
      <span aria-hidden="true" className={`h-px w-8 ${rule}`} />
      <span>{children}</span>
    </Tag>
  );
}
