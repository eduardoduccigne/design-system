"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function SonnerPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sonner (Toast)</h1>
        <p className="text-muted-foreground">
          An opinionated toast component for React. Displays brief notifications.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

// In your layout:
<Toaster />`}</code>
        </pre>
      </section>

      {/* Setup */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Setup</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Add the Toaster component to your root layout to enable toasts globally.
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`// app/layout.tsx
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`}</code>
        </pre>
      </section>

      {/* Types */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Toast Types</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Button
            variant="outline"
            onClick={() => toast("Event has been created")}
          >
            Default
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.success("Event has been created")}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error("Event could not be created")}
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning("Event starts in 5 minutes")}
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("New version available")}
          >
            Info
          </Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`toast("Default message")
toast.success("Success message")
toast.error("Error message")
toast.warning("Warning message")
toast.info("Info message")`}</code>
        </pre>
      </section>

      {/* With Description */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Description</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Button
            variant="outline"
            onClick={() =>
              toast("Event Created", {
                description: "Monday, January 3rd at 6:00pm",
              })
            }
          >
            With Description
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.success("Profile Updated", {
                description: "Your changes have been saved successfully.",
              })
            }
          >
            Success with Description
          </Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`toast("Event Created", {
  description: "Monday, January 3rd at 6:00pm",
})`}</code>
        </pre>
      </section>

      {/* With Action */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Action</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Button
            variant="outline"
            onClick={() =>
              toast("Event deleted", {
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              })
            }
          >
            With Undo
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.error("Failed to save", {
                action: {
                  label: "Retry",
                  onClick: () => console.log("Retry"),
                },
              })
            }
          >
            With Retry
          </Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`toast("Event deleted", {
  action: {
    label: "Undo",
    onClick: () => console.log("Undo"),
  },
})`}</code>
        </pre>
      </section>

      {/* Promise */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Promise Toast</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Button
            variant="outline"
            onClick={() => {
              const promise = new Promise((resolve) =>
                setTimeout(resolve, 2000)
              )
              toast.promise(promise, {
                loading: "Loading...",
                success: "Successfully loaded!",
                error: "Error loading data",
              })
            }}
          >
            Promise Toast
          </Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`toast.promise(myPromise, {
  loading: "Loading...",
  success: "Successfully loaded!",
  error: "Error loading data",
})`}</code>
        </pre>
      </section>

      {/* Custom Duration */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Duration</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Button
            variant="outline"
            onClick={() =>
              toast("Quick toast", {
                duration: 1000,
              })
            }
          >
            1 second
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Longer toast", {
                duration: 10000,
              })
            }
          >
            10 seconds
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Persistent toast", {
                duration: Infinity,
              })
            }
          >
            Persistent (manual dismiss)
          </Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`toast("Quick toast", { duration: 1000 })
toast("Longer toast", { duration: 10000 })
toast("Persistent", { duration: Infinity })`}</code>
        </pre>
      </section>

      {/* Dismiss */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Dismiss Toasts</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Button
            variant="outline"
            onClick={() => {
              const toastId = toast("This can be dismissed programmatically")
              setTimeout(() => toast.dismiss(toastId), 2000)
            }}
          >
            Auto Dismiss After 2s
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.dismiss()}
          >
            Dismiss All
          </Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`// Dismiss specific toast
const toastId = toast("Message")
toast.dismiss(toastId)

// Dismiss all toasts
toast.dismiss()`}</code>
        </pre>
      </section>

      {/* API Reference */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Method</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">toast(message, options?)</td>
                <td className="py-2 text-muted-foreground">Shows a default toast</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">toast.success(message)</td>
                <td className="py-2 text-muted-foreground">Shows a success toast</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">toast.error(message)</td>
                <td className="py-2 text-muted-foreground">Shows an error toast</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">toast.warning(message)</td>
                <td className="py-2 text-muted-foreground">Shows a warning toast</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">toast.info(message)</td>
                <td className="py-2 text-muted-foreground">Shows an info toast</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">toast.promise(promise, options)</td>
                <td className="py-2 text-muted-foreground">Shows loading/success/error states</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">toast.dismiss(id?)</td>
                <td className="py-2 text-muted-foreground">Dismisses toast(s)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Options */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Options</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Option</th>
                <th className="text-left py-2 pr-4">Type</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">description</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 text-muted-foreground">Additional description text</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">duration</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 text-muted-foreground">Duration in ms (default: 4000)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">action</td>
                <td className="py-2 pr-4 font-mono text-xs">object</td>
                <td className="py-2 text-muted-foreground">Action button with label and onClick</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">id</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 text-muted-foreground">Custom toast ID</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
