"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function SliderPage() {
  const [value, setValue] = useState([50])
  const [rangeValue, setRangeValue] = useState([25, 75])

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Slider</h1>
        <p className="text-muted-foreground">
          An input where the user selects a value from within a given range.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Slider } from "@/components/ui/slider"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md">
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Slider defaultValue={[50]} max={100} step={1} />`}</code>
        </pre>
      </section>

      {/* With Label and Value */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Label and Value</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Volume</Label>
              <span className="text-sm text-muted-foreground">{value[0]}%</span>
            </div>
            <Slider
              value={value}
              onValueChange={setValue}
              max={100}
              step={1}
            />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`const [value, setValue] = useState([50])

<div className="space-y-4">
  <div className="flex items-center justify-between">
    <Label>Volume</Label>
    <span className="text-sm text-muted-foreground">{value[0]}%</span>
  </div>
  <Slider
    value={value}
    onValueChange={setValue}
    max={100}
    step={1}
  />
</div>`}</code>
        </pre>
      </section>

      {/* Range Slider */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Range Slider</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Price Range</Label>
              <span className="text-sm text-muted-foreground">
                ${rangeValue[0]} - ${rangeValue[1]}
              </span>
            </div>
            <Slider
              value={rangeValue}
              onValueChange={setRangeValue}
              max={100}
              step={1}
            />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`const [rangeValue, setRangeValue] = useState([25, 75])

<Slider
  value={rangeValue}
  onValueChange={setRangeValue}
  max={100}
  step={1}
/>`}</code>
        </pre>
      </section>

      {/* Steps */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Steps</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md space-y-6">
          <div className="space-y-2">
            <Label>Step: 1</Label>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
          <div className="space-y-2">
            <Label>Step: 10</Label>
            <Slider defaultValue={[50]} max={100} step={10} />
          </div>
          <div className="space-y-2">
            <Label>Step: 25</Label>
            <Slider defaultValue={[50]} max={100} step={25} />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Slider defaultValue={[50]} max={100} step={1} />
<Slider defaultValue={[50]} max={100} step={10} />
<Slider defaultValue={[50]} max={100} step={25} />`}</code>
        </pre>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md">
          <Slider defaultValue={[50]} max={100} step={1} disabled />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Slider defaultValue={[50]} max={100} step={1} disabled />`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">number[]</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Controlled value(s)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">defaultValue</td>
                <td className="py-2 pr-4 font-mono text-xs">number[]</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Uncontrolled initial value(s)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onValueChange</td>
                <td className="py-2 pr-4 font-mono text-xs">(value: number[]) =&gt; void</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Called when value changes</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">min</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">0</td>
                <td className="py-2 text-muted-foreground">Minimum value</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">max</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">100</td>
                <td className="py-2 text-muted-foreground">Maximum value</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">step</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">1</td>
                <td className="py-2 text-muted-foreground">Step increment</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Disables the slider</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
