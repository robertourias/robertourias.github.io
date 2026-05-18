// Semantic tokens — light mode (source of truth: docs/nico.dev.br.pen)
export const light = {
  background: "#F8F9FF",
  foreground: "#0A0C1A",

  surface: "#FFFFFF",
  "surface-raised": "#F0F1FA",
  "surface-overlay": "#E4E6F8",

  primary: "#5546E8",
  "primary-foreground": "#FFFFFF",
  "primary-hover": "#4032D6",

  secondary: "#8B5CF6",
  "secondary-foreground": "#FFFFFF",

  muted: "#F0F1FA",
  "muted-foreground": "#64658A",

  accent: "#EBE9FF",
  "accent-foreground": "#4032D6",

  destructive: "#CF2E2E",
  "destructive-foreground": "#FFFFFF",

  success: "#0F7A41",
  "success-foreground": "#FFFFFF",

  warning: "#C96D00",
  "warning-foreground": "#FFFFFF",

  border: "#DDE0F5",
  input: "#DDE0F5",
  ring: "#5546E8",

  "badge-destructive-bg": "#FFE4E4",
  "badge-success-bg": "#DCFCE7",
  "badge-warning-bg": "#FEF3C7",
} as const;

// Semantic tokens — dark mode (source of truth: docs/nico.dev.br.pen)
export const dark = {
  background: "#080A12",
  foreground: "#EEEEF8",

  surface: "#0F1120",
  "surface-raised": "#171A2E",
  "surface-overlay": "#20243C",

  primary: "#6B5CF8",
  "primary-foreground": "#FFFFFF",
  "primary-hover": "#8073FF",

  secondary: "#BF81FF",
  "secondary-foreground": "#080A12",

  muted: "#171A2E",
  "muted-foreground": "#7B7E9E",

  accent: "#1B1E38",
  "accent-foreground": "#A89BFF",

  destructive: "#FF4444",
  "destructive-foreground": "#FFFFFF",

  success: "#1ED97A",
  "success-foreground": "#080A12",

  warning: "#FFAA20",
  "warning-foreground": "#080A12",

  border: "#1E2240",
  input: "#1E2240",
  ring: "#6B5CF8",

  "badge-destructive-bg": "#220808",
  "badge-success-bg": "#0C2218",
  "badge-warning-bg": "#231800",
} as const;

export type ColorToken = keyof typeof light;
