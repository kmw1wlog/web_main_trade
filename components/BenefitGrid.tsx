import { FeatureIcon, type FeatureIconName } from "@/components/FeatureIcon";

const benefits = [
  {
    eyebrow: "체험권",
    title: "3일 무료 쿠폰",
    description: "분석도구 10회권을 먼저 보관하세요.",
    cta: "쿠폰 받기",
    event: "coupon_claim_click",
    target: "coupon",
    icon: "coupon",
    badge: "3일 · 10회",
  },
  {
    eyebrow: "자료실",
    title: "무료 지표·전자책",
    description: "CVD, 거래량, 조건식, 모의투자 자료를 담아둡니다.",
    cta: "자료 담기",
    event: "free_material_click",
    target: "materials",
    icon: "library",
    badge: "PDF · CSV",
  },
  {
    eyebrow: "프리미엄",
    title: "1개월 체험 혜택",
    description: "프리미엄 콘텐츠 체험 혜택을 우선 안내받습니다.",
    cta: "대기 신청",
    event: "premium_trial_click",
    target: "premium",
    icon: "premium",
    badge: "대기",
  },
  {
    eyebrow: "데이터랩",
    title: "웹 지표 체험",
    description: "CVD, 거래량, 알림, 조건식 데모를 눌러봅니다.",
    cta: "지표 보기",
    event: "web_tool_try_click",
    target: "tool-demo",
    icon: "chart",
    badge: "DEMO",
  },
  {
    eyebrow: "모바일",
    title: "앱 무료 베타",
    description: "웹에서 쓰던 지표와 알림을 앱으로 가져갑니다.",
    cta: "베타 신청",
    event: "app_beta_click",
    target: "app-beta",
    icon: "mobile",
    badge: "BETA",
  },
  {
    eyebrow: "런칭",
    title: "강의·도구 사전예약",
    description: "정식 출시 전 가격과 베타 혜택을 먼저 받습니다.",
    cta: "예약 보기",
    event: "preorder_click",
    target: "preorder",
    icon: "calendar",
    badge: "EARLY",
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
            className="group min-h-[150px] rounded-[26px] border border-gold/25 bg-paper p-4 text-left text-paperText shadow-paper transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-premium focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-goldDeep">
                  {benefit.eyebrow}
                </div>
                <div className="mt-3 text-gold">
                  <FeatureIcon
                    name={benefit.icon as FeatureIconName}
                    className="h-7 w-7"
                  />
                </div>
              </div>
              <div className="rounded-full bg-navy px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-goldSoft">
                {benefit.badge}
              </div>
            </div>
            <h2 className="mt-4 text-base font-semibold sm:text-lg">{benefit.title}</h2>
            <p className="mt-2 text-sm leading-6 text-paperMuted">{benefit.description}</p>
            <div className="mt-4 text-sm font-semibold text-goldDeep">
              {benefit.cta} →
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
