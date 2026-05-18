// Mock @/i18n/navigation (next-intl createNavigation)
export function usePathname() {
  return "/"
}

export function useRouter() {
  return {
    push: () => {},
    replace: () => {},
    back: () => {},
    forward: () => {},
  }
}

export const Link = ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => {
  const React = require("react")
  return React.createElement("a", { href, ...props }, children)
}

export function redirect() {}
