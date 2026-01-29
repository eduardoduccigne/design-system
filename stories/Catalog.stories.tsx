import type { Meta } from "@storybook/react"
import React from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

// ─── Form Controls ──────────────────────────────────────────────────────────
import { Button } from "../src/components/ui/button"
import { Input } from "../src/components/ui/input"
import { Textarea } from "../src/components/ui/textarea"
import { Checkbox } from "../src/components/ui/checkbox"
import { Switch } from "../src/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "../src/components/ui/radio-group"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectItem,
} from "../src/components/ui/select"
import { Label } from "../src/components/ui/label"
import { Slider } from "../src/components/ui/slider"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "../src/components/ui/input-otp"
import { FileUpload } from "../src/components/ui/file-upload"

// ─── Layout ─────────────────────────────────────────────────────────────────
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../src/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../src/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../src/components/ui/tabs"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../src/components/ui/accordion"
import { Separator } from "../src/components/ui/separator"
import { ScrollArea } from "../src/components/ui/scroll-area"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../src/components/ui/resizable"
import { AspectRatio } from "../src/components/ui/aspect-ratio"

// ─── Feedback ───────────────────────────────────────────────────────────────
import { Alert, AlertTitle, AlertDescription } from "../src/components/ui/alert"
import { Badge } from "../src/components/ui/badge"
import { Tag, CareLineTag, CustomTag, FixedTag } from "../src/components/ui/tag"
import { Progress } from "../src/components/ui/progress"
import { Skeleton } from "../src/components/ui/skeleton"
import { CountBadge } from "../src/components/ui/count-badge"
import { SLABadge } from "../src/components/ui/sla-badge"
import { TypingIndicator } from "../src/components/ui/typing-indicator"

// ─── Overlays ───────────────────────────────────────────────────────────────
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogBody,
} from "../src/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "../src/components/ui/alert-dialog"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../src/components/ui/sheet"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "../src/components/ui/drawer"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../src/components/ui/popover"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../src/components/ui/hover-card"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../src/components/ui/tooltip"

// ─── Navigation ─────────────────────────────────────────────────────────────
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../src/components/ui/breadcrumb"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../src/components/ui/pagination"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../src/components/ui/navigation-menu"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "../src/components/ui/menubar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../src/components/ui/dropdown-menu"
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "../src/components/ui/context-menu"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../src/components/ui/command"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarHeader,
} from "../src/components/ui/sidebar"

// ─── Data Display ───────────────────────────────────────────────────────────
import { Avatar, AvatarImage, AvatarFallback } from "../src/components/ui/avatar"
import { Calendar } from "../src/components/ui/calendar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../src/components/ui/carousel"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../src/components/ui/collapsible"
import { Toggle } from "../src/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "../src/components/ui/toggle-group"

// ─── Chat ───────────────────────────────────────────────────────────────────
import {
  ChatBubble,
  ChatBubbleGroup,
  ChatBubbleTime,
  DateSeparator,
  SystemMessage,
} from "../src/components/ui/chat-bubble"
import { ChatAudio } from "../src/components/ui/chat-audio"
import { ChatFile } from "../src/components/ui/chat-file"
import { ChatImage } from "../src/components/ui/chat-image"
import { ChatTranscription } from "../src/components/ui/chat-transcription"
import {
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
} from "../src/components/ui/conversation-item"
import { QueueItem, QueueList } from "../src/components/ui/queue-item"
import { QuickReply, QuickReplyGroup } from "../src/components/ui/quick-reply"

// ─── Missing: Chart, Form, MultiSelect (standalone), Sonner ────────────────
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../src/components/ui/chart"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../src/components/ui/form"
import { MultiSelect as MultiSelectStandalone } from "../src/components/ui/multi-select"
import { Toaster } from "../src/components/ui/sonner"

// ─── Modals ─────────────────────────────────────────────────────────────────
import {
  ConfirmationModal,
  FormModal,
  FilterModal,
  FilterSection,
  ListModal,
} from "../src/components/ui/modal"

// ─── Icons ──────────────────────────────────────────────────────────────────
import {
  Plus,
  Trash2,
  Download,
  Search,
  Settings,
  User,
  Mail,
  Phone,
  Bell,
  Heart,
  Star,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Home,
  Calendar as CalendarIcon,
  FileText,
  BarChart3,
  MessageSquare,
  ChevronsUpDown,
  Sparkles,
} from "lucide-react"

// ─── Meta ───────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Catalog",
}

export default meta

// ─── Helpers ────────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-foreground border-b border-border pb-2 mb-6">
      {children}
    </h2>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        {title}
      </h3>
      {children}
    </div>
  )
}

// =============================================================================
// 1. FORM CONTROLS
// =============================================================================

