"use client";

type HeaderProps = {
  onNavigate: (target: string, eventName: string, label?: string) => void;
};

const navItems = [
  { label: "무료자료", target: "materials" },
  { label: "기능체험", target: "tool-demo" },
  { label: "앱베타", target: "app-beta" },
  { label: "사전예약", target: "preorder" },
  { label: "제휴문의", target: "partner-inquiry" },
];

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="border-b border-gold/15 bg-navy/85 backdrop-blur">
      <div className="shell flex items-center justify-between gap-3 py-3">
        <button
          onClick={() => onNavigate("top", "header_logo_click", "TRADE PASS")}
          className="flex items-center gap-2 text-left"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-xs font-semibold text-accentSoft">
            TP
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-[0.14em] text-white">
              TRADE PASS
            </span>
            <span className="block text-[11px] text-muted">투자도구 패스</span>
          </span>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="text-sm font-medium text-muted transition hover:text-accentSoft"
              onClick={() => onNavigate(item.target, "header_nav_click", item.label)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="btn-primary px-4 py-2"
          onClick={() => onNavigate("coupon", "header_coupon_click")}
        >
          무료 쿠폰
        </button>
      </div>
    </header>
  );
}
