"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function FormPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Form submitted!", {
      description: JSON.stringify(values, null, 2),
    })
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Form</h1>
        <p className="text-muted-foreground">
          Building forms with React Hook Form and Zod validation.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"`}</code>
        </pre>
      </section>

      {/* Setup */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Setup</h2>
        <p className="text-sm text-muted-foreground mb-4">
          The Form component is built on top of react-hook-form. You&apos;ll need to install these dependencies:
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`npm install react-hook-form @hookform/resolvers zod`}</code>
        </pre>
      </section>

      {/* Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Example</h2>
        <div className="p-6 bg-card rounded-lg border max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" type="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      We&apos;ll never share your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { username: "" },
})

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="johndoe" {...field} />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">Form</td>
                <td className="py-2 text-muted-foreground">Wraps the form and provides context</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">FormField</td>
                <td className="py-2 text-muted-foreground">Connects form fields to react-hook-form</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">FormItem</td>
                <td className="py-2 text-muted-foreground">Container for a form field</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">FormLabel</td>
                <td className="py-2 text-muted-foreground">Label for the form field</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">FormControl</td>
                <td className="py-2 text-muted-foreground">Wraps the input element</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">FormDescription</td>
                <td className="py-2 text-muted-foreground">Helper text for the field</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">FormMessage</td>
                <td className="py-2 text-muted-foreground">Displays validation errors</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Validation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Common Zod Validations</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { z } from "zod"

const schema = z.object({
  // String validations
  name: z.string().min(2).max(50),
  email: z.string().email(),
  url: z.string().url(),

  // Number validations
  age: z.number().min(18).max(120),
  price: z.number().positive(),

  // Optional fields
  bio: z.string().optional(),

  // Enums
  role: z.enum(["admin", "user", "guest"]),

  // Boolean
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),

  // Custom messages
  password: z.string().min(8, "Password must be at least 8 characters"),
})`}</code>
        </pre>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Always define a schema with meaningful error messages</li>
          <li>Use <code className="text-foreground bg-muted px-1 rounded">defaultValues</code> to prevent uncontrolled input warnings</li>
          <li>FormMessage automatically displays validation errors</li>
          <li>Combine with other form components (Select, Checkbox, etc.)</li>
        </ul>
      </section>
    </div>
  )
}
