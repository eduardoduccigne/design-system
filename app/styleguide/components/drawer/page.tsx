"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function DrawerPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Drawer</h1>
        <p className="text-muted-foreground">
          A drawer component for React that slides in from the bottom of the screen.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Edit profile</DrawerTitle>
                  <DrawerDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Drawer content goes here. Great for mobile-friendly interfaces.
                  </p>
                </div>
                <DrawerFooter>
                  <Button>Save changes</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Edit profile</DrawerTitle>
        <DrawerDescription>
          Make changes to your profile here.
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4">
        {/* Content */}
      </div>
      <DrawerFooter>
        <Button>Save changes</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  </DrawerContent>
</Drawer>`}</code>
        </pre>
      </section>

      {/* With Scrollable Content */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Scrollable Content</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Scrollable Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Long Content</DrawerTitle>
                  <DrawerDescription>
                    This drawer has scrollable content.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <p key={i} className="text-sm text-muted-foreground mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Paragraph {i + 1}.
                    </p>
                  ))}
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
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
                <td className="py-2 pr-4 font-mono text-xs">Drawer</td>
                <td className="py-2 text-muted-foreground">The root component</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DrawerTrigger</td>
                <td className="py-2 text-muted-foreground">Opens the drawer</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DrawerContent</td>
                <td className="py-2 text-muted-foreground">The drawer panel</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DrawerHeader</td>
                <td className="py-2 text-muted-foreground">Contains title and description</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DrawerTitle</td>
                <td className="py-2 text-muted-foreground">The drawer title</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DrawerDescription</td>
                <td className="py-2 text-muted-foreground">The drawer description</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DrawerFooter</td>
                <td className="py-2 text-muted-foreground">Footer for actions</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DrawerClose</td>
                <td className="py-2 text-muted-foreground">Closes the drawer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Drawer vs Sheet */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Drawer vs Sheet</h2>
        <div className="p-4 bg-muted rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><strong className="text-foreground">Drawer:</strong> Slides from bottom, mobile-friendly, can be swiped to dismiss</li>
            <li><strong className="text-foreground">Sheet:</strong> Slides from any side, typically for desktop, no swipe gesture</li>
          </ul>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Touch-friendly swipe to dismiss</li>
          <li>Backdrop overlay</li>
          <li>Focus trap when open</li>
          <li>Escape key to close</li>
          <li>Drag handle indicator</li>
        </ul>
      </section>
    </div>
  )
}
