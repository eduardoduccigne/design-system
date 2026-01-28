# Nilo Design System - Claude Code Instructions

## Rules

1. **ALWAYS use DS components** - Never create native HTML elements
2. **NEVER create new components** without asking first
3. **NEVER write custom CSS** - Use Tailwind classes with design tokens only
4. **ALWAYS use color/spacing tokens** from the design system

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## HTML → DS Component Mapping

| HTML Element | DS Component | Import |
|--------------|--------------|--------|
| `<button>` | `<Button />` | `@/components/ui/button` |
| `<input>` | `<Input />` | `@/components/ui/input` |
| `<textarea>` | `<Textarea />` | `@/components/ui/textarea` |
| `<select>` | `<Select />` | `@/components/ui/select` |
| `<input type="checkbox">` | `<Checkbox />` | `@/components/ui/checkbox` |
| `<input type="radio">` | `<RadioGroup />` | `@/components/ui/radio-group` |
| `<label>` | `<Label />` | `@/components/ui/label` |
| `<table>` | `<Table />` | `@/components/ui/table` |
| `<dialog>` | `<Dialog />` | `@/components/ui/dialog` |
| `<progress>` | `<Progress />` | `@/components/ui/progress` |

---

## All Components

### Form Controls

| Component | Import | Variants/Props |
|-----------|--------|----------------|
| `Button` | `@/components/ui/button` | **variant**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `ai`, `ai-secondary`, `ai-outline`, `ai-ghost`, `ai-link` / **size**: `default`, `sm`, `lg`, `icon` / **asChild** |
| `Input` | `@/components/ui/input` | Standard input props |
| `Textarea` | `@/components/ui/textarea` | Standard textarea props |
| `Checkbox` | `@/components/ui/checkbox` | Standard checkbox props |
| `Switch` | `@/components/ui/switch` | **variant**: `default`, `ai` |
| `RadioGroup` | `@/components/ui/radio-group` | Use with `RadioGroupItem` |
| `Select` | `@/components/ui/select` | Use with `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue` |
| `MultiSelect` | `@/components/ui/select` | Use with `MultiSelectTrigger`, `MultiSelectContent`, `MultiSelectItem`, `MultiSelectValue` |
| `Label` | `@/components/ui/label` | Standard label props |
| `Slider` | `@/components/ui/slider` | Standard slider props |
| `InputOTP` | `@/components/ui/input-otp` | OTP input component |
| `FileUpload` | `@/components/ui/file-upload` | File upload with drag & drop |

### Layout

| Component | Import | Subcomponents |
|-----------|--------|---------------|
| `Card` | `@/components/ui/card` | `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` / **interactive**: `boolean` |
| `Table` | `@/components/ui/table` | `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` |
| `Tabs` | `@/components/ui/tabs` | `TabsList`, `TabsTrigger`, `TabsContent` |
| `Accordion` | `@/components/ui/accordion` | `AccordionItem`, `AccordionTrigger`, `AccordionContent` |
| `Separator` | `@/components/ui/separator` | Horizontal/vertical separator |
| `ScrollArea` | `@/components/ui/scroll-area` | Scrollable container |
| `Resizable` | `@/components/ui/resizable` | Resizable panels |
| `AspectRatio` | `@/components/ui/aspect-ratio` | Aspect ratio container |

### Feedback

| Component | Import | Variants |
|-----------|--------|----------|
| `Alert` | `@/components/ui/alert` | **variant**: `default`, `destructive`, `success`, `warning`, `info` / Subcomponents: `AlertTitle`, `AlertDescription` |
| `Badge` | `@/components/ui/badge` | **variant**: `default`, `secondary`, `destructive`, `success`, `warning`, `info`, `outline` |
| `Tag` | `@/components/ui/tag` | **variant**: `solid`, `outline`, `careLine` / **size**: `sm`, `md`, `lg` / Also: `CareLineTag`, `CustomTag`, `FixedTag` |
| `Progress` | `@/components/ui/progress` | **value**: `0-100` |
| `Skeleton` | `@/components/ui/skeleton` | Loading placeholder |
| `Sonner` | `@/components/ui/sonner` | Toast notifications (use `toast()`) |

### Overlays

| Component | Import | Props |
|-----------|--------|-------|
| `Dialog` | `@/components/ui/dialog` | **size**: `sm`, `md`, `lg`, `xl`, `full` / **scrollBehavior**: `default`, `scrollable` / **hideCloseButton** / Subcomponents: `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogBody`, `DialogFooter`, `DialogTitle`, `DialogDescription` |
| `AlertDialog` | `@/components/ui/alert-dialog` | Confirmation dialogs |
| `Sheet` | `@/components/ui/sheet` | Side panels |
| `Drawer` | `@/components/ui/drawer` | Bottom drawers |
| `Popover` | `@/components/ui/popover` | Popovers |
| `HoverCard` | `@/components/ui/hover-card` | Hover cards |
| `Tooltip` | `@/components/ui/tooltip` | Tooltips |

