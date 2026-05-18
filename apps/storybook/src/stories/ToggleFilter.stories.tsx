import type { Meta, StoryObj } from "@storybook/react";
import { ToggleFilter, ToggleFilterGroup } from "@nico.dev/ui";

const meta = {
  title: "UI/ToggleFilter",
  component: ToggleFilter,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToggleFilterGroup defaultValue="all">
      <ToggleFilter value="all">All</ToggleFilter>
      <ToggleFilter value="active">Active</ToggleFilter>
      <ToggleFilter value="pending">Pending</ToggleFilter>
      <ToggleFilter value="archived">Archived</ToggleFilter>
    </ToggleFilterGroup>
  ),
};

export const Standalone: Story = {
  render: () => (
    <div className="flex gap-2">
      <ToggleFilter active>Active item</ToggleFilter>
      <ToggleFilter>Inactive item</ToggleFilter>
    </div>
  ),
};
