type StatBadgeProps = {
  label: string;
  value: string;
};

export function StatBadge({ label, value }: StatBadgeProps) {
  return (
    <div className="card-soft px-4 py-3">
      <div className="text-xs uppercase tracking-[0.18em] text-muted">{label}</div>
      <div className="mt-2 text-lg font-semibold text-text">{value}</div>
    </div>
  );
}
