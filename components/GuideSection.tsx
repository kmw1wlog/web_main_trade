type GuideSectionProps = {
  onNavigate: (target: string, eventName: string, label?: string) => void;
};

export function GuideSection({ onNavigate }: GuideSectionProps) {
  const readingOrder = [
    "무료 쿠폰 받기",
    "무료 전자책/지표 자료 담기",
    "웹 기능 1개 눌러보기",
    "자연어 조건식 입력해보기",
    "앱 베타나 사전예약은 관심 있을 때만 신청",
  ];
  const couponUses = [
    "CVD 예시 보기",
    "거래량 급증 카드 보기",
    "관심종목 알림 UI 눌러보기",
    "자연어 조건식 만들기",
    "모의투자 설정 예시 보기",
  ];
  const materialLinks = [
    ["CVD 초보 가이드", "materials"],
    ["거래량 보는 법", "tool-demo"],
    ["AI 조건식 예시집", "materials"],
    ["모의투자 기록표", "materials"],
    ["트레이딩뷰 체크리스트", "materials"],
  ] as const;
  const quickLinks = [
    ["3일 무료 쿠폰", "coupon"],
    ["웹 기능 체험", "tool-demo"],
    ["무료 자료함", "materials"],
    ["앱 베타", "app-beta"],
    ["사전예약", "preorder"],
    ["커뮤니티", "community"],
  ] as const;

  return (
    <section className="shell section pt-8 sm:pt-10">
      <article className="article-card">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-goldDeep">
              처음 오신 분 필독
            </div>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-paperText sm:text-3xl">
              이 웹 100% 활용하는 방법
            </h2>
            <p className="mt-4 text-base leading-8 text-paperMuted">
              SNS에서 본 투자 성과를 바로 따라 하기보다, 무료 쿠폰과 자료를
              먼저 받아두고 지표·조건식·모의투자로 직접 확인해보는 흐름입니다.
            </p>

            <div className="mt-8 space-y-8 text-sm leading-8 text-paperMuted">
              <section>
                <h3 className="text-xl font-semibold text-paperText">
                  1. 이 웹은 무엇을 위한 곳인가
                </h3>
                <p className="mt-3">
                  이 웹은 종목 추천방이 아니라, 투자 아이디어를 직접 검증하고
                  지표를 이해하고 모의투자로 연습할 수 있게 돕는 도구형 학습
                  허브입니다.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-paperText">
                  2. 처음 온 사람은 이 순서대로 보세요
                </h3>
                <ol className="mt-4 space-y-2">
                  {readingOrder.map((step, index) => (
                    <li
                      key={step}
                      className="flex gap-3 rounded-2xl border border-gold/18 bg-ivory px-4 py-3"
                    >
                      <span className="font-semibold text-goldDeep">
                        {index + 1}.
                      </span>
                      <span className="text-paperText">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-paperText">
                  3. 무료 쿠폰 10회권은 어디에 쓰나
                </h3>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {couponUses.map((item) => (
                    <button
                      key={item}
                      className="rounded-2xl border border-gold/18 bg-paper px-4 py-3 text-left text-sm font-medium text-paperText transition hover:border-gold/45 hover:bg-gold/10"
                      onClick={() => onNavigate("tool-demo", "guide_link_click", item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-paperText">
                  4. 자료는 무엇부터 보면 좋은가
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {materialLinks.map(([label, target]) => (
                    <button
                      key={label}
                      className="link-chip border-gold/25 bg-white text-goldDeep"
                      onClick={() => onNavigate(target, "guide_link_click", label)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <aside className="h-fit rounded-[22px] border border-gold/20 bg-ivory p-4">
            <div className="text-sm font-semibold text-paperText">빠른 링크 모음</div>
            <div className="mt-4 grid gap-2">
              {quickLinks.map(([label, target]) => (
                <button
                  key={label}
                  className="rounded-2xl border border-gold/20 bg-paper px-4 py-3 text-left text-sm font-semibold text-goldDeep transition hover:border-gold/50 hover:bg-gold/10"
                  onClick={() => onNavigate(target, "guide_link_click", label)}
                >
                  {label} →
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs leading-6 text-paperMuted">
              모든 기능과 자료는 교육 목적입니다. 최종 투자 판단과 책임은
              사용자 본인에게 있습니다.
            </p>
          </aside>
        </div>
      </article>
    </section>
  );
}
