import { MaterialIcon, SectionIntro } from "./shared";

const prompts = [
  "지난달 손절 내역과 가장 큰 원인 요약해줘",
  "NVDA 15분봉 상 오더블록 및 지지선 위치",
  "나의 가장 승률 높은 거래 시간대와 요일",
  "오늘 뇌동매매 방지 체크리스트 검토",
  "이번 주 성과를 지난주와 비교해줘",
  "내가 가장 자주 반복하는 실수 3가지",
] as const;

function PromptButton({ children, index }: { children: string; index: number }) {
  return (
    <button className="foolio-chip" type="button" data-q={index}>
      <MaterialIcon>chat</MaterialIcon>
      {children}
    </button>
  );
}

export function FoolioSection() {
  return (
    <section id="foolio" className="py-section-padding px-gutter bg-surface-container-lowest/85 relative z-10 overflow-hidden">
      <div className="max-w-container-max mx-auto">
        <SectionIntro
          eyebrow="Foolio AI"
          icon="smart_toy"
          iconClassName="icon-ai-pulse"
          titleClassName="leading-[1.3]"
          descriptionClassName="leading-relaxed"
          title={<>말 한마디로 실행하는 <span className="text-secondary">대화형 어시스턴트</span></>}
          description={<>복잡한 메뉴 검색이나 쿼리 작성 없이, &quot;지난달 손절 내역 요약해줘&quot;, &quot;NVDA 15분봉 오더블록 위치 알려줘&quot;라고 말하세요. Foolio AI가 내 일지 데이터와 차트 수급을 분석해 핵심만 즉각 제시합니다.</>}
        />
        <div className="grid lg:grid-cols-2 gap-14 items-stretch">
          <div className="reveal">
            <p className="font-mono-data text-xs uppercase tracking-widest text-on-surface-variant/70 mb-4">
              추천 테스트 질의 (클릭하여 실행)
            </p>
            <div className="space-y-3" id="foolio-chips">
              {prompts.map((prompt, index) => <PromptButton key={prompt} index={index}>{prompt}</PromptButton>)}
            </div>
          </div>
          <div className="glass-panel foolio-window rounded-3xl reveal h-full" style={{ transitionDelay: "150ms" }}>
            <div className="foolio-head">
              <div className="clay-btn w-9 h-9 bg-primary-container flex items-center justify-center flex-shrink-0">
                <MaterialIcon className="text-[20px] text-white" filled>smart_toy</MaterialIcon>
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm text-on-surface leading-tight">Foolio AI</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="foolio-dot" />
                  <span className="font-mono-data text-[10px] uppercase tracking-widest text-on-surface-variant">내 일지 연결됨</span>
                </div>
              </div>
            </div>
            <div className="foolio-body" id="foolio-body">
              <div className="foolio-msg ai">
                안녕하세요, <b>Fool</b>님. 지난 6개월 거래 <b className="mono">312건</b>을 불러왔습니다.<br />
                왼쪽 질문을 눌러보시거나, 궁금한 것을 편하게 물어보세요.
              </div>
            </div>
            <div className="foolio-input">
              <MaterialIcon className="text-[18px]">edit</MaterialIcon>
              <span className="flex-1">무엇이든 물어보세요…</span>
              <MaterialIcon className="text-[18px] text-primary">send</MaterialIcon>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
