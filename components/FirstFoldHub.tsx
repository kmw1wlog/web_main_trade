"use client";

import { track } from "@/lib/analytics";
import { FeatureIcon, type FeatureIconName } from "@/components/FeatureIcon";

type FirstFoldHubProps = {
  onNavigate: (target: string, eventName: string, label?: string) => void;
};

const benefitCards = [
  {
    eyebrow: "FREE PASS",
    title: "3일 무료 쿠폰",
    description: "지표·데모 기능 10회권을 먼저 보관",
    badge: "3일 · 10회",
    cta: "쿠폰 받기",
    icon: "coupon",
    target: "coupon",
    event: "coupon_claim_click",
  },
  {
    eyebrow: "FREE LIBRARY",
    title: "무료 지표·전자책",
    description: "CVD, 거래량, 조건식, 모의투자 자료",
    badge: "PDF",
    cta: "자료 담기",
    icon: "library",
    target: "materials",
    event: "free_material_click",
  },
  {
    eyebrow: "TRIAL",
    title: "프리미엄 1개월",
    description: "심화 글과 자료 체험 혜택 대기",
    badge: "대기",
    cta: "체험 신청",
    icon: "premium",
    target: "premium",
    event: "premium_trial_click",
  },
  {
    eyebrow: "WEB TOOL",
    title: "웹 기능 체험",
    description: "CVD, 알림, 조건식, 모의투자 데모",
    badge: "DEMO",
    cta: "기능 보기",
    icon: "chart",
    target: "tool-demo",
    event: "web_tool_try_click",
  },
  {
    eyebrow: "APP BETA",
    title: "앱 무료 베타",
    description: "출시 전 무료 이용권과 알림 혜택",
    badge: "BETA",
    cta: "베타 신청",
    icon: "mobile",
    target: "app-beta",
    event: "app_beta_click",
  },
  {
    eyebrow: "EARLY",
    title: "사전예약",
    description: "전자책, 강의, 기능권 얼리버드",
    badge: "EARLY",
    cta: "예약 보기",
    icon: "calendar",
    target: "preorder",
    event: "preorder_click",
  },
] as const;

const socialChips = ["Instagram", "X", "YouTube", "Telegram", "Naver"] as const;

export function FirstFoldHub({ onNavigate }: FirstFoldHubProps) {
  function handleCardClick(card: (typeof benefitCards)[number]) {
    track("first_fold_card_click", {
      title: card.title,
      target: card.target,
    });
    onNavigate(card.target, card.event, card.title);
  }

  return (
    <section id="top" className="shell py-4 sm:py-7">
      <div className="rounded-[28px] border border-gold/18 bg-ivory/95 p-3 text-paperText shadow-paper sm:rounded-[30px] sm:p-5">
        <div className="flex flex-col gap-2 border-b border-gold/20 pb-3 sm:flex-row sm:items-center sm:justify-between sm:pb-4">
          <button
            className="flex items-center gap-3 text-left"
            onClick={() => onNavigate("top", "header_logo_click", "TRADE PASS")}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-goldSoft sm:h-11 sm:w-11">
              TP
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-[0.18em]">
                TRADE PASS
              </span>
              <span className="block text-xs text-paperMuted">
                투자도구 · 무료자료 · 앱 베타
              </span>
            </span>
          </button>

          <div className="-mx-1 flex snap-x items-center gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {socialChips.map((chip) => (
              <button
                key={chip}
                className="link-chip"
                onClick={() => onNavigate("community", "community_click", chip)}
              >
                {chip}
              </button>
            ))}
            <button
              className="link-chip border-gold/45 bg-gold/10 text-goldDeep"
              onClick={() =>
                onNavigate("partner-inquiry", "partner_inquiry_click", "제휴 채널 환영")
              }
            >
              제휴 채널 환영
            </button>
          </div>
        </div>

        <div className="grid gap-4 pt-3 sm:pt-4 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
          <div className="lg:sticky lg:top-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-goldDeep sm:text-xs">
              Link Hub
            </div>
            <h1 className="mt-1.5 text-[26px] font-semibold leading-tight text-paperText sm:mt-2 sm:text-4xl">
              무료 혜택부터 담아두세요
            </h1>
            <p className="mt-2 text-sm leading-6 text-paperMuted sm:mt-3 sm:text-base">
              지표, 전자책, 앱 베타, 사전예약을 한 번에 확인하는 투자도구 허브
            </p>
            <p className="mt-2 text-sm leading-6 text-paperMuted sm:mt-3">
              지금 결제하지 않아도 됩니다. 쿠폰과 자료를 먼저 보관해두고 필요할
              때 다시 확인하세요.
            </p>
            <p className="mt-3 rounded-2xl border border-gold/18 bg-paper px-3 py-2.5 text-xs leading-5 text-paperMuted sm:mt-4 sm:px-4 sm:py-3">
              투자 자문·종목 추천·수익 보장이 아닌 교육용 도구와 자료입니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
            {benefitCards.map((card) => (
              <button
                key={card.title}
                className="hub-card group"
                onClick={() => handleCardClick(card)}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="hub-icon">
                    <FeatureIcon
                      name={card.icon as FeatureIconName}
                      className="h-5 w-5 sm:h-8 sm:w-8"
                    />
                  </span>
                  <span className="hub-badge">{card.badge}</span>
                </div>
                <div className="mt-2 text-[10px] font-semibold uppercase text-goldDeep sm:mt-3 sm:text-[11px]">
                  {card.eyebrow}
                </div>
                <h2 className="mt-1 text-[15px] font-semibold leading-snug text-paperText sm:text-base">
                  {card.title}
                </h2>
                <p className="mt-2 hidden min-h-[40px] text-sm leading-5 text-paperMuted sm:block">
                  {card.description}
                </p>
                <div className="mt-2 text-sm font-semibold text-goldDeep sm:mt-3">
                  {card.cta} →
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
