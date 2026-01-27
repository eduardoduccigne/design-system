"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 50 }).map((_, i, a) => `Tag ${a.length - i}`)

export default function ScrollAreaPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Scroll Area</h1>
        <p className="text-muted-foreground">
          Augments native scroll functionality for custom, cross-browser styling.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"`}</code>
        </pre>
      </section>

      {/* Vertical */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Vertical Scroll</h2>
        <div className="p-6 bg-card rounded-lg border">
          <ScrollArea className="h-72 w-48 rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
              {tags.map((tag) => (
                <div key={tag}>
                  <div className="text-sm">{tag}</div>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
    {tags.map((tag) => (
      <div key={tag}>
        <div className="text-sm">{tag}</div>
        <Separator className="my-2" />
      </div>
    ))}
  </div>
</ScrollArea>`}</code>
        </pre>
      </section>

      {/* Horizontal */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Horizontal Scroll</h2>
        <div className="p-6 bg-card rounded-lg border">
          <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-32 h-32 rounded-md bg-muted flex items-center justify-center"
                >
                  <span className="text-sm text-muted-foreground">Item {i + 1}</span>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
  <div className="flex w-max space-x-4 p-4">
    {items.map((item, i) => (
      <div key={i} className="shrink-0 w-32 h-32 rounded-md bg-muted">
        Item {i + 1}
      </div>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}</code>
        </pre>
      </section>

      {/* Both Directions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Both Directions</h2>
        <div className="p-6 bg-card rounded-lg border">
          <ScrollArea className="h-[200px] w-[300px] rounded-md border">
            <div className="p-4 w-[500px]">
              <h4 className="mb-4 text-sm font-medium">Scrollable Content</h4>
              {Array.from({ length: 20 }).map((_, i) => (
                <p key={i} className="text-sm text-muted-foreground mb-2">
                  This is a long line of text that will require horizontal scrolling to view completely. Line {i + 1}.
                </p>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ScrollArea className="h-[200px] w-[300px] rounded-md border">
  <div className="p-4 w-[500px]">
    {/* Wide content */}
  </div>
  <ScrollBar orientation="horizontal" />
  <ScrollBar orientation="vertical" />
</ScrollArea>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">ScrollArea</td>
                <td className="py-2 text-muted-foreground">The scrollable container</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ScrollBar</td>
                <td className="py-2 text-muted-foreground">The scrollbar (vertical or horizontal)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <h3 className="text-lg font-medium mt-6">ScrollBar</h3>
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
                <td className="py-2 pr-4 font-mono text-xs">orientation</td>
                <td className="py-2 pr-4 font-mono text-xs">vertical | horizontal</td>
                <td className="py-2 pr-4 font-mono text-xs">vertical</td>
                <td className="py-2 text-muted-foreground">Scrollbar direction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Notes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Notes</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Provides custom scrollbars that work across all browsers</li>
          <li>Scrollbars only appear when content overflows</li>
          <li>Touch devices use native scroll behavior</li>
          <li>Set a fixed height/width on ScrollArea to enable scrolling</li>
        </ul>
      </section>
    </div>
  )
}
