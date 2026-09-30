/* eslint-disable @next/next/no-img-element */
import { MaterialIcon, SectionIntro } from "./shared";

const features = [
  { icon: "menu_book", title: "Journal", image: "Journal.webp", body: "모든 매매가 스스로 기록됩니다. 매수·매도, 손익, 시간까지 — 당신은 매매만 하세요, 정리는 저희가 합니다." },
  { icon: "visibility", title: "Lens", image: "lens.webp", body: "진입 전, AI가 차트를 먼저 읽습니다. 지금이 들어갈 자리인지, 근거와 함께 답합니다." },
  { icon: "fact_check", title: "Brief", image: "brief.webp", body: "매수 버튼을 누르기 전, 마지막 점검. AI 체크리스트가 감으로 하는 진입을 한 번 더 걸러냅니다." },
  { icon: "comment", title: "Debrief", image: "debrief.webp", body: "청산 직후, AI가 복기 코멘트를 남깁니다. 혼자서는 보이지 않던 실수가 그 자리에서 드러납니다." },
  { icon: "replay", title: "Replay", image: "replay.webp", body: "그 순간의 화면으로 되돌아갑니다. 진입과 청산의 차트를 그대로 재생해, 그때의 판단을 지금의 눈으로 다시 봅니다." },
  { icon: "history", title: "Backtest", image: "backtest.webp", body: "실전에 걸기 전, 과거에 먼저 걸어봅니다. 전략이 통하는지 감이 아니라 숫자로 확인하고 들어갑니다." },
  { icon: "strategy", title: "Playbook", image: "playbook.webp", body: "내 전략의 실전 성적표. 어떤 기법이 실제로 돈을 벌고 있는지, 전략별로 추적하고 비교합니다." },
  { icon: "assessment", title: "Reports", image: "reports.webp", body: "나를 진단하는 심층 리포트. 반복되는 습관과 오류의 패턴을 데이터로 마주하게 합니다." },
  { icon: "smart_toy", title: "Foolio AI", image: "foolio-ai.webp", body: "묻는 것도, 시키는 것도 말 한마디로. 지난달 손절 내역 보여줘부터 백테스트까지 AI가 즉시 실행합니다." },
] as const;

function FeatureTab({ feature, index }: { feature: (typeof features)[number]; index: number }) {
  return (
    <button className={`feature-tab ${index === 0 ? "active" : ""}`} type="button" data-i={index}>
      <MaterialIcon>{feature.icon}</MaterialIcon>
      {feature.title}
    </button>
  );
}

function FeaturePanel({ feature, index }: { feature: (typeof features)[number]; index: number }) {
  return (
    <div className={`feature-panel ${index === 0 ? "active" : ""}`} data-i={index}>
      <div>
        <span className="font-mono-data text-xs text-primary-fixed-dim">
          {String(index + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
        </span>
        <h3 className="font-headline-lg text-3xl text-on-surface mt-2 mb-3">{feature.title}</h3>
        <p className="text-on-surface-variant leading-relaxed">{feature.body}</p>
      </div>
      <div className="glass-panel feature-shot p-2">
        <img src={`/assets/screens/${feature.image}`} alt={`${feature.title} 화면`} loading="lazy" />
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="bg-surface-container-low/85 relative z-10">
      <div className="feature-track" id="feature-track">
        <div className="feature-pin px-gutter">
          <div className="max-w-container-max mx-auto w-full flex-1 min-h-0 flex flex-col gap-6 py-section-padding">
            <SectionIntro
              eyebrow="Features"
              icon="widgets"
              title="당신의 매매를 데이터로 해석하는 9가지 도구"
              marginClassName="mb-10"
              descriptionClassName="leading-relaxed"
              description={<>기록부터 분석, 복기, 전략 검증까지. MarketFools는 거래 데이터 속 반복되는 패턴과 실수를 발견하고<br />더 나은 매매 원칙을 만들도록 돕습니다.</>}
            />
            <div className="w-fit max-w-full mx-auto flex flex-col gap-3">
              <div className="feature-rail" id="feature-rail">
                {features.map((feature, index) => <FeatureTab key={feature.title} feature={feature} index={index} />)}
              </div>
              <div className="feature-progress"><span id="feature-progress-bar" /></div>
            </div>
            <div className="feature-stage" id="feature-stage">
              <button className="feature-nav prev" id="feature-prev" type="button" aria-label="이전 기능">
                <MaterialIcon>chevron_left</MaterialIcon>
              </button>
              <button className="feature-nav next" id="feature-next" type="button" aria-label="다음 기능">
                <MaterialIcon>chevron_right</MaterialIcon>
              </button>
              {features.map((feature, index) => <FeaturePanel key={feature.title} feature={feature} index={index} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
