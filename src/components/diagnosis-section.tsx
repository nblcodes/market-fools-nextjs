import { ClayCard, MaterialIcon, SectionIntro } from "./shared";

const diagnoses = [
  {
    icon: "balance",
    tone: "bg-neon-loss/10 text-neon-loss",
    title: "손절은 미루고, 익절은 서두른다",
    lead: "이기는 거래는 짧게 끊고, 지는 거래는 오래 붙잡습니다.",
    body: "수익이 조금 나면 사라질까 봐 서둘러 닫습니다. 반대로 손실이 나면 조금만 더 기다리면 돌아올 것 같아 버팁니다. 그렇게 이익은 작게, 손실은 크게 쌓입니다. 승률이 나쁘지 않은데도 계좌가 줄어드는 트레이더는 대부분 여기에 걸려 있습니다.",
  },
  {
    icon: "local_fire_department",
    tone: "bg-tertiary/10 text-tertiary",
    title: "손실 직후에 더 크게 베팅한다",
    lead: "잃은 만큼 되찾으려다 두 배로 잃습니다.",
    body: "한 번 크게 물리고 나면 판단이 아니라 감정이 다음 진입을 결정합니다. 원래 자리가 아닌데도 들어가고, 원래 크기가 아닌데도 늘립니다. 하루 손실의 대부분은 첫 번째 손실이 아니라, 그 손실을 만회하려던 두세 번째 거래에서 나옵니다.",
  },
  {
    icon: "bolt",
    tone: "bg-warning-amber/10 text-warning-amber",
    title: "계획에 없던 자리에 들어간다",
    lead: "차트를 보다가 남들이 들어가는 걸 보고 따라 들어갑니다.",
    body: "기다리는 일은 지루하고, 아무것도 하지 않는 시간은 기회를 놓치는 것처럼 느껴집니다. 그래서 조건이 절반만 맞아도 진입 이유를 만들어냅니다. 계획된 거래와 충동적인 거래를 따로 세어보면, 계좌를 갉아먹는 쪽이 어디인지 대개 분명해집니다.",
  },
  {
    icon: "tune",
    tone: "bg-primary/10 text-primary",
    title: "포지션 크기가 그때그때 다르다",
    lead: "확신이 들 때 크게, 애매할 때 작게 — 그런데 결과는 반대입니다.",
    body: "확신은 근거가 많아서 생기기도 하지만, 직전 거래가 잘 풀렸거나 기분이 좋아서 생기기도 합니다. 문제는 두 가지가 똑같은 느낌이라는 점입니다. 가장 크게 베팅한 거래들만 따로 모아보면, 그것이 실력의 결과였는지 기분의 결과였는지 드러납니다.",
  },
  {
    icon: "restart_alt",
    tone: "bg-secondary/10 text-secondary",
    title: "몇 번 지고 나면 전략을 갈아엎는다",
    lead: "연패시 시스템이 아니라 자신을 의심하기 시작합니다.",
    body: "모든 전략에는 잘 맞지 않는 구간이 있습니다. 그런데 그 구간을 견디지 못하고 규칙을 바꾸면, 통계가 쌓일 기회 자체가 사라집니다. 결국 전략이 나빠서가 아니라 어떤 전략도 충분히 오래 써보지 않아서 성과가 나오지 않습니다.",
  },
  {
    icon: "receipt_long",
    tone: "bg-data-blue/10 text-data-blue",
    title: "기록은 하지만, 다시 보지 않는다",
    lead: "결과만 남기고 과정은 남기지 않습니다.",
    body: "진입가와 손익만 적힌 기록은 영수증이지 일지가 아닙니다. 왜 들어갔는지, 그때 어떤 상태였는지, 계획대로 나왔는지가 빠져 있으면 같은 실수를 몇 번째 반복하는 중인지조차 알 수 없습니다. 고칠 수 없는 이유는 의지가 부족해서가 아니라, 무엇을 고쳐야 할지 데이터가 없어서입니다.",
  },
] as const;

function DiagnosisCard({ item, index }: { item: (typeof diagnoses)[number]; index: number }) {
  return (
    <ClayCard
      className="p-8 rounded-2xl reveal reveal-diagnostic"
      style={index % 3 ? { transitionDelay: `${(index % 3) * 100}ms` } : undefined}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`clay-inset w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.tone}`}>
          <MaterialIcon>{item.icon}</MaterialIcon>
        </div>
        <h3 className="font-headline-lg text-xl text-on-surface">{item.title}</h3>
      </div>
      <p className="text-on-surface font-semibold text-sm mb-3">{item.lead}</p>
      <p className="text-on-surface-variant text-sm leading-relaxed">{item.body}</p>
    </ClayCard>
  );
}

export function DiagnosisSection() {
  return (
    <section id="diagnosis" className="py-section-padding px-gutter bg-surface-container-lowest/85 relative z-10 overflow-hidden">
      <div className="absolute inset-0 radial-glow pointer-events-none opacity-50" />
      <div className="max-w-container-max mx-auto relative">
        <SectionIntro
          eyebrow="Trading Diagnosis"
          icon="monitor_heart"
          iconClassName="icon-heartbeat"
          title="당신의 매매는 어디에 속하나요?"
          description="거의 모든 손실은 새로운 실수가 아니라, 이미 여러 번 반복한 실수입니다."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diagnoses.map((item, index) => <DiagnosisCard key={item.title} item={item} index={index} />)}
        </div>
      </div>
    </section>
  );
}
