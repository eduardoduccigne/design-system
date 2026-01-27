"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccordionPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Accordion</h1>
        <p className="text-muted-foreground">
          A vertically stacked set of interactive headings that each reveal a section of content.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default (Single)</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that match the other components.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It's animated by default, but you can disable it if you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}</code>
        </pre>
      </section>

      {/* Multiple */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Multiple</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Allow multiple items to be open at the same time.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>First Item</AccordionTrigger>
              <AccordionContent>
                This accordion allows multiple items to be expanded simultaneously.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Second Item</AccordionTrigger>
              <AccordionContent>
                Try opening both items at the same time!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Third Item</AccordionTrigger>
              <AccordionContent>
                All three can be open together.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Accordion type="multiple" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>Content</AccordionContent>
  </AccordionItem>
  {/* More items... */}
</Accordion>`}</code>
        </pre>
      </section>

      {/* Default Open */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default Open</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Open by default</AccordionTrigger>
              <AccordionContent>
                This item is open when the page loads.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Closed by default</AccordionTrigger>
              <AccordionContent>
                Click to expand this item.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Open by default</AccordionTrigger>
    <AccordionContent>This item is open initially.</AccordionContent>
  </AccordionItem>
</Accordion>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">Accordion</td>
                <td className="py-2 text-muted-foreground">The root container</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AccordionItem</td>
                <td className="py-2 text-muted-foreground">A single collapsible section</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AccordionTrigger</td>
                <td className="py-2 text-muted-foreground">The clickable header</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AccordionContent</td>
                <td className="py-2 text-muted-foreground">The collapsible content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
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
                <td className="py-2 pr-4 font-mono text-xs">type</td>
                <td className="py-2 pr-4 font-mono text-xs">single | multiple</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Single or multiple items expanded</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">collapsible</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Allow all items to be collapsed (single type only)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">defaultValue</td>
                <td className="py-2 pr-4 font-mono text-xs">string | string[]</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Initially expanded item(s)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">value</td>
                <td className="py-2 pr-4 font-mono text-xs">string | string[]</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Controlled expanded item(s)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
