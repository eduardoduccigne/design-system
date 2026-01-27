"use client"

import {
  // General UI Icons
  Search,
  Settings,
  User,
  Users,
  Bell,
  Mail,
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  X,
  Check,
  AlertCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  // Healthcare Icons
  Heart,
  HeartPulse,
  Activity,
  Stethoscope,
  Pill,
  Syringe,
  Thermometer,
  Hospital,
  Ambulance,
  Baby,
  Bone,
  Brain,
  Eye,
  Ear,
  Hand,
  Footprints,
  Droplets,
  TestTube,
  Microscope,
  Dna,
  Accessibility,
  Wheelchair,
  // File & Document
  FileText,
  File,
  Folder,
  Download,
  Upload,
  Paperclip,
  Clipboard,
  ClipboardList,
  // Communication
  Phone,
  MessageSquare,
  Send,
  Video,
  // Navigation & Actions
  Home,
  Menu,
  MoreHorizontal,
  MoreVertical,
  ExternalLink,
  Link,
  Copy,
  Trash2,
  Edit,
  Save,
  RefreshCw,
  LogOut,
  LogIn,
} from "lucide-react"

const iconCategories = [
  {
    name: "Healthcare",
    description: "Medical and health-related icons",
    icons: [
      { name: "Heart", component: Heart },
      { name: "HeartPulse", component: HeartPulse },
      { name: "Activity", component: Activity },
      { name: "Stethoscope", component: Stethoscope },
      { name: "Pill", component: Pill },
      { name: "Syringe", component: Syringe },
      { name: "Thermometer", component: Thermometer },
      { name: "Hospital", component: Hospital },
      { name: "Ambulance", component: Ambulance },
      { name: "Baby", component: Baby },
      { name: "Bone", component: Bone },
      { name: "Brain", component: Brain },
      { name: "Eye", component: Eye },
      { name: "Ear", component: Ear },
      { name: "Hand", component: Hand },
      { name: "Footprints", component: Footprints },
      { name: "Droplets", component: Droplets },
      { name: "TestTube", component: TestTube },
      { name: "Microscope", component: Microscope },
      { name: "Dna", component: Dna },
      { name: "Accessibility", component: Accessibility },
      { name: "Wheelchair", component: Wheelchair },
    ],
  },
  {
    name: "General UI",
    description: "Common interface icons",
    icons: [
      { name: "Search", component: Search },
      { name: "Settings", component: Settings },
      { name: "User", component: User },
      { name: "Users", component: Users },
      { name: "Bell", component: Bell },
      { name: "Mail", component: Mail },
      { name: "Calendar", component: Calendar },
      { name: "Clock", component: Clock },
    ],
  },
  {
    name: "Navigation",
    description: "Arrows and directional icons",
    icons: [
      { name: "ChevronRight", component: ChevronRight },
      { name: "ChevronLeft", component: ChevronLeft },
      { name: "ChevronDown", component: ChevronDown },
      { name: "ChevronUp", component: ChevronUp },
      { name: "ArrowRight", component: ArrowRight },
      { name: "ArrowLeft", component: ArrowLeft },
      { name: "Home", component: Home },
      { name: "Menu", component: Menu },
      { name: "ExternalLink", component: ExternalLink },
      { name: "Link", component: Link },
    ],
  },
  {
    name: "Actions",
    description: "Interactive action icons",
    icons: [
      { name: "Plus", component: Plus },
      { name: "Minus", component: Minus },
      { name: "X", component: X },
      { name: "Check", component: Check },
      { name: "Edit", component: Edit },
      { name: "Save", component: Save },
      { name: "Copy", component: Copy },
      { name: "Trash2", component: Trash2 },
      { name: "RefreshCw", component: RefreshCw },
      { name: "MoreHorizontal", component: MoreHorizontal },
      { name: "MoreVertical", component: MoreVertical },
    ],
  },
  {
    name: "Status",
    description: "Feedback and status icons",
    icons: [
      { name: "AlertCircle", component: AlertCircle },
      { name: "AlertTriangle", component: AlertTriangle },
      { name: "Info", component: Info },
      { name: "HelpCircle", component: HelpCircle },
    ],
  },
  {
    name: "Files & Documents",
    description: "Document and file management",
    icons: [
      { name: "FileText", component: FileText },
      { name: "File", component: File },
      { name: "Folder", component: Folder },
      { name: "Download", component: Download },
      { name: "Upload", component: Upload },
      { name: "Paperclip", component: Paperclip },
      { name: "Clipboard", component: Clipboard },
      { name: "ClipboardList", component: ClipboardList },
    ],
  },
  {
    name: "Communication",
    description: "Messaging and contact icons",
    icons: [
      { name: "Phone", component: Phone },
      { name: "MessageSquare", component: MessageSquare },
      { name: "Send", component: Send },
      { name: "Video", component: Video },
      { name: "LogIn", component: LogIn },
      { name: "LogOut", component: LogOut },
    ],
  },
]