export const FormControls = {
  render: () => (
    <div className="space-y-12 p-6 max-w-4xl">
      <SectionTitle>Form Controls</SectionTitle>

      {/* Button - All Variants */}
      <SubSection title="Button - Variants">
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="ai">AI Generate</Button>
          <Button variant="ai-secondary">AI Secondary</Button>
          <Button variant="ai-outline">AI Outline</Button>
          <Button variant="ai-ghost">AI Ghost</Button>
          <Button variant="ai-link">AI Link</Button>
        </div>
      </SubSection>

      <SubSection title="Button - Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Plus className="h-4 w-4" /></Button>
        </div>
      </SubSection>

      <SubSection title="Button - With Icons">
        <div className="flex flex-wrap gap-3">
          <Button><Plus className="h-4 w-4" /> Add Patient</Button>
          <Button variant="destructive"><Trash2 className="h-4 w-4" /> Delete</Button>
          <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
          <Button disabled>Disabled</Button>
        </div>
      </SubSection>

      {/* Input */}
      <SubSection title="Input">
        <div className="grid grid-cols-2 gap-4 max-w-lg">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Maria Silva" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="maria@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled-input">Disabled</Label>
            <Input id="disabled-input" disabled placeholder="Disabled input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="search-input">Search</Label>
            <Input id="search-input" type="search" placeholder="Search patients..." />
          </div>
        </div>
      </SubSection>

      {/* Textarea */}
      <SubSection title="Textarea">
        <div className="max-w-lg space-y-2">
          <Label htmlFor="notes">Clinical Notes</Label>
          <Textarea
            id="notes"
            placeholder="Enter clinical observations..."
            rows={4}
          />
        </div>
      </SubSection>

      {/* Checkbox */}
      <SubSection title="Checkbox">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="newsletter" defaultChecked />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="disabled-check" disabled />
            <Label htmlFor="disabled-check" className="opacity-50">Disabled checkbox</Label>
          </div>
        </div>
      </SubSection>

      {/* Switch */}
      <SubSection title="Switch">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch id="notifications" />
            <Label htmlFor="notifications">Enable notifications</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="ai-mode" variant="ai" defaultChecked />
            <Label htmlFor="ai-mode">AI-assisted mode</Label>
          </div>
        </div>
      </SubSection>

      {/* RadioGroup */}
      <SubSection title="RadioGroup">
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-1" id="r1" />
            <Label htmlFor="r1">In-person consultation</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-2" id="r2" />
            <Label htmlFor="r2">Video consultation</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-3" id="r3" />
            <Label htmlFor="r3">Phone consultation</Label>
          </div>
        </RadioGroup>
      </SubSection>

      {/* Select */}
      <SubSection title="Select">
        <div className="max-w-xs">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a care line" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="psychiatry">Psychiatry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SubSection>

      {/* MultiSelect */}
      <SubSection title="MultiSelect">
        <div className="max-w-xs">
          <MultiSelect>
            <MultiSelectTrigger>
              <MultiSelectValue placeholder="Select specialties" />
            </MultiSelectTrigger>
            <MultiSelectContent>
              <MultiSelectItem value="cardiology">Cardiology</MultiSelectItem>
              <MultiSelectItem value="neurology">Neurology</MultiSelectItem>
              <MultiSelectItem value="orthopedics">Orthopedics</MultiSelectItem>
              <MultiSelectItem value="pediatrics">Pediatrics</MultiSelectItem>
            </MultiSelectContent>
          </MultiSelect>
        </div>
      </SubSection>

      {/* Label */}
      <SubSection title="Label">
        <div className="flex gap-4">
          <Label>Default Label</Label>
          <Label className="text-destructive">Required Label *</Label>
        </div>
      </SubSection>

      {/* Slider */}
      <SubSection title="Slider">
        <div className="max-w-sm space-y-4">
          <div className="space-y-2">
            <Label>Pain Scale (0-10)</Label>
            <Slider defaultValue={[3]} max={10} step={1} />
          </div>
          <div className="space-y-2">
            <Label>Range Selection</Label>
            <Slider defaultValue={[25, 75]} max={100} step={5} />
          </div>
        </div>
      </SubSection>

      {/* InputOTP */}
      <SubSection title="Input OTP">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </SubSection>

      {/* FileUpload */}
      <SubSection title="File Upload">
        <div className="max-w-md">
          <FileUpload
            onFilesSelected={(files) => console.log("Files selected:", files)}
          />
        </div>
      </SubSection>
    </div>
  ),
}

// =============================================================================
// 2. LAYOUT
// =============================================================================

