type GuideSectionProps = {
  onCouponClick: () => void;
};

export function GuideSection({ onCouponClick }: GuideSectionProps) {
  const steps = [
    "무료 쿠폰을 받아둡니다.",
    "무료 전자책과 지표 가이드를 읽습니다.",
    "CVD·거래량·알림 기능을 1번씩 눌러봅니다.",
    "자연어 조건식으로 내 관심 전략을 적어봅니다.",
    "모의투자·앱 베타·강의 중 필요한 것만 신청합니다.",
  ];

  return (
    <section className="shell section">
      <div className="card p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold text-accentSoft">
            처음 오셨다면, 이 순서대로만 보세요
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            따라 하기보다 직접 검증하는 흐름으로 설계했습니다
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
            이 웹은 종목 추천방이 아닙니다. SNS에서 본 투자 아이디어를 그대로
            따라 하기보다, 사용자가 직접 지표를 보고, 조건을 만들고,
            모의투자로 연습할 수 있게 만든 도구형 투자 학습 허브입니다.
          </p>
        </div>
        <div className="mt-8 grid gap-3 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step} className="card-soft p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-muted">
                Step {index + 1}
              </div>
              <div className="mt-3 text-sm leading-6 text-text">{step}</div>
            </div>
          ))}
        </div>
        <button className="btn-primary mt-8" onClick={onCouponClick}>
          무료 쿠폰 먼저 받기
        </button>
      </div>
    </section>
  );
}
