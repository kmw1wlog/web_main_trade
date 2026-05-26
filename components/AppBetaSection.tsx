"use client";

import { useEffect, useState } from "react";
import type { LeadPayload } from "@/lib/leadSchema";
import { generateTempCode, readJsonStorage, writeJsonStorage } from "@/lib/utils";
import { LeadForm } from "@/components/LeadForm";

const BETA_WAITLIST_KEY = "investment_tool_beta_waitlist";

export function AppBetaSection() {
  const [tempCode, setTempCode] = useState<string | null>(null);

  useEffect(() => {
    setTempCode(readJsonStorage<string | null>(BETA_WAITLIST_KEY, null));
  }, []);

  function handleSuccess(_: LeadPayload) {
    const code =
      tempCode ??
      (typeof window !== "undefined"
        ? readJsonStorage<string | null>(BETA_WAITLIST_KEY, null)
        : null) ??
      generateTempCode("BETA");

    writeJsonStorage(BETA_WAITLIST_KEY, code);
    setTempCode(code);
  }

  return (
    <section id="app-beta" className="shell section">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="card p-6 sm:p-8">
          <div className="text-sm font-semibold text-accentSoft">
            웹에서 쓰던 기능을 앱으로 가져갑니다
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            지표 확인과 알림 설정을 앱 경험으로 확장합니다
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
            지표 확인, 알림 설정, 자연어 조건식, 모의투자 기록을 앱으로 옮기는
            베타를 준비 중입니다.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "무료 이용권",
              "출시 알림",
              "얼리버드 할인권",
              "기능 투표권",
              "모의투자 대회 우선 안내",
            ].map((item) => (
              <div key={item} className="card-soft px-4 py-3 text-sm text-text">
                {item}
              </div>
            ))}
          </div>
          {tempCode ? (
            <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accentSoft">
              임시 베타 대기번호: {tempCode}
            </div>
          ) : null}
        </div>
        <div className="card p-6 sm:p-8">
          <LeadForm
            type="app_beta"
            submitLabel="앱 베타 신청하기"
            successMessage="앱 베타 신청이 완료되었습니다. 출시 전 무료 이용권과 얼리버드 혜택을 우선 안내드릴게요."
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </section>
  );
}
