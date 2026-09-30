import { SectionIntro } from "./shared";

export function IntegrationsSection() {
  return (
    <section id="integrations" className="py-section-padding px-gutter bg-surface-container-low/85 relative z-10 overflow-hidden">
      <div className="absolute inset-0 radial-glow pointer-events-none opacity-40" />
      <div className="max-w-container-max mx-auto relative">
        <SectionIntro
          eyebrow="Integrations"
          icon="sync"
          iconClassName="icon-spin"
          title="당신이 사용하는 브로커는 무엇인가요?"
          description={<>연결이 완료되면 자동 혹은 한번의 클릭만으로 몇 초 안에 모든 거래를 쉽게 가져올 수 있습니다.<br />MT4·MT5부터 글로벌거래소, 국내 증권사까지 체결되는 순간 모든 거래가 MarketFools와 연결됩니다.</>}
        />
        <div
          className="integrations-hub reveal"
          id="integrations-hub"
          role="img"
          aria-label="19개 브로커가 MarketFools와 자동으로 연결되는 다이어그램"
        />
      </div>
    </section>
  );
}
