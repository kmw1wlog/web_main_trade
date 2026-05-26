type HeroProps = {
  onCouponClick: () => void;
  onToolClick: () => void;
};

export function Hero({ onCouponClick, onToolClick }: HeroProps) {
  return (
    <section id="top" className="shell pt-6 sm:pt-8">
      <div className="card overflow-hidden bg-premiumGlow px-5 py-7 sm:px-8 sm:py-9">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-semibold text-accentSoft">
              트레이드패스
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-[3.6rem]">
              SNS에서 본 투자도구,
              <br />
              3일 무료로 써보고 판단하세요.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-text sm:text-lg">
              성과 인증을 바로 따라 하기보다, 지표·자료·모의투자로 직접
              확인해보세요.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              무료 10회권, 자료함, 웹 지표 체험, 앱 베타, 사전예약을 한 번에
              담아둡니다.
            </p>
            <p className="mt-3 text-sm text-warn">
              본 서비스는 투자 자문, 종목 추천, 수익 보장을 제공하지 않습니다.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="btn-primary" onClick={onCouponClick}>
                3일 무료 쿠폰 받기
              </button>
              <button className="btn-secondary" onClick={onToolClick}>
                웹 지표 체험하기
              </button>
            </div>
          </div>
          <div className="rounded-[28px] border border-gold/25 bg-ink/70 p-5 shadow-glow">
            <div className="text-xs uppercase tracking-[0.22em] text-accentSoft">
              3-DAY ACCESS PASS
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="text-4xl font-semibold text-accent">10</div>
                <div className="text-sm text-muted">free checks</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-accent">D-3</div>
                <div className="text-sm text-muted">CVD · Volume · Alerts</div>
              </div>
            </div>
            <div className="mt-5 rounded-[24px] border border-gold/15 bg-white/5 p-4">
              <svg viewBox="0 0 240 76" className="h-20 w-full text-accent">
                <path
                  d="M8 55 L42 48 L74 50 L104 38 L136 34 L164 40 L194 22 L232 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 57 L8 70 L232 70 L232 20"
                  fill="rgba(214, 180, 100, 0.08)"
                />
              </svg>
              <div className="mt-3 text-sm text-accentSoft">
                CVD · Volume · Alerts · Mock Test
              </div>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {["쿠폰 보관", "자료함 저장", "앱 베타 대기", "사전예약 알림"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-text"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
            <div className="mt-4 text-xs leading-6 text-muted">
              수신 동의자에게 오픈/만료 안내를 우선 제공합니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
