// Source of truth: docs/nico.dev.br.pen
export const radius = {
  none: "0px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  full: "9999px",
} as const;

export type RadiusToken = keyof typeof radius;
