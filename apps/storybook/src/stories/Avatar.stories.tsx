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

export const GroupMobile: Story = {
  name: "Group — Mobile",
  render: () => (
    <div className="p-4 space-y-4">
      <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wide">
        Participantes do projeto
      </p>
      <AvatarGroup
        size="md"
        items={[
          { fallback: "RU" },
          { fallback: "AB" },
          { fallback: "JD" },
          { fallback: "MK" },
          { fallback: "TS" },
        ]}
        max={4}
      />
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: "mobile375" },
    layout: "fullscreen",
  },
};

export const GroupDesktop: Story = {
  name: "Group — Desktop",
  render: () => (
    <div className="p-8 flex items-center gap-8">
      <div>
        <p className="text-xs text-muted-foreground mb-2">Equipe pequena</p>
        <AvatarGroup
          size="md"
          items={[
            { fallback: "RU" },
            { fallback: "AB" },
            { fallback: "JD" },
          ]}
        />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Equipe grande (max 5)</p>
        <AvatarGroup
          size="lg"
          items={[
            { fallback: "RU" },
            { fallback: "AB" },
            { fallback: "JD" },
            { fallback: "MK" },
            { fallback: "TS" },
            { fallback: "PL" },
            { fallback: "XY" },
          ]}
          max={5}
        />
      </div>
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: "desktop" },
    layout: "fullscreen",
  },
};
