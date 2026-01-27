"use client"

import { Separator } from "@/components/ui/separator"

export default function SeparatorPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Separator</h1>
        <p className="text-muted-foreground">
          Visually or semantically separates content.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Separator } from "@/components/ui/separator"`}</code>
        </pre>
      </section>

      {/* Horizontal */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Horizontal (Default)</h2>
        <div className="p-6 bg-card rounded-lg border">
          <div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
              <p className="text-sm text-muted-foreground">
                An open-source UI component library.
              </p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Blog</div>
              <Separator orientation="vertical" />
              <div>Docs</div>
              <Separator orientation="vertical" />
              <div>Source</div>
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="space-y-1">
  <h4 className="text-sm font-medium">Radix Primitives</h4>
  <p className="text-sm text-muted-foreground">
    An open-source UI component library.
  </p>
</div>
<Separator className="my-4" />
<div className="flex h-5 items-center space-x-4 text-sm">
  <div>Blog</div>
  <Separator orientation="vertical" />
  <div>Docs</div>
  <Separator orientation="vertical" />
  <div>Source</div>
</div>`}</code>
        </pre>
      </section>

      {/* Vertical */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Vertical</h2>
        <div className="p-6 bg-card rounded-lg border">
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Home</div>
            <Separator orientation="vertical" />
            <div>About</div>
            <Separator orientation="vertical" />
            <div>Contact</div>
            <Separator orientation="vertical" />
            <div>Blog</div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="flex h-5 items-center space-x-4 text-sm">
  <div>Home</div>
  <Separator orientation="vertical" />
  <div>About</div>
  <Separator orientation="vertical" />
  <div>Contact</div>
</div>`}</code>
        </pre>
      </section>

      {/* With Content */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Content</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Create a separator with content by using flexbox.
        </p>
        <div className="p-6 bg-card rounded-lg border space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Section Break
              </span>
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="relative">
  <div className="absolute inset-0 flex items-center">
    <Separator className="w-full" />
  </div>
  <div className="relative flex justify-center text-xs uppercase">
    <span className="bg-card px-2 text-muted-foreground">
      Or continue with
    </span>
  </div>
</div>`}</code>
        </pre>
      </section>

      {/* In Lists */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">In Lists</h2>
        <div className="p-6 bg-card rounded-lg border max-w-sm">
          <div className="space-y-1">
            <div className="py-2">
              <h4 className="font-medium">Account Settings</h4>
              <p className="text-sm text-muted-foreground">Manage your account</p>
            </div>
            <Separator />
            <div className="py-2">
              <h4 className="font-medium">Notifications</h4>
              <p className="text-sm text-muted-foreground">Configure notifications</p>
            </div>
            <Separator />
            <div className="py-2">
              <h4 className="font-medium">Privacy</h4>
              <p className="text-sm text-muted-foreground">Privacy settings</p>
            </div>
            <Separator />
            <div className="py-2">
              <h4 className="font-medium">Help</h4>
              <p className="text-sm text-muted-foreground">Get help and support</p>
            </div>
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
                <th className="text-left py-2 pr-4">Default</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">orientation</td>
                <td className="py-2 pr-4 font-mono text-xs">horizontal | vertical</td>
                <td className="py-2 pr-4 font-mono text-xs">horizontal</td>
                <td className="py-2 text-muted-foreground">The orientation of the separator</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">decorative</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">true</td>
                <td className="py-2 text-muted-foreground">Whether purely decorative (hides from screen readers)</td>
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
    </div>
  )
}
