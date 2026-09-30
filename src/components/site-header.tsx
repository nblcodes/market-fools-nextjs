/* eslint-disable @next/next/no-img-element */
import { MaterialIcon, WaitlistButton } from "./shared";

const navigation = [
  ["#home", "홈"],
  ["#diagnosis", "진단"],
  ["#how-it-works", "작동방식"],
  ["#why-it-matters", "가치"],
  ["#features", "핵심기능"],
  ["#foolio", "Foolio AI"],
  ["#integrations", "통합"],
  ["#faq", "FAQ"],
] as const;

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 w-full bg-background/40 backdrop-blur-xl z-50">
      <div className="max-w-container-max mx-auto px-gutter h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="MarketFools" className="h-9 w-auto" />
        </div>
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium nav-menu">
          <span className="nav-pill" id="nav-pill" />
          {navigation.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="nav-link inline-flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface transition"
            >
              {href === "#foolio" && <MaterialIcon className="text-[17px]" filled>smart_toy</MaterialIcon>}
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <WaitlistButton size="sm" />
        </div>
      </div>
    </header>
  );
}
