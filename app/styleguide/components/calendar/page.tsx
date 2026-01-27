"use client"

import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { DateRange } from "react-day-picker"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Calendar</h1>
        <p className="text-muted-foreground">
          A date field component that allows users to enter and edit date.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Calendar } from "@/components/ui/calendar"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border inline-block">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Selected: {date?.toDateString() ?? "None"}
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`}</code>
        </pre>
      </section>

      {/* Range Selection */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Date Range</h2>
        <div className="p-6 bg-card rounded-lg border inline-block">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            className="rounded-md border"
            numberOfMonths={2}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Range: {dateRange?.from?.toDateString() ?? "Start"} - {dateRange?.to?.toDateString() ?? "End"}
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`const [dateRange, setDateRange] = useState<{
  from: Date | undefined
  to: Date | undefined
}>({ from: new Date(), to: undefined })

<Calendar
  mode="range"
  selected={dateRange}
  onSelect={setDateRange}
  numberOfMonths={2}
/>`}</code>
        </pre>
      </section>

      {/* Multiple Months */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Multiple Months</h2>
        <div className="p-6 bg-card rounded-lg border inline-block">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="rounded-md border"
          />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Calendar
  mode="single"
  numberOfMonths={2}
/>`}</code>
        </pre>
      </section>

      {/* Disabled Dates */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled Dates</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Disable past dates or specific date ranges.
        </p>
        <div className="p-6 bg-card rounded-lg border inline-block">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`{/* Disable past dates */}
<Calendar
  mode="single"
  disabled={(date) => date < new Date()}
/>

{/* Disable weekends */}
<Calendar
  mode="single"
  disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
/>

{/* Disable specific dates */}
<Calendar
  mode="single"
  disabled={[new Date(2024, 0, 1), new Date(2024, 11, 25)]}
/>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">mode</td>
                <td className="py-2 pr-4 font-mono text-xs">single | multiple | range</td>
                <td className="py-2 pr-4 font-mono text-xs">single</td>
                <td className="py-2 text-muted-foreground">Selection mode</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">selected</td>
                <td className="py-2 pr-4 font-mono text-xs">Date | Date[] | DateRange</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Selected date(s)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onSelect</td>
                <td className="py-2 pr-4 font-mono text-xs">function</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Called when selection changes</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                <td className="py-2 pr-4 font-mono text-xs">Date[] | function</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Disabled dates</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">numberOfMonths</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">1</td>
                <td className="py-2 text-muted-foreground">Number of months to display</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">defaultMonth</td>
                <td className="py-2 pr-4 font-mono text-xs">Date</td>
                <td className="py-2 pr-4 font-mono text-xs">today</td>
                <td className="py-2 text-muted-foreground">Initial month to display</td>
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
            <li>Built on react-day-picker</li>
            <li>For date input with a popover, combine with Popover component</li>
            <li>Supports keyboard navigation</li>
            <li>Locale customization available through react-day-picker props</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
