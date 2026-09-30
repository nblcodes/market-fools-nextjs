import type { ReactNode } from "react";
import { ClayCard, MaterialIcon, SectionIntro } from "./shared";

const benefits = [
  ["psychology", "text-secondary", "감정적 편향 제거", "AI 기반 감정 분석과 실수 트래킹을 통해 매매를 객관적으로 복기하세요."],
  ["analytics", "text-primary", "데이터 기반의 우위", "가장 높은 수익률을 기록하는 셋업, 시간대, 자산군을 발견하세요."],
  ["auto_stories", "text-tertiary", "자동화된 책임감", "브로커와 직접 연동하여 모든 실행 내역을 누락 없이 기록하고 검토하세요."],
  ["checklist", "text-warning-amber", "규칙 기반 매매 강화", "세운 원칙을 지켰는지 매 거래마다 체크하고, 플레이북 이탈률을 데이터로 관리하세요."],
  ["insights", "text-data-blue", "성장 곡선 시각화", "주간·월간 성과 변화를 추적해 실력이 느는 지점과 정체되는 지점을 정확히 짚어냅니다."],
  ["savings", "text-neon-gain", "불필요한 손실 차단", "계좌를 가장 많이 갉아먹는 습관 하나를 찾아, 다음 주에 실제로 줄었는지 숫자로 확인합니다."],
] as const;

const stats: ReadonlyArray<{ label: string; value: ReactNode; body: string; tone: string }> = [
  { label: "승률", value: "+64.3%", body: "매매일지 작성 30일 후 과거 평균 대비 12% 향상", tone: "text-neon-gain" },
  { label: "수익 인자", value: "1.72", body: "원칙 있는 비중 조절로 달성한 최적의 손익비", tone: "text-primary" },
  { label: "감정 점수", value: <>6<span className="text-2xl opacity-40">/10</span></>, body: "뇌동매매 방지 알고리즘으로 지키는 평정심", tone: "text-warning-amber" },
  { label: "자산 신고가", value: <>$110K<span className="text-2xl opacity-40">+</span></>, body: "객관적 성과 분석을 통한 꾸준한 복리 성장", tone: "text-secondary" },
  { label: "최대 낙폭", value: "-8.4%", body: "손절 규칙 준수로 절반이 된 드로우다운", tone: "text-neon-loss" },
  { label: "플레이북 준수율", value: "92%", body: "충동적 진입이 10건 중 1건 미만으로 감소", tone: "text-data-blue" },
];

function BenefitItem({ item, index }: { item: (typeof benefits)[number]; index: number }) {
  const [icon, tone, title, body] = item;
  return (
    <li className={`value-item ${tone} group`}>
      <div className="flex items-start gap-4 reveal reveal-cascade" style={index ? { transitionDelay: `${index * 80}ms` } : undefined}>
        <MaterialIcon className="text-[22px] mt-0.5 transition-transform group-hover:scale-110">{icon}</MaterialIcon>
        <div>
          <h4 className="font-bold text-on-surface text-lg mb-1">{title}</h4>
          <p className="text-on-surface-variant text-sm leading-relaxed">{body}</p>
        </div>
      </div>
    </li>
  );
}

function StatCard({ stat }: { stat: (typeof stats)[number] }) {
  return (
    <ClayCard className={`stat-card p-6 rounded-2xl cursor-default reveal reveal-focus ${stat.tone}`}>
      <div className="text-[11px] uppercase tracking-widest text-on-surface-variant mb-3">{stat.label}</div>
      <div className="stat-value text-4xl mb-3">{stat.value}</div>
      <p className="text-xs text-on-surface-variant leading-relaxed">{stat.body}</p>
    </ClayCard>
  );
}

export function ValueSection() {
  return (
    <section id="why-it-matters" className="py-section-padding px-gutter bg-surface-container-lowest/85 relative z-10">
      <div className="max-w-container-max mx-auto">
        <SectionIntro
          eyebrow="Why It Matters"
          icon="trending_up"
          iconClassName="icon-float"
          title={<>왜 매매일지 작성이 <span className="text-secondary">트레이더의 무기인가요?</span></>}
          description="도박사와 전문가의 차이는 데이터에 있습니다. MarketFools는 단순한 매매 내역을 전략적 플레이북으로 변환하여, 수익으로 이어지는 패턴과 불필요한 손실을 유발하는 습관을 명확히 짚어냅니다."
        />
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ul className="space-y-7">
            {benefits.map((item, index) => <BenefitItem key={item[2]} item={item} index={index} />)}
          </ul>
          <div className="grid grid-cols-2 gap-4 stat-grid">
            {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
