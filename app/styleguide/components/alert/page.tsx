"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"

export default function AlertPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Alert</h1>
        <p className="text-muted-foreground">
          Displays a callout for user attention.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border space-y-4">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>`}</code>
        </pre>
      </section>

      {/* Destructive */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Destructive</h2>
        <div className="p-6 bg-card rounded-lg border space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`}</code>
        </pre>
      </section>

      {/* Semantic Alerts */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Semantic Alerts</h2>
        <p className="text-sm text-muted-foreground">
          Use CSS variables to create semantic alert styles.
        </p>
        <div className="p-6 bg-card rounded-lg border space-y-4">
          <Alert className="border-success/50 text-success [&>svg]:text-success">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription className="text-success/90">
              Your changes have been saved successfully.
            </AlertDescription>
          </Alert>

          <Alert className="border-warning/50 text-warning [&>svg]:text-warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription className="text-warning/90">
              Your free trial ends in 3 days.
            </AlertDescription>
          </Alert>

          <Alert className="border-info/50 text-info [&>svg]:text-info">
            <Info className="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription className="text-info/90">
              A new version is available. Update now for the latest features.
            </AlertDescription>
          </Alert>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`{/* Success Alert */}
<Alert className="border-success/50 text-success [&>svg]:text-success">
  <CheckCircle2 className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription className="text-success/90">
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>

{/* Warning Alert */}
<Alert className="border-warning/50 text-warning [&>svg]:text-warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription className="text-warning/90">
    Your free trial ends in 3 days.
  </AlertDescription>
</Alert>

{/* Info Alert */}
<Alert className="border-info/50 text-info [&>svg]:text-info">
  <Info className="h-4 w-4" />
  <AlertTitle>Info</AlertTitle>
  <AlertDescription className="text-info/90">
    A new version is available.
  </AlertDescription>
</Alert>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">variant</td>
                <td className="py-2 pr-4 font-mono text-xs">default | destructive</td>
                <td className="py-2 pr-4 font-mono text-xs">default</td>
                <td className="py-2 text-muted-foreground">The visual style of the alert</td>
              </tr>
            </tbody>
          </table>
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
                <td className="py-2 pr-4 font-mono text-xs">Alert</td>
                <td className="py-2 text-muted-foreground">The alert container</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AlertTitle</td>
                <td className="py-2 text-muted-foreground">The alert title</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AlertDescription</td>
                <td className="py-2 text-muted-foreground">The alert description/content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
