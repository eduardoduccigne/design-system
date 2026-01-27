"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function ResizablePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Resizable</h1>
        <p className="text-muted-foreground">
          Accessible resizable panel groups and layouts with keyboard support.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"`}</code>
        </pre>
      </section>

      {/* Horizontal */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Horizontal</h2>
        <div className="p-6 bg-card rounded-lg border">
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[200px] max-w-md rounded-lg border"
          >
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">One</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ResizablePanelGroup direction="horizontal" className="min-h-[200px]">
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <span>One</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <span>Two</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`}</code>
        </pre>
      </section>

      {/* Vertical */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Vertical</h2>
        <div className="p-6 bg-card rounded-lg border">
          <ResizablePanelGroup
            direction="vertical"
            className="min-h-[200px] max-w-md rounded-lg border"
          >
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Header</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Content</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ResizablePanelGroup direction="vertical">
  <ResizablePanel defaultSize={25}>
    <div>Header</div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={75}>
    <div>Content</div>
  </ResizablePanel>
</ResizablePanelGroup>`}</code>
        </pre>
      </section>

      {/* With Handle */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Handle Indicator</h2>
        <div className="p-6 bg-card rounded-lg border">
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[200px] max-w-md rounded-lg border"
          >
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">One</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ResizableHandle withHandle />`}</code>
        </pre>
      </section>

      {/* Three Panels */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Three Panels</h2>
        <div className="p-6 bg-card rounded-lg border">
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[200px] rounded-lg border"
          >
            <ResizablePanel defaultSize={25} minSize={15}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Sidebar</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Content</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25} minSize={15}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Panel</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={25} minSize={15}>
    Sidebar
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>
    Content
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={25} minSize={15}>
    Panel
  </ResizablePanel>
</ResizablePanelGroup>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">ResizablePanelGroup</td>
                <td className="py-2 text-muted-foreground">Container for panels</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ResizablePanel</td>
                <td className="py-2 text-muted-foreground">Individual panel</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ResizableHandle</td>
                <td className="py-2 text-muted-foreground">Draggable handle between panels</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <h3 className="text-lg font-medium mt-6">ResizablePanelGroup</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Prop</th>
                <th className="text-left py-2 pr-4">Type</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">direction</td>
                <td className="py-2 pr-4 font-mono text-xs">horizontal | vertical</td>
                <td className="py-2 text-muted-foreground">Panel layout direction</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mt-6">ResizablePanel</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Prop</th>
                <th className="text-left py-2 pr-4">Type</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">defaultSize</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 text-muted-foreground">Initial size (percentage)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">minSize</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 text-muted-foreground">Minimum size (percentage)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">maxSize</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 text-muted-foreground">Maximum size (percentage)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mt-6">ResizableHandle</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Prop</th>
                <th className="text-left py-2 pr-4">Type</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">withHandle</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 text-muted-foreground">Show grip indicator</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
