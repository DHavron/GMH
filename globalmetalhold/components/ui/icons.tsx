import type { SVGProps } from "react";

/**
 * Набор inline-SVG иконок в индустриальном стиле (stroke, currentColor).
 * Все иконки декоративны — aria-hidden по умолчанию.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

/* ─── Логотип: шестерня + слиток металла ─────────────────────────────── */
export function LogoIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} {...props}>
      <path d="M12 2.5l2.1 1.7 2.6-.6 1 2.5 2.5 1-.6 2.6 1.7 2.1-1.7 2.1.6 2.6-2.5 1-1 2.5-2.6-.6L12 21.5l-2.1-1.7-2.6.6-1-2.5-2.5-1 .6-2.6L2.7 12l1.7-2.1-.6-2.6 2.5-1 1-2.5 2.6.6L12 2.5z" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M10.2 12h3.6M12 10.2v3.6" strokeWidth={1.2} />
    </svg>
  );
}

/* ─── Иконки услуг ────────────────────────────────────────────────────── */
export function LatheIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8h18M3 16h18" />
      <circle cx="8" cy="12" r="2.6" />
      <path d="M13.5 12h4.5M16 9.8l2.2 2.2L16 14.2" />
      <path d="M5 8V6m14 0v2" />
    </svg>
  );
}

export function MillingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v7" />
      <rect x="9.4" y="10" width="5.2" height="4.4" rx="0.8" />
      <path d="M10.2 14.4l.6 2.2m2.4-2.2l-.6 2.2M12 16.6V21" />
      <path d="M4 21h16" />
      <path d="M7 6h4m2 0h4" />
    </svg>
  );
}

export function LaserIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2v5" />
      <path d="M9.5 7h5l1.2 3H8.3L9.5 7z" />
      <path d="M12 10v4" />
      <path d="M4 18h16" />
      <path d="M12 14l-2.5 4m2.5-4l2.5 4" />
      <path d="M6 21v-3m12 3v-3" />
    </svg>
  );
}

export function WeldingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20l7-7" />
      <path d="M10 11l3-3 4 4-3 3-4-4z" />
      <path d="M14.5 6.5L17 4m-1 4.5L19.5 6" />
      <path d="M3 14l2-2m-1 5.5L6.5 15" />
      <path d="M13 17l4 4" />
    </svg>
  );
}

export function StructureIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M4 8l16 13M20 8L4 21" />
      <path d="M4 21h16" />
    </svg>
  );
}

export function CoatingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 8V5.5A1.5 1.5 0 0110.5 4h5A1.5 1.5 0 0117 5.5V8" />
      <path d="M7 8h10v4a2 2 0 01-2 2h-1v3.5a1.5 1.5 0 01-3 0V14H9a2 2 0 01-2-2V8z" />
      <path d="M4 11v2m0 3v2" />
    </svg>
  );
}

/* ─── Иконки преимуществ ─────────────────────────────────────────────── */
export function TargetIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function AwardIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M9 14l-1.5 6L12 17.5 16.5 20 15 14" />
    </svg>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3h7l4 4v14H7V3z" />
      <path d="M14 3v4h4" />
      <path d="M10 12h6m-6 3.5h6M10 8h2" />
    </svg>
  );
}

export function BlueprintIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9h17M8 4.5v15" />
      <path d="M11.5 12.5l3 3m0-3l-3 3" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 7h11v9h-11z" />
      <path d="M13.5 10h4l3 3v3h-7" />
      <circle cx="6.5" cy="18" r="1.7" />
      <circle cx="16.5" cy="18" r="1.7" />
    </svg>
  );
}

/* ─── Прочие UI-иконки ────────────────────────────────────────────────── */
export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 4h3l1.5 3.5-2 1.5a12 12 0 006 6l1.5-2 3.5 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 013.5 6.2 2 2 0 015.5 4z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s6.5-5.5 6.5-10.5A6.5 6.5 0 005.5 10.5C5.5 15.5 12 21 12 21z" />
      <circle cx="12" cy="10.3" r="2.4" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2.2} {...props}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15" />
      <path d="M13.5 6.5L19.5 12l-6 5.5" />
    </svg>
  );
}

export function FileIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3h7l4 4v14H7V3z" />
      <path d="M14 3v4h4" />
    </svg>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3a9 9 0 019 9" />
      <path d="M21 12a9 9 0 11-9-9" opacity={0.25} />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4l8.5 15h-17L12 4z" />
      <path d="M12 10v4m0 2.5V17" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
