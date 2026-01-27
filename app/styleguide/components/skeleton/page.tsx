"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Skeleton</h1>
        <p className="text-muted-foreground">
          Use to show a placeholder while content is loading.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Skeleton } from "@/components/ui/skeleton"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Skeleton className="h-4 w-[250px]" />`}</code>
        </pre>
      </section>

      {/* Basic Shapes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Shapes</h2>
        <div className="p-6 bg-card rounded-lg border space-y-4">
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Line</span>
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Circle</span>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Rectangle</span>
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`{/* Line */}
<Skeleton className="h-4 w-full" />

{/* Circle */}
<Skeleton className="h-12 w-12 rounded-full" />

{/* Rectangle */}
<Skeleton className="h-32 w-full" />`}</code>
        </pre>
      </section>

      {/* Card Loading */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Card Loading</h2>
        <div className="p-6 bg-card rounded-lg border max-w-sm">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[200px]" />
    <Skeleton className="h-4 w-[150px]" />
  </div>
</div>`}</code>
        </pre>
      </section>

      {/* Post Loading */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Post Loading</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
            </div>
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </section>

      {/* Table Loading */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Table Loading</h2>
        <div className="p-6 bg-card rounded-lg border">
          <div className="space-y-3">
            <div className="flex space-x-4">
              <Skeleton className="h-8 w-[100px]" />
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 w-[80px]" />
              <Skeleton className="h-8 w-[100px]" />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex space-x-4">
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 flex-1" />
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-6 w-[100px]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Loading */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Form Loading</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md">
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[60px]" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </div>
      </section>

      {/* Navigation Loading */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Navigation Loading</h2>
        <div className="p-6 bg-card rounded-lg border">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-[120px]" />
            <div className="flex space-x-4">
              <Skeleton className="h-8 w-[60px]" />
              <Skeleton className="h-8 w-[60px]" />
              <Skeleton className="h-8 w-[60px]" />
              <Skeleton className="h-8 w-[60px]" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
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
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">className</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 text-muted-foreground">CSS classes to define size, shape, and style</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Match skeleton dimensions to actual content dimensions</li>
          <li>Use rounded corners consistent with your design</li>
          <li>Group skeletons to match the layout of loaded content</li>
          <li>Keep animations subtle to avoid distraction</li>
          <li>Consider using skeletons for initial page loads and lazy-loaded content</li>
        </ul>
      </section>
    </div>
  )
}
