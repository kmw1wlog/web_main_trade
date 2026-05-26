"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { LeadForm } from "@/components/LeadForm";

export function Disclaimer() {
  const [showPartnerForm, setShowPartnerForm] = useState(false);

  return (
    <section id="coming-soon" className="shell section pt-10">
      <div className="card p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4 text-sm leading-7 text-muted">
            <h2 className="text-2xl font-semibold text-white">주의사항과 고지</h2>
            <p>
              본 서비스는 투자 자문, 종목 추천, 매매 신호 제공, 수익 보장을 하지
              않습니다.
            </p>
            <p>
              모든 자료와 기능은 교육 및 도구 사용 목적이며, 최종 투자 판단과
              책임은 사용자 본인에게 있습니다.
            </p>
            <p>
              예시 차트와 데모 데이터는 실제 매수·매도 판단에 사용할 수 없습니다.
            </p>
            <p>
              개인정보는 신청 안내, 자료 제공, 베타/사전예약 알림 목적으로만
              사용됩니다.
            </p>
          </div>
          <div className="card-soft p-5">
            <div className="text-sm font-semibold text-accentSoft">제휴 문의</div>
            <h3 className="mt-3 text-xl font-semibold text-white">
              채널 제휴나 공동 캠페인을 검토 중이라면
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              운영 채널, 분야, 희망 방식만 남겨주시면 검토 후 안내드립니다.
            </p>
            <button
              className="btn-primary mt-5"
              onClick={() => {
                setShowPartnerForm((current) => !current);
                track("partner_inquiry_click");
              }}
            >
              제휴 문의하기
            </button>
            {showPartnerForm ? (
              <LeadForm
                type="partner_inquiry"
                submitLabel="제휴 문의 보내기"
                successMessage="제휴 문의가 접수되었습니다. 확인 후 안내드리겠습니다."
                className="mt-6"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
