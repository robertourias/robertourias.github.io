import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@nico.dev/ui";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "error"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "you@example.com", type: "email" },
};

export const Error: Story = {
  args: { placeholder: "you@example.com", variant: "error", type: "email" },
};

export const Disabled: Story = {
  args: { placeholder: "Disabled input", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <Input placeholder="Default input" />
      <Input placeholder="Error state" variant="error" />
      <Input placeholder="Disabled" disabled />
    </div>
  ),
};
