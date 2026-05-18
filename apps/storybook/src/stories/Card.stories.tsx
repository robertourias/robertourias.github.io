import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
} from "@nico.dev/ui";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">
          Card content area. Place your main content here.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>Last updated 3 hours ago</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">
          This project is currently in active development with 3 contributors.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">View details</Button>
        <Button size="sm" variant="outline">Share</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>API Usage</CardTitle>
          <Badge variant="success">Live</Badge>
        </div>
        <CardDescription>Current billing period</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-foreground">12,450</p>
        <p className="text-sm text-muted-foreground">requests this month</p>
      </CardContent>
    </Card>
  ),
};
