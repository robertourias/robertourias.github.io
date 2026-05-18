// Primitive palette — raw color values
export const palette = {
  neutral: {
    0: "#ffffff",
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d1d1d6",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065",
  },
  red: {
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
  },
  green: {
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
  },
  amber: {
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
  },
} as const;

// Semantic tokens — light mode
export const light = {
  background: palette.neutral[50],
  foreground: palette.neutral[900],

  surface: palette.neutral[0],
  "surface-raised": palette.neutral[100],
  "surface-overlay": palette.neutral[200],

  primary: palette.indigo[600],
  "primary-foreground": palette.neutral[0],
  "primary-hover": palette.indigo[700],

  secondary: palette.violet[500],
  "secondary-foreground": palette.neutral[0],

  muted: palette.neutral[100],
  "muted-foreground": palette.neutral[500],

  accent: palette.indigo[100],
  "accent-foreground": palette.indigo[700],

  destructive: palette.red[600],
  "destructive-foreground": palette.neutral[0],

  success: palette.green[600],
  "success-foreground": palette.neutral[0],

  warning: palette.amber[500],
  "warning-foreground": palette.neutral[900],

  border: palette.neutral[200],
  input: palette.neutral[200],
  ring: palette.indigo[500],
} as const;

// Semantic tokens — dark mode
export const dark = {
  background: palette.neutral[950],
  foreground: palette.neutral[50],

  surface: palette.neutral[900],
  "surface-raised": palette.neutral[800],
  "surface-overlay": palette.neutral[700],

  primary: palette.indigo[400],
  "primary-foreground": palette.neutral[950],
  "primary-hover": palette.indigo[300],

  secondary: palette.violet[400],
  "secondary-foreground": palette.neutral[950],

  muted: palette.neutral[800],
  "muted-foreground": palette.neutral[400],

  accent: palette.indigo[950],
  "accent-foreground": palette.indigo[300],

  destructive: palette.red[500],
  "destructive-foreground": palette.neutral[0],

  success: palette.green[500],
  "success-foreground": palette.neutral[950],

  warning: palette.amber[400],
  "warning-foreground": palette.neutral[950],

  border: palette.neutral[800],
  input: palette.neutral[800],
  ring: palette.indigo[400],
} as const;

export type ColorToken = keyof typeof light;
