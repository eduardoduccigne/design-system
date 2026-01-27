"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function AlertDialogPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Alert Dialog</h1>
        <p className="text-muted-foreground">
          A modal dialog that interrupts the user with important content and expects a response.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}</code>
        </pre>
      </section>

      {/* Destructive Action */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Destructive Action</h2>
        <div className="p-6 bg-card rounded-lg border">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete your account? All of your data
                  will be permanently removed. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
  Delete
</AlertDialogAction>`}</code>
        </pre>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-card rounded-lg border">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Unsaved Changes</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                <AlertDialogDescription>
                  You have unsaved changes. Are you sure you want to leave?
                  Your changes will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Stay</AlertDialogCancel>
                <AlertDialogAction>Leave</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Log Out</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Log Out</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to log out? You will need to sign in again
                  to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Log Out</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
                <td className="py-2 pr-4 font-mono text-xs">AlertDialog</td>
                <td className="py-2 text-muted-foreground">The root component</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AlertDialogTrigger</td>
                <td className="py-2 text-muted-foreground">Opens the dialog</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AlertDialogContent</td>
                <td className="py-2 text-muted-foreground">The dialog container</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AlertDialogHeader</td>
                <td className="py-2 text-muted-foreground">Contains title and description</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AlertDialogTitle</td>
                <td className="py-2 text-muted-foreground">The dialog title</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AlertDialogDescription</td>
                <td className="py-2 text-muted-foreground">The dialog description</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AlertDialogFooter</td>
                <td className="py-2 text-muted-foreground">Contains action buttons</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AlertDialogCancel</td>
                <td className="py-2 text-muted-foreground">Cancel/dismiss button</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">AlertDialogAction</td>
                <td className="py-2 text-muted-foreground">Primary action button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Dialog vs Alert Dialog */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Dialog vs Alert Dialog</h2>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            <strong className="text-foreground">Alert Dialog</strong> is specifically designed for
            important confirmations that require user acknowledgment.
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Cannot be dismissed by clicking outside</li>
            <li>Always has Cancel and Action buttons</li>
            <li>Use for destructive or irreversible actions</li>
            <li>Use for important confirmations</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