export default function IconsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Icons</h1>
        <p className="text-muted-foreground">
          Icon library powered by Lucide React with healthcare-focused selections.
        </p>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <p className="text-muted-foreground">
          Lucide React is already included in the project. Import icons directly:
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Heart, Stethoscope, Activity } from "lucide-react"`}</code>
        </pre>
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <div className="flex flex-wrap items-center gap-4 p-6 bg-card rounded-lg border">
          <Heart className="h-4 w-4" />
          <Heart className="h-5 w-5" />
          <Heart className="h-6 w-6" />
          <Heart className="h-8 w-8" />
          <Heart className="h-6 w-6 text-primary" />
          <Heart className="h-6 w-6 text-destructive" />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`{/* Sizes */}
<Heart className="h-4 w-4" />
<Heart className="h-5 w-5" />
<Heart className="h-6 w-6" />
<Heart className="h-8 w-8" />

{/* Colors */}
<Heart className="h-6 w-6 text-primary" />
<Heart className="h-6 w-6 text-destructive" />`}</code>
        </pre>
      </section>

      {/* Stroke Width */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Stroke Width</h2>
        <div className="flex flex-wrap items-center gap-6 p-6 bg-card rounded-lg border">
          <div className="flex flex-col items-center gap-2">
            <Activity className="h-6 w-6" strokeWidth={1} />
            <span className="text-xs text-muted-foreground">1px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Activity className="h-6 w-6" strokeWidth={1.5} />
            <span className="text-xs text-muted-foreground">1.5px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Activity className="h-6 w-6" strokeWidth={2} />
            <span className="text-xs text-muted-foreground">2px (default)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Activity className="h-6 w-6" strokeWidth={2.5} />
            <span className="text-xs text-muted-foreground">2.5px</span>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Activity strokeWidth={1} />
<Activity strokeWidth={1.5} />
<Activity strokeWidth={2} />    {/* default */}
<Activity strokeWidth={2.5} />`}</code>
        </pre>
      </section>

      {/* Icon Categories */}
      {iconCategories.map((category) => (
        <section key={category.name} className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 p-6 bg-card rounded-lg border">
            {category.icons.map(({ name, component: Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-accent transition-nilo-fast cursor-pointer group"
                title={name}
              >
                <Icon className="h-5 w-5 text-foreground/80 group-hover:text-foreground" />
                <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Healthcare Icons Library */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Additional Healthcare Icons</h2>
        <p className="text-muted-foreground">
          For more specialized healthcare icons, the <code className="text-sm bg-muted px-1.5 py-0.5 rounded">healthicons-react</code> library
          is also available with 1,800+ medical icons.
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`// Import health icons individually for best performance
import Doctor from "healthicons-react/dist/filled/Doctor"
import Nurse from "healthicons-react/dist/filled/Nurse"
import BloodDrop from "healthicons-react/dist/filled/BloodDrop"

// Usage
<Doctor className="h-6 w-6" />
<Nurse className="h-6 w-6" />
<BloodDrop className="h-6 w-6" />`}</code>
        </pre>
        <p className="text-sm text-muted-foreground">
          Browse all icons at{" "}
          <a
            href="https://healthicons.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            healthicons.org
          </a>
        </p>
      </section>

      {/* Props Reference */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Prop</th>
                <th className="text-left py-2 pr-4">Type</th>
                <th className="text-left py-2 pr-4">Default</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">size</td>
                <td className="py-2 pr-4 font-mono text-xs">number | string</td>
                <td className="py-2 pr-4 font-mono text-xs">24</td>
                <td className="py-2 text-muted-foreground">Icon size in pixels</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">strokeWidth</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">2</td>
                <td className="py-2 text-muted-foreground">Stroke width of the icon</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">color</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">currentColor</td>
                <td className="py-2 text-muted-foreground">Icon color (use className for Tailwind)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">className</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
