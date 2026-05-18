// Source of truth: docs/nico.dev.br.pen
export const fontFamily = {
  sans: "var(--font-sans, Inter, ui-sans-serif, system-ui, sans-serif)",
  mono: "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)",
} as const;

export const fontSize = {
  xs: ["0.6875rem", { lineHeight: "1rem" }],    // 11px
  sm: ["0.75rem", { lineHeight: "1rem" }],       // 12px
  base: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
  lg: ["1rem", { lineHeight: "1.5rem" }],        // 16px
  xl: ["1.125rem", { lineHeight: "1.75rem" }],   // 18px
  "2xl": ["1.25rem", { lineHeight: "1.75rem" }], // 20px
  "3xl": ["1.5rem", { lineHeight: "2rem" }],     // 24px
  "4xl": ["1.875rem", { lineHeight: "2.25rem" }],// 30px
} as const;

export const fontWeight = {
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
} as const;

export const letterSpacing = {
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;
