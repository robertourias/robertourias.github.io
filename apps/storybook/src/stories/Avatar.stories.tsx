import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage, AvatarWithStatus, AvatarGroup } from "@nico.dev/ui";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarFallback size="lg">RU</AvatarFallback>
    </Avatar>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="sm"><AvatarFallback size="sm">JD</AvatarFallback></Avatar>
      <Avatar size="md"><AvatarFallback size="md">AB</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback size="lg">RU</AvatarFallback></Avatar>
      <Avatar size="xl"><AvatarFallback size="xl">NI</AvatarFallback></Avatar>
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
      <AvatarFallback size="lg">SC</AvatarFallback>
    </Avatar>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <AvatarWithStatus fallback="RU" status="online" />
      <AvatarWithStatus fallback="AB" status="away" />
      <AvatarWithStatus fallback="JD" status="offline" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup
      items={[
        { fallback: "RU" },
        { fallback: "AB" },
        { fallback: "JD" },
        { fallback: "MK" },
        { fallback: "TS" },
        { fallback: "PL" },
      ]}
      max={3}
    />
  ),
};
