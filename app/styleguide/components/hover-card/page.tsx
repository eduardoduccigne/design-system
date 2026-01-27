"use client"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays } from "lucide-react"

export default function HoverCardPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Hover Card</h1>
        <p className="text-muted-foreground">
          For sighted users to preview content available behind a link.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@nextjs</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@nextjs</h4>
                  <p className="text-sm">
                    The React Framework – created and maintained by @vercel.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      Joined December 2021
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@nextjs</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="..." />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@nextjs</h4>
        <p className="text-sm">
          The React Framework – created by @vercel.
        </p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`}</code>
        </pre>
      </section>

      {/* Simple Content */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Simple Content</h2>
        <div className="p-6 bg-card rounded-lg border">
          <p className="text-sm">
            Hover over{" "}
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="cursor-pointer underline decoration-dotted underline-offset-4 text-primary">
                  this text
                </span>
              </HoverCardTrigger>
              <HoverCardContent>
                <span className="text-sm">
                  This is a simple hover card with plain text content.
                </span>
              </HoverCardContent>
            </HoverCard>{" "}
            to see more information.
          </p>
        </div>
      </section>

      {/* Placement */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Placement</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline">Top</Button>
            </HoverCardTrigger>
            <HoverCardContent side="top">
              <p className="text-sm">Content on top</p>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline">Bottom</Button>
            </HoverCardTrigger>
            <HoverCardContent side="bottom">
              <p className="text-sm">Content on bottom</p>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline">Left</Button>
            </HoverCardTrigger>
            <HoverCardContent side="left">
              <p className="text-sm">Content on left</p>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline">Right</Button>
            </HoverCardTrigger>
            <HoverCardContent side="right">
              <p className="text-sm">Content on right</p>
            </HoverCardContent>
          </HoverCard>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<HoverCardContent side="top">...</HoverCardContent>
<HoverCardContent side="bottom">...</HoverCardContent>
<HoverCardContent side="left">...</HoverCardContent>
<HoverCardContent side="right">...</HoverCardContent>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">HoverCard</td>
                <td className="py-2 text-muted-foreground">The root component</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">HoverCardTrigger</td>
                <td className="py-2 text-muted-foreground">The element that triggers the hover card</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">HoverCardContent</td>
                <td className="py-2 text-muted-foreground">The hover card content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <h3 className="text-lg font-medium mt-6">HoverCardContent</h3>
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
                <td className="py-2 pr-4 font-mono text-xs">side</td>
                <td className="py-2 pr-4 font-mono text-xs">top | right | bottom | left</td>
                <td className="py-2 pr-4 font-mono text-xs">bottom</td>
                <td className="py-2 text-muted-foreground">Preferred side</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">align</td>
                <td className="py-2 pr-4 font-mono text-xs">start | center | end</td>
                <td className="py-2 pr-4 font-mono text-xs">center</td>
                <td className="py-2 text-muted-foreground">Alignment</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">sideOffset</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">4</td>
                <td className="py-2 text-muted-foreground">Distance from trigger</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* HoverCard vs Tooltip */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">HoverCard vs Tooltip</h2>
        <div className="p-4 bg-muted rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><strong className="text-foreground">HoverCard:</strong> For rich content previews, like user profiles or link previews</li>
            <li><strong className="text-foreground">Tooltip:</strong> For simple, short explanatory text</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
