"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectLabel,
  MultiSelectItem,
} from "@/components/ui/select"
import { MultiSelect as MultiSelectOptions } from "@/components/ui/multi-select"
import { Label } from "@/components/ui/label"

const manyOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "strawberry", label: "Strawberry" },
  { value: "blueberry", label: "Blueberry" },
  { value: "raspberry", label: "Raspberry" },
  { value: "watermelon", label: "Watermelon" },
  { value: "pineapple", label: "Pineapple" },
  { value: "mango", label: "Mango" },
  { value: "kiwi", label: "Kiwi" },
  { value: "peach", label: "Peach" },
  { value: "pear", label: "Pear" },
  { value: "cherry", label: "Cherry" },
  { value: "plum", label: "Plum" },
  { value: "lemon", label: "Lemon" },
  { value: "lime", label: "Lime" },
  { value: "coconut", label: "Coconut" },
  { value: "papaya", label: "Papaya" },
  { value: "pomegranate", label: "Pomegranate" },
]

export default function SelectPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Select</h1>
        <p className="text-muted-foreground">
          Displays a list of options for the user to pick from—triggered by a button.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>`}</code>
        </pre>
      </section>

      {/* With Label */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Label</h2>
        <div className="p-6 bg-card rounded-lg border">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="framework">Framework</Label>
            <Select>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="remix">Remix</SelectItem>
                <SelectItem value="astro">Astro</SelectItem>
                <SelectItem value="gatsby">Gatsby</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="framework">Framework</Label>
  <Select>
    <SelectTrigger id="framework">
      <SelectValue placeholder="Select framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="next">Next.js</SelectItem>
      <SelectItem value="remix">Remix</SelectItem>
    </SelectContent>
  </Select>
</div>`}</code>
        </pre>
      </section>

      {/* With Groups */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Groups</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>North America</SelectLabel>
                <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                <SelectItem value="cet">Central European Time (CET)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Asia</SelectLabel>
                <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Select>
  <SelectTrigger className="w-[280px]">
    <SelectValue placeholder="Select a timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Standard Time</SelectItem>
      <SelectItem value="cst">Central Standard Time</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">Greenwich Mean Time</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}</code>
        </pre>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled</h2>
        <div className="p-6 bg-card rounded-lg border space-y-4">
          <Select disabled>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Disabled select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option">Option</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="With disabled option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unavailable" disabled>Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`{/* Disabled Select */}
<Select disabled>
  <SelectTrigger>
    <SelectValue placeholder="Disabled select" />
  </SelectTrigger>
  ...
</Select>

{/* Disabled Option */}
<SelectItem value="unavailable" disabled>Unavailable</SelectItem>`}</code>
        </pre>
      </section>

      {/* Multi Select */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Multi Select</h2>
        <p className="text-muted-foreground">
          A composable multi-select variant with checkboxes that clearly signals multiple selection.
        </p>
        <div className="p-6 bg-card rounded-lg border space-y-4">
          <MultiSelect>
            <MultiSelectTrigger className="w-[280px]">
              <MultiSelectValue placeholder="Select fruits" />
            </MultiSelectTrigger>
            <MultiSelectContent>
              <MultiSelectItem value="apple">Apple</MultiSelectItem>
              <MultiSelectItem value="banana">Banana</MultiSelectItem>
              <MultiSelectItem value="orange">Orange</MultiSelectItem>
              <MultiSelectItem value="grape">Grape</MultiSelectItem>
            </MultiSelectContent>
          </MultiSelect>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<MultiSelect>
  <MultiSelectTrigger className="w-[280px]">
    <MultiSelectValue placeholder="Select fruits" />
  </MultiSelectTrigger>
  <MultiSelectContent>
    <MultiSelectItem value="apple">Apple</MultiSelectItem>
    <MultiSelectItem value="banana">Banana</MultiSelectItem>
    <MultiSelectItem value="orange">Orange</MultiSelectItem>
  </MultiSelectContent>
</MultiSelect>`}</code>
        </pre>
      </section>

      {/* Multi Select with Groups */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Multi Select with Groups</h2>
        <div className="p-6 bg-card rounded-lg border">
          <MultiSelect>
            <MultiSelectTrigger className="w-[280px]">
              <MultiSelectValue placeholder="Select timezones" />
            </MultiSelectTrigger>
            <MultiSelectContent>
              <MultiSelectGroup>
                <MultiSelectLabel>North America</MultiSelectLabel>
                <MultiSelectItem value="est">Eastern Standard Time (EST)</MultiSelectItem>
                <MultiSelectItem value="cst">Central Standard Time (CST)</MultiSelectItem>
                <MultiSelectItem value="pst">Pacific Standard Time (PST)</MultiSelectItem>
              </MultiSelectGroup>
              <MultiSelectGroup>
                <MultiSelectLabel>Europe</MultiSelectLabel>
                <MultiSelectItem value="gmt">Greenwich Mean Time (GMT)</MultiSelectItem>
                <MultiSelectItem value="cet">Central European Time (CET)</MultiSelectItem>
              </MultiSelectGroup>
              <MultiSelectGroup>
                <MultiSelectLabel>Asia</MultiSelectLabel>
                <MultiSelectItem value="jst">Japan Standard Time (JST)</MultiSelectItem>
                <MultiSelectItem value="ist">India Standard Time (IST)</MultiSelectItem>
              </MultiSelectGroup>
            </MultiSelectContent>
          </MultiSelect>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<MultiSelect>
  <MultiSelectTrigger className="w-[280px]">
    <MultiSelectValue placeholder="Select timezones" />
  </MultiSelectTrigger>
  <MultiSelectContent>
    <MultiSelectGroup>
      <MultiSelectLabel>North America</MultiSelectLabel>
      <MultiSelectItem value="est">Eastern Standard Time</MultiSelectItem>
      <MultiSelectItem value="cst">Central Standard Time</MultiSelectItem>
    </MultiSelectGroup>
    <MultiSelectGroup>
      <MultiSelectLabel>Europe</MultiSelectLabel>
      <MultiSelectItem value="gmt">Greenwich Mean Time</MultiSelectItem>
    </MultiSelectGroup>
  </MultiSelectContent>
</MultiSelect>`}</code>
        </pre>
      </section>

      {/* Multi Select with Search & Load More */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Multi Select with Search & Load More</h2>
        <p className="text-muted-foreground">
          For long lists, use the options-based MultiSelect which includes search, incremental loading, and a clear selection button.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <MultiSelectOptions
            options={manyOptions}
            placeholder="Select fruits..."
            className="w-[280px]"
          />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { MultiSelect } from "@/components/ui/multi-select"

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  // ... 20 items
]

<MultiSelect
  options={options}
  placeholder="Select fruits..."
  initialDisplayCount={10}
  displayIncrement={10}
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
                <td className="py-2 pr-4 font-mono text-xs">Select</td>
                <td className="py-2 text-muted-foreground">The root select component</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">SelectTrigger</td>
                <td className="py-2 text-muted-foreground">The button that opens the select</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">SelectValue</td>
                <td className="py-2 text-muted-foreground">Displays the selected value</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">SelectContent</td>
                <td className="py-2 text-muted-foreground">The dropdown content container</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">SelectGroup</td>
                <td className="py-2 text-muted-foreground">Groups related items together</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">SelectLabel</td>
                <td className="py-2 text-muted-foreground">Label for a group of items</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">SelectItem</td>
                <td className="py-2 text-muted-foreground">An individual select option</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