export const Layout = {
  render: () => (
    <div className="space-y-12 p-6 max-w-4xl">
      <SectionTitle>Layout</SectionTitle>

      {/* Card */}
      <SubSection title="Card">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Summary</CardTitle>
              <CardDescription>Overview of patient health data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Last visit: January 15, 2026. Blood pressure: 120/80 mmHg.
                Heart rate: 72 bpm. All vitals within normal range.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">View Details</Button>
            </CardFooter>
          </Card>

          <Card interactive>
            <CardHeader>
              <CardTitle>Upcoming Appointment</CardTitle>
              <CardDescription>Next scheduled visit</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Dr. Ana Costa - Cardiology<br />
                February 3, 2026 at 14:00<br />
                Video consultation
              </p>
            </CardContent>
          </Card>
        </div>
      </SubSection>

      {/* Table */}
      <SubSection title="Table">
        <Table>
          <TableCaption>Recent patient appointments</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Maria Silva</TableCell>
              <TableCell>Jan 28, 2026</TableCell>
              <TableCell>Dr. Ana Costa</TableCell>
              <TableCell>Follow-up</TableCell>
              <TableCell className="text-right">
                <Badge variant="success">Completed</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Joao Santos</TableCell>
              <TableCell>Jan 29, 2026</TableCell>
              <TableCell>Dr. Pedro Lima</TableCell>
              <TableCell>Initial</TableCell>
              <TableCell className="text-right">
                <Badge variant="warning">Scheduled</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Ana Oliveira</TableCell>
              <TableCell>Jan 30, 2026</TableCell>
              <TableCell>Dr. Lucas Rocha</TableCell>
              <TableCell>Urgent</TableCell>
              <TableCell className="text-right">
                <Badge variant="destructive">Cancelled</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </SubSection>

      {/* Tabs */}
      <SubSection title="Tabs">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="p-4 border rounded-lg mt-2">
            <p className="text-sm text-muted-foreground">
              Patient overview with key health metrics and recent activity.
            </p>
          </TabsContent>
          <TabsContent value="history" className="p-4 border rounded-lg mt-2">
            <p className="text-sm text-muted-foreground">
              Complete medical history and past consultations.
            </p>
          </TabsContent>
          <TabsContent value="medications" className="p-4 border rounded-lg mt-2">
            <p className="text-sm text-muted-foreground">
              Active prescriptions and medication schedule.
            </p>
          </TabsContent>
          <TabsContent value="lab-results" className="p-4 border rounded-lg mt-2">
            <p className="text-sm text-muted-foreground">
              Recent laboratory test results and trends.
            </p>
          </TabsContent>
        </Tabs>
      </SubSection>

      {/* Accordion */}
      <SubSection title="Accordion">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Patient Demographics</AccordionTrigger>
            <AccordionContent>
              Name: Maria Silva, Age: 45, Gender: Female, Blood Type: O+
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Allergies & Conditions</AccordionTrigger>
            <AccordionContent>
              Allergies: Penicillin, Latex. Conditions: Hypertension (controlled),
              Type 2 Diabetes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Insurance Information</AccordionTrigger>
            <AccordionContent>
              Provider: SulAmerica Saude, Plan: Premium, Member ID: SA-2024-78901
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SubSection>

      {/* Separator */}
      <SubSection title="Separator">
        <div className="space-y-4">
          <div>
            <p className="text-sm">Content above</p>
            <Separator className="my-4" />
            <p className="text-sm">Content below</p>
          </div>
          <div className="flex items-center gap-4 h-6">
            <span className="text-sm">Item 1</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Item 2</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Item 3</span>
          </div>
        </div>
      </SubSection>

      {/* ScrollArea */}
      <SubSection title="ScrollArea">
        <ScrollArea className="h-48 w-full rounded-lg border p-4">
          <div className="space-y-4">
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="text-sm">
                <p className="font-medium">Log Entry #{i + 1}</p>
                <p className="text-muted-foreground">
                  Patient vitals recorded at {9 + i}:00 - All parameters normal.
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SubSection>

      {/* Resizable */}
      <SubSection title="Resizable">
        <ResizablePanelGroup direction="horizontal" className="h-48 rounded-lg border">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="text-sm font-medium">Patient List</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="text-sm font-medium">Patient Details</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </SubSection>

      {/* AspectRatio */}
      <SubSection title="AspectRatio">
        <div className="w-64">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg flex items-center justify-center">
            <span className="text-sm text-muted-foreground">16:9 Aspect Ratio</span>
          </AspectRatio>
        </div>
      </SubSection>
    </div>
  ),
}

// =============================================================================
// 3. FEEDBACK
// =============================================================================

export const Feedback = {
  render: () => (
    <div className="space-y-12 p-6 max-w-4xl">
      <SectionTitle>Feedback</SectionTitle>

      {/* Alert - All Variants */}
      <SubSection title="Alert - All Variants">
        <div className="space-y-3">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>This is a default alert message for general information.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Patient record could not be saved. Please try again.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Appointment confirmed for February 3, 2026.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Drug interaction detected with current medications.</AlertDescription>
          </Alert>
          <Alert variant="info">
            <Info className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>New clinical guidelines are available for review.</AlertDescription>
          </Alert>
        </div>
      </SubSection>

      {/* Badge - All Variants */}
      <SubSection title="Badge - All Variants">
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </SubSection>

      {/* Tag - All Variants */}
      <SubSection title="Tag - All Types">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <FixedTag variant="solid">Solid Tag</FixedTag>
            <FixedTag variant="outline">Outline Tag</FixedTag>
            <FixedTag variant="solid" size="sm">Small</FixedTag>
            <FixedTag variant="solid" size="md">Medium</FixedTag>
            <FixedTag variant="solid" size="lg">Large</FixedTag>
          </div>
          <div className="flex flex-wrap gap-2">
            <CareLineTag>Cardiology</CareLineTag>
            <CareLineTag>Neurology</CareLineTag>
            <CareLineTag>Orthopedics</CareLineTag>
          </div>
          <div className="flex flex-wrap gap-2">
            <CustomTag bgColor="#EDE9FE" textColor="#7C3AED">
              Custom Purple
            </CustomTag>
            <CustomTag bgColor="#FEF3C7" textColor="#D97706">
              Custom Amber
            </CustomTag>
            <CustomTag bgColor="#DBEAFE" textColor="#2563EB">
              Custom Blue
            </CustomTag>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tag removable onRemove={() => {}}>Removable</Tag>
            <Tag icon={<Heart className="h-3 w-3" />} bgColor="#FEE2E2" textColor="#DC2626">
              With Icon
            </Tag>
          </div>
        </div>
      </SubSection>

      {/* Progress */}
      <SubSection title="Progress">
        <div className="space-y-4 max-w-sm">
          <div className="space-y-1">
            <Label>25% Complete</Label>
            <Progress value={25} />
          </div>
          <div className="space-y-1">
            <Label>50% Complete</Label>
            <Progress value={50} />
          </div>
          <div className="space-y-1">
            <Label>75% Complete</Label>
            <Progress value={75} />
          </div>
          <div className="space-y-1">
            <Label>100% Complete</Label>
            <Progress value={100} />
          </div>
        </div>
      </SubSection>

      {/* Skeleton */}
      <SubSection title="Skeleton">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="h-24 w-full rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
      </SubSection>

      {/* CountBadge */}
      <SubSection title="CountBadge">
        <div className="flex gap-8">
          <CountBadge count={5}>
            <Bell className="h-6 w-6 text-muted-foreground" />
          </CountBadge>
          <CountBadge count={42}>
            <Mail className="h-6 w-6 text-muted-foreground" />
          </CountBadge>
          <CountBadge count={150} max={99}>
            <MessageSquare className="h-6 w-6 text-muted-foreground" />
          </CountBadge>
          <CountBadge dot>
            <Bell className="h-6 w-6 text-muted-foreground" />
          </CountBadge>
          <CountBadge count={3} variant="destructive">
            <Phone className="h-6 w-6 text-muted-foreground" />
          </CountBadge>
        </div>
      </SubSection>

      {/* SLABadge */}
      <SubSection title="SLABadge">
        <div className="flex gap-3">
          <SLABadge variant="ok">On Time</SLABadge>
          <SLABadge variant="warning">2h Left</SLABadge>
          <SLABadge variant="critical">Overdue</SLABadge>
        </div>
      </SubSection>

      {/* TypingIndicator */}
      <SubSection title="TypingIndicator">
        <div className="space-y-3">
          <TypingIndicator />
          <TypingIndicator
            avatar={
              <div className="w-full h-full bg-primary flex items-center justify-center text-xs text-white font-semibold">
                AC
              </div>
            }
          />
        </div>
      </SubSection>
    </div>
  ),
}

