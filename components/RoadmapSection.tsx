type Track = {
  title: string;
  event: string;
  items: Array<{ label: string; target: string }>;
};

const tracks: Track[] = [
  {
    title: "입문자 트랙",
    event: "roadmap_beginner_click",
    items: [
      { label: "투자도구 입문 가이드", target: "guide" },
      { label: "무료 쿠폰 사용법", target: "coupon" },
      { label: "CVD 기초", target: "tool-demo" },
      { label: "거래량 기초", target: "tool-demo" },
      { label: "모의투자 기록법", target: "materials" },
    ],
  },
  {
    title: "차트 경험자 트랙",
    event: "roadmap_chart_click",
    items: [
      { label: "CVD 활용 예시", target: "tool-demo" },
      { label: "거래량 급증 해석", target: "tool-demo" },
      { label: "알림 조건 만들기", target: "tool-demo" },
      { label: "조건식 작성 예시", target: "tool-demo" },
      { label: "모의투자 복기법", target: "materials" },
    ],
  },
  {
    title: "자동화 관심자 트랙",
    event: "roadmap_automation_click",
    items: [
      { label: "자연어 조건식 예시", target: "tool-demo" },
      { label: "트레이딩뷰 변환 대기", target: "coming-soon" },
      { label: "API 연결 대기", target: "coming-soon" },
      { label: "앱 베타 신청", target: "app-beta" },
      { label: "조건식 공유 커뮤니티", target: "community" },
    ],
  },
];

type RoadmapSectionProps = {
  onNavigate: (target: string, eventName: string, label?: string) => void;
};

export function RoadmapSection({ onNavigate }: RoadmapSectionProps) {
  return (
    <section className="shell section">
      <div className="mb-6 max-w-3xl">
        <div className="text-sm font-semibold text-accentSoft">
          어디서부터 봐야 할지 모르겠다면
        </div>
        <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
          학습 단계에 맞는 트랙부터 골라보세요
        </h2>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {tracks.map((track) => (
          <div key={track.title} className="card p-5">
            <button
              className="text-left text-xl font-semibold text-white"
              onClick={() =>
                onNavigate(track.items[0]?.target ?? "coming-soon", track.event, track.title)
              }
            >
              {track.title}
            </button>
            <div className="mt-5 space-y-3">
              {track.items.map((item) => (
                <button
                  key={item.label}
                  className="flex w-full items-center justify-between rounded-2xl border border-line bg-ink/50 px-4 py-3 text-left text-sm text-text transition hover:border-accent/30 hover:bg-ink/80"
                  onClick={() => onNavigate(item.target, "guide_link_click", item.label)}
                >
                  <span>{item.label}</span>
                  <span className="text-accentSoft">→</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
