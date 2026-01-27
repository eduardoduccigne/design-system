"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AvatarPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Avatar</h1>
        <p className="text-muted-foreground">
          An image element with a fallback for representing the user.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}</code>
        </pre>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Use variants to distinguish between professionals and patients in your application.
        </p>
        <div className="flex gap-6 p-6 bg-card rounded-lg border">
          <div className="flex flex-col items-center gap-2">
            <Avatar>
              <AvatarFallback variant="professional">DR</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">Professional</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar>
              <AvatarFallback variant="patient">PT</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">Patient</span>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<AvatarFallback variant="professional">DR</AvatarFallback>
<AvatarFallback variant="patient">PT</AvatarFallback>`}</code>
        </pre>
      </section>

      {/* Fallback */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Fallback</h2>
        <p className="text-sm text-muted-foreground mb-4">
          When no image is available or it fails to load, the fallback is displayed with initials.
        </p>
        <div className="flex gap-4 p-6 bg-card rounded-lg border">
          <Avatar>
            <AvatarImage src="/invalid-url.jpg" alt="User" />
            <AvatarFallback variant="professional">MS</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback variant="patient">AC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback variant="patient">PO</AvatarFallback>
          </Avatar>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Avatar>
  <AvatarImage src="/invalid-url.jpg" alt="User" />
  <AvatarFallback variant="patient">AC</AvatarFallback>
</Avatar>`}</code>
        </pre>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex items-end gap-4 p-6 bg-card rounded-lg border">
          <Avatar className="h-6 w-6">
            <AvatarFallback variant="professional" className="text-xs">XS</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarFallback variant="professional" className="text-xs">SM</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback variant="professional">MD</AvatarFallback>
          </Avatar>
          <Avatar className="h-14 w-14">
            <AvatarFallback variant="professional">LG</AvatarFallback>
          </Avatar>
          <Avatar className="h-20 w-20">
            <AvatarFallback variant="professional" className="text-xl">XL</AvatarFallback>
          </Avatar>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Avatar className="h-6 w-6">...</Avatar>   {/* Extra Small */}
<Avatar className="h-8 w-8">...</Avatar>   {/* Small */}
<Avatar>...</Avatar>                        {/* Default (h-10 w-10) */}
<Avatar className="h-14 w-14">...</Avatar>  {/* Large */}
<Avatar className="h-20 w-20">...</Avatar>  {/* Extra Large */}`}</code>
        </pre>
      </section>

      {/* Avatar Group */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Avatar Group</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Example showing a group with mixed professionals and patients.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <div className="flex -space-x-4">
            <Avatar className="border-2 border-background">
              <AvatarFallback variant="professional">MS</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback variant="patient">AC</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback variant="professional">JS</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback variant="patient">PO</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback variant="patient" className="text-xs">+5</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="flex -space-x-4">
  <Avatar className="border-2 border-background">
    <AvatarFallback>AB</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>CD</AvatarFallback>
  </Avatar>
  {/* More avatars... */}
  <Avatar className="border-2 border-background">
    <AvatarFallback className="text-xs">+5</AvatarFallback>
  </Avatar>
</div>`}</code>
        </pre>
      </section>

      {/* With Status */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Status Indicator</h2>
        <div className="flex gap-6 p-6 bg-card rounded-lg border">
          <div className="relative">
            <Avatar>
              <AvatarFallback>ON</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-background" />
          </div>
          <div className="relative">
            <Avatar>
              <AvatarFallback>AW</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-warning border-2 border-background" />
          </div>
          <div className="relative">
            <Avatar>
              <AvatarFallback>OF</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-muted-foreground border-2 border-background" />
          </div>
          <div className="relative">
            <Avatar>
              <AvatarFallback>DN</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-destructive border-2 border-background" />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="relative">
  <Avatar>
    <AvatarFallback>ON</AvatarFallback>
  </Avatar>
  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-background" />
</div>`}</code>
        </pre>
      </section>

      {/* With Name */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Name</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Example showing professionals and patients with their respective color variants.
        </p>
        <div className="p-6 bg-card rounded-lg border space-y-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback variant="professional">DR</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Dr. Maria Santos</p>
              <p className="text-xs text-muted-foreground">Cardiologist</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback variant="professional">JS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Dr. João Silva</p>
              <p className="text-xs text-muted-foreground">General Practitioner</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback variant="patient">AC</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Ana Costa</p>
              <p className="text-xs text-muted-foreground">Patient</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback variant="patient">PO</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Pedro Oliveira</p>
              <p className="text-xs text-muted-foreground">Patient</p>
            </div>
          </div>
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
                <td className="py-2 pr-4 font-mono text-xs">Avatar</td>
                <td className="py-2 text-muted-foreground">The root container</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AvatarImage</td>
                <td className="py-2 text-muted-foreground">The image element</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AvatarFallback</td>
                <td className="py-2 text-muted-foreground">Fallback when image is unavailable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">AvatarFallback Props</h2>
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
                <td className="py-2 pr-4 font-mono text-xs">variant</td>
                <td className="py-2 pr-4 font-mono text-xs">default | professional | patient</td>
                <td className="py-2 pr-4 font-mono text-xs">default</td>
                <td className="py-2 text-muted-foreground">Color variant to distinguish user types</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Best Practices</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Always provide a meaningful fallback (initials work well)</li>
          <li>Use consistent sizing throughout your application</li>
          <li>Include alt text for accessibility</li>
          <li>Consider lazy loading for avatar images in lists</li>
        </ul>
      </section>
    </div>
  )
}
