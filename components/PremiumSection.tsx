import { LeadForm } from "@/components/LeadForm";

export function PremiumSection() {
  return (
    <section id="premium" className="shell section">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="card-paper p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-goldDeep">
            프리미엄 콘텐츠
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-paperText sm:text-3xl">
            프리미엄 콘텐츠 체험 혜택을 우선 안내받으세요
          </h2>
          <p className="mt-4 text-sm leading-7 text-paperMuted sm:text-base">
            네이버프리미엄 또는 자체 프리미엄 콘텐츠로 제공될 심화 자료를 준비
            중입니다. 먼저 신청한 사람에게 체험 혜택과 오픈 일정을 우선
            안내합니다.
          </p>
          <div className="mt-6 rounded-[22px] border border-gold/18 bg-ivory p-4 text-sm leading-7 text-paperMuted">
            “네이버프리미엄 1개월 무료 확정”이 아니라, 체험 혜택 우선 안내를
            위한 대기 신청 단계입니다.
          </div>
        </div>
        <div className="card p-6 sm:p-8">
          <LeadForm
            type="premium_waitlist"
            submitLabel="체험 혜택 대기 신청"
            successMessage="프리미엄 콘텐츠 체험 혜택 대기 신청이 완료되었습니다."
          />
        </div>
      </div>
    </section>
  );
}
