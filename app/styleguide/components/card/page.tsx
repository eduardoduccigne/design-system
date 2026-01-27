"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CardPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Card</h1>
        <p className="text-muted-foreground">
          Displays a card with header, content, and footer.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"`}</code>
        </pre>
      </section>

      {/* Basic Card */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Card</h2>
        <div className="p-6 bg-background rounded-lg border">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">Card Footer</p>
            </CardFooter>
          </Card>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>`}</code>
        </pre>
      </section>

      {/* Card with Form */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Card with Form</h2>
        <div className="p-6 bg-background rounded-lg border">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Name of your project" />
        </div>
      </div>
    </form>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>`}</code>
        </pre>
      </section>

      {/* Card Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Card Styles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-background rounded-lg border">
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Standard card with border</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Uses bg-card and border by default.</p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Muted Card</CardTitle>
              <CardDescription>With muted background</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Uses bg-muted/50 for subtle emphasis.</p>
            </CardContent>
          </Card>
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
                <td className="py-2 pr-4 font-mono text-xs">Card</td>
                <td className="py-2 text-muted-foreground">The card container</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CardHeader</td>
                <td className="py-2 text-muted-foreground">Contains title and description</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CardTitle</td>
                <td className="py-2 text-muted-foreground">The card title (renders as h3)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CardDescription</td>
                <td className="py-2 text-muted-foreground">Subtitle or description text</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CardContent</td>
                <td className="py-2 text-muted-foreground">Main content area</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CardFooter</td>
                <td className="py-2 text-muted-foreground">Footer area, typically for actions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
