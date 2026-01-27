"use client"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronRight, Slash } from "lucide-react"

export default function BreadcrumbShowcasePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Breadcrumb</h1>
        <p className="text-muted-foreground">
          Displays the path to the current resource using a hierarchy of links.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}</code>
        </pre>
      </section>

      {/* Custom Separator */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Separator</h2>
        <div className="space-y-4 p-6 bg-card rounded-lg border">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Electronics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Electronics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<BreadcrumbSeparator>
  <ChevronRight className="h-4 w-4" />
</BreadcrumbSeparator>

<BreadcrumbSeparator>
  <Slash className="h-4 w-4" />
</BreadcrumbSeparator>`}</code>
        </pre>
      </section>

      {/* With Ellipsis */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Ellipsis</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Use ellipsis to collapse intermediate breadcrumbs when the path is long.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Documentation</DropdownMenuItem>
                    <DropdownMenuItem>Themes</DropdownMenuItem>
                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<BreadcrumbItem>
  <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center gap-1">
      <BreadcrumbEllipsis className="h-4 w-4" />
      <span className="sr-only">Toggle menu</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuItem>Documentation</DropdownMenuItem>
      <DropdownMenuItem>Themes</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</BreadcrumbItem>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">Breadcrumb</td>
                <td className="py-2 text-muted-foreground">The root nav element</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">BreadcrumbList</td>
                <td className="py-2 text-muted-foreground">The ordered list container</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">BreadcrumbItem</td>
                <td className="py-2 text-muted-foreground">A list item</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">BreadcrumbLink</td>
                <td className="py-2 text-muted-foreground">A clickable breadcrumb link</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">BreadcrumbPage</td>
                <td className="py-2 text-muted-foreground">The current page (non-clickable)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">BreadcrumbSeparator</td>
                <td className="py-2 text-muted-foreground">Visual separator between items</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">BreadcrumbEllipsis</td>
                <td className="py-2 text-muted-foreground">Ellipsis icon for collapsed items</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Uses a <code className="text-foreground bg-muted px-1 rounded">nav</code> element with <code className="text-foreground bg-muted px-1 rounded">aria-label="breadcrumb"</code></li>
          <li>Current page uses <code className="text-foreground bg-muted px-1 rounded">aria-current="page"</code></li>
          <li>Separators are hidden from screen readers</li>
          <li>Keyboard navigable links</li>
        </ul>
      </section>
    </div>
  )
}
