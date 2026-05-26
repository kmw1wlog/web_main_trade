"use client";

import { useState } from "react";
import type { CouponState } from "@/lib/coupon";

type ToolDemoSectionProps = {
  coupon: CouponState | null;
  onUseCouponAction: (eventName: string, label: string) => boolean;
  noCouponNotice: string;
};

export function ToolDemoSection({
  coupon,
  onUseCouponAction,
  noCouponNotice,
}: ToolDemoSectionProps) {
  const [showCvd, setShowCvd] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [alertPreview, setAlertPreview] = useState("");
  const [conditionInput, setConditionInput] = useState("");
  const [conditionResult, setConditionResult] = useState("");
  const [showMockTrading, setShowMockTrading] = useState(false);
  const [keyword, setKeyword] = useState("BTC");
  const [alertType, setAlertType] = useState("거래량 급증");

  function handleProtectedAction(
    eventName: string,
    label: string,
    onSuccess: () => void,
  ) {
    if (onUseCouponAction(eventName, label)) {
      onSuccess();
    }
  }

  return (
    <section id="tool-demo" className="shell section">
      <div className="mb-6 max-w-3xl">
        <div className="eyebrow">웹 데이터랩</div>
        <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
          반복 확인이 필요한 데이터를 한 화면에 모았습니다
        </h2>
        <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
          시장을 예측해주는 마법 도구가 아니라, 반복해서 확인해야 하는 정보를
          한 곳에 모아주는 관찰 도구입니다.
        </p>
      </div>

      {!coupon ? (
        <div className="mb-6 rounded-2xl border border-warn/30 bg-warn/10 px-4 py-3 text-sm text-yellow-100">
          무료 쿠폰을 먼저 받아두세요. 데모 액션은 쿠폰 1회씩 차감됩니다.
        </div>
      ) : null}

      {noCouponNotice ? (
        <div className="mb-6 rounded-2xl border border-warn/30 bg-warn/10 px-4 py-3 text-sm text-yellow-100">
          {noCouponNotice}
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="card p-5">
          <div className="mb-3 inline-flex rounded-full border border-line px-3 py-1 text-xs text-muted">
            예시 데이터
          </div>
          <h3 className="text-xl font-semibold text-white">CVD 예시 차트</h3>
          <p className="mt-2 text-sm text-muted">매수·매도 압력 흐름 예시</p>
          <div className="mt-5 rounded-2xl border border-line bg-ink/60 p-4">
            <svg viewBox="0 0 360 170" className="h-40 w-full">
              <path
                d="M0 130 L30 120 L60 126 L90 112 L120 104 L150 110 L180 95 L210 88 L240 92 L270 74 L300 64 L330 70 L360 48"
                fill="none"
                stroke="#D6B464"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M0 140 L0 170 L360 170 L360 80"
                fill="rgba(214, 180, 100, 0.10)"
              />
            </svg>
            {showCvd ? (
              <div className="mt-3 text-sm text-text">
                예시 해석: 매수 우위 구간이 이어질 때도 단독 신호로 보지 않고
                거래량과 캔들 위치를 함께 확인합니다.
              </div>
            ) : null}
          </div>
          <button
            className="btn-primary mt-5"
            onClick={() =>
              handleProtectedAction("tool_cvd_demo_click", "CVD 예시 보기", () =>
                setShowCvd(true),
              )
            }
          >
            CVD 예시 보기
          </button>
        </div>

        <div className="card p-5">
          <div className="mb-3 inline-flex rounded-full border border-line px-3 py-1 text-xs text-muted">
            예시 데이터
          </div>
          <h3 className="text-xl font-semibold text-white">거래량 급증 카드</h3>
          <p className="mt-2 text-sm text-muted">
            실제 시세가 아닌 학습용 더미 데이터입니다.
          </p>
          <div className="mt-5 grid gap-3">
            {[
              ["BTC", "+182%", "15분 거래량 증가"],
              ["ETH", "+141%", "관심 구간 재진입"],
              ["AAPL", "+96%", "관찰 리스트 예시"],
            ].map(([symbol, volume, note]) => (
              <div
                key={symbol}
                className="rounded-2xl border border-line bg-ink/50 px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">{symbol}</div>
                  <div className="text-sm text-accentSoft">{volume}</div>
                </div>
                <div className="mt-1 text-xs text-muted">{note}</div>
              </div>
            ))}
            {showVolume ? (
              <div className="rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-text">
                예시 확인 포인트: 급증 비율보다 이전 저항 구간과 동반 캔들을 함께
                보는 연습이 중요합니다.
              </div>
            ) : null}
          </div>
          <button
            className="btn-primary mt-5"
            onClick={() =>
              handleProtectedAction(
                "tool_volume_demo_click",
                "거래량 급증 카드 보기",
                () => setShowVolume(true),
              )
            }
          >
            거래량 급증 예시 보기
          </button>
        </div>

        <div className="card p-5">
          <div className="mb-3 inline-flex rounded-full border border-line px-3 py-1 text-xs text-muted">
            예시 데이터
          </div>
          <h3 className="text-xl font-semibold text-white">관심종목 알림 UI</h3>
          <div className="mt-5 space-y-4">
            <div>
              <label className="label" htmlFor="alert-keyword">
                관심 키워드
              </label>
              <input
                id="alert-keyword"
                className="input"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="alert-type">
                조건 선택
              </label>
              <select
                id="alert-type"
                className="input"
                value={alertType}
                onChange={(event) => setAlertType(event.target.value)}
              >
                {["거래량 급증", "장대양봉", "CVD 변화", "가격 변동"].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            {alertPreview ? (
              <div className="rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-text">
                {alertPreview}
              </div>
            ) : null}
          </div>
          <button
            className="btn-primary mt-5"
            onClick={() =>
              handleProtectedAction("tool_alert_demo_click", "관심종목 알림 설정", () =>
                setAlertPreview(
                  `${keyword || "관심종목"}에 대해 ${alertType} 알림 예시가 저장되었습니다. 실제 발송은 되지 않습니다.`,
                ),
              )
            }
          >
            알림 설정 눌러보기
          </button>
        </div>

        <div className="card p-5">
          <div className="mb-3 inline-flex rounded-full border border-line px-3 py-1 text-xs text-muted">
            예시 데이터
          </div>
          <h3 className="text-xl font-semibold text-white">자연어 조건식 데모</h3>
          <textarea
            className="input mt-5 min-h-[120px]"
            placeholder="예: 거래량이 평소보다 3배 이상 터지고 장대양봉이 나온 종목"
            value={conditionInput}
            onChange={(event) => setConditionInput(event.target.value)}
          />
          <button
            className="btn-primary mt-5"
            onClick={() =>
              handleProtectedAction(
                "tool_condition_demo_click",
                "자연어 조건식 생성하기",
                () =>
                  setConditionResult(
                    "조건식 예시: 최근 20봉 평균 거래량 대비 현재 거래량이 3배 이상이고, 현재 봉의 종가가 시가보다 2% 이상 높은 경우",
                  ),
              )
            }
          >
            조건식 예시 만들기
          </button>
          {conditionResult ? (
            <div className="mt-4 rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-text">
              <div>{conditionResult}</div>
              <div className="mt-2 text-xs text-muted">
                실제 매수·매도 신호가 아니라, 조건식 학습용 예시입니다.
              </div>
            </div>
          ) : null}
        </div>

        <div className="card p-5 xl:col-span-2">
          <div className="mb-3 inline-flex rounded-full border border-line px-3 py-1 text-xs text-muted">
            예시 데이터
          </div>
          <h3 className="text-xl font-semibold text-white">모의투자 설정 예시</h3>
          <div className="mt-5 grid gap-3 lg:grid-cols-5">
            {[
              ["전략명", "거래량 추세 확인"],
              ["진입 조건", "거래량 급증 + 양봉 마감"],
              ["청산 조건", "목표 수익률 도달 또는 추세 둔화"],
              ["손절 조건", "진입가 대비 -2%"],
              ["기록 항목", "진입 이유, 청산 이유, 복기"],
            ].map(([label, value]) => (
              <div key={label} className="card-soft p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-muted">
                  {label}
                </div>
                <div className="mt-3 text-sm text-text">{value}</div>
              </div>
            ))}
          </div>
          {showMockTrading ? (
            <div className="mt-4 rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-text">
              기록 중심의 모의투자 예시가 활성화되었습니다. 실제 주문은 발생하지
              않습니다.
            </div>
          ) : null}
          <button
            className="btn-primary mt-5"
            onClick={() =>
              handleProtectedAction(
                "tool_mock_trading_demo_click",
                "모의투자 설정 예시 보기",
                () => setShowMockTrading(true),
              )
            }
          >
            모의투자 설정 예시 보기
          </button>
        </div>
      </div>
    </section>
  );
}
