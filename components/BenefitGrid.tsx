const benefits = [
  {
    title: "3일 무료 쿠폰",
    description:
      "분석도구 10회 이용권을 먼저 받아두세요. 만료 전 알림을 받을 수 있습니다.",
    cta: "무료 쿠폰 받기",
    event: "coupon_claim_click",
    target: "coupon",
    icon: "🎟️",
  },
  {
    title: "무료 지표·전자책",
    description:
      "CVD, 거래량, 조건식, 모의투자 기록 자료를 무료로 담아두세요.",
    cta: "무료 자료 받기",
    event: "free_material_click",
    target: "materials",
    icon: "📚",
  },
  {
    title: "프리미엄 1개월 혜택",
    description:
      "네이버프리미엄/자체 프리미엄 콘텐츠 체험 혜택을 우선 안내합니다.",
    cta: "혜택 대기하기",
    event: "premium_trial_click",
    target: "premium",
    icon: "⭐",
  },
  {
    title: "웹 지표 체험",
    description:
      "CVD, 거래량, 알림, 자연어 조건식 데모를 웹에서 먼저 눌러보세요.",
    cta: "지표 체험하기",
    event: "web_tool_try_click",
    target: "tool-demo",
    icon: "📈",
  },
  {
    title: "앱 무료 베타",
    description:
      "웹에서 쓰던 지표와 알림을 앱으로 가져갑니다. 베타 신청자를 우선 안내합니다.",
    cta: "앱 베타 신청",
    event: "app_beta_click",
    target: "app-beta",
    icon: "📱",
  },
  {
    title: "강의·도구 사전예약",
    description:
      "조건식, 모의투자, 전자책, 앱 구독권을 정식 출시 전 혜택으로 예약하세요.",
    cta: "사전예약 보기",
    event: "preorder_click",
    target: "preorder",
    icon: "🗂️",
  },
] as const;

type BenefitGridProps = {
  onNavigate: (target: string, eventName: string, label?: string) => void;
};

export function BenefitGrid({ onNavigate }: BenefitGridProps) {
  return (
    <section className="shell pt-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <button
            key={benefit.title}
            onClick={() => onNavigate(benefit.target, benefit.event, benefit.title)}
            className="card min-h-[176px] p-4 text-left transition hover:-translate-y-1 hover:border-accent/50 hover:bg-panelSoft/90 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <div className="text-2xl">{benefit.icon}</div>
            <h2 className="mt-3 text-base font-semibold text-white sm:text-lg">
              {benefit.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              {benefit.description}
            </p>
            <div className="mt-4 text-sm font-semibold text-accentSoft">
              {benefit.cta} →
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
