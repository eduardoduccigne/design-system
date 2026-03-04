import type { Meta, StoryObj } from "@storybook/react"
import { CampaignWizardV2 } from "../src/components/campaigns-v2/CampaignWizardV2"

const meta: Meta<typeof CampaignWizardV2> = {
  title: "Campaigns V2/Campaign Wizard",
  component: CampaignWizardV2,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof CampaignWizardV2>

export const Default: Story = {
  render: () => <CampaignWizardV2 />,
}
