"use client";

import { useMemo, useState } from "react";
import { getStoredAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import type { LeadPayload, LeadType } from "@/lib/leadSchema";
import { cn } from "@/lib/utils";

const SUBMIT_EVENTS: Record<LeadType, string> = {
  coupon: "coupon_claim_submit",
  premium_waitlist: "premium_waitlist_submit",
  app_beta: "app_beta_submit",
  preorder: "preorder_submit",
  material_update: "material_update_submit",
  partner_inquiry: "partner_inquiry_submit",
};

const couponInterests = [
  "국장",
  "미장",
  "코인",
  "AI 투자공부",
  "조건식",
  "모의투자",
  "앱 베타",
];

const betaFeatures = [
  "지표 알림",
  "자연어 조건식",
  "모의투자",
  "앱 푸시",
  "조건식 공유",
];

const premiumInterests = [
  "국장",
  "미장",
  "코인",
  "AI 투자공부",
  "조건식",
  "모의투자",
  "프리미엄 콘텐츠",
];

const preorderProducts = [
  "조건식·모의투자 강의",
  "CVD/거래량 전자책",
  "웹 지표 프리미엄",
  "앱 구독권",
  "트레이딩뷰/조건식 변환 베타",
];

const purchaseIntents = [
  "무료 체험만",
  "5만원 이하",
  "10만원 이하",
  "15만원 이상도 가능",
];

type LeadFormProps = {
  type: LeadType;
  submitLabel: string;
  successMessage: string;
  className?: string;
  onSuccess?: (payload: LeadPayload) => void;
};

export function LeadForm({
  type,
  submitLabel,
  successMessage,
  className,
  onSuccess,
}: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [productInterest, setProductInterest] = useState("");
  const [purchaseIntent, setPurchaseIntent] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const config = useMemo(() => {
    return {
      coupon: {
        needsInterest: true,
        interestOptions: couponInterests,
        emailRequired: false,
        phoneRequired: false,
      },
      premium_waitlist: {
        needsSelectInterest: true,
        selectOptions: premiumInterests,
        emailRequired: false,
        phoneRequired: false,
      },
      app_beta: {
        needsInterest: true,
        interestOptions: betaFeatures,
        emailRequired: true,
        phoneRequired: false,
      },
      preorder: {
        needsProductInterest: true,
        productOptions: preorderProducts,
        needsPurchaseIntent: true,
        purchaseIntentOptions: purchaseIntents,
        emailRequired: true,
        phoneRequired: false,
      },
      material_update: {
        emailRequired: true,
        phoneRequired: false,
      },
      partner_inquiry: {
        needsPartnerMeta: true,
        emailRequired: false,
        phoneRequired: false,
      },
    }[type];
  }, [type]);

  function toggleInterest(value: string) {
    setInterests((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!privacyConsent) {
      setError("개인정보 수집 동의가 필요합니다.");
      return;
    }

    if (!trimmedEmail && !trimmedPhone) {
      setError("이메일 또는 전화번호를 1개 이상 입력해주세요.");
      return;
    }

    if (type === "coupon" && interests.length === 0) {
      setError("관심 분야를 1개 이상 선택해주세요.");
      return;
    }

    if (type === "preorder" && !productInterest) {
      setError("관심 상품을 선택해주세요.");
      return;
    }

    const payload: LeadPayload = {
      type,
      name: name || undefined,
      email: trimmedEmail || undefined,
      phone: trimmedPhone || undefined,
      interests: interests.length ? interests : undefined,
      productInterest: productInterest || undefined,
      purchaseIntent: purchaseIntent || undefined,
      message: message || undefined,
      privacyConsent,
      marketingConsent,
      honeypot,
      attribution: getStoredAttribution() ?? undefined,
      createdAt: new Date().toISOString(),
    };

    setLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !data?.ok) {
        throw new Error(data?.message || "신청 처리 중 오류가 발생했습니다.");
      }

      track(SUBMIT_EVENTS[type], { type, interests, productInterest });
      setSuccess(successMessage);
      onSuccess?.(payload);
    } catch (submitError) {
      const messageText =
        submitError instanceof Error
          ? submitError.message
          : "신청 처리 중 오류가 발생했습니다.";
      setError(messageText);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={cn("space-y-4", className)} onSubmit={handleSubmit}>
      {(type === "coupon" || type === "preorder" || type === "partner_inquiry") && (
        <div>
          <label className="label" htmlFor={`${type}-name`}>
            {type === "partner_inquiry" ? "채널명" : "이름 또는 닉네임"}
          </label>
          <input
            id={`${type}-name`}
            className="input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={
              type === "partner_inquiry" ? "예: 시장관찰랩" : "선택 입력"
            }
          />
        </div>
      )}

      {(type === "app_beta" ||
        type === "preorder" ||
        type === "material_update" ||
        type === "premium_waitlist" ||
        type === "coupon" ||
        type === "partner_inquiry") && (
        <div>
          <label className="label" htmlFor={`${type}-email`}>
            이메일
          </label>
          <input
            id={`${type}-email`}
            className="input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={
              config?.emailRequired ? "name@example.com" : "이메일 또는 전화번호 중 1개 이상"
            }
            required={Boolean(config?.emailRequired)}
          />
        </div>
      )}

      {(type === "app_beta" ||
        type === "preorder" ||
        type === "premium_waitlist" ||
        type === "coupon" ||
        type === "partner_inquiry") && (
        <div>
          <label className="label" htmlFor={`${type}-phone`}>
            전화번호
          </label>
          <input
            id={`${type}-phone`}
            className="input"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="010-0000-0000"
          />
        </div>
      )}

      {config?.needsSelectInterest && (
        <div>
          <label className="label" htmlFor={`${type}-interest`}>
            관심 분야
          </label>
          <select
            id={`${type}-interest`}
            className="input"
            value={productInterest}
            onChange={(event) => setProductInterest(event.target.value)}
            required
          >
            <option value="">선택해주세요</option>
            {config.selectOptions?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {config?.needsInterest && (
        <fieldset>
          <legend className="label">관심 분야</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {config.interestOptions?.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 rounded-2xl border border-line bg-ink/40 px-4 py-3 text-sm text-text"
              >
                <input
                  type="checkbox"
                  checked={interests.includes(option)}
                  onChange={() => toggleInterest(option)}
                  className="h-4 w-4 rounded border-line bg-ink"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {config?.needsProductInterest && (
        <div>
          <label className="label" htmlFor={`${type}-product-interest`}>
            관심 상품
          </label>
          <select
            id={`${type}-product-interest`}
            className="input"
            value={productInterest}
            onChange={(event) => setProductInterest(event.target.value)}
            required
          >
            <option value="">선택해주세요</option>
            {config.productOptions?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {config?.needsPurchaseIntent && (
        <div>
          <label className="label" htmlFor={`${type}-purchase-intent`}>
            예상 구매 의향
          </label>
          <select
            id={`${type}-purchase-intent`}
            className="input"
            value={purchaseIntent}
            onChange={(event) => setPurchaseIntent(event.target.value)}
            required
          >
            <option value="">선택해주세요</option>
            {config.purchaseIntentOptions?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {config?.needsPartnerMeta && (
        <>
          <div>
            <label className="label" htmlFor={`${type}-field`}>
              운영 분야
            </label>
            <input
              id={`${type}-field`}
              className="input"
              value={productInterest}
              onChange={(event) => setProductInterest(event.target.value)}
              placeholder="예: 투자 교육, 커뮤니티, 리서치"
            />
          </div>
          <div>
            <label className="label" htmlFor={`${type}-audience`}>
              팔로워/구독자 수
            </label>
            <input
              id={`${type}-audience`}
              className="input"
              value={purchaseIntent}
              onChange={(event) => setPurchaseIntent(event.target.value)}
              placeholder="예: 1.2만명"
            />
          </div>
        </>
      )}

      {(type === "partner_inquiry" || type === "material_update") && (
        <div>
          <label className="label" htmlFor={`${type}-message`}>
            {type === "partner_inquiry" ? "제휴 희망 형태" : "받고 싶은 업데이트"}
          </label>
          <textarea
            id={`${type}-message`}
            className="input min-h-[110px]"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={
              type === "partner_inquiry"
                ? "예: 공동 웨비나, 자료 제휴, 리워드 캠페인"
                : "예: 새 전자책, 앱 베타, 무료 자료 업데이트"
            }
          />
        </div>
      )}

      <div className="hidden">
        <label htmlFor={`${type}-website`}>website</label>
        <input
          id={`${type}-website`}
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-line bg-ink/40 px-4 py-3 text-sm text-text">
        <input
          type="checkbox"
          checked={privacyConsent}
          onChange={(event) => setPrivacyConsent(event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-line bg-ink"
          required
        />
        <span>개인정보 수집 및 신청 안내 목적 활용에 동의합니다. (필수)</span>
      </label>

      <label className="flex items-start gap-3 rounded-2xl border border-line bg-ink/40 px-4 py-3 text-sm text-muted">
        <input
          type="checkbox"
          checked={marketingConsent}
          onChange={(event) => setMarketingConsent(event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-line bg-ink"
        />
        <span>마케팅/업데이트 안내 수신에 동의합니다. (선택)</span>
      </label>

      <div className="text-xs leading-6 text-muted">
        본 서비스는 투자 자문, 종목 추천, 매매 신호 제공, 수익 보장을 하지
        않습니다.
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div aria-live="polite">
        {success ? (
          <div className="rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accentSoft">
            {success}
          </div>
        ) : null}
      </div>

      <button className="btn-primary w-full sm:w-auto" disabled={loading} type="submit">
        {loading ? "처리 중..." : submitLabel}
      </button>
    </form>
  );
}
