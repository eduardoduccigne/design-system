"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SheetPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sheet</h1>
        <p className="text-muted-foreground">
          Extends the Dialog component to display content that complements the main content of the screen.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"`}</code>
        </pre>
      </section>

      {/* Default (Right) */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default (Right)</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" defaultValue="John Doe" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input id="username" defaultValue="@johndoe" className="col-span-3" />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here.
      </SheetDescription>
    </SheetHeader>
    {/* Content */}
    <SheetFooter>
      <SheetClose asChild>
        <Button type="submit">Save changes</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`}</code>
        </pre>
      </section>

      {/* All Sides */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Side Positions</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Top</Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Top Sheet</SheetTitle>
                <SheetDescription>This sheet slides in from the top.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Right</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Right Sheet</SheetTitle>
                <SheetDescription>This sheet slides in from the right (default).</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Bottom</Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Bottom Sheet</SheetTitle>
                <SheetDescription>This sheet slides in from the bottom.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Left</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Left Sheet</SheetTitle>
                <SheetDescription>This sheet slides in from the left.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<SheetContent side="top">...</SheetContent>
<SheetContent side="right">...</SheetContent>
<SheetContent side="bottom">...</SheetContent>
<SheetContent side="left">...</SheetContent>`}</code>
        </pre>
      </section>

      {/* Custom Size */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Size</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Small (300px)</Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle>Small Sheet</SheetTitle>
                <SheetDescription>A narrow sheet for simple content.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Large (600px)</Button>
            </SheetTrigger>
            <SheetContent className="w-[600px] sm:w-[600px] sm:max-w-none">
              <SheetHeader>
                <SheetTitle>Large Sheet</SheetTitle>
                <SheetDescription>A wider sheet for more content.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`{/* Small */}
<SheetContent className="w-[300px] sm:w-[300px]">

{/* Large */}
<SheetContent className="w-[600px] sm:w-[600px] sm:max-w-none">`}</code>
        </pre>
      </section>

      {/* Components */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Components</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Component</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">Sheet</td>
                <td className="py-2 text-muted-foreground">The root component</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">SheetTrigger</td>
                <td className="py-2 text-muted-foreground">Opens the sheet</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">SheetContent</td>
                <td className="py-2 text-muted-foreground">The sheet panel</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">SheetHeader</td>
                <td className="py-2 text-muted-foreground">Contains title and description</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">SheetTitle</td>
                <td className="py-2 text-muted-foreground">The sheet title</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">SheetDescription</td>
                <td className="py-2 text-muted-foreground">The sheet description</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">SheetFooter</td>
                <td className="py-2 text-muted-foreground">Footer for actions</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">SheetClose</td>
                <td className="py-2 text-muted-foreground">Closes the sheet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <h3 className="text-lg font-medium mt-6">SheetContent</h3>
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
                <td className="py-2 pr-4 font-mono text-xs">side</td>
                <td className="py-2 pr-4 font-mono text-xs">top | right | bottom | left</td>
                <td className="py-2 pr-4 font-mono text-xs">right</td>
                <td className="py-2 text-muted-foreground">The side to slide in from</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sheet vs Dialog */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sheet vs Dialog</h2>
        <div className="p-4 bg-muted rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><strong className="text-foreground">Sheet:</strong> Slides in from screen edge, good for navigation, settings panels, or secondary content</li>
            <li><strong className="text-foreground">Dialog:</strong> Appears centered, good for focused tasks, confirmations, or forms</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
