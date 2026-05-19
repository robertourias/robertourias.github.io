import type { Meta, StoryObj } from "@storybook/react";
import { fontSize, fontFamily, fontWeight } from "@nico.dev/ui/tokens";

const meta = {
  title: "Tokens/Typography",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const fontSizeEntries = Object.entries(fontSize) as [
  string,
  [string, { lineHeight: string }]
][];

const pxMap: Record<string, string> = {
  xs: "11px",
  sm: "12px",
  base: "14px",
  lg: "16px",
  xl: "18px",
  "2xl": "20px",
  "3xl": "24px",
  "4xl": "30px",
};

function TypeScale({ family, label }: { family: string; label: string }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </h2>
      <div className="space-y-5">
        {fontSizeEntries.map(([key, [size, { lineHeight }]]) => (
          <div key={key} className="flex items-baseline gap-6">
            <div className="w-20 shrink-0 text-right">
              <p className="text-xs text-muted-foreground font-mono">{key}</p>
              <p className="text-[10px] text-muted-foreground/70">{pxMap[key]}</p>
            </div>
            <p
              style={{ fontFamily: family, fontSize: size, lineHeight }}
              className="text-foreground leading-none"
            >
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FontWeightScale({ family, label }: { family: string; label: string }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} — Weights
      </h2>
      <div className="space-y-3">
        {Object.entries(fontWeight).map(([name, weight]) => (
          <div key={name} className="flex items-center gap-6">
            <div className="w-20 shrink-0 text-right">
              <p className="text-xs text-muted-foreground font-mono">{name}</p>
              <p className="text-[10px] text-muted-foreground/70">{weight}</p>
            </div>
            <p
              style={{ fontFamily: family, fontWeight: weight, fontSize: "1rem" }}
              className="text-foreground"
            >
              Inter — {name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TypographyShowcase() {
  return (
    <div className="p-8 space-y-14 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Typography</h1>
        <p className="text-sm text-muted-foreground">
          Escala tipográfica definida em{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">tokens/typography.ts</code>.
        </p>
      </div>

      <TypeScale family={fontFamily.sans} label="Inter (font-sans) — Scale" />
      <FontWeightScale family={fontFamily.sans} label="Inter (font-sans)" />

      <TypeScale family={fontFamily.mono} label="JetBrains Mono (font-mono) — Scale" />
    </div>
  );
}

export const Default: Story = {
  render: () => <TypographyShowcase />,
};
