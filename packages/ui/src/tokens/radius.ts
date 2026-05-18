export const radius = {
  none: "0px",
  sm: "calc(var(--radius) - 4px)",
  md: "calc(var(--radius) - 2px)",
  lg: "var(--radius)",
  xl: "calc(var(--radius) + 4px)",
  "2xl": "calc(var(--radius) + 8px)",
  "3xl": "calc(var(--radius) + 16px)",
  full: "9999px",
} as const;

// Base radius value used in CSS: 8px
export const BASE_RADIUS = "8px";
