"use client";

import { track } from "@/lib/analytics";
import { FeatureIcon } from "@/components/FeatureIcon";

const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "#community";
const cafeUrl = process.env.NEXT_PUBLIC_CAFE_URL || "#community";

type CommunitySectionProps = {
  onNavigate: (target: string, eventName: string, label?: string) => void;
};

export function CommunitySection({ onNavigate }: CommunitySectionProps) {
  return (
    <section id="community" className="shell section">
      <div className="mb-6 max-w-3xl">
        <div className="eyebrow">커뮤니티 채널</div>
        <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
          커뮤니티에서 자료와 공지를 이어서 확인하세요
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <a
          className="card p-6 transition hover:-translate-y-1 hover:border-gold/40"
          href={telegramUrl}
          onClick={() => {
            track("community_click", { channel: "telegram" });
            track("telegram_click", { href: telegramUrl });
          }}
        >
          <div className="text-gold">
            <FeatureIcon name="mobile" />
          </div>
          <div className="mt-4 text-sm font-semibold text-accentSoft">텔레그램</div>
          <h3 className="mt-3 text-xl font-semibold text-white">텔레그램 알림 받기</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            쿠폰 만료, 새 기능, 무료 자료, 베타 모집 소식을 빠르게 안내합니다.
          </p>
          <div className="mt-5 text-sm font-semibold text-accentSoft">텔레그램 알림 받기 →</div>
        </a>
        <a
          className="card p-6 transition hover:-translate-y-1 hover:border-gold/40"
          href={cafeUrl}
          onClick={() => {
            track("community_click", { channel: "cafe" });
            track("cafe_click", { href: cafeUrl });
          }}
        >
          <div className="text-gold">
            <FeatureIcon name="library" />
          </div>
          <div className="mt-4 text-sm font-semibold text-accentSoft">카페</div>
          <h3 className="mt-3 text-xl font-semibold text-white">카페 자료실 보기</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            자료실, 사용 후기, 질문, 공지, 학습 로드맵을 모아둡니다.
          </p>
          <div className="mt-5 text-sm font-semibold text-accentSoft">카페 자료실 보기 →</div>
        </a>
        <button
          className="card p-6 text-left transition hover:-translate-y-1 hover:border-gold/40"
          onClick={() => onNavigate("materials", "community_click", "업데이트 알림 신청")}
        >
          <div className="text-gold">
            <FeatureIcon name="premium" />
          </div>
          <div className="mt-4 text-sm font-semibold text-accentSoft">이메일/SMS</div>
          <h3 className="mt-3 text-xl font-semibold text-white">업데이트 알림 신청</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            쿠폰 만료, 앱 출시, 사전예약 알림을 수신 동의자에게만 안내합니다.
          </p>
          <div className="mt-5 text-sm font-semibold text-accentSoft">업데이트 알림 신청 →</div>
        </button>
      </div>
    </section>
  );
}
