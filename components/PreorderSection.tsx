import { LeadForm } from "@/components/LeadForm";

export function PreorderSection() {
  return (
    <section id="preorder" className="shell section">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="card-paper p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-goldDeep">
            정식 출시 전 먼저 신청하세요
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-paperText sm:text-3xl">
            정식 출시 전 혜택을 먼저 확보하세요
          </h2>
          <p className="mt-4 text-sm leading-7 text-paperMuted sm:text-base">
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
              <div
                key={item}
                className="rounded-[22px] border border-gold/18 bg-ivory px-4 py-3 text-sm text-paperText"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-gold/30 bg-navy px-4 py-3 text-sm font-semibold text-goldSoft">
              1차 얼리버드: 79,000원 예정
            </div>
            <div className="rounded-[22px] border border-gold/18 bg-ivory px-4 py-3 text-sm text-paperText">
              정식 출시가: 159,000원 예정
            </div>
          </div>
          <div className="mt-6 rounded-[22px] border border-gold/18 bg-white/70 p-4 text-sm leading-7 text-paperMuted">
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
