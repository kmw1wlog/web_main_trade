"use client";

import { useEffect, useMemo, useState } from "react";
import { captureAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import {
  consumeCoupon,
  createCoupon,
  formatRemainingTime,
  getStoredCoupon,
  isCouponExpired,
  saveCoupon,
  type CouponState,
} from "@/lib/coupon";
import type { LeadPayload } from "@/lib/leadSchema";
import { readJsonStorage, writeJsonStorage } from "@/lib/utils";
import { Hero } from "@/components/Hero";
import { BenefitGrid } from "@/components/BenefitGrid";
import { CouponBox } from "@/components/CouponBox";
import { GuideSection } from "@/components/GuideSection";
import { ToolDemoSection } from "@/components/ToolDemoSection";
import { MaterialsSection } from "@/components/MaterialsSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { PremiumSection } from "@/components/PremiumSection";
import { AppBetaSection } from "@/components/AppBetaSection";
import { PreorderSection } from "@/components/PreorderSection";
import { CommunitySection } from "@/components/CommunitySection";
import { Disclaimer } from "@/components/Disclaimer";

const MATERIALS_STORAGE_KEY = "investment_tool_materials";

export function LandingPage() {
  const [coupon, setCoupon] = useState<CouponState | null>(null);
  const [tick, setTick] = useState(Date.now());
  const [noCouponNotice, setNoCouponNotice] = useState("");
  const [savedMaterials, setSavedMaterials] = useState<string[]>([]);

  const isExpired = useMemo(() => {
    if (!coupon) {
      return true;
    }

    return new Date(coupon.expiresAt).getTime() <= tick;
  }, [coupon, tick]);
  const remainingText = useMemo(() => {
    if (!coupon) {
      return "3일";
    }

    return formatRemainingTime(
      Math.max(0, new Date(coupon.expiresAt).getTime() - tick),
    );
  }, [coupon, tick]);

  useEffect(() => {
    captureAttribution();
    setCoupon(getStoredCoupon());
    setSavedMaterials(readJsonStorage<string[]>(MATERIALS_STORAGE_KEY, []));
    track("page_view", { path: window.location.pathname });

    const timer = window.setInterval(() => setTick(Date.now()), 60_000);
    const firedDepthEvents = { 50: false, 90: false };

    function onScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        return;
      }

      const depth = (window.scrollY / maxScroll) * 100;
      if (depth >= 50 && !firedDepthEvents[50]) {
        firedDepthEvents[50] = true;
        track("guide_scroll_50");
      }
      if (depth >= 90 && !firedDepthEvents[90]) {
        firedDepthEvents[90] = true;
        track("guide_scroll_90");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleNavigate(target: string, eventName: string, label?: string) {
    track(eventName, { target, label });
    scrollToSection(target);
  }

  function handleCouponClaim(payload: LeadPayload) {
    const nextCoupon = createCoupon({
      phone: payload.phone,
      email: payload.email,
      marketingConsent: payload.marketingConsent,
      privacyConsent: payload.privacyConsent,
      attribution: captureAttribution(),
    });
    saveCoupon(nextCoupon);
    setCoupon(nextCoupon);
    setNoCouponNotice("");
    setTick(Date.now());
  }

  function handleResetCoupon() {
    saveCoupon(null);
    setCoupon(null);
    setTick(Date.now());
  }

  function handleUseCouponAction(eventName: string, label: string) {
    track(eventName, { label });

    if (!coupon || isCouponExpired(coupon) || coupon.usesRemaining <= 0) {
      setNoCouponNotice("무료 쿠폰을 먼저 받아두세요. 만료되었다면 다시 신청할 수 있습니다.");
      scrollToSection("coupon");
      return false;
    }

    const nextCoupon = consumeCoupon(coupon);
    if (!nextCoupon) {
      setNoCouponNotice("쿠폰을 먼저 확인해주세요.");
      scrollToSection("coupon");
      return false;
    }

    setCoupon(nextCoupon);
    setTick(Date.now());
    setNoCouponNotice("");
    track("coupon_use", {
      action: label,
      usesRemaining: nextCoupon.usesRemaining,
    });
    return true;
  }

  function handleSaveMaterial(materialId: string) {
    setSavedMaterials((current) => {
      const next = current.includes(materialId) ? current : [...current, materialId];
      writeJsonStorage(MATERIALS_STORAGE_KEY, next);
      return next;
    });
  }

  return (
    <main className="pb-16">
      {coupon && !isExpired ? (
        <div className="sticky top-0 z-30 border-b border-line bg-ink/90 backdrop-blur">
          <div className="shell flex flex-col gap-2 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="text-text">
              쿠폰 보관중: 남은 기간 <span className="font-semibold">{remainingText}</span>
              {" · "}남은 횟수{" "}
              <span className="font-semibold">{coupon.usesRemaining}회</span>
            </div>
            <div className="text-muted">
              {coupon.marketingConsent
                ? "만료 2일 전 알림 예정"
                : "알림을 받으려면 마케팅 수신 동의가 필요합니다."}
            </div>
          </div>
        </div>
      ) : null}

      <Hero
        onCouponClick={() => handleNavigate("coupon", "hero_coupon_click")}
        onToolClick={() => handleNavigate("tool-demo", "hero_tool_click")}
      />
      <BenefitGrid onNavigate={handleNavigate} />
      <CouponBox
        coupon={coupon}
        remainingText={remainingText}
        isExpired={isExpired}
        onCouponClaim={handleCouponClaim}
        onResetCoupon={handleResetCoupon}
      />
      <div id="guide">
        <GuideSection
          onCouponClick={() => handleNavigate("coupon", "guide_coupon_cta_click")}
        />
      </div>
      <ToolDemoSection
        coupon={coupon}
        onUseCouponAction={handleUseCouponAction}
        noCouponNotice={noCouponNotice}
      />
      <MaterialsSection
        savedMaterials={savedMaterials}
        onSaveMaterial={handleSaveMaterial}
      />
      <RoadmapSection onNavigate={handleNavigate} />
      <PremiumSection />
      <AppBetaSection />
      <PreorderSection />
      <CommunitySection />
      <Disclaimer />
    </main>
  );
}
