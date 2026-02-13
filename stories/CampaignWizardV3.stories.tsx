import type { Meta, StoryObj } from "@storybook/react"
import { CampaignWizardV3 } from "../src/components/campaigns-v3/CampaignWizardV3"

const meta: Meta<typeof CampaignWizardV3> = {
  title: "Campaigns V3/Campaign Wizard",
  component: CampaignWizardV3,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof CampaignWizardV3>

export const Default: Story = {
  render: () => <CampaignWizardV3 />,
}
