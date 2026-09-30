# MarketFools

MarketFools 서비스의 Next.js 16 App Router 기반 랜딩 페이지입니다.

## 서비스 소개

MarketFools는 거래 데이터를 분석해 반복되는 실수와 수익을 만드는 행동을 구분하도록 돕는 AI 기반 트레이딩 매매일지 서비스입니다.

현재 저장소는 제품의 가치, 작동 방식, 주요 기능과 연동 범위를 소개하고 출시 알림 신청을 받는 공개 랜딩 페이지입니다. 로그인, 실제 거래소 연동, 데이터 분석과 주문 기능은 포함하지 않습니다.

## 기술 스택

- Next.js 16.3.6 App Router
- React 19.2.8
- TypeScript 5 strict 모드
- Tailwind CSS·PostCSS와 커스텀 CSS 디자인 토큰
- ESLint 9와 Next.js Core Web Vitals 규칙
- Next.js Metadata API, JSON-LD, robots, sitemap, Open Graph 이미지

## 구현한 인터랙션

- 앵커 내비게이션과 현재 섹션 표시
- 스크롤 진입 애니메이션
- 기능 탭 자동 전환과 이전·다음 탐색
- Foolio AI의 사전 작성된 데모 응답
- 브로커·거래소 연동 SVG 다이어그램
- FAQ 아코디언
- 히어로 영상 카드 틸트 효과와 배경 영상
- 반응형 레이아웃과 reduced-motion 대응

## 배포 URL

- 프로덕션: [https://marketfools.com](https://marketfools.com)

Canonical URL과 공개 검색 파일은 이 도메인을 기본값으로 사용합니다. 다른 환경에서는 `.env.example`의 `SITE_URL`로 덮어쓸 수 있습니다.


## 프로젝트 구조

- `src/app`: App Router 페이지, 전역 스타일과 SEO 파일
- `src/components`: 섹션 및 재사용 UI 컴포넌트
- `src/lib`: SEO 설정과 소셜 이미지 생성 코드
- `public`: 이미지, 영상, 상호작용 스크립트와 `llms.txt`
