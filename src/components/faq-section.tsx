import type { ReactNode } from "react";
import { ClayCard, MaterialIcon, SectionIntro } from "./shared";

const faqs: ReadonlyArray<{ question: string; answer: ReactNode }> = [
  { question: "정식 출시는 언제인가요?", answer: "현재 비공개 베타를 준비 중입니다. 출시 알림을 신청해 주시면 베타 초대와 정식 출시 일정을 가장 먼저 보내드립니다. 신청자에게는 초기 사용자 혜택도 함께 안내드릴 예정입니다." },
  { question: "어떤 증권사와 거래소를 지원하나요?", answer: "국내외 주요 증권사와 암호화폐 거래소의 API 연동을 순차적으로 지원합니다. 연동이 준비되지 않은 곳이라도 거래 내역 CSV 파일을 올리면 동일하게 분석할 수 있고, 직접 입력도 가능합니다. 지원 목록은 출시 시점에 공개됩니다." },
  { question: "주식 외에 코인이나 선물도 기록할 수 있나요?", answer: "주식, 암호화폐, 선물, FX를 모두 지원합니다. 자산군이 달라도 승률·손익비·최대 낙폭 같은 지표는 같은 기준으로 계산되기 때문에, 여러 시장에 걸친 매매를 한 화면에서 비교할 수 있습니다." },
  { question: "매수·매도 신호를 추천해 주나요?", answer: <>아닙니다. MarketFools는 투자자문 서비스가 아니며, 특정 종목의 매매를 권유하지 않습니다. 이미 실행한 <strong className="text-on-surface font-semibold">당신의 거래</strong>를 분석해 반복되는 패턴과 손실의 원인을 보여주는 도구입니다. 판단은 언제나 사용자의 몫입니다.</> },
  { question: "제 거래 데이터는 안전한가요?", answer: "거래 데이터는 암호화되어 저장되며, 본인 외에는 누구도 열람할 수 없습니다. 증권사 연동에는 조회 전용 권한만 사용하므로 MarketFools가 주문을 넣거나 자산을 옮기는 일은 구조적으로 불가능합니다. 계정 삭제 시 데이터도 함께 파기됩니다." },
  { question: "거래 기록이 얼마나 쌓여야 의미가 있나요?", answer: "30건 정도면 시간대나 요일 같은 기본 패턴이 드러나기 시작하고, 100건을 넘어서면 전략별 기대값을 신뢰할 만한 수준으로 볼 수 있습니다. 지난 몇 달치를 한 번에 올리면 첫날부터 분석 결과를 확인할 수 있습니다." },
  { question: "엑셀로 정리해 둔 기존 일지도 옮길 수 있나요?", answer: "네. 엑셀이나 CSV 파일을 올리면 열 이름을 자동으로 인식하고, 형식이 다르면 직접 매칭할 수 있습니다. 지금까지 쌓아온 기록을 버리지 않고 그대로 이어서 분석할 수 있습니다." },
];

function FaqItem({ item, index }: { item: (typeof faqs)[number]; index: number }) {
  return (
    <ClayCard className="faq-item rounded-2xl reveal" style={index ? { transitionDelay: `${index * 60}ms` } : undefined}>
      <button className="faq-q" type="button" aria-expanded="false">
        <span className="faq-q-text">{item.question}</span>
        <MaterialIcon className="faq-icon">add</MaterialIcon>
      </button>
      <div className="faq-a"><p>{item.answer}</p></div>
    </ClayCard>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="py-section-padding px-gutter bg-surface-container-lowest/85 relative z-10 overflow-hidden">
      <div className="max-w-container-max mx-auto">
        <SectionIntro
          eyebrow="FAQ"
          icon="help"
          title="궁금한 점이 있으신가요"
          description="찾으시는 답변이 없다면 출시 알림 신청 시 질문을 남겨주세요. 답변과 함께 출시 소식을 전해드리겠습니다."
        />
        <div className="max-w-3xl mx-auto space-y-4 faq-list">
          {faqs.map((item, index) => <FaqItem key={item.question} item={item} index={index} />)}
        </div>
      </div>
    </section>
  );
}
