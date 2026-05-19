import type { Meta, StoryObj } from "@storybook/react";
import { spacing } from "@nico.dev/ui/tokens";

const meta = {
  title: "Tokens/Spacing",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const highlighted = [1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

function SpacingShowcase() {
  const entries = Object.entries(spacing).filter(([key]) =>
    highlighted.map(String).includes(key)
  ) as [string, string][];

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Spacing</h1>
        <p className="text-sm text-muted-foreground">
          Grid base de 4px. Definido em{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">tokens/spacing.ts</code>.
          Use sempre múltiplos da escala Tailwind (
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">p-4</code>,{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">gap-2</code>, etc.).
        </p>
      </div>

      <div className="space-y-2">
        {entries.map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <div className="w-16 shrink-0 text-right">
              <span className="text-xs font-mono text-muted-foreground">spacing-{key}</span>
            </div>
            <div
              className="h-6 rounded-sm bg-primary/80 shrink-0"
              style={{ width: value }}
            />
            <span className="text-xs text-muted-foreground">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Gap visual
        </h2>
        <div className="flex flex-wrap gap-2">
          {entries.map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col items-center gap-1"
              title={`spacing-${key}: ${value}`}
            >
              <div
                className="bg-primary/20 border border-primary/40 rounded"
                style={{ width: value, height: value, minWidth: "4px", minHeight: "4px" }}
              />
              <span className="text-[9px] font-mono text-muted-foreground">{key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <SpacingShowcase />,
};
