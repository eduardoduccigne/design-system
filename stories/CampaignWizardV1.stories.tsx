import type { Meta, StoryObj } from "@storybook/react"
import { CampaignWizardV1 } from "../src/components/campaigns-v1/CampaignWizardV1"

const meta: Meta<typeof CampaignWizardV1> = {
  title: "Campaigns V1/Campaign Wizard",
  component: CampaignWizardV1,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof CampaignWizardV1>

export const Default: Story = {
  render: () => <CampaignWizardV1 />,
}
