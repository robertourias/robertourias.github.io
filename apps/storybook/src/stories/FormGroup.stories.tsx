import type { Meta, StoryObj } from "@storybook/react";
import { FormGroup, Input, Textarea } from "@nico.dev/ui";

const meta = {
  title: "UI/FormGroup",
  component: FormGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { label: "Label" },
} satisfies Meta<typeof FormGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <FormGroup label="Email address" htmlFor="email">
        <Input id="email" type="email" placeholder="you@example.com" />
      </FormGroup>
    </div>
  ),
};

export const WithHint: Story = {
  render: () => (
    <div className="w-72">
      <FormGroup label="Email address" htmlFor="email-hint" hint="We'll never share your email.">
        <Input id="email-hint" type="email" placeholder="you@example.com" />
      </FormGroup>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-72">
      <FormGroup label="Email address" htmlFor="email-err" error="This field is required.">
        <Input id="email-err" type="email" placeholder="you@example.com" variant="error" />
      </FormGroup>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="w-72">
      <FormGroup label="Full name" htmlFor="name" required>
        <Input id="name" placeholder="Roberto Nicoletti" />
      </FormGroup>
    </div>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <div className="w-72">
      <FormGroup label="Message" htmlFor="msg" hint="Max 500 characters.">
        <Textarea id="msg" placeholder="Type your message here..." />
      </FormGroup>
    </div>
  ),
};
