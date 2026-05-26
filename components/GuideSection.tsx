type GuideSectionProps = {
  onNavigate: (target: string, eventName: string, label?: string) => void;
};

export function GuideSection({ onNavigate }: GuideSectionProps) {
  const steps = [
    "무료 쿠폰을 받아둡니다.",
    "무료 전자책과 지표 가이드를 읽습니다.",
    "CVD·거래량·알림 기능을 1번씩 눌러봅니다.",
    "자연어 조건식으로 내 관심 전략을 적어봅니다.",
    "모의투자·앱 베타·강의 중 필요한 것만 신청합니다.",
  ];
  const links = [
    ["3일 무료 쿠폰 받기", "coupon"],
    ["웹 지표 체험하기", "tool-demo"],
    ["무료 자료함 열기", "materials"],
    ["앱 베타 신청하기", "app-beta"],
    ["사전예약 보기", "preorder"],
  ] as const;

  return (
    <section className="shell section">
      <article className="card-paper p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-goldDeep">
            처음 오셨다면, 이 순서대로만 보세요
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-paperText sm:text-3xl">
            직접 검증하는 투자도구 사용 순서
          </h2>
          <p className="mt-4 text-sm leading-7 text-paperMuted sm:text-base">
            이 웹은 종목 추천방이 아닙니다. SNS에서 본 투자 아이디어를 그대로
            따라 하기보다, 사용자가 직접 지표를 보고, 조건을 만들고,
            모의투자로 연습할 수 있게 만든 도구형 투자 학습 허브입니다.
          </p>
        </div>
        <ol className="mt-8 space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-4 rounded-[22px] border border-gold/18 bg-ivory px-4 py-4">
              <span className="text-lg font-semibold text-goldDeep">{index + 1}.</span>
              <span className="text-sm leading-7 text-paperText">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 rounded-[22px] border border-gold/18 bg-white/70 px-5 py-5">
          <div className="text-sm font-semibold text-paperText">바로가기</div>
          <div className="mt-3 flex flex-wrap gap-3">
            {links.map(([label, target]) => (
              <button
                key={label}
                className="rounded-full border border-gold/30 px-4 py-2 text-sm font-medium text-goldDeep transition hover:border-gold hover:bg-gold/10"
                onClick={() => onNavigate(target, "guide_coupon_cta_click", label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
