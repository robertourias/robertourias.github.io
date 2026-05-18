import type { Meta, StoryObj } from "@storybook/react"

const Placeholder = () => (
  <div style={{ padding: 32, fontFamily: "sans-serif" }}>
    <h1>Storybook — nico.dev</h1>
    <p>Scaffold OK. Stories serão adicionadas nas próximas tarefas.</p>
  </div>
)

const meta: Meta<typeof Placeholder> = {
  title: "Setup/Placeholder",
  component: Placeholder,
}
export default meta

type Story = StoryObj<typeof Placeholder>
export const Default: Story = {}
