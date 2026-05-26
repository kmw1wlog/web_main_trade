import type { AttributionData } from "@/lib/attribution";
import { readJsonStorage, writeJsonStorage } from "@/lib/utils";

export const COUPON_STORAGE_KEY = "investment_tool_coupon";

export type CouponState = {
  claimedAt: string;
  expiresAt: string;
  usesTotal: number;
  usesRemaining: number;
  phone?: string;
  email?: string;
  marketingConsent: boolean;
  privacyConsent: boolean;
  utm?: AttributionData | null;
  sourceReferrer?: string;
};

type CouponInput = {
  phone?: string;
  email?: string;
  marketingConsent?: boolean;
  privacyConsent: boolean;
  attribution?: AttributionData | null;
};

export function getStoredCoupon(): CouponState | null {
  return readJsonStorage<CouponState | null>(COUPON_STORAGE_KEY, null);
}

export function saveCoupon(coupon: CouponState | null) {
  if (!coupon) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(COUPON_STORAGE_KEY);
    }
    return;
  }

  writeJsonStorage(COUPON_STORAGE_KEY, coupon);
}

export function createCoupon(input: CouponInput): CouponState {
  const claimedAt = new Date();
  const expiresAt = new Date(claimedAt.getTime() + 3 * 24 * 60 * 60 * 1000);

  return {
    claimedAt: claimedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    usesTotal: 10,
    usesRemaining: 10,
    phone: input.phone,
    email: input.email,
    marketingConsent: Boolean(input.marketingConsent),
    privacyConsent: input.privacyConsent,
    utm: input.attribution,
    sourceReferrer: input.attribution?.referrer,
  };
}

export function isCouponExpired(coupon: CouponState | null) {
  if (!coupon) {
    return true;
  }

  return new Date(coupon.expiresAt).getTime() <= Date.now();
}

export function getCouponRemainingMs(coupon: CouponState | null) {
  if (!coupon) {
    return 0;
  }

  return Math.max(0, new Date(coupon.expiresAt).getTime() - Date.now());
}

export function formatRemainingTime(ms: number) {
  if (ms <= 0) {
    return "만료됨";
  }

  const totalHours = Math.floor(ms / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  return `${days}일 ${hours}시간`;
}

export function consumeCoupon(coupon: CouponState | null) {
  if (!coupon || isCouponExpired(coupon) || coupon.usesRemaining <= 0) {
    return null;
  }

  const nextCoupon = {
    ...coupon,
    usesRemaining: coupon.usesRemaining - 1,
  };

  saveCoupon(nextCoupon);
  return nextCoupon;
}
