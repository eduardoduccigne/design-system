"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DialogPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dialog</h1>
        <p className="text-muted-foreground">
          A window overlaid on the primary window, rendering content inaccessible until dismissed.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
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
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      {/* Form content */}
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}</code>
        </pre>
      </section>

      {/* Simple Dialog */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Simple Dialog</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Dialog>
            <DialogTrigger asChild>
              <Button>View Terms</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Terms of Service</DialogTitle>
                <DialogDescription>
                  Please read our terms of service carefully.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button>Accept</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Dialog>
  <DialogTrigger asChild>
    <Button>View Terms</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Terms of Service</DialogTitle>
      <DialogDescription>...</DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <p>Content...</p>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Close</Button>
      </DialogClose>
      <Button>Accept</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}</code>
        </pre>
      </section>

      {/* Custom Size */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Size</h2>
        <div className="flex gap-4 p-6 bg-card rounded-lg border">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Small</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[300px]">
              <DialogHeader>
                <DialogTitle>Small Dialog</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                This is a small dialog.
              </p>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Large</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Large Dialog</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                This is a large dialog with more space for content.
              </p>
            </DialogContent>
          </Dialog>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`{/* Small */}
<DialogContent className="sm:max-w-[300px]">

{/* Large */}
<DialogContent className="sm:max-w-[700px]">`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">Dialog</td>
                <td className="py-2 text-muted-foreground">The root component</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DialogTrigger</td>
                <td className="py-2 text-muted-foreground">The element that opens the dialog</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DialogContent</td>
                <td className="py-2 text-muted-foreground">The dialog container</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DialogHeader</td>
                <td className="py-2 text-muted-foreground">Container for title and description</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DialogTitle</td>
                <td className="py-2 text-muted-foreground">The dialog title</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DialogDescription</td>
                <td className="py-2 text-muted-foreground">The dialog description</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DialogFooter</td>
                <td className="py-2 text-muted-foreground">Container for action buttons</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DialogClose</td>
                <td className="py-2 text-muted-foreground">Closes the dialog when triggered</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Dialog traps focus within the modal when open</li>
          <li>Press Escape to close the dialog</li>
          <li>Click outside the dialog to close it</li>
          <li>DialogTitle and DialogDescription are announced by screen readers</li>
        </ul>
      </section>
    </div>
  )
}
