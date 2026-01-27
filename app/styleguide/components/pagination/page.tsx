"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function PaginationPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Pagination</h1>
        <p className="text-muted-foreground">
          Pagination with page navigation, next and previous links.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}</code>
        </pre>
      </section>

      {/* More Pages */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">More Pages</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  5
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">6</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      {/* Simple */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Simple (Previous/Next Only)</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}</code>
        </pre>
      </section>

      {/* First Page */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">First Page</h2>
        <p className="text-sm text-muted-foreground mb-4">
          When on the first page, the previous button can be shown but disabled or hidden.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`{/* Disabled previous button */}
<PaginationPrevious
  href="#"
  className="pointer-events-none opacity-50"
/>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">Pagination</td>
                <td className="py-2 text-muted-foreground">The root nav element</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">PaginationContent</td>
                <td className="py-2 text-muted-foreground">The list container</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">PaginationItem</td>
                <td className="py-2 text-muted-foreground">A list item wrapper</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">PaginationLink</td>
                <td className="py-2 text-muted-foreground">A page number link</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">PaginationPrevious</td>
                <td className="py-2 text-muted-foreground">Previous page button</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">PaginationNext</td>
                <td className="py-2 text-muted-foreground">Next page button</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">PaginationEllipsis</td>
                <td className="py-2 text-muted-foreground">Ellipsis for skipped pages</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <h3 className="text-lg font-medium mt-6">PaginationLink</h3>
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
                <td className="py-2 pr-4 font-mono text-xs">href</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">The URL for the page</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">isActive</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Whether this is the current page</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">size</td>
                <td className="py-2 pr-4 font-mono text-xs">default | icon</td>
                <td className="py-2 pr-4 font-mono text-xs">icon</td>
                <td className="py-2 text-muted-foreground">The size of the link</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
