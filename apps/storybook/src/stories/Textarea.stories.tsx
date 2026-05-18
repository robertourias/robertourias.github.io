import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@nico.dev/ui";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "error"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Type your message here..." },
};

export const Error: Story = {
  args: { placeholder: "Type your message here...", variant: "error" },
};

export const Disabled: Story = {
  args: { placeholder: "Disabled textarea", disabled: true },
};

export const WithRows: Story = {
  args: { placeholder: "Tall textarea...", rows: 8 },
};
