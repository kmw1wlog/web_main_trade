"use client";

import type { LeadPayload } from "@/lib/leadSchema";
import type { CouponState } from "@/lib/coupon";
import { LeadForm } from "@/components/LeadForm";
import { StatBadge } from "@/components/StatBadge";

type CouponBoxProps = {
  coupon: CouponState | null;
  remainingText: string;
  isExpired: boolean;
  onCouponClaim: (payload: LeadPayload) => void;
  onResetCoupon: () => void;
};

export function CouponBox({
  coupon,
  remainingText,
  isExpired,
  onCouponClaim,
  onResetCoupon,
}: CouponBoxProps) {
  return (
    <section id="coupon" className="shell section">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card-paper p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-goldDeep">
            쿠폰 보관함
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-paperText sm:text-3xl">
            무료 쿠폰 보관함
          </h2>
          <p className="mt-3 text-sm leading-7 text-paperMuted sm:text-base">
            3일 동안 10회까지 데모 기능을 눌러볼 수 있습니다. 지금 결제하지
            않아도 됩니다.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <StatBadge
              label="혜택 기간"
              value={coupon ? remainingText : "3일"}
              variant="paper"
            />
            <StatBadge
              label="이용 가능 횟수"
              value={coupon ? `${coupon.usesRemaining}회` : "10회"}
              variant="paper"
            />
          </div>
          <div className="mt-6 rounded-[24px] border border-gold/18 bg-ivory p-4 text-sm leading-7 text-paperMuted">
            {coupon && !isExpired ? (
              <>
                <div className="font-semibold text-paperText">쿠폰이 보관되었습니다.</div>
                <div>남은 기간: {remainingText}</div>
                <div>이용 가능 횟수: {coupon.usesRemaining}</div>
                <div className="mt-3">
                  {coupon.marketingConsent
                    ? "만료 2일 전 알림 예정입니다."
                    : "마케팅 수신 동의가 없어 만료 알림 대상에는 포함되지 않습니다."}
                </div>
                <div className="mt-3 rounded-2xl border border-gold/18 bg-white/75 p-3 text-xs text-paperText">
                  [투자도구 쿠폰] 무료 10회권 만료까지 2일 남았습니다. 오늘은
                  CVD 지표와 무료 전자책을 먼저 확인해보세요.
                </div>
              </>
            ) : (
              <>
                <div className="font-semibold text-paperText">
                  {isExpired ? "쿠폰이 만료되었습니다." : "쿠폰 신청 전 상태입니다."}
                </div>
                <div className="mt-2">
                  신청 후에는 남은 기간, 잔여 횟수, 추천 미션이 이곳에 저장됩니다.
                </div>
              </>
            )}
          </div>
          <div className="mt-6 rounded-[24px] border border-gold/18 bg-white/70 p-4">
            <div className="text-sm font-semibold text-paperText">추천 미션</div>
            <ol className="mt-3 space-y-2 text-sm text-paperMuted">
              <li>1. 오늘은 CVD 지표를 1번 확인해보세요.</li>
              <li>2. 무료 전자책을 자료함에 담아두세요.</li>
              <li>3. 자연어 조건식 데모를 입력해보세요.</li>
              <li>4. 앱 베타 또는 강의 사전예약 혜택을 확인해보세요.</li>
            </ol>
          </div>
        </div>

        <div className="card p-6 sm:p-8">
          {coupon && !isExpired ? (
            <div>
              <div className="eyebrow">ACTIVE PASS</div>
              <h3 className="mt-3 text-xl font-semibold text-white">쿠폰이 보관되었습니다.</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                같은 브라우저에서는 쿠폰 상태가 유지됩니다. 만료되었거나 새로
                받으려면 아래 버튼으로 다시 신청할 수 있습니다.
              </p>
              <button className="btn-secondary mt-6" onClick={onResetCoupon}>
                1회 재신청하기
              </button>
            </div>
          ) : coupon && isExpired ? (
            <div>
              <div className="eyebrow">REACTIVATE</div>
              <h3 className="mt-3 text-xl font-semibold text-white">쿠폰이 만료됨</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                같은 정보로 다시 신청하면 새 3일 무료 10회권을 발급받을 수
                있습니다.
              </p>
              <button className="btn-secondary mt-6" onClick={onResetCoupon}>
                1회 재신청하기
              </button>
              <div className="mt-6">
                <LeadForm
                  type="coupon"
                  submitLabel="3일 무료 10회권 받기"
                  successMessage="쿠폰 신청이 완료되었습니다. 지금부터 3일 동안 10회까지 데모를 체험할 수 있습니다."
                  onSuccess={onCouponClaim}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="eyebrow">ACCESS REQUEST</div>
              <h3 className="mt-3 text-xl font-semibold text-white">3일 무료 10회권 받기</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                이메일 또는 전화번호 중 하나만 입력해도 신청할 수 있습니다.
              </p>
              <div className="mt-6">
                <LeadForm
                  type="coupon"
                  submitLabel="3일 무료 10회권 받기"
                  successMessage="쿠폰 신청이 완료되었습니다. 지금부터 3일 동안 10회까지 데모를 체험할 수 있습니다."
                  onSuccess={onCouponClaim}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
