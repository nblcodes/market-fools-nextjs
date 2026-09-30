import Script from "next/script";
import { DiagnosisSection } from "@/components/diagnosis-section";
import { FaqSection } from "@/components/faq-section";
import { FeaturesSection } from "@/components/features-section";
import { FinalCtaSection } from "@/components/final-cta-section";
import { FoolioSection } from "@/components/foolio-section";
import { HeroSection } from "@/components/hero-section";
import { IntegrationsSection } from "@/components/integrations-section";
import { SiteHeader } from "@/components/site-header";
import { ValueSection } from "@/components/value-section";
import { WorkflowSection } from "@/components/workflow-section";
import { getWebPageJsonLd } from "@/lib/seo";

export default function Home() {
  const jsonLd = getWebPageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div>
        <video id="bg-loop-video" className="bg-loop-video" autoPlay loop muted playsInline src="/bg-4.mp4" />
        <SiteHeader />
        <main>
          <HeroSection />
          <DiagnosisSection />
          <WorkflowSection />
          <ValueSection />
          <FeaturesSection />
          <FoolioSection />
          <IntegrationsSection />
          <FaqSection />
          <FinalCtaSection />
        </main>
        <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
      </div>
      <Script src="/landing.js" strategy="afterInteractive" />
    </>
  );
}