// =============================================================================
// 4. OVERLAYS
// =============================================================================

export const Overlays = {
  render: () => (
    <TooltipProvider>
      <div className="space-y-12 p-6 max-w-4xl">
        <SectionTitle>Overlays</SectionTitle>

        {/* Dialog */}
        <SubSection title="Dialog">
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog (md)</Button>
              </DialogTrigger>
              <DialogContent size="md">
                <DialogHeader>
                  <DialogTitle>Edit Patient Record</DialogTitle>
                  <DialogDescription>
                    Make changes to the patient profile. Click save when done.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dialog-name">Patient Name</Label>
                      <Input id="dialog-name" defaultValue="Maria Silva" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dialog-email">Email</Label>
                      <Input id="dialog-email" defaultValue="maria@example.com" />
                    </div>
                  </div>
                </DialogBody>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Large Dialog</Button>
              </DialogTrigger>
              <DialogContent size="lg" scrollBehavior="scrollable">
                <DialogHeader>
                  <DialogTitle>Patient History</DialogTitle>
                  <DialogDescription>Complete consultation history</DialogDescription>
                </DialogHeader>
                <DialogBody>
                  <div className="space-y-4">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div key={i} className="p-3 border rounded-lg">
                        <p className="font-medium text-sm">Consultation #{8 - i}</p>
                        <p className="text-sm text-muted-foreground">
                          January {20 - i}, 2026 - Dr. Ana Costa - Routine follow-up
                        </p>
                      </div>
                    ))}
                  </div>
                </DialogBody>
                <DialogFooter>
                  <Button variant="outline">Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </SubSection>

        {/* AlertDialog */}
        <SubSection title="AlertDialog">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Record</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  patient record and remove all associated data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SubSection>

        {/* Sheet */}
        <SubSection title="Sheet">
          <div className="flex gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Sheet (Right)</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Patient Filters</SheetTitle>
                  <SheetDescription>
                    Filter patients by care line, status, and provider.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Care Line</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select care line" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </SubSection>

        {/* Drawer */}
        <SubSection title="Drawer">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Quick Actions</DrawerTitle>
                <DrawerDescription>Select an action to perform</DrawerDescription>
              </DrawerHeader>
              <div className="px-4 pb-4 space-y-2">
                <Button className="w-full" variant="outline">
                  <CalendarIcon className="h-4 w-4" /> Schedule Appointment
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4" /> Create Note
                </Button>
                <Button className="w-full" variant="outline">
                  <MessageSquare className="h-4 w-4" /> Send Message
                </Button>
              </div>
              <DrawerFooter>
                <Button>Confirm</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </SubSection>

        {/* Popover */}
        <SubSection title="Popover">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Patient Quick View</h4>
                <div className="space-y-1">
                  <p className="text-sm"><span className="text-muted-foreground">Name:</span> Maria Silva</p>
                  <p className="text-sm"><span className="text-muted-foreground">Age:</span> 45 years</p>
                  <p className="text-sm"><span className="text-muted-foreground">Care Line:</span> Cardiology</p>
                  <p className="text-sm"><span className="text-muted-foreground">Provider:</span> Dr. Ana Costa</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </SubSection>

        {/* HoverCard */}
        <SubSection title="HoverCard">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="p-0 h-auto">@dr.anacosta</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-semibold">Dr. Ana Costa</h4>
                  <p className="text-sm text-muted-foreground">Cardiologist - Nilo Health</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Specializing in preventive cardiology and heart failure management.
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </SubSection>

        {/* Tooltip */}
        <SubSection title="Tooltip">
          <div className="flex gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline">
                  <Heart className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to favorites</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline">
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open settings</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline">
                  <Bell className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications (3 unread)</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </SubSection>
      </div>
    </TooltipProvider>
  ),
}

// =============================================================================
// 5. NAVIGATION
// =============================================================================

