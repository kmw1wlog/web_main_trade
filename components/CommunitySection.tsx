"use client";

import { track } from "@/lib/analytics";
import { FeatureIcon } from "@/components/FeatureIcon";

const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "#coming-soon";
const cafeUrl = process.env.NEXT_PUBLIC_CAFE_URL || "#coming-soon";

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
          onClick={() => track("telegram_click", { href: telegramUrl })}
        >
          <div className="text-gold">
            <FeatureIcon name="mobile" />
          </div>
          <div className="mt-4 text-sm font-semibold text-accentSoft">텔레그램</div>
          <h3 className="mt-3 text-xl font-semibold text-white">텔레그램 입장</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            쿠폰 만료, 새 기능, 무료 자료, 베타 모집 소식을 빠르게 안내합니다.
          </p>
          <div className="mt-5 text-sm font-semibold text-accentSoft">바로 가기 →</div>
        </a>
        <a
          className="card p-6 transition hover:-translate-y-1 hover:border-gold/40"
          href={cafeUrl}
          onClick={() => track("cafe_click", { href: cafeUrl })}
        >
          <div className="text-gold">
            <FeatureIcon name="library" />
          </div>
          <div className="mt-4 text-sm font-semibold text-accentSoft">카페</div>
          <h3 className="mt-3 text-xl font-semibold text-white">카페 가입</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            자료실, 사용 후기, 질문, 공지, 학습 로드맵을 모아둡니다.
          </p>
          <div className="mt-5 text-sm font-semibold text-accentSoft">바로 가기 →</div>
        </a>
        <button
          className="card p-6 text-left transition hover:-translate-y-1 hover:border-gold/40"
          onClick={() => onNavigate("coming-soon", "partner_inquiry_click", "제휴문의")}
        >
          <div className="text-gold">
            <FeatureIcon name="calendar" />
          </div>
          <div className="mt-4 text-sm font-semibold text-accentSoft">제휴문의</div>
          <h3 className="mt-3 text-xl font-semibold text-white">공동 캠페인 제안</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            채널 운영자, 교육 서비스, 커뮤니티 협업 제안을 위한 문의 창구입니다.
          </p>
          <div className="mt-5 text-sm font-semibold text-accentSoft">문의 열기 →</div>
        </button>
      </div>
    </section>
  );
}
