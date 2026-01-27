"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function PopoverPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Popover</h1>
        <p className="text-muted-foreground">
          Displays rich content in a portal, triggered by a button.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Max. width</Label>
                    <Input
                      id="maxWidth"
                      defaultValue="300px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      defaultValue="25px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxHeight">Max. height</Label>
                    <Input
                      id="maxHeight"
                      defaultValue="none"
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
      {/* Content */}
    </div>
  </PopoverContent>
</Popover>`}</code>
        </pre>
      </section>

      {/* Placement */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Placement</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Top</Button>
            </PopoverTrigger>
            <PopoverContent side="top" className="w-auto">
              <p className="text-sm">Popover on top</p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Bottom</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="w-auto">
              <p className="text-sm">Popover on bottom</p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Left</Button>
            </PopoverTrigger>
            <PopoverContent side="left" className="w-auto">
              <p className="text-sm">Popover on left</p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Right</Button>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-auto">
              <p className="text-sm">Popover on right</p>
            </PopoverContent>
          </Popover>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<PopoverContent side="top">...</PopoverContent>
<PopoverContent side="bottom">...</PopoverContent>
<PopoverContent side="left">...</PopoverContent>
<PopoverContent side="right">...</PopoverContent>`}</code>
        </pre>
      </section>

      {/* Alignment */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Alignment</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Start</Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto">
              <p className="text-sm">Aligned to start</p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Center</Button>
            </PopoverTrigger>
            <PopoverContent align="center" className="w-auto">
              <p className="text-sm">Aligned to center</p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">End</Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto">
              <p className="text-sm">Aligned to end</p>
            </PopoverContent>
          </Popover>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<PopoverContent align="start">...</PopoverContent>
<PopoverContent align="center">...</PopoverContent>
<PopoverContent align="end">...</PopoverContent>`}</code>
        </pre>
      </section>

      {/* Simple Content */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Simple Content</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Info</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <p className="text-sm text-muted-foreground">
                Popovers are great for displaying additional information or
                interactive content without navigating away from the current page.
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <h3 className="text-lg font-medium mt-6">PopoverContent</h3>
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
                <td className="py-2 pr-4 font-mono text-xs">bottom</td>
                <td className="py-2 text-muted-foreground">Preferred side</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">align</td>
                <td className="py-2 pr-4 font-mono text-xs">start | center | end</td>
                <td className="py-2 pr-4 font-mono text-xs">center</td>
                <td className="py-2 text-muted-foreground">Alignment relative to trigger</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">sideOffset</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">4</td>
                <td className="py-2 text-muted-foreground">Distance from trigger</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">alignOffset</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">0</td>
                <td className="py-2 text-muted-foreground">Offset for alignment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Popover vs Tooltip */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Popover vs Tooltip</h2>
        <div className="p-4 bg-muted rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><strong className="text-foreground">Popover:</strong> Click to open, click outside to close. Good for interactive content.</li>
            <li><strong className="text-foreground">Tooltip:</strong> Hover to show, move away to hide. Good for simple explanatory text.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
