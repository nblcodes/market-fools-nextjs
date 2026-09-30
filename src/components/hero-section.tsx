import { MaterialIcon, WaitlistButton } from "./shared";

export function HeroSection() {
  return (
    <section id="home" className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-stack-lg px-gutter grid-pattern overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none" src="/bg-2.mp4" />
      <div className="absolute inset-0 bg-background/40 pointer-events-none" />
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div className="max-w-container-max mx-auto text-center z-10 reveal active">
        <div className="section-badge hero-badge mb-8">
          <MaterialIcon className="text-[18px] icon-ai-pulse" filled>auto_awesome</MaterialIcon>
          <span className="font-label-sm text-label-sm uppercase tracking-wider">AI 기반 트레이딩 매매일지 플랫폼</span>
        </div>
        <h1 className="font-display-lg text-display-lg md:text-[60px] font-extrabold text-on-surface mb-6 max-w-5xl mx-auto leading-[1.15] tracking-tight">
          거래를 기록하는 순간,<br />
          <span className="brand-gradient font-black">실수가 데이터가 됩니다.</span>
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mb-10 text-lg">
          더 이상 감에 의존하지 마세요. 원칙은 감정이 아니라 데이터에서 나옵니다.<br />
          거래 데이터를 분석해 반복되는 행동 패턴과 감정이 매매에 개입하는 순간을 찾아냅니다.<br />
          당신의 승리 패턴을 밝혀내고 수익을 만드는 전략과 손실을 반복시키는 습관을 구분합니다.<br />
          MarketFools는 현대 트레이더들에게 필요한 분석적 우위를 정밀하게 제공합니다.
        </p>
        <WaitlistButton />
        <div className="mt-20 relative max-w-5xl mx-auto reveal tilt-container" style={{ transitionDelay: "200ms" }}>
          <div className="relative rounded-3xl overflow-hidden glass-panel p-2 tilt-card" id="hero-tilt-card">
            <video
              autoPlay
              loop
              muted
              playsInline
              width={1280}
              height={720}
              className="w-full aspect-video rounded-2xl pointer-events-none"
              src="/hero.mp4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
