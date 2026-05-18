import type { Preview } from "@storybook/react";
import "@nico.dev/ui/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background text-foreground p-6">
        <Story />
      </div>
    ),
  ],
};

export default preview;
