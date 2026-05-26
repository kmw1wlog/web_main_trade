import { readJsonStorage, writeJsonStorage } from "@/lib/utils";

export const ATTRIBUTION_STORAGE_KEY = "investment_tool_attribution";

export type AttributionData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landingPath?: string;
  firstVisitedAt?: string;
};

export function captureAttribution(): AttributionData | null {
  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const existing = readJsonStorage<AttributionData | null>(
    ATTRIBUTION_STORAGE_KEY,
    null,
  );

  const attribution: AttributionData = {
    utm_source: params.get("utm_source") ?? existing?.utm_source ?? undefined,
    utm_medium: params.get("utm_medium") ?? existing?.utm_medium ?? undefined,
    utm_campaign:
      params.get("utm_campaign") ?? existing?.utm_campaign ?? undefined,
    utm_content: params.get("utm_content") ?? existing?.utm_content ?? undefined,
    utm_term: params.get("utm_term") ?? existing?.utm_term ?? undefined,
    referrer: document.referrer || existing?.referrer || undefined,
    landingPath:
      `${window.location.pathname}${window.location.search}` ||
      existing?.landingPath ||
      undefined,
    firstVisitedAt: existing?.firstVisitedAt ?? new Date().toISOString(),
  };

  writeJsonStorage(ATTRIBUTION_STORAGE_KEY, attribution);
  return attribution;
}

export function getStoredAttribution(): AttributionData | null {
  return readJsonStorage<AttributionData | null>(ATTRIBUTION_STORAGE_KEY, null);
}
