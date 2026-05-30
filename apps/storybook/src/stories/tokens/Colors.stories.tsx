import type { Meta, StoryObj } from "@storybook/react";
import { light, dark } from "@nico.dev/ui/tokens";

const meta = {
  title: "Tokens/Colors",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type ColorEntry = { token: string; value: string };

const groups: { label: string; tokens: ColorEntry[] }[] = [
  {
    label: "Background & Foreground",
    tokens: [
      { token: "background", value: light.background },
      { token: "foreground", value: light.foreground },
    ],
  },
  {
    label: "Surface",
    tokens: [
      { token: "surface", value: light.surface },
      { token: "surface-raised", value: light["surface-raised"] },
      { token: "surface-overlay", value: light["surface-overlay"] },
    ],
  },
  {
    label: "Primary",
    tokens: [
      { token: "primary", value: light.primary },
      { token: "primary-foreground", value: light["primary-foreground"] },
      { token: "primary-hover", value: light["primary-hover"] },
    ],
  },
  {
    label: "Secondary",
    tokens: [
      { token: "secondary", value: light.secondary },
      { token: "secondary-foreground", value: light["secondary-foreground"] },
    ],
  },
  {
    label: "Muted",
    tokens: [
      { token: "muted", value: light.muted },
      { token: "muted-foreground", value: light["muted-foreground"] },
    ],
  },
  {
    label: "Accent",
    tokens: [
      { token: "accent", value: light.accent },
      { token: "accent-foreground", value: light["accent-foreground"] },
    ],
  },
  {
    label: "Status",
    tokens: [
      { token: "destructive", value: light.destructive },
      { token: "destructive-foreground", value: light["destructive-foreground"] },
      { token: "success", value: light.success },
      { token: "success-foreground", value: light["success-foreground"] },
      { token: "warning", value: light.warning },
      { token: "warning-foreground", value: light["warning-foreground"] },
    ],
  },
  {
    label: "Border & Ring",
    tokens: [
      { token: "border", value: light.border },
      { token: "input", value: light.input },
      { token: "ring", value: light.ring },
    ],
  },
  {
    label: "Badge Backgrounds",
    tokens: [
      { token: "badge-destructive-bg", value: light["badge-destructive-bg"] },
      { token: "badge-success-bg", value: light["badge-success-bg"] },
      { token: "badge-warning-bg", value: light["badge-warning-bg"] },
    ],
  },
];

function ColorSwatch({ token, value }: ColorEntry) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 shrink-0 rounded-md border border-border shadow-sm"
        style={{ backgroundColor: `var(--${token})` }}
      />
      <div>
        <p className="text-sm font-medium text-foreground">--{token}</p>
        <p className="text-xs text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

function ColorDarkSwatch({ token }: { token: string }) {
  const darkValue = dark[token as keyof typeof dark];
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 shrink-0 rounded-md border border-[#262850] shadow-sm"
        style={{ backgroundColor: darkValue }}
      />
      <div>
        <p className="text-sm font-medium text-[#E6E7F4]">--{token}</p>
        <p className="text-xs text-[#8A8CB0]">{darkValue}</p>
      </div>
    </div>
  );
}

function ColorShowcase() {
  return (
    <div className="p-8 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Color Tokens</h1>
        <p className="text-sm text-muted-foreground">
          Variáveis CSS semânticas definidas em{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">globals.css</code>.
          Use o toggle de tema na toolbar para ver light vs dark.
        </p>
      </div>

      {groups.map((group) => (
        <section key={group.label}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            {group.label}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.tokens.map((entry) => (
              <ColorSwatch key={entry.token} {...entry} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ColorShowcaseSideBySide() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-[#F8F9FF] p-8 space-y-10">
        <div>
          <h2 className="text-lg font-bold text-[#252742] mb-1">Light Mode</h2>
        </div>
        {groups.map((group) => (
          <section key={group.label}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5A5C82] mb-4">
              {group.label}
            </h3>
            <div className="space-y-3">
              {group.tokens.map((entry) => (
                <ColorSwatch key={entry.token} {...entry} />
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="flex-1 bg-[#12131F] p-8 space-y-10">
        <div>
          <h2 className="text-lg font-bold text-[#E6E7F4] mb-1">Dark Mode</h2>
        </div>
        {groups.map((group) => (
          <section key={group.label}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A8CB0] mb-4">
              {group.label}
            </h3>
            <div className="space-y-3">
              {group.tokens.map((entry) => (
                <ColorDarkSwatch key={entry.token} token={entry.token} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <ColorShowcase />,
  name: "Por modo (toolbar)",
};

export const SideBySide: Story = {
  render: () => <ColorShowcaseSideBySide />,
  name: "Light & Dark lado a lado",
  parameters: { layout: "fullscreen" },
};
