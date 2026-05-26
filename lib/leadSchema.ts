import type { AttributionData } from "@/lib/attribution";

export const LEAD_TYPES = [
  "coupon",
  "premium_waitlist",
  "app_beta",
  "preorder",
  "material_update",
  "partner_inquiry",
] as const;

export type LeadType = (typeof LEAD_TYPES)[number];

export type LeadPayload = {
  type: LeadType;
  name?: string;
  email?: string;
  phone?: string;
  interests?: string[];
  productInterest?: string;
  purchaseIntent?: string;
  message?: string;
  privacyConsent: boolean;
  marketingConsent?: boolean;
  honeypot?: string;
  attribution?: AttributionData | Record<string, unknown>;
  createdAt?: string;
};

type ValidationResult =
  | { ok: true; payload: LeadPayload }
  | { ok: false; message: string };

function limitText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : undefined;
}

function limitArray(value: unknown, maxItems: number, itemMax: number) {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const normalized = value
    .map((item) => limitText(item, itemMax))
    .filter((item): item is string => Boolean(item))
    .slice(0, maxItems);

  return normalized.length > 0 ? normalized : undefined;
}

export function validateLeadPayload(input: unknown): ValidationResult {
  if (!input || typeof input !== "object") {
    return { ok: false, message: "잘못된 요청입니다." };
  }

  const data = input as Record<string, unknown>;
  const type = data.type;

  if (!LEAD_TYPES.includes(type as LeadType)) {
    return { ok: false, message: "허용되지 않은 신청 유형입니다." };
  }

  const honeypot = limitText(data.honeypot, 200);
  const privacyConsent = Boolean(data.privacyConsent);
  const email = limitText(data.email, 160);
  const phone = limitText(data.phone, 40);
  const payload: LeadPayload = {
    type: type as LeadType,
    name: limitText(data.name, 80),
    email,
    phone,
    interests: limitArray(data.interests, 12, 60),
    productInterest: limitText(data.productInterest, 120),
    purchaseIntent: limitText(data.purchaseIntent, 60),
    message: limitText(data.message, 1000),
    privacyConsent,
    marketingConsent: Boolean(data.marketingConsent),
    honeypot,
    attribution:
      data.attribution && typeof data.attribution === "object"
        ? (data.attribution as Record<string, unknown>)
        : undefined,
    createdAt:
      limitText(data.createdAt, 80) ?? new Date().toISOString(),
  };

  if (honeypot) {
    return { ok: true, payload };
  }

  if (!privacyConsent) {
    return { ok: false, message: "개인정보 수집 동의가 필요합니다." };
  }

  const hasContact = Boolean(email || phone);
  if (!hasContact) {
    return { ok: false, message: "이메일 또는 전화번호를 입력해주세요." };
  }

  if (
    payload.type === "coupon" &&
    (!payload.interests || payload.interests.length === 0)
  ) {
    return { ok: false, message: "관심 분야를 1개 이상 선택해주세요." };
  }

  if (payload.type === "preorder" && !payload.productInterest) {
    return { ok: false, message: "관심 상품을 선택해주세요." };
  }

  if (payload.type === "partner_inquiry" && !payload.message) {
    return { ok: false, message: "제휴 희망 내용을 입력해주세요." };
  }

  return { ok: true, payload };
}
