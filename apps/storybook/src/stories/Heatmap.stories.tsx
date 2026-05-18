import type { Meta, StoryObj } from "@storybook/react";
import { Heatmap } from "@nico.dev/ui";

const generateData = (weeks = 20) => {
  const data = [];
  const now = new Date();
  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(now);
      date.setDate(now.getDate() - w * 7 - (6 - d));
      data.push({
        date: date.toISOString().split("T")[0],
        value: Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 10),
      });
    }
  }
  return data;
};

const meta = {
  title: "UI/Heatmap",
  component: Heatmap,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { data: [] },
} satisfies Meta<typeof Heatmap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Heatmap data={generateData(20)} />,
};

export const FullYear: Story = {
  render: () => <Heatmap data={generateData(53)} title="Yearly Activity" />,
};

export const NoLegend: Story = {
  render: () => <Heatmap data={generateData(16)} showLegend={false} />,
};

export const Empty: Story = {
  render: () => (
    <Heatmap
      data={Array.from({ length: 70 }, (_, i) => ({
        date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
        value: 0,
      }))}
    />
  ),
};
