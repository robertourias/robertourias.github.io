import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@nico.dev/ui";

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["line", "line-short", "circle", "card"],
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {
  render: () => <Skeleton variant="line" className="w-48" />,
};

export const LineShort: Story = {
  render: () => <Skeleton variant="line-short" />,
};

export const Circle: Story = {
  render: () => <Skeleton variant="circle" />,
};

export const Card: Story = {
  render: () => <Skeleton variant="card" className="w-72" />,
};

export const ContentPlaceholder: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton variant="line" />
          <Skeleton variant="line-short" />
        </div>
      </div>
      <Skeleton variant="line" />
      <Skeleton variant="line" />
      <Skeleton variant="line-short" />
    </div>
  ),
};
