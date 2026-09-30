export const siteConfig = {
  name: "MarketFools",
  url: "https://marketfools.com",
  title: "AI 트레이딩 매매일지 | MarketFools",
  description:
    "거래 데이터를 분석해 반복되는 실수와 수익을 만드는 행동을 구분합니다. 감이 아니라 데이터로 매매하는 AI 기반 트레이딩 매매일지, MarketFools.",
  locale: "ko_KR",
  language: "ko-KR",
} as const;

function parseSiteUrl(value: string | undefined) {
  if (!value) return null;

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;

    url.pathname = "/";
    url.search = "";
    url.hash = "";
    return url;
  } catch {
    return null;
  }
}

export const siteUrl = parseSiteUrl(
  process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL,
) ?? new URL(siteConfig.url);

export function absoluteUrl(path = "/") {
  return siteUrl ? new URL(path, siteUrl).toString() : null;
}

export function getWebPageJsonLd() {
  const homeUrl = absoluteUrl("/");
  const websiteId = homeUrl ? `${homeUrl}#website` : undefined;
  const webpageId = homeUrl ? `${homeUrl}#webpage` : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        ...(websiteId ? { "@id": websiteId } : {}),
        ...(homeUrl ? { url: homeUrl } : {}),
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
      },
      {
        "@type": "WebPage",
        ...(webpageId ? { "@id": webpageId } : {}),
        ...(homeUrl ? { url: homeUrl } : {}),
        ...(websiteId ? { isPartOf: { "@id": websiteId } } : {}),
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
      },
    ],
  };
}
