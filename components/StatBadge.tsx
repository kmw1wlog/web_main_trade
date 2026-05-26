type StatBadgeProps = {
  label: string;
  value: string;
  variant?: "dark" | "paper";
};

export function StatBadge({
  label,
  value,
  variant = "dark",
}: StatBadgeProps) {
  return (
    <div
      className={
        variant === "paper"
          ? "rounded-[22px] border border-gold/20 bg-ivory px-4 py-3"
          : "card-soft px-4 py-3"
      }
    >
      <div
        className={
          variant === "paper"
            ? "text-xs uppercase tracking-[0.18em] text-paperMuted"
            : "text-xs uppercase tracking-[0.18em] text-muted"
        }
      >
        {label}
      </div>
      <div
        className={
          variant === "paper"
            ? "mt-2 text-lg font-semibold text-paperText"
            : "mt-2 text-lg font-semibold text-text"
        }
      >
        {value}
      </div>
    </div>
  );
}
