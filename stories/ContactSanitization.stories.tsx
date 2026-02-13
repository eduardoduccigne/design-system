import type { Meta, StoryObj } from "@storybook/react"
import { ContactSanitizationTabs } from "../src/components/campaigns-v3/ContactSanitizationTabs"

const meta: Meta<typeof ContactSanitizationTabs> = {
  title: "Campaigns V3/Contact Sanitization",
  component: ContactSanitizationTabs,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof ContactSanitizationTabs>

export const Default: Story = {
  render: () => <ContactSanitizationTabs />,
}
