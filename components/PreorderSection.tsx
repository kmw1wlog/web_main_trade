import { LeadForm } from "@/components/LeadForm";

export function PreorderSection() {
  return (
    <section id="preorder" className="shell section">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="card p-6 sm:p-8">
          <div className="text-sm font-semibold text-accentSoft">
            정식 출시 전 먼저 신청하세요
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            강의와 도구를 결제 전 단계에서 먼저 예약할 수 있습니다
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
            조건식, 모의투자, 지표 사용법을 체계적으로 배우고 싶은 사람을 위한
            강의와 도구를 준비 중입니다.
          </p>
          <div className="mt-6 space-y-3">
            {[
              "조건식·모의투자 강의",
              "CVD/거래량 전자책",
              "웹 지표 프리미엄",
              "앱 구독권",
              "트레이딩뷰/조건식 변환 베타",
            ].map((item) => (
              <div key={item} className="card-soft px-4 py-3 text-sm text-text">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accentSoft">
              1차 얼리버드: 79,000원 예정
            </div>
            <div className="rounded-2xl border border-line bg-ink/60 px-4 py-3 text-sm text-text">
              정식 출시가: 159,000원 예정
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-line bg-ink/60 p-4 text-sm leading-7 text-muted">
            사전예약은 결제 전 알림 신청 단계입니다. 실제 결제 페이지 오픈 시
            최종 가격, 구성, 환불 조건을 다시 안내합니다.
          </div>
        </div>
        <div className="card p-6 sm:p-8">
          <LeadForm
            type="preorder"
            submitLabel="사전예약 혜택 신청하기"
            successMessage="사전예약 신청이 완료되었습니다. 출시 전 구성, 가격, 베타 혜택을 우선 안내드리겠습니다."
          />
        </div>
      </div>
    </section>
  );
}
