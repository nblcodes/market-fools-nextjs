/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { WaitlistButton } from "./shared";

const tickers = [
  ["Bitcoin-Coin.svg", "3%", "64px", "0s", "19s", "26px"],
  ["Solana.svg", "11%", "46px", "6.5s", "22s", "-18px"],
  ["Etherium.svg", "19%", "72px", "2.8s", "17s", "20px"],
  ["Apple.svg", "27%", "52px", "11s", "24s", "-24px"],
  ["Nvidia.svg", "35%", "58px", "4.2s", "20s", "16px"],
  ["Ripple.svg", "43%", "44px", "14s", "23s", "-14px"],
  ["Tesla.svg", "50%", "68px", "8.4s", "18s", "22px"],
  ["Microsoft.svg", "58%", "50px", "1.6s", "25s", "-20px"],
  ["Dogecoin.svg", "66%", "60px", "12.5s", "19s", "18px"],
  ["Amazon.svg", "74%", "48px", "5.6s", "21s", "-16px"],
  ["Meta.svg", "82%", "56px", "16s", "23s", "14px"],
  ["Google.svg", "90%", "42px", "9.8s", "26s", "24px"],
  ["Gold.svg", "7%", "54px", "18.5s", "21s", "-22px"],
  ["SP-500.svg", "31%", "46px", "20.5s", "24s", "18px"],
  ["Binance.svg", "54%", "50px", "15.2s", "22s", "-20px"],
  ["NASDAQ-100.svg", "78%", "44px", "23s", "25s", "16px"],
  ["Netflix.svg", "95%", "52px", "13.4s", "20s", "-18px"],
  ["Chainlink.svg", "23%", "40px", "26s", "23s", "22px"],
] as const;

type TickerStyle = CSSProperties & {
  "--x": string;
  "--size": string;
  "--delay": string;
  "--dur": string;
  "--drift": string;
};

function TickerBubble({ ticker }: { ticker: (typeof tickers)[number] }) {
  const [file, x, size, delay, duration, drift] = ticker;
  const style: TickerStyle = {
    "--x": x,
    "--size": size,
    "--delay": delay,
    "--dur": duration,
    "--drift": drift,
  };

  return (
    <span className="cta-bubble" style={style}>
      <img src={`/assets/logos/${file}`} alt="" />
    </span>
  );
}

export function FinalCtaSection() {
  return (
    <section className="py-section-padding px-gutter bg-surface-container-lowest/85 relative z-10 overflow-hidden">
      <div className="max-w-container-max mx-auto relative z-10 reveal">
        <div className="glass-panel cta-card p-12 md:p-20 rounded-[44px] text-center relative overflow-hidden">
          <div className="cta-bubbles" aria-hidden="true">
            {tickers.map((ticker) => <TickerBubble key={ticker[0]} ticker={ticker} />)}
          </div>
          <div className="relative z-10">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8 leading-[1.3]">
              트레이더의 90%가 돈을 잃습니다.<br />
              <span className="brand-gradient font-black">이제 10%의 트레이더가 될 차례입니다.</span>
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto mb-6 text-lg leading-relaxed">
              당신은 이미 전략과 셋업을 알고 있습니다.<br className="hidden sm:block" />
              수많은 강의를 봤고, 충분한 시간을 시장에 투자했습니다.
            </p>
            <p className="text-on-surface-variant max-w-5xl mx-auto mb-10 text-lg leading-relaxed">
              지금 부족한 것은 <span className="text-on-surface font-semibold">더 많은 지식이 아닙니다.</span><br className="hidden sm:block" />
              당신의 거래 데이터를 객관적으로 분석하고, 반복되는 실수와 수익을 만드는 행동을 알려주는 <span className="text-secondary font-semibold">피드백 루프</span>입니다.
            </p>
            <div className="flex justify-center"><WaitlistButton size="lg" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
