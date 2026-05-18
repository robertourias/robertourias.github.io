import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@nico.dev/ui";

const meta = {
  title: "UI/Label",
  component: Label,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Email address" },
};

export const Required: Story = {
  args: { children: "Email address", required: true },
};

export const WithHtmlFor: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="demo-input">Password</Label>
      <input
        id="demo-input"
        type="password"
        placeholder="••••••••"
        className="h-9 rounded-lg border border-input bg-surface px-3 text-sm"
      />
    </div>
  ),
};
