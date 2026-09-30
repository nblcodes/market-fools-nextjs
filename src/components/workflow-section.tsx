import { SectionIntro } from "./shared";

const steps = [
  {
    tone: "bg-primary-container text-white",
    labelTone: "text-primary",
    line: "from-primary/50 to-secondary/30",
    label: "거래 내역 불러오기",
    title: "증권사 API나 커넥터로 연결하거나 CSV를 올리거나, 직접 입력하세요.",
    body: <>API나 커넥터를 이용해서 자동으로 데이터를 불러오거나 파일 하나면 시작됩니다.<br />지난 몇달치를 한 번에 올려도 되고, 오늘 한 건부터 시작해도 됩니다. 정리는 MarketFools가 합니다.</>,
  },
  {
    tone: "bg-secondary text-on-secondary",
    labelTone: "text-secondary",
    line: "from-secondary/50 to-tertiary/30",
    label: "성과를 한 화면에서 확인",
    title: "숫자로 먼저 현재 위치를 확인합니다.",
    body: <>자산 곡선, 승률, 손익비, 최대 낙폭이 한눈에 정리됩니다. 캘린더 히트맵은 어떤 날에 벌고 어떤 날에 잃었는지를 색으로 보여줍니다. 여기까지는 &apos;무슨 일이 있었는가&apos;입니다.</>,
  },
  {
    tone: "bg-tertiary text-on-tertiary",
    labelTone: "text-tertiary",
    line: "from-tertiary/50 to-warning-amber/30",
    label: "패턴과 감정 개입 지점 찾기",
    title: "'왜 그랬는가'는 AI가 찾아냅니다.",
    body: <>&quot;금요일 오후 거래의 78%가 손실&quot;, &quot;손실 직후 20분 내 진입한 거래의 평균 손익이 -2.3R&quot; 같은, 혼자서는 세어보기 어려운 규칙성을 꺼내옵니다. 시간대, 종목, 포지션 크기, 그리고 감정이 개입한 순간까지 함께 짚습니다.</>,
  },
  {
    tone: "bg-warning-amber text-background",
    labelTone: "text-warning-amber",
    line: "",
    label: "지킬 규칙 한 가지로 좁히기",
    title: "전부 고치려 하지 않습니다. 가장 비싼 것 하나부터.",
    body: <>발견한 누수 중 계좌를 가장 많이 갉아먹는 항목이 개선 목표가 됩니다. 이후의 거래는 그 규칙을 지켰는지 기준으로 추적되고, 다음 주에 실제로 줄었는지 숫자로 확인합니다.</>,
  },
] as const;

function WorkflowStep({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <div className={`flex gap-6 reveal ${index % 2 ? "reveal-from-right" : "reveal-from-left"}`}>
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`clay-btn w-12 h-12 flex items-center justify-center font-mono-data font-bold flex-shrink-0 ${step.tone}`}>
          {number}
        </div>
        {step.line && <div className={`w-px flex-1 bg-gradient-to-b ${step.line} my-2`} />}
      </div>
      <div className={index === steps.length - 1 ? "" : "pb-16"}>
        <span className={`font-mono-data text-xs uppercase tracking-wider ${step.labelTone}`}>
          STEP {index + 1} · {step.label}
        </span>
        <p className="text-on-surface font-semibold text-lg mt-2 mb-2">{step.title}</p>
        <p className="text-on-surface-variant text-sm leading-relaxed">{step.body}</p>
      </div>
    </div>
  );
}

export function WorkflowSection() {
  return (
    <section id="how-it-works" className="py-section-padding px-gutter bg-surface-container-low/85 relative z-10 overflow-hidden">
      <div className="absolute inset-0 radial-glow pointer-events-none opacity-40" />
      <div className="max-w-container-max mx-auto relative">
        <SectionIntro
          eyebrow="How it works"
          icon="settings"
          iconClassName="icon-spin"
          title={<>거래 기록을 올리는 순간부터,<br className="hidden md:block" /> 고칠 것이 보이기 시작합니다.</>}
          description="업로드에서 첫 진단까지 몇 분이면 충분합니다."
        />
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => <WorkflowStep key={step.label} step={step} index={index} />)}
        </div>
      </div>
    </section>
  );
}
