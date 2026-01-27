"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function AspectRatioPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Aspect Ratio</h1>
        <p className="text-muted-foreground">
          Displays content within a desired ratio.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { AspectRatio } from "@/components/ui/aspect-ratio"`}</code>
        </pre>
      </section>

      {/* 16:9 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">16:9 Ratio</h2>
        <div className="p-6 bg-card rounded-lg border">
          <div className="w-[450px]">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                16:9 Video Container
              </div>
            </AspectRatio>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="w-[450px]">
  <AspectRatio ratio={16 / 9} className="bg-muted">
    <img src="..." alt="..." className="object-cover" />
  </AspectRatio>
</div>`}</code>
        </pre>
      </section>

      {/* Square */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Square (1:1)</h2>
        <div className="p-6 bg-card rounded-lg border">
          <div className="w-[200px]">
            <AspectRatio ratio={1} className="bg-muted rounded-lg">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                1:1 Square
              </div>
            </AspectRatio>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="w-[200px]">
  <AspectRatio ratio={1} className="bg-muted">
    {/* Square content */}
  </AspectRatio>
</div>`}</code>
        </pre>
      </section>

      {/* Common Ratios */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Common Ratios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-card rounded-lg border">
          <div>
            <p className="text-sm text-muted-foreground mb-2">4:3</p>
            <AspectRatio ratio={4 / 3} className="bg-muted rounded-lg">
              <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                4:3
              </div>
            </AspectRatio>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">16:9</p>
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
              <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                16:9
              </div>
            </AspectRatio>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">21:9</p>
            <AspectRatio ratio={21 / 9} className="bg-muted rounded-lg">
              <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                21:9
              </div>
            </AspectRatio>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">9:16 (Portrait)</p>
            <div className="w-[100px]">
              <AspectRatio ratio={9 / 16} className="bg-muted rounded-lg">
                <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                  9:16
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<AspectRatio ratio={4 / 3}>...</AspectRatio>   {/* Standard TV */}
<AspectRatio ratio={16 / 9}>...</AspectRatio>  {/* Widescreen */}
<AspectRatio ratio={21 / 9}>...</AspectRatio>  {/* Ultra-wide */}
<AspectRatio ratio={9 / 16}>...</AspectRatio>  {/* Portrait/Mobile */}`}</code>
        </pre>
      </section>

      {/* With Image */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Image</h2>
        <div className="p-6 bg-card rounded-lg border">
          <div className="w-[300px]">
            <AspectRatio ratio={16 / 9}>
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Image placeholder</span>
              </div>
            </AspectRatio>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="w-[300px]">
  <AspectRatio ratio={16 / 9}>
    <img
      src="/image.jpg"
      alt="Photo"
      className="rounded-md object-cover w-full h-full"
    />
  </AspectRatio>
</div>`}</code>
        </pre>
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
                <td className="py-2 pr-4 font-mono text-xs">ratio</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">1</td>
                <td className="py-2 text-muted-foreground">The desired aspect ratio (width / height)</td>
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

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Video embeds (YouTube, Vimeo)</li>
          <li>Image galleries with consistent sizing</li>
          <li>Card thumbnails</li>
          <li>Map containers</li>
          <li>Placeholder skeletons</li>
        </ul>
      </section>
    </div>
  )
}
