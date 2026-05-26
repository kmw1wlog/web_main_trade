export type FeatureIconName =
  | "coupon"
  | "library"
  | "premium"
  | "chart"
  | "mobile"
  | "calendar";

type FeatureIconProps = {
  name: FeatureIconName;
  className?: string;
};

export function FeatureIcon({ name, className = "h-7 w-7" }: FeatureIconProps) {
  const common = {
    className,
    viewBox: "0 0 28 28",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "coupon":
      return (
        <svg {...common}>
          <path d="M6 7.5h16v4a2.5 2.5 0 0 0 0 5v4H6v-4a2.5 2.5 0 0 0 0-5v-4Z" />
          <path d="M14 8.5v11" />
          <path d="M10.5 11h7" />
          <path d="M10.5 17h7" />
        </svg>
      );
    case "library":
      return (
        <svg {...common}>
          <path d="M7 6.5h11a3 3 0 0 1 3 3v12H10a3 3 0 0 0-3 3V6.5Z" />
          <path d="M7 21.5a3 3 0 0 1 3-3h11" />
          <path d="M11 10.5h6" />
          <path d="M11 14h6" />
        </svg>
      );
    case "premium":
      return (
        <svg {...common}>
          <path d="m14 5 2.2 4.6 5.1.7-3.7 3.6.9 5.1-4.5-2.4-4.5 2.4.9-5.1-3.7-3.6 5.1-.7L14 5Z" />
          <path d="M9.5 22h9" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M6 21.5h16" />
          <path d="M7.5 18.5 11 13l3 3 6.5-8" />
          <path d="M20.5 8H17" />
        </svg>
      );
    case "mobile":
      return (
        <svg {...common}>
          <rect x="9" y="4.5" width="10" height="19" rx="2.5" />
          <path d="M12.5 7.5h3" />
          <path d="M13.5 20.5h1" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="5.5" y="7" width="17" height="15.5" rx="2.5" />
          <path d="M9 4.8v4.4" />
          <path d="M19 4.8v4.4" />
          <path d="M5.5 11.5h17" />
          <path d="M10 15.5h3" />
          <path d="M15.5 15.5h2.5" />
        </svg>
      );
  }
}

