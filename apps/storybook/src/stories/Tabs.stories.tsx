import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@nico.dev/ui";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pill: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-80">
      <TabsList variant="pill">
        <TabsTrigger variant="pill" value="overview">Overview</TabsTrigger>
        <TabsTrigger variant="pill" value="analytics">Analytics</TabsTrigger>
        <TabsTrigger variant="pill" value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-muted-foreground">Overview content.</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p className="text-sm text-muted-foreground">Analytics content.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground">Settings content.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-80">
      <TabsList variant="underline">
        <div className="flex w-full">
          <TabsTrigger variant="underline" value="overview">Overview</TabsTrigger>
          <TabsTrigger variant="underline" value="analytics">Analytics</TabsTrigger>
          <TabsTrigger variant="underline" value="settings">Settings</TabsTrigger>
          <TabsTrigger variant="underline" value="team">Team</TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-muted-foreground">Overview content.</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p className="text-sm text-muted-foreground">Analytics content.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground">Settings content.</p>
      </TabsContent>
      <TabsContent value="team">
        <p className="text-sm text-muted-foreground">Team content.</p>
      </TabsContent>
    </Tabs>
  ),
};
