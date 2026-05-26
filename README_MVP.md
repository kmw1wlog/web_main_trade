# 투자도구 허브 MVP

## 1. 프로젝트 목적
SNS에서 유입된 사용자가 첫 방문에서 바로 이탈하지 않도록, 무료 쿠폰 보관, 무료 자료함, 웹 지표 데모, 앱 베타 신청, 강의·도구 사전예약을 단일 페이지에서 제공하는 MVP입니다.

## 2. 실행 방법
```bash
npm install
npm run dev
```

배포 전 검증:
```bash
npm run lint
npm run build
```

## 3. 환경변수
`.env.example`에 포함된 값:

- `LEADS_WEBHOOK_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_TELEGRAM_URL`
- `NEXT_PUBLIC_CAFE_URL`
- `NEXT_PUBLIC_MIXPANEL_TOKEN`

## 4. 리드 수집 방식
- 모든 신청 폼은 `/api/leads`로 POST 제출됩니다.
- 서버는 `honeypot`이 채워진 경우 200 OK만 반환하고 저장하지 않습니다.
- `privacyConsent`가 없으면 400을 반환합니다.
- `LEADS_WEBHOOK_URL`이 있으면 해당 URL로 JSON payload를 전달합니다.
- 없으면 서버 `console.info`에 요약 로그를 남깁니다.

## 5. 이벤트 목록
- `page_view`
- `hero_coupon_click`
- `hero_tool_click`
- `coupon_claim_click`
- `coupon_claim_submit`
- `coupon_use`
- `free_material_click`
- `material_download_click`
- `premium_trial_click`
- `premium_waitlist_submit`
- `web_tool_try_click`
- `tool_cvd_demo_click`
- `tool_volume_demo_click`
- `tool_alert_demo_click`
- `tool_condition_demo_click`
- `tool_mock_trading_demo_click`
- `app_beta_click`
- `app_beta_submit`
- `preorder_click`
- `preorder_submit`
- `guide_coupon_cta_click`
- `guide_scroll_50`
- `guide_scroll_90`
- `roadmap_beginner_click`
- `roadmap_chart_click`
- `roadmap_automation_click`
- `guide_link_click`
- `telegram_click`
- `cafe_click`
- `partner_inquiry_click`
- `partner_inquiry_submit`
- `material_update_submit`

## 6. 쿠폰 localStorage 구조
키: `investment_tool_coupon`

```json
{
  "claimedAt": "2026-05-26T00:00:00.000Z",
  "expiresAt": "2026-05-29T00:00:00.000Z",
  "usesTotal": 10,
  "usesRemaining": 7,
  "phone": "010-0000-0000",
  "email": "user@example.com",
  "marketingConsent": true,
  "privacyConsent": true,
  "utm": {
    "utm_source": "instagram"
  },
  "sourceReferrer": "https://example.com"
}
```

추가 저장 키:
- `investment_tool_attribution`
- `investment_tool_materials`
- `investment_tool_beta_waitlist`

## 7. 구현된 MVP 범위
- 단일 페이지 랜딩
- 6개 혜택 카드
- 3일 무료 10회 쿠폰 localStorage 저장
- 웹 지표 데모 5종과 쿠폰 차감
- 무료 자료 다운로드 및 자료함 상태 저장
- 프리미엄 대기, 앱 베타, 사전예약, 자료 업데이트, 제휴 문의 폼
- UTM/리퍼러 attribution 저장
- GA4/Mixpanel 대응형 `track()` 래퍼
- `/api/leads` Route Handler

## 8. 아직 구현하지 않은 것
- 실제 SMS 발송
- 실제 결제
- 실제 투자 API
- 실제 네이버프리미엄 연동
- 실제 앱

## 9. 투자 자문 아님 고지
본 서비스는 투자 자문, 종목 추천, 매매 신호 제공, 수익 보장을 하지 않습니다.
모든 자료와 기능은 교육 및 도구 사용 목적이며, 최종 투자 판단과 책임은 사용자 본인에게 있습니다.
