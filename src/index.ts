// Utilities
export { cn } from "./lib/utils"

// Hooks
export { useIsMobile } from "./hooks/use-mobile"

// Components

// Accordion
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/ui/accordion"

// Alert
export { Alert, AlertTitle, AlertDescription } from "./components/ui/alert"

// Alert Dialog
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./components/ui/alert-dialog"

// Aspect Ratio
export { AspectRatio } from "./components/ui/aspect-ratio"

// Avatar
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  avatarFallbackVariants,
} from "./components/ui/avatar"
export type { AvatarFallbackProps } from "./components/ui/avatar"

// Badge
export { Badge, badgeVariants } from "./components/ui/badge"
export type { BadgeProps } from "./components/ui/badge"

// Breadcrumb
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./components/ui/breadcrumb"

// Button
export { Button, buttonVariants } from "./components/ui/button"
export type { ButtonProps } from "./components/ui/button"

// Calendar
export { Calendar, CalendarDayButton } from "./components/ui/calendar"

// Card
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./components/ui/card"

// Carousel
export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./components/ui/carousel"

// Chart
export type { ChartConfig } from "./components/ui/chart"
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from "./components/ui/chart"

// Chat Audio
export {
  ChatAudio,
  chatAudioVariants,
  formatDuration,
} from "./components/ui/chat-audio"
export type { ChatAudioProps } from "./components/ui/chat-audio"

// Chat Bubble
export {
  ChatBubble,
  ChatBubbleGroup,
  ChatBubbleTime,
  DateSeparator,
  SystemMessage,
  chatBubbleVariants,
} from "./components/ui/chat-bubble"
export type {
  ChatBubbleProps,
  ChatBubbleGroupProps,
  ChatBubbleTimeProps,
  DateSeparatorProps,
  SystemMessageProps,
} from "./components/ui/chat-bubble"

// Chat File
export {
  ChatFile,
  chatFileVariants,
  formatFileSize,
  getFileIcon,
} from "./components/ui/chat-file"
export type { ChatFileProps } from "./components/ui/chat-file"

// Chat Image
export { ChatImage, chatImageVariants } from "./components/ui/chat-image"
export type { ChatImageProps } from "./components/ui/chat-image"

// Chat Transcription
export {
  ChatTranscription,
  chatTranscriptionVariants,
} from "./components/ui/chat-transcription"
export type { ChatTranscriptionProps } from "./components/ui/chat-transcription"

// Checkbox
export { Checkbox } from "./components/ui/checkbox"

// Collapsible
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./components/ui/collapsible"

// Command
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./components/ui/command"

// Context Menu
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "./components/ui/context-menu"

// Conversation Item
export {
  ConversationItem,
  ConversationItemAvatar,
  ConversationItemContent,
  ConversationItemHeader,
  ConversationItemName,
  ConversationItemMeta,
  ConversationItemPreview,
  ConversationItemTags,
  ConversationList,
  UnreadBadge,
  conversationItemVariants,
  avatarVariants,
} from "./components/ui/conversation-item"
export type {
  ConversationItemProps,
  ConversationItemAvatarProps,
  ConversationItemContentProps,
  ConversationItemHeaderProps,
  ConversationItemNameProps,
  ConversationItemMetaProps,
  ConversationItemPreviewProps,
  ConversationItemTagsProps,
  UnreadBadgeProps,
  ConversationListProps,
} from "./components/ui/conversation-item"

// Count Badge
export { CountBadge } from "./components/ui/count-badge"
export type { CountBadgeProps } from "./components/ui/count-badge"

// Dialog
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
  dialogContentVariants,
} from "./components/ui/dialog"
export type { DialogContentProps } from "./components/ui/dialog"

// Drawer
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "./components/ui/drawer"

// Dropdown Menu
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./components/ui/dropdown-menu"

// File Upload
export {
  FileUpload,
  fileUploadVariants,
  HEALTH_FILE_PRESETS,
} from "./components/ui/file-upload"
export type {
  FileUploadStatus,
  UploadedFile,
  FileUploadProps,
} from "./components/ui/file-upload"

// Form
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "./components/ui/form"

// Hover Card
export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "./components/ui/hover-card"

// Input
export { Input } from "./components/ui/input"

// Input OTP
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./components/ui/input-otp"

// Label
export { Label } from "./components/ui/label"

// Menubar
export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
} from "./components/ui/menubar"

// Multi Select (standalone)
export {
  MultiSelect as MultiSelectStandalone,
} from "./components/ui/multi-select"
export type {
  MultiSelectOption,
  MultiSelectProps as MultiSelectStandaloneProps,
} from "./components/ui/multi-select"

// Navigation Menu
export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "./components/ui/navigation-menu"

// Pagination
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination"

// Popover
export { Popover, PopoverTrigger, PopoverContent } from "./components/ui/popover"

// Progress
export { Progress } from "./components/ui/progress"

// Queue Item
export {
  QueueItem,
  QueueList,
  queueItemVariants,
  dotVariants,
} from "./components/ui/queue-item"
export type { QueueItemProps, QueueListProps } from "./components/ui/queue-item"

// Quick Reply
export { QuickReply, QuickReplyGroup } from "./components/ui/quick-reply"
export type {
  QuickReplyProps,
  QuickReplyGroupProps,
} from "./components/ui/quick-reply"

// Radio Group
export { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"

// Resizable
export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./components/ui/resizable"

// Scroll Area
export { ScrollArea, ScrollBar } from "./components/ui/scroll-area"

// Select (includes compound MultiSelect)
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectLabel,
  MultiSelectItem,
} from "./components/ui/select"

// Separator
export { Separator } from "./components/ui/separator"

// Sheet
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./components/ui/sheet"

// Sidebar
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./components/ui/sidebar"

// Skeleton
export { Skeleton } from "./components/ui/skeleton"

// SLA Badge
export { SLABadge, slaBadgeVariants } from "./components/ui/sla-badge"
export type { SLABadgeProps } from "./components/ui/sla-badge"

// Slider
export { Slider } from "./components/ui/slider"

// Sonner (Toast)
export { Toaster } from "./components/ui/sonner"

// Switch
export { Switch } from "./components/ui/switch"

// Table
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./components/ui/table"

// Tabs
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs"

// Tag
export {
  Tag,
  CareLineTag,
  CustomTag,
  FixedTag,
  tagVariants,
} from "./components/ui/tag"
export type {
  TagProps,
  CareLineTagProps,
  CustomTagProps,
  FixedTagProps,
} from "./components/ui/tag"

// Textarea
export { Textarea } from "./components/ui/textarea"

// Toggle
export { Toggle, toggleVariants } from "./components/ui/toggle"

// Toggle Group
export { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group"

// Tooltip
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./components/ui/tooltip"

// Typing Indicator
export { TypingIndicator } from "./components/ui/typing-indicator"
export type { TypingIndicatorProps } from "./components/ui/typing-indicator"

// Modals (pre-built)
export {
  ConfirmationModal,
  type ConfirmationModalProps,
  FormModal,
  type FormModalProps,
  FilterModal,
  FilterSection,
  type FilterModalProps,
  type FilterSectionProps,
  ListModal,
  type ListModalProps,
  type ListModalItem,
} from "./components/ui/modal"
