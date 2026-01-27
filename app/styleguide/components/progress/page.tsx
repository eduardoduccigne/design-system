"use client"

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

export default function ProgressPage() {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Progress</h1>
        <p className="text-muted-foreground">
          Displays an indicator showing the completion progress of a task.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Progress } from "@/components/ui/progress"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md">
          <Progress value={progress} className="w-full" />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Progress value={33} />`}</code>
        </pre>
      </section>

      {/* Different Values */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Different Values</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>0%</span>
            </div>
            <Progress value={0} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>25%</span>
            </div>
            <Progress value={25} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>50%</span>
            </div>
            <Progress value={50} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>75%</span>
            </div>
            <Progress value={75} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>100%</span>
            </div>
            <Progress value={100} />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Progress value={0} />
<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />`}</code>
        </pre>
      </section>

      {/* With Label */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Label</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span className="text-muted-foreground">45%</span>
            </div>
            <Progress value={45} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Download complete</span>
              <span className="text-muted-foreground">100%</span>
            </div>
            <Progress value={100} />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Uploading...</span>
    <span className="text-muted-foreground">45%</span>
  </div>
  <Progress value={45} />
</div>`}</code>
        </pre>
      </section>

      {/* Custom Colors */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Colors</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Customize the progress bar using CSS classes.
        </p>
        <div className="p-6 bg-card rounded-lg border max-w-md space-y-4">
          <div className="space-y-2">
            <span className="text-sm">Default (Primary)</span>
            <Progress value={60} />
          </div>
          <div className="space-y-2">
            <span className="text-sm">Success</span>
            <Progress value={60} className="[&>div]:bg-success" />
          </div>
          <div className="space-y-2">
            <span className="text-sm">Warning</span>
            <Progress value={60} className="[&>div]:bg-warning" />
          </div>
          <div className="space-y-2">
            <span className="text-sm">Destructive</span>
            <Progress value={60} className="[&>div]:bg-destructive" />
          </div>
          <div className="space-y-2">
            <span className="text-sm">AI</span>
            <Progress value={60} className="[&>div]:bg-[image:var(--ai-gradient)]" />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Progress value={60} className="[&>div]:bg-success" />
<Progress value={60} className="[&>div]:bg-warning" />
<Progress value={60} className="[&>div]:bg-destructive" />
<Progress value={60} className="[&>div]:bg-[image:var(--ai-gradient)]" />`}</code>
        </pre>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md space-y-4">
          <div className="space-y-2">
            <span className="text-sm">Small (h-1)</span>
            <Progress value={60} className="h-1" />
          </div>
          <div className="space-y-2">
            <span className="text-sm">Default (h-2)</span>
            <Progress value={60} />
          </div>
          <div className="space-y-2">
            <span className="text-sm">Large (h-4)</span>
            <Progress value={60} className="h-4" />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Progress value={60} className="h-1" />  {/* Small */}
<Progress value={60} />                   {/* Default */}
<Progress value={60} className="h-4" />  {/* Large */}`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">value</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">0</td>
                <td className="py-2 text-muted-foreground">Current progress value (0-100)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">max</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">100</td>
                <td className="py-2 text-muted-foreground">Maximum value</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">className</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Uses native <code className="text-foreground bg-muted px-1 rounded">role="progressbar"</code></li>
          <li>Includes <code className="text-foreground bg-muted px-1 rounded">aria-valuenow</code>, <code className="text-foreground bg-muted px-1 rounded">aria-valuemin</code>, and <code className="text-foreground bg-muted px-1 rounded">aria-valuemax</code></li>
          <li>Screen readers announce progress updates</li>
        </ul>
      </section>
    </div>
  )
}
