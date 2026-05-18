import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@nico.dev/ui";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "destructive", "warning"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Badge", variant: "default" },
};

export const Success: Story = {
  args: { children: "Active", variant: "success" },
};

export const Destructive: Story = {
  args: { children: "Error", variant: "destructive" },
};

export const Warning: Story = {
  args: { children: "Pending", variant: "warning" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="warning">Pending</Badge>
    </div>
  ),
};
