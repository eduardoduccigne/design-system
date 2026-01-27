"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function TabsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tabs</h1>
        <p className="text-muted-foreground">
          A set of layered sections of content—known as tab panels—that are displayed one at a time.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <p className="text-sm text-muted-foreground">
                Make changes to your account here.
              </p>
            </TabsContent>
            <TabsContent value="password">
              <p className="text-sm text-muted-foreground">
                Change your password here.
              </p>
            </TabsContent>
          </Tabs>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Make changes to your account here.
  </TabsContent>
  <TabsContent value="password">
    Change your password here.
  </TabsContent>
</Tabs>`}</code>
        </pre>
      </section>

      {/* With Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Cards</h2>
        <div className="p-6 bg-background rounded-lg border">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@johndoe" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Tabs defaultValue="account" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here.
        </CardDescription>
      </CardHeader>
      <CardContent>...</CardContent>
    </Card>
  </TabsContent>
</Tabs>`}</code>
        </pre>
      </section>

      {/* Multiple Tabs */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Multiple Tabs</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4">
              <p className="text-sm text-muted-foreground">Overview content here.</p>
            </TabsContent>
            <TabsContent value="analytics" className="p-4">
              <p className="text-sm text-muted-foreground">Analytics content here.</p>
            </TabsContent>
            <TabsContent value="reports" className="p-4">
              <p className="text-sm text-muted-foreground">Reports content here.</p>
            </TabsContent>
            <TabsContent value="notifications" className="p-4">
              <p className="text-sm text-muted-foreground">Notifications content here.</p>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Disabled Tab */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled Tab</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
            <TabsContent value="active">Active tab content</TabsContent>
            <TabsContent value="other">Other tab content</TabsContent>
          </Tabs>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">Tabs</td>
                <td className="py-2 text-muted-foreground">The root container</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">TabsList</td>
                <td className="py-2 text-muted-foreground">Container for the tab triggers</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">TabsTrigger</td>
                <td className="py-2 text-muted-foreground">The button that activates a tab</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">TabsContent</td>
                <td className="py-2 text-muted-foreground">The content panel for each tab</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <h3 className="text-lg font-medium mt-6">Tabs</h3>
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
                <td className="py-2 pr-4 font-mono text-xs">defaultValue</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Initial active tab</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">value</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Controlled active tab</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onValueChange</td>
                <td className="py-2 pr-4 font-mono text-xs">(value: string) =&gt; void</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Called when active tab changes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
