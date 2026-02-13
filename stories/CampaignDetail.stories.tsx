import type { Meta, StoryObj } from "@storybook/react"
import { CampaignDetailView } from "../src/components/campaigns-v3/CampaignDetailView"

const meta: Meta<typeof CampaignDetailView> = {
  title: "Campaigns V3/Campaign Detail",
  component: CampaignDetailView,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof CampaignDetailView>

export const Default: Story = {
  render: () => <CampaignDetailView />,
}