export const Navigation = {
  render: () => (
    <div className="space-y-12 p-6 max-w-4xl">
      <SectionTitle>Navigation</SectionTitle>

      {/* Breadcrumb */}
      <SubSection title="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Patients</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Maria Silva</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Consultations</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SubSection>

      {/* Pagination */}
      <SubSection title="Pagination">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">12</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </SubSection>

      {/* NavigationMenu */}
      <SubSection title="NavigationMenu">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Patients</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-[400px] space-y-2">
                  <NavigationMenuLink className="block p-2 rounded-md hover:bg-accent">
                    <div className="text-sm font-medium">All Patients</div>
                    <p className="text-xs text-muted-foreground">View and manage patient records</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block p-2 rounded-md hover:bg-accent">
                    <div className="text-sm font-medium">Active Care Plans</div>
                    <p className="text-xs text-muted-foreground">Patients with active treatment plans</p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Schedule</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-[300px] space-y-2">
                  <NavigationMenuLink className="block p-2 rounded-md hover:bg-accent">
                    <div className="text-sm font-medium">Calendar</div>
                    <p className="text-xs text-muted-foreground">View appointment calendar</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block p-2 rounded-md hover:bg-accent">
                    <div className="text-sm font-medium">Availability</div>
                    <p className="text-xs text-muted-foreground">Manage time slots</p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </SubSection>

      {/* Menubar */}
      <SubSection title="Menubar">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Patient Record</MenubarItem>
              <MenubarItem>Open Record</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Export as PDF</MenubarItem>
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
              <MenubarItem>Redo</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Overview</MenubarItem>
              <MenubarItem>Timeline</MenubarItem>
              <MenubarItem>Compact</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </SubSection>

      {/* DropdownMenu */}
      <SubSection title="DropdownMenu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Actions <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Patient Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" /> View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CalendarIcon className="mr-2 h-4 w-4" /> Schedule Appointment
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" /> Send Message
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete Record
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SubSection>

      {/* ContextMenu */}
      <SubSection title="ContextMenu">
        <ContextMenu>
          <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
            Right-click here to open context menu
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuItem>View Details</ContextMenuItem>
            <ContextMenuItem>Edit Record</ContextMenuItem>
            <ContextMenuItem>Duplicate</ContextMenuItem>
            <ContextMenuItem className="text-destructive">Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </SubSection>

      {/* Command */}
      <SubSection title="Command">
        <Command className="rounded-lg border shadow-md max-w-md">
          <CommandInput placeholder="Search patients, providers, actions..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Patients">
              <CommandItem>
                <User className="mr-2 h-4 w-4" /> Maria Silva
              </CommandItem>
              <CommandItem>
                <User className="mr-2 h-4 w-4" /> Joao Santos
              </CommandItem>
              <CommandItem>
                <User className="mr-2 h-4 w-4" /> Ana Oliveira
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem>
                <Plus className="mr-2 h-4 w-4" /> New Appointment
              </CommandItem>
              <CommandItem>
                <Search className="mr-2 h-4 w-4" /> Advanced Search
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </SubSection>

      {/* Sidebar */}
      <SubSection title="Sidebar">
        <div className="h-80 border rounded-lg overflow-hidden">
          <SidebarProvider>
            <Sidebar className="relative border-r">
              <SidebarHeader className="p-4">
                <span className="font-semibold text-sm">Nilo Care</span>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Main</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <Home className="h-4 w-4" /> Dashboard
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive>
                          <User className="h-4 w-4" /> Patients
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <CalendarIcon className="h-4 w-4" /> Calendar
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <MessageSquare className="h-4 w-4" /> Messages
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <BarChart3 className="h-4 w-4" /> Analytics
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <main className="flex-1 p-4 text-sm text-muted-foreground">
              Main content area
            </main>
          </SidebarProvider>
        </div>
      </SubSection>
    </div>
  ),
}

// =============================================================================
// 6. DATA DISPLAY
// =============================================================================

export const DataDisplay = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <div className="space-y-12 p-6 max-w-4xl">
        <SectionTitle>Data Display</SectionTitle>

        {/* Avatar */}
        <SubSection title="Avatar">
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?u=maria" alt="Maria Silva" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?u=joao" alt="Joao Santos" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>PL</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </div>
        </SubSection>

        {/* Calendar */}
        <SubSection title="Calendar">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
          />
        </SubSection>

        {/* Carousel */}
        <SubSection title="Carousel">
          <Carousel className="w-full max-w-sm">
            <CarouselContent>
              {Array.from({ length: 5 }, (_, i) => (
                <CarouselItem key={i}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">{i + 1}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </SubSection>

        {/* Collapsible */}
        <SubSection title="Collapsible">
          <Collapsible>
            <div className="flex items-center gap-2">
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm">
                  <ChevronsUpDown className="h-4 w-4" /> Toggle Medications
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 space-y-2">
              <div className="rounded-md border px-4 py-2 text-sm">
                Losartan 50mg - 1x daily
              </div>
              <div className="rounded-md border px-4 py-2 text-sm">
                Metformin 500mg - 2x daily
              </div>
              <div className="rounded-md border px-4 py-2 text-sm">
                Atorvastatin 20mg - 1x daily (night)
              </div>
            </CollapsibleContent>
          </Collapsible>
        </SubSection>

        {/* Toggle */}
        <SubSection title="Toggle">
          <div className="flex gap-2">
            <Toggle aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </Toggle>
          </div>
        </SubSection>

        {/* ToggleGroup */}
        <SubSection title="ToggleGroup">
          <ToggleGroup type="single" defaultValue="left">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </SubSection>
      </div>
    )
  },
}

// =============================================================================
// 7. CHAT
// =============================================================================

