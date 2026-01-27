export interface NavItem {
  name: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [
      { name: "Design Tokens", href: "/styleguide" },
    ]
  },
  {
    title: "Forms",
    items: [
      { name: "Button", href: "/styleguide/components/button" },
      { name: "Input", href: "/styleguide/components/input" },
      { name: "Textarea", href: "/styleguide/components/textarea" },
      { name: "Select", href: "/styleguide/components/select" },
      { name: "Checkbox", href: "/styleguide/components/checkbox" },
      { name: "Radio Group", href: "/styleguide/components/radio-group" },
      { name: "Switch", href: "/styleguide/components/switch" },
      { name: "Slider", href: "/styleguide/components/slider" },
      { name: "Toggle", href: "/styleguide/components/toggle" },
      { name: "Toggle Group", href: "/styleguide/components/toggle-group" },
      { name: "Label", href: "/styleguide/components/label" },
      { name: "Form", href: "/styleguide/components/form" },
      { name: "Input OTP", href: "/styleguide/components/input-otp" },
      { name: "File Upload", href: "/styleguide/components/file-upload" },
    ]
  },
  {
    title: "Layout",
    items: [
      { name: "Card", href: "/styleguide/components/card" },
      { name: "Separator", href: "/styleguide/components/separator" },
      { name: "Tabs", href: "/styleguide/components/tabs" },
      { name: "Accordion", href: "/styleguide/components/accordion" },
      { name: "Collapsible", href: "/styleguide/components/collapsible" },
      { name: "Aspect Ratio", href: "/styleguide/components/aspect-ratio" },
      { name: "Scroll Area", href: "/styleguide/components/scroll-area" },
      { name: "Resizable", href: "/styleguide/components/resizable" },
    ]
  },
  {
    title: "Feedback",
    items: [
      { name: "Alert", href: "/styleguide/components/alert" },
      { name: "Badge", href: "/styleguide/components/badge" },
      { name: "Progress", href: "/styleguide/components/progress" },
      { name: "Skeleton", href: "/styleguide/components/skeleton" },
      { name: "Sonner (Toast)", href: "/styleguide/components/sonner" },
    ]
  },
  {
    title: "Overlay",
    items: [
      { name: "Dialog", href: "/styleguide/components/dialog" },
      { name: "Modal", href: "/styleguide/components/modal" },
      { name: "Alert Dialog", href: "/styleguide/components/alert-dialog" },
      { name: "Drawer", href: "/styleguide/components/drawer" },
      { name: "Sheet", href: "/styleguide/components/sheet" },
      { name: "Popover", href: "/styleguide/components/popover" },
      { name: "Tooltip", href: "/styleguide/components/tooltip" },
      { name: "Hover Card", href: "/styleguide/components/hover-card" },
      { name: "Dropdown Menu", href: "/styleguide/components/dropdown-menu" },
      { name: "Context Menu", href: "/styleguide/components/context-menu" },
    ]
  },
  {
    title: "Navigation",
    items: [
      { name: "Breadcrumb", href: "/styleguide/components/breadcrumb" },
      { name: "Pagination", href: "/styleguide/components/pagination" },
      { name: "Command", href: "/styleguide/components/command" },
    ]
  },
  {
    title: "Data Display",
    items: [
      { name: "Table", href: "/styleguide/components/table" },
      { name: "Avatar", href: "/styleguide/components/avatar" },
      { name: "Tag", href: "/styleguide/components/tag" },
      { name: "Calendar", href: "/styleguide/components/calendar" },
      { name: "Carousel", href: "/styleguide/components/carousel" },
    ]
  }
]
