import type { Preview } from "@storybook/react"
import "../src/styles.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#FAFAF8" },
        { name: "dark", value: "#0F0F0E" },
      ],
    },
  },
}

export default preview
