import type { StorybookConfig } from "@storybook/react-vite"
import path from "path"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "storybook-dark-mode",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite")
    const { default: tailwindcss } = await import("@tailwindcss/vite")

    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../../web-nico.dev.br/src"),
          "next/image": path.resolve(__dirname, "../src/__mocks__/next-image"),
          "next/navigation": path.resolve(__dirname, "../src/__mocks__/next-navigation"),
          "next/font/google": path.resolve(__dirname, "../src/__mocks__/next-font"),
          "@/i18n/navigation": path.resolve(__dirname, "../src/__mocks__/i18n-navigation"),
        },
      },
    })
  },
}

export default config
