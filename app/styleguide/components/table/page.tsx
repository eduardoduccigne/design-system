"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
  { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
  { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
  { invoice: "INV004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
  { invoice: "INV005", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal" },
]

export default function TablePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Table</h1>
        <p className="text-muted-foreground">
          A responsive table component for displaying data.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$1,750.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((invoice) => (
      <TableRow key={invoice.invoice}>
        <TableCell className="font-medium">{invoice.invoice}</TableCell>
        <TableCell>{invoice.paymentStatus}</TableCell>
        <TableCell>{invoice.paymentMethod}</TableCell>
        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell className="text-right">$1,750.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`}</code>
        </pre>
      </section>

      {/* Simple Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Simple Table</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>john@example.com</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>jane@example.com</TableCell>
                <TableCell>Editor</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Johnson</TableCell>
                <TableCell>bob@example.com</TableCell>
                <TableCell>Viewer</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Striped Rows */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Striped Rows</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Add hover effect by styling TableRow.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-muted/50">
                <TableCell>Project Alpha</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow className="bg-muted/30 hover:bg-muted/50">
                <TableCell>Project Beta</TableCell>
                <TableCell>Pending</TableCell>
              </TableRow>
              <TableRow className="hover:bg-muted/50">
                <TableCell>Project Gamma</TableCell>
                <TableCell>Completed</TableCell>
              </TableRow>
              <TableRow className="bg-muted/30 hover:bg-muted/50">
                <TableCell>Project Delta</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
                <td className="py-2 pr-4 font-mono text-xs">Table</td>
                <td className="py-2 text-muted-foreground">The root table element</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">TableHeader</td>
                <td className="py-2 text-muted-foreground">The table header (thead)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">TableBody</td>
                <td className="py-2 text-muted-foreground">The table body (tbody)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">TableFooter</td>
                <td className="py-2 text-muted-foreground">The table footer (tfoot)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">TableRow</td>
                <td className="py-2 text-muted-foreground">A table row (tr)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">TableHead</td>
                <td className="py-2 text-muted-foreground">A header cell (th)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">TableCell</td>
                <td className="py-2 text-muted-foreground">A data cell (td)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">TableCaption</td>
                <td className="py-2 text-muted-foreground">A caption for the table</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Notes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Notes</h2>
        <div className="p-4 bg-muted rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>The table is wrapped in a responsive container by default</li>
            <li>Use <code className="text-foreground bg-background px-1 rounded">className</code> to customize cell widths and alignment</li>
            <li>For complex data tables with sorting, filtering, and pagination, consider using TanStack Table</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
