import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../src/components/ui/button"
import { Plus, Trash2, Download } from "lucide-react"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
        "ai",
        "ai-secondary",
        "ai-outline",
        "ai-ghost",
        "ai-link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
  },
}

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
}

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
}

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
}

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
}

export const Link: Story = {
  args: {
    children: "Link",
    variant: "link",
  },
}

export const AI: Story = {
  args: {
    children: "AI Generate",
    variant: "ai",
  },
}

export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
}

export const Large: Story = {
  args: {
    children: "Large",
    size: "lg",
  },
}

export const Icon: Story = {
  args: {
    size: "icon",
    children: <Plus className="h-4 w-4" />,
  },
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add item
      </Button>
      <Button variant="destructive">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="ai">AI</Button>
      <Button variant="ai-secondary">AI Secondary</Button>
      <Button variant="ai-outline">AI Outline</Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
}
