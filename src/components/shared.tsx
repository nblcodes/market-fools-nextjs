import type { CSSProperties, ReactNode } from "react";

export const WAITLIST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfQPfU2Vch1r6PhVl4TlSwV2mbb307odqpsUJGN9ucgB3vggg/viewform";

type MaterialIconProps = {
  children: ReactNode;
  className?: string;
  filled?: boolean;
};

export function MaterialIcon({ children, className = "", filled = false }: MaterialIconProps) {
  const style = filled
    ? ({ fontVariationSettings: '"FILL" 1' } satisfies CSSProperties)
    : undefined;

  return (
    <span className={`material-symbols-outlined ${className}`.trim()} style={style}>
      {children}
    </span>
  );
}

type WaitlistButtonProps = {
  size?: "sm" | "md" | "lg";
};

const waitlistSizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-8 py-4 text-base",
  lg: "px-10 py-5 text-lg",
};

const waitlistIcons = {
  sm: "text-[18px] mr-0.5",
  md: "text-[20px] mr-0.5",
  lg: "text-[22px] mr-1",
};

export function WaitlistButton({ size = "md" }: WaitlistButtonProps) {
  return (
    <a
      href={WAITLIST_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`clay-btn ${waitlistSizes[size]} bg-warning-amber text-background font-semibold tracking-tight inline-flex items-center`}
    >
      <MaterialIcon className={waitlistIcons[size]} filled>notifications</MaterialIcon>
      출시알람신청
    </a>
  );
}

type SectionIntroProps = {
  eyebrow: string;
  icon: string;
  iconClassName?: string;
  title: ReactNode;
  description: ReactNode;
  className?: string;
  marginClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionIntro({
  eyebrow,
  icon,
  iconClassName = "icon-swing",
  title,
  description,
  className = "",
  marginClassName = "mb-16",
  titleClassName = "",
  descriptionClassName = "",
}: SectionIntroProps) {
  return (
    <div className={`text-center ${marginClassName} reveal ${className}`.trim()}>
      <div className="section-badge">
        <MaterialIcon className={`text-[18px] ${iconClassName}`} filled>{icon}</MaterialIcon>
        <span className="font-label-sm text-label-sm uppercase tracking-wider">{eyebrow}</span>
      </div>
      <h2 className={`font-headline-lg text-headline-lg text-on-surface mt-3 mb-4 ${titleClassName}`.trim()}>{title}</h2>
      <div className={`text-on-surface-variant max-w-2xl mx-auto ${descriptionClassName}`.trim()}>{description}</div>
    </div>
  );
}

type ClayCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function ClayCard({ children, className = "", style }: ClayCardProps) {
  return (
    <div className={`glass-panel clay-soft ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
