"use client";

import { track } from "@/lib/analytics";
import { LeadForm } from "@/components/LeadForm";

const materials = [
  {
    id: "cvd-guide",
    title: "CVD 초보 가이드",
    description: "CVD가 무엇이고 어떤 상황에서 참고하는지 설명합니다.",
    file: "/freebies/cvd-guide.txt",
    event: "material_cvd_download_click",
  },
  {
    id: "condition-examples",
    title: "AI 조건식 예시집",
    description: "자연어로 조건식을 적는 예시를 모아둔 자료입니다.",
    file: "/freebies/condition-examples.txt",
    event: "material_condition_download_click",
  },
  {
    id: "mock-trading-log",
    title: "모의투자 기록표",
    description: "진입 이유, 청산 이유, 복기 내용을 적는 CSV 템플릿입니다.",
    file: "/freebies/mock-trading-log.csv",
    event: "material_mock_log_download_click",
  },
  {
    id: "tradingview-checklist",
    title: "트레이딩뷰 지표 체크리스트",
    description: "지표를 볼 때 확인할 항목을 정리한 체크리스트입니다.",
    file: "/freebies/tradingview-checklist.txt",
    event: "material_tradingview_download_click",
  },
] as const;

type MaterialsSectionProps = {
  savedMaterials: string[];
  onSaveMaterial: (materialId: string) => void;
};

export function MaterialsSection({
  savedMaterials,
  onSaveMaterial,
}: MaterialsSectionProps) {
  function handleDownload(materialId: string, eventName: string, title: string) {
    onSaveMaterial(materialId);
    track(eventName, { materialId, title });
    track("material_download_click", { materialId, title });
  }

  return (
    <section id="materials" className="shell section">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="max-w-3xl">
            <div className="eyebrow">무료 자료실</div>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              지표를 이해하고 기록하는 데 필요한 자료를 먼저 담아두세요
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
              처음부터 결제하지 않아도 됩니다. 지표를 이해하고, 조건식을
              적어보고, 모의투자로 기록하는 데 필요한 자료를 먼저 담아두세요.
            </p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {materials.map((material) => (
              <div key={material.id} className="card-paper p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-paperText">{material.title}</h3>
                  {savedMaterials.includes(material.id) ? (
                    <span className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-goldSoft">
                      자료함 담김
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-6 text-paperMuted">
                  {material.description}
                </p>
                <a
                  className="mt-5 inline-flex items-center justify-center rounded-2xl border border-gold/25 px-5 py-3 text-sm font-semibold text-goldDeep transition hover:border-gold hover:bg-gold/10"
                  href={material.file}
                  download
                  onClick={() =>
                    handleDownload(material.id, material.event, material.title)
                  }
                >
                  자료 다운로드
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <div className="eyebrow">내 무료 자료함</div>
            <div className="mt-4 space-y-3">
              {savedMaterials.length ? (
                savedMaterials.map((materialId) => {
                  const material = materials.find((item) => item.id === materialId);
                  return (
                    <div
                      key={materialId}
                      className="rounded-2xl border border-line bg-ink/50 px-4 py-3 text-sm text-text"
                    >
                      {material?.title ?? materialId}
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-line bg-ink/50 px-4 py-3 text-sm text-muted">
                  아직 담은 자료가 없습니다. 원하는 자료를 먼저 담아두세요.
                </div>
              )}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white">업데이트 알림 받기</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              새 자료, 앱 베타, 무료 혜택 업데이트가 생기면 먼저 안내받을 수
              있습니다.
            </p>
            <LeadForm
              type="material_update"
              submitLabel="업데이트 알림 신청"
              successMessage="업데이트 알림 신청이 완료되었습니다."
              className="mt-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