export const Chat = {
  render: () => (
    <div className="space-y-12 p-6 max-w-4xl">
      <SectionTitle>Chat</SectionTitle>

      {/* ChatBubble */}
      <SubSection title="ChatBubble">
        <div className="space-y-4 max-w-lg">
          <DateSeparator>January 28, 2026</DateSeparator>

          <ChatBubbleGroup align="start">
            <ChatBubble variant="received">
              Hello, how are you feeling today?
            </ChatBubble>
            <ChatBubbleTime>10:30 AM</ChatBubbleTime>
          </ChatBubbleGroup>

          <ChatBubbleGroup align="end">
            <ChatBubble variant="sent">
              I am feeling much better, thank you! The medication is helping a lot.
            </ChatBubble>
            <ChatBubbleTime status="read">10:32 AM</ChatBubbleTime>
          </ChatBubbleGroup>

          <ChatBubbleGroup align="start">
            <ChatBubble variant="received">
              That is great to hear. Let us discuss your next appointment.
            </ChatBubble>
            <ChatBubbleTime>10:33 AM</ChatBubbleTime>
          </ChatBubbleGroup>

          <SystemMessage>Dr. Ana Costa joined the conversation</SystemMessage>

          <ChatBubbleGroup align="end">
            <ChatBubble variant="professional">
              Good morning Maria. I have reviewed your latest results.
            </ChatBubble>
            <ChatBubbleTime status="delivered">10:35 AM</ChatBubbleTime>
          </ChatBubbleGroup>
        </div>
      </SubSection>

      {/* ChatAudio */}
      <SubSection title="ChatAudio">
        <div className="space-y-4 max-w-sm">
          <ChatAudio
            variant="received"
            src="#"
            duration={45}
            waveformData={Array.from({ length: 35 }, () => 0.2 + Math.random() * 0.6)}
          />
          <ChatAudio
            variant="sent"
            src="#"
            duration={120}
            waveformData={Array.from({ length: 35 }, () => 0.2 + Math.random() * 0.6)}
          />
          <ChatAudio
            variant="received"
            src="#"
            duration={30}
            status="uploading"
            progress={65}
          />
        </div>
      </SubSection>

      {/* ChatFile */}
      <SubSection title="ChatFile">
        <div className="space-y-3">
          <ChatFile
            variant="received"
            name="lab-results-jan2026.pdf"
            size={2456789}
            type="application/pdf"
            url="#"
            onDownload={() => {}}
          />
          <ChatFile
            variant="sent"
            name="prescription-scan.jpg"
            size={891234}
            type="image/jpeg"
            url="#"
            onDownload={() => {}}
          />
          <ChatFile
            variant="received"
            name="uploading-document.pdf"
            size={1234567}
            type="application/pdf"
            status="uploading"
            progress={42}
          />
          <ChatFile
            variant="sent"
            name="failed-upload.pdf"
            size={567890}
            type="application/pdf"
            status="error"
            error="Network error"
            onRetry={() => {}}
          />
        </div>
      </SubSection>

      {/* ChatImage */}
      <SubSection title="ChatImage">
        <div className="space-y-3">
          <ChatImage
            variant="received"
            src="https://placehold.co/320x240/e2e8f0/64748b?text=Lab+Results"
            alt="Lab results image"
            width={320}
            height={240}
            caption="Latest blood work results"
            onClick={() => {}}
          />
          <ChatImage
            variant="sent"
            src="https://placehold.co/280x200/22c55e/ffffff?text=Prescription"
            alt="Prescription photo"
            width={280}
            height={200}
          />
        </div>
      </SubSection>

      {/* ChatTranscription */}
      <SubSection title="ChatTranscription">
        <div className="space-y-3 max-w-md">
          <ChatTranscription
            variant="received"
            text="The patient reports improvement in symptoms after starting the new medication regimen. Blood pressure readings have stabilized at 125/82."
            confidence={0.95}
            language="Portuguese"
          />
          <ChatTranscription
            variant="sent"
            text="Patient reported mild headaches in the morning for the past three days. Recommended adjusting the medication dosage and scheduling a follow-up in two weeks to monitor progress. Also discussed lifestyle changes including reducing sodium intake and increasing physical activity."
            confidence={0.88}
            language="Portuguese"
            collapsedLength={100}
          />
        </div>
      </SubSection>

      {/* ConversationItem */}
      <SubSection title="ConversationItem">
        <div className="border rounded-lg max-w-sm overflow-hidden">
          <ConversationList>
            <ConversationItem active>
              <ConversationItemAvatar variant="patient" online>
                MS
              </ConversationItemAvatar>
              <ConversationItemContent>
                <ConversationItemHeader>
                  <ConversationItemName>Maria Silva</ConversationItemName>
                  <ConversationItemMeta>
                    <span className="text-[11px] text-muted-foreground">10:32</span>
                    <UnreadBadge count={3} />
                  </ConversationItemMeta>
                </ConversationItemHeader>
                <ConversationItemPreview unread>
                  I am feeling much better, thank you!
                </ConversationItemPreview>
                <ConversationItemTags>
                  <CareLineTag size="sm">Cardiology</CareLineTag>
                </ConversationItemTags>
              </ConversationItemContent>
            </ConversationItem>

            <ConversationItem unread>
              <ConversationItemAvatar variant="patient">
                JS
              </ConversationItemAvatar>
              <ConversationItemContent>
                <ConversationItemHeader>
                  <ConversationItemName>Joao Santos</ConversationItemName>
                  <ConversationItemMeta>
                    <span className="text-[11px] text-muted-foreground">09:15</span>
                    <UnreadBadge count={1} />
                  </ConversationItemMeta>
                </ConversationItemHeader>
                <ConversationItemPreview unread>
                  Can I reschedule my appointment?
                </ConversationItemPreview>
                <ConversationItemTags>
                  <CareLineTag size="sm">Neurology</CareLineTag>
                </ConversationItemTags>
              </ConversationItemContent>
            </ConversationItem>

            <ConversationItem>
              <ConversationItemAvatar variant="patient">
                AO
              </ConversationItemAvatar>
              <ConversationItemContent>
                <ConversationItemHeader>
                  <ConversationItemName>Ana Oliveira</ConversationItemName>
                  <ConversationItemMeta>
                    <span className="text-[11px] text-muted-foreground">Yesterday</span>
                  </ConversationItemMeta>
                </ConversationItemHeader>
                <ConversationItemPreview>
                  Thank you for the prescription update.
                </ConversationItemPreview>
              </ConversationItemContent>
            </ConversationItem>
          </ConversationList>
        </div>
      </SubSection>

      {/* QueueItem */}
      <SubSection title="QueueItem">
        <div className="border rounded-lg max-w-xs overflow-hidden">
          <QueueList>
            <QueueItem active count={12} dotVariant="critical">
              All Conversations
            </QueueItem>
            <QueueItem count={5} dotVariant="warning">
              Waiting Response
            </QueueItem>
            <QueueItem count={3} dotVariant="ok">
              Active
            </QueueItem>
            <QueueItem count={0} dotVariant="neutral">
              Resolved
            </QueueItem>
            <QueueItem count={2}>
              Unassigned
            </QueueItem>
          </QueueList>
        </div>
      </SubSection>

      {/* QuickReply */}
      <SubSection title="QuickReply">
        <QuickReplyGroup>
          <QuickReply>Schedule follow-up</QuickReply>
          <QuickReply>Send lab request</QuickReply>
          <QuickReply>Prescribe medication</QuickReply>
          <QuickReply>Refer to specialist</QuickReply>
          <QuickReply disabled>Transfer (unavailable)</QuickReply>
        </QuickReplyGroup>
      </SubSection>
    </div>
  ),
}

