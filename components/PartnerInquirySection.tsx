import { LeadForm } from "@/components/LeadForm";

export function PartnerInquirySection() {
  return (
    <section id="partner-inquiry" className="shell section">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card-paper p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-goldDeep">
            Partnership
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-paperText sm:text-3xl">
            제휴 채널·콘텐츠 협업 문의
          </h2>
          <p className="mt-4 text-sm leading-7 text-paperMuted sm:text-base">
            투자 교육, 지표 설명, 앱 베타, 무료자료 배포를 함께 진행할 채널을
            찾고 있습니다.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {["무료자료 배포", "공동 웨비나", "앱 베타 모집", "콘텐츠 제휴"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-gold/18 bg-ivory px-4 py-3 text-sm text-paperText"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
        <div className="card p-6 sm:p-8">
          <LeadForm
            type="partner_inquiry"
            submitLabel="제휴 문의 보내기"
            successMessage="제휴 문의가 접수되었습니다. 남겨주신 연락처로 검토 후 안내드리겠습니다."
          />
        </div>
      </div>
    </section>
  );
}
