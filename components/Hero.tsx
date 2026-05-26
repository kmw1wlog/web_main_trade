type HeroProps = {
  onCouponClick: () => void;
  onToolClick: () => void;
};

export function Hero({ onCouponClick, onToolClick }: HeroProps) {
  return (
    <section className="shell pt-8 sm:pt-10">
      <div className="card overflow-hidden px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="inline-flex rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accentSoft">
              SNS 유입자용 투자도구 학습 허브
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
              SNS에서 본 투자도구, 3일 무료로 써보고 판단하세요.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              지표, 전자책, 앱 베타, 강의 사전예약까지 한 번에 담아두고 필요할
              때 다시 꺼내보는 투자도구 허브입니다.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-text sm:text-base">
              성과 인증만 보고 따라 하기보다, 지표·조건식·모의투자로 직접
              확인해보세요.
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
          <div className="card-soft relative overflow-hidden p-5">
            <div className="absolute inset-0 bg-grid bg-[size:18px_18px] opacity-20" />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.18em] text-muted">
                오늘 먼저 눌러볼 것
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "무료 10회 쿠폰 보관",
                  "CVD·거래량 데모 확인",
                  "무료 전자책 자료 담기",
                  "앱 베타 또는 강의 사전예약",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accentSoft">
                      {index + 1}
                    </div>
                    <div className="text-sm text-text">{item}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-line bg-ink/80 p-4 text-sm text-muted">
                만료 전 알림은 실제 발송이 아니라 MVP 안내 문구로만 표시됩니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