// =============================================================================
// 8. MODALS
// =============================================================================

export const Modals = {
  render: () => (
    <div className="space-y-12 p-6 max-w-4xl">
      <SectionTitle>Pre-built Modals</SectionTitle>

      {/* ConfirmationModal */}
      <SubSection title="ConfirmationModal">
        <div className="flex flex-wrap gap-3">
          <ConfirmationModal
            title="Confirm Appointment"
            description="Are you sure you want to confirm this appointment for February 3, 2026 at 14:00?"
            intent="default"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            onConfirm={() => console.log("Confirmed")}
            trigger={<Button>Default Confirmation</Button>}
          />
          <ConfirmationModal
            title="Delete Patient Record"
            description="This action cannot be undone. All patient data will be permanently removed."
            intent="destructive"
            confirmLabel="Delete"
            cancelLabel="Keep Record"
            onConfirm={() => console.log("Deleted")}
            trigger={<Button variant="destructive">Destructive Confirmation</Button>}
          />
          <ConfirmationModal
            title="Medication Interaction Warning"
            description="The prescribed medication may interact with the patient's current prescriptions. Please review before proceeding."
            intent="warning"
            confirmLabel="Proceed Anyway"
            cancelLabel="Review"
            onConfirm={() => console.log("Proceeded")}
            trigger={<Button variant="outline">Warning Confirmation</Button>}
          />
          <ConfirmationModal
            title="New Guidelines Available"
            description="Updated clinical guidelines have been published. Would you like to review them now?"
            intent="info"
            confirmLabel="Review Now"
            cancelLabel="Later"
            onConfirm={() => console.log("Reviewing")}
            trigger={<Button variant="secondary">Info Confirmation</Button>}
          />
        </div>
      </SubSection>

      {/* FormModal */}
      <SubSection title="FormModal">
        <FormModal
          title="New Patient"
          description="Enter the patient's information to create a new record."
          size="md"
          submitLabel="Create Patient"
          cancelLabel="Cancel"
          onSubmit={() => console.log("Submitted")}
          trigger={<Button>Open Form Modal</Button>}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fm-first">First Name</Label>
                <Input id="fm-first" placeholder="Maria" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fm-last">Last Name</Label>
                <Input id="fm-last" placeholder="Silva" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fm-email">Email</Label>
              <Input id="fm-email" type="email" placeholder="maria@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fm-phone">Phone</Label>
              <Input id="fm-phone" placeholder="+55 11 98765-4321" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fm-notes">Notes</Label>
              <Textarea id="fm-notes" placeholder="Additional notes..." rows={3} />
            </div>
          </div>
        </FormModal>
      </SubSection>

      {/* FilterModal */}
      <SubSection title="FilterModal">
        <FilterModal
          title="Filter Patients"
          description="Narrow down the patient list using the filters below."
          activeFilterCount={2}
          onApply={() => console.log("Filters applied")}
          onReset={() => console.log("Filters reset")}
        >
          <FilterSection title="Care Line">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="fl-cardiology" defaultChecked />
                <Label htmlFor="fl-cardiology">Cardiology</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="fl-neurology" />
                <Label htmlFor="fl-neurology">Neurology</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="fl-orthopedics" defaultChecked />
                <Label htmlFor="fl-orthopedics">Orthopedics</Label>
              </div>
            </div>
          </FilterSection>
          <FilterSection title="Status">
            <RadioGroup defaultValue="all">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="all" id="fl-all" />
                <Label htmlFor="fl-all">All</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="active" id="fl-active" />
                <Label htmlFor="fl-active">Active</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="inactive" id="fl-inactive" />
                <Label htmlFor="fl-inactive">Inactive</Label>
              </div>
            </RadioGroup>
          </FilterSection>
          <FilterSection title="Provider">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ana">Dr. Ana Costa</SelectItem>
                <SelectItem value="pedro">Dr. Pedro Lima</SelectItem>
                <SelectItem value="lucas">Dr. Lucas Rocha</SelectItem>
              </SelectContent>
            </Select>
          </FilterSection>
        </FilterModal>
      </SubSection>

      {/* ListModal */}
      <SubSection title="ListModal">
        <div className="flex gap-3">
          <ListModal
            title="Select Provider"
            description="Choose a healthcare provider for this patient."
            items={[
              { id: "1", label: "Dr. Ana Costa", description: "Cardiologist" },
              { id: "2", label: "Dr. Pedro Lima", description: "Neurologist" },
              { id: "3", label: "Dr. Lucas Rocha", description: "Orthopedist" },
              { id: "4", label: "Dr. Julia Mendes", description: "Pediatrician" },
              { id: "5", label: "Dr. Carlos Alves", description: "Psychiatrist" },
              { id: "6", label: "Dr. Fernanda Souza", description: "Dermatologist", disabled: true },
            ]}
            onConfirm={(items) => console.log("Selected:", items)}
            trigger={<Button variant="outline">Single Select List</Button>}
          />
          <ListModal
            title="Assign Care Team"
            description="Select one or more providers for the care team."
            multiple
            items={[
              { id: "1", label: "Dr. Ana Costa", description: "Cardiologist" },
              { id: "2", label: "Dr. Pedro Lima", description: "Neurologist" },
              { id: "3", label: "Dr. Lucas Rocha", description: "Orthopedist" },
              { id: "4", label: "Nurse Maria Santos", description: "Primary Care" },
              { id: "5", label: "Psych. Roberto Dias", description: "Psychologist" },
            ]}
            onConfirm={(items) => console.log("Selected:", items)}
            trigger={<Button variant="outline">Multi Select List</Button>}
          />
        </div>
      </SubSection>
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. CHART
// ─────────────────────────────────────────────────────────────────────────────

const chartData = [
  { month: "Jan", appointments: 186, cancellations: 12 },
  { month: "Feb", appointments: 205, cancellations: 8 },
  { month: "Mar", appointments: 237, cancellations: 15 },
  { month: "Apr", appointments: 198, cancellations: 10 },
  { month: "May", appointments: 256, cancellations: 7 },
  { month: "Jun", appointments: 224, cancellations: 11 },
]

const chartConfig: ChartConfig = {
  appointments: {
    label: "Appointments",
    color: "var(--primary)",
  },
  cancellations: {
    label: "Cancellations",
    color: "var(--destructive)",
  },
}

export const Charts = {
  render: () => (
    <div className="space-y-8 p-6 max-w-4xl">
      <SectionTitle>Chart</SectionTitle>

      <SubSection title="Bar Chart">
        <Card>
          <CardHeader>
            <CardTitle>Appointments Overview</CardTitle>
            <CardDescription>January - June 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={chartData} accessibilityLayer>
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="appointments" fill="var(--color-appointments)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cancellations" fill="var(--color-cancellations)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </SubSection>
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. FORM (React Hook Form integration)
// ─────────────────────────────────────────────────────────────────────────────

function FormExample() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      notes: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Name</FormLabel>
              <FormControl>
                <Input placeholder="Maria Silva" {...field} />
              </FormControl>
              <FormDescription>Full name as it appears on the health card.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="maria@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional observations..." {...field} />
              </FormControl>
              <FormDescription>Optional clinical notes.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const FormIntegration = {
  render: () => (
    <div className="space-y-8 p-6 max-w-lg">
      <SectionTitle>Form (React Hook Form)</SectionTitle>

      <SubSection title="Validated Form">
        <Card>
          <CardHeader>
            <CardTitle>New Patient</CardTitle>
            <CardDescription>Fill out the form below. Try submitting empty to see validation.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormExample />
          </CardContent>
        </Card>
      </SubSection>
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. MULTI-SELECT (Standalone)
// ─────────────────────────────────────────────────────────────────────────────

const specialtyOptions = [
  { value: "cardiology", label: "Cardiology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "endocrinology", label: "Endocrinology" },
  { value: "gastroenterology", label: "Gastroenterology" },
  { value: "neurology", label: "Neurology" },
  { value: "oncology", label: "Oncology" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "psychiatry", label: "Psychiatry" },
  { value: "urology", label: "Urology", disabled: true },
]

export const MultiSelectStandaloneStory = {
  name: "MultiSelect (Standalone)",
  render: () => (
    <div className="space-y-8 p-6 max-w-lg">
      <SectionTitle>MultiSelect (Standalone)</SectionTitle>

      <SubSection title="Default">
        <div className="space-y-4">
          <Label>Specialties</Label>
          <MultiSelectStandalone
            options={specialtyOptions}
            placeholder="Select specialties..."
            searchPlaceholder="Search specialties..."
            emptyMessage="No specialty found."
          />
        </div>
      </SubSection>

      <SubSection title="With Default Values">
        <div className="space-y-4">
          <Label>Pre-selected Specialties</Label>
          <MultiSelectStandalone
            options={specialtyOptions}
            defaultValue={["cardiology", "neurology", "psychiatry"]}
            placeholder="Select specialties..."
          />
        </div>
      </SubSection>

      <SubSection title="Disabled Option">
        <p className="text-sm text-muted-foreground mb-2">
          &quot;Urology&quot; is disabled in the list.
        </p>
        <MultiSelectStandalone
          options={specialtyOptions}
          placeholder="Select specialties..."
        />
      </SubSection>
    </div>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. SONNER (Toast Notifications)
// ─────────────────────────────────────────────────────────────────────────────

export const ToastNotifications = {
  name: "Sonner (Toasts)",
  render: () => (
    <div className="space-y-8 p-6 max-w-lg">
      <SectionTitle>Sonner (Toast Notifications)</SectionTitle>
      <Toaster position="bottom-right" />

      <SubSection title="Toast Variants">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="default"
            onClick={() => toast.success("Patient record saved successfully.")}
          >
            Success Toast
          </Button>
          <Button
            variant="destructive"
            onClick={() => toast.error("Failed to save patient record.")}
          >
            Error Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning("Session will expire in 5 minutes.")}
          >
            Warning Toast
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.info("New message from Dr. Santos.")}
          >
            Info Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.loading("Uploading document...")}
          >
            Loading Toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Appointment scheduled", {
                description: "Monday, January 30, 2026 at 9:00 AM",
                action: {
                  label: "Undo",
                  onClick: () => toast.info("Appointment cancelled."),
                },
              })
            }
          >
            Toast with Action
          </Button>
        </div>
      </SubSection>
    </div>
  ),
}