### Pre-built Modals

| Component | Import | Purpose |
|-----------|--------|---------|
| `ConfirmationModal` | `@/components/ui/modal` | Confirm/cancel actions |
| `FormModal` | `@/components/ui/modal` | Forms in modals |
| `FilterModal` | `@/components/ui/modal` | Filter interfaces |
| `ListModal` | `@/components/ui/modal` | Selectable lists |

### Navigation

| Component | Import |
|-----------|--------|
| `Breadcrumb` | `@/components/ui/breadcrumb` |
| `Pagination` | `@/components/ui/pagination` |
| `NavigationMenu` | `@/components/ui/navigation-menu` |
| `Menubar` | `@/components/ui/menubar` |
| `DropdownMenu` | `@/components/ui/dropdown-menu` |
| `ContextMenu` | `@/components/ui/context-menu` |
| `Command` | `@/components/ui/command` |
| `Sidebar` | `@/components/ui/sidebar` |

### Data Display

| Component | Import |
|-----------|--------|
| `Avatar` | `@/components/ui/avatar` |
| `Calendar` | `@/components/ui/calendar` |
| `Carousel` | `@/components/ui/carousel` |
| `Chart` | `@/components/ui/chart` |
| `CountBadge` | `@/components/ui/count-badge` |
| `Collapsible` | `@/components/ui/collapsible` |
| `Toggle` | `@/components/ui/toggle` |
| `ToggleGroup` | `@/components/ui/toggle-group` |

---

## Design Tokens

### Colors (use with Tailwind: `bg-*`, `text-*`, `border-*`)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `primary` | #34AA6E | #47AF77 | Brand color, CTAs |
| `secondary` | #F5F5F3 | #2A2A28 | Secondary actions |
| `destructive` | #DC2626 | #DC2626 | Destructive actions |
| `success` | #16A34A | #22C55E | Success states |
| `warning` | #D97706 | #FBBF24 | Warning states |
| `info` | #2563EB | #3B82F6 | Info states |
| `muted` | #F5F5F3 | #2A2A28 | Muted backgrounds |
| `accent` | #F0F0ED | #1A3D2A | Accent backgrounds |
| `background` | #FAFAF8 | #0F0F0E | Page background |
| `foreground` | #1C1C1A | #FAFAF8 | Text color |
| `card` | #FFFFFF | #1C1C1A | Card backgrounds |
| `border` | #E8E8E5 | #2A2A28 | Borders |

### Color Scales

**Primary scale**: `primary-50` → `primary-950` (brand green)
**Neutral scale**: `neutral-50` → `neutral-950`
**Grey scale**: `grey-50` → `grey-950`

### AI Gradient

```tsx
// AI gradient button
<Button variant="ai">AI Action</Button>

// AI gradient utilities
className="bg-ai-gradient"      // Gradient background with shimmer
className="bg-ai-gradient-static" // Gradient background without shimmer
className="text-ai-gradient"    // Gradient text
```

### Shadows (use with `shadow-[var(--shadow-*)]`)

| Token | Usage |
|-------|-------|
| `--shadow-xs` | Subtle elevation |
| `--shadow-sm` | Small elevation (default) |
| `--shadow-md` | Medium elevation |
| `--shadow-lg` | Large elevation |
| `--shadow-xl` | Extra large elevation |
| `--shadow-primary-sm` | Primary color shadow |

### Border Radius (use with `rounded-*`)

| Token | Value |
|-------|-------|
| `radius-sm` | 0.5rem (8px) |
| `radius-md` | 0.625rem (10px) |
| `radius-lg` | 0.75rem (12px) - default |
| `radius-xl` | 1rem (16px) |
| `radius-2xl` | 1.25rem (20px) |
| `radius-3xl` | 1.5rem (24px) |

### Animation Utilities

```tsx
// Transitions
className="transition-nilo"      // Normal speed (200ms)
className="transition-nilo-fast" // Fast speed (150ms)
```

---

## Usage Examples

### Button with variants

```tsx
import { Button } from "@/components/ui/button"

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ai">AI Generate</Button>
<Button size="sm">Small</Button>
<Button size="icon"><Icon /></Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

<Card interactive>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Dialog

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent size="lg">
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogBody>Scrollable content</DialogBody>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Form with validation

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

<form>
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="email@example.com" />
  </div>
  <Button type="submit">Submit</Button>
</form>
```

### Alert

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

<Alert variant="warning">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>This is a warning message.</AlertDescription>
</Alert>
```

---

## Icons

Use **Lucide React** for icons:

```tsx
import { Plus, Trash, Edit, Search } from "lucide-react"

<Button size="icon"><Plus className="h-4 w-4" /></Button>
```

Use **Healthicons React** for medical/healthcare icons:

```tsx
import { HeartOutline } from "healthicons-react"
```

---

## Utility Function

Use `cn()` for conditional class merging:

```tsx
import { cn } from "@/lib/utils"

<div className={cn("base-class", condition && "conditional-class")} />
```
