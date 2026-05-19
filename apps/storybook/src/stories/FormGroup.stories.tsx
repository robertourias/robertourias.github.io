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

export const Mobile: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <FormGroup label="Full name" htmlFor="m-name" required>
        <Input id="m-name" placeholder="Roberto Nicoletti" />
      </FormGroup>
      <FormGroup label="Email address" htmlFor="m-email" required>
        <Input id="m-email" type="email" placeholder="you@example.com" />
      </FormGroup>
      <FormGroup label="Message" htmlFor="m-msg" hint="Max 500 characters.">
        <Textarea id="m-msg" placeholder="Type your message here..." />
      </FormGroup>
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: "mobile375" },
    layout: "fullscreen",
  },
};

export const Desktop: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-8 max-w-2xl">
      <FormGroup label="First name" htmlFor="d-fname" required>
        <Input id="d-fname" placeholder="Roberto" />
      </FormGroup>
      <FormGroup label="Last name" htmlFor="d-lname" required>
        <Input id="d-lname" placeholder="Nicoletti" />
      </FormGroup>
      <div className="col-span-2">
        <FormGroup label="Email address" htmlFor="d-email" required>
          <Input id="d-email" type="email" placeholder="you@example.com" />
        </FormGroup>
      </div>
      <div className="col-span-2">
        <FormGroup label="Message" htmlFor="d-msg">
          <Textarea id="d-msg" placeholder="Type your message here..." />
        </FormGroup>
      </div>
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: "desktop" },
    layout: "fullscreen",
  },
};
