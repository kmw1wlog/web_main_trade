"use client";

type HeaderProps = {
  onNavigate: (target: string, eventName: string, label?: string) => void;
};

const navItems = [
  { label: "자료실", target: "materials" },
  { label: "지표체험", target: "tool-demo" },
  { label: "앱베타", target: "app-beta" },
  { label: "사전예약", target: "preorder" },
  { label: "제휴문의", target: "coming-soon" },
];

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="border-b border-gold/20 bg-navy/80 backdrop-blur">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <button
          onClick={() => onNavigate("top", "header_logo_click", "TRADE PASS")}
          className="text-left"
        >
          <div className="text-lg font-semibold tracking-[0.18em] text-white">
            TRADE PASS
          </div>
          <div className="text-xs uppercase tracking-[0.24em] text-accentSoft">
            투자도구 패스
          </div>
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
          className="btn-primary px-4 py-2.5"
          onClick={() => onNavigate("coupon", "header_coupon_click")}
        >
          무료 쿠폰 받기
        </button>
      </div>
    </header>
  );
}
