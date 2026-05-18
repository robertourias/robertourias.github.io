// Mock next/font/google — fonts are loaded via globals.css in preview
export function Manrope() {
  return { variable: "--font-display", className: "" }
}

export function Inter() {
  return { variable: "--font-sans", className: "" }
}
