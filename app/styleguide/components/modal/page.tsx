"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MultiSelect } from "@/components/ui/multi-select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogBody,
} from "@/components/ui/dialog"
import {
  ConfirmationModal,
  FormModal,
  FilterModal,
  FilterSection,
  ListModal,
  type ListModalItem,
} from "@/components/ui/modal"

const sampleUsers: ListModalItem[] = [
  { id: "1", label: "John Doe", description: "john@example.com" },
  { id: "2", label: "Jane Smith", description: "jane@example.com" },
  { id: "3", label: "Bob Johnson", description: "bob@example.com" },
  { id: "4", label: "Alice Williams", description: "alice@example.com" },
  { id: "5", label: "Charlie Brown", description: "charlie@example.com" },
  { id: "6", label: "Diana Prince", description: "diana@example.com" },
  { id: "7", label: "Edward Norton", description: "edward@example.com", disabled: true },
]

export default function ModalPage() {
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([])

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Modal</h1>
        <p className="text-muted-foreground">
          A comprehensive set of modal components for various use cases including confirmations, forms, filters, and list selections.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`// Enhanced Dialog with size variants
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogBody,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

// Specialized Modal components
import {
  ConfirmationModal,
  FormModal,
  FilterModal,
  FilterSection,
  ListModal,
} from "@/components/ui/modal"

// MultiSelect for filter fields with multiple selections
import { MultiSelect } from "@/components/ui/multi-select"`}</code>
        </pre>
      </section>

      {/* Dialog Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Dialog Sizes</h2>
        <p className="text-muted-foreground text-sm">
          The Dialog component now supports size variants: sm, md (default), lg, xl, and full.
        </p>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Small (sm)</Button>
            </DialogTrigger>
            <DialogContent size="sm">
              <DialogHeader>
                <DialogTitle>Small Dialog</DialogTitle>
                <DialogDescription>
                  Perfect for quick confirmations and simple messages.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                This is a small dialog with max-width of 384px.
              </p>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Medium (md)</Button>
            </DialogTrigger>
            <DialogContent size="md">
              <DialogHeader>
                <DialogTitle>Medium Dialog</DialogTitle>
                <DialogDescription>
                  The default size, suitable for most use cases.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                This is a medium dialog with max-width of 512px.
              </p>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Large (lg)</Button>
            </DialogTrigger>
            <DialogContent size="lg">
              <DialogHeader>
                <DialogTitle>Large Dialog</DialogTitle>
                <DialogDescription>
                  For complex forms and content that needs more space.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                This is a large dialog with max-width of 672px.
              </p>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Extra Large (xl)</Button>
            </DialogTrigger>
            <DialogContent size="xl">
              <DialogHeader>
                <DialogTitle>Extra Large Dialog</DialogTitle>
                <DialogDescription>
                  For data-heavy content like tables and detailed views.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                This is an extra large dialog with max-width of 896px.
              </p>
            </DialogContent>
          </Dialog>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<DialogContent size="sm">  {/* 384px */}
<DialogContent size="md">  {/* 512px - default */}
<DialogContent size="lg">  {/* 672px */}
<DialogContent size="xl">  {/* 896px */}
<DialogContent size="full"> {/* Near fullscreen */}`}</code>
        </pre>
      </section>

      {/* Scrollable Content */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Scrollable Content</h2>
        <p className="text-muted-foreground text-sm">
          Use the scrollBehavior=&quot;scrollable&quot; variant with DialogBody for long content.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Scrollable Dialog</Button>
            </DialogTrigger>
            <DialogContent size="md" scrollBehavior="scrollable">
              <DialogHeader>
                <DialogTitle>Long Content Dialog</DialogTitle>
                <DialogDescription>
                  This dialog contains scrollable content.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                {Array.from({ length: 20 }).map((_, i) => (
                  <p key={i} className="text-sm text-muted-foreground mb-4">
                    Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                ))}
              </DialogBody>
              <DialogFooter className="pt-4 border-t border-border/60">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<DialogContent scrollBehavior="scrollable">
  <DialogHeader>...</DialogHeader>
  <DialogBody>
    {/* Scrollable content */}
  </DialogBody>
  <DialogFooter>...</DialogFooter>
</DialogContent>`}</code>
        </pre>
      </section>

      {/* Confirmation Modal */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Confirmation Modal</h2>
        <p className="text-muted-foreground text-sm">
          Pre-built confirmation dialogs with intent variants for different types of actions.
        </p>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <ConfirmationModal
            title="Confirm Action"
            description="Are you sure you want to proceed with this action?"
            onConfirm={() => console.log("Confirmed")}
            trigger={<Button variant="outline">Default</Button>}
          />

          <ConfirmationModal
            title="Delete Item"
            description="This action cannot be undone. The item will be permanently deleted."
            intent="destructive"
            confirmLabel="Delete"
            onConfirm={() => console.log("Deleted")}
            trigger={<Button variant="destructive">Destructive</Button>}
          />

          <ConfirmationModal
            title="Warning"
            description="This will affect all users in the organization. Proceed with caution."
            intent="warning"
            confirmLabel="Proceed"
            onConfirm={() => console.log("Proceeded")}
            trigger={<Button variant="outline">Warning</Button>}
          />

          <ConfirmationModal
            title="Information"
            description="Your session will be saved automatically when you close this dialog."
            intent="info"
            confirmLabel="Got it"
            cancelLabel="Learn more"
            onConfirm={() => console.log("Acknowledged")}
            trigger={<Button variant="outline">Info</Button>}
          />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ConfirmationModal
  title="Delete Item"
  description="This action cannot be undone."
  intent="destructive"
  confirmLabel="Delete"
  onConfirm={async () => {
    await deleteItem(id)
  }}
  trigger={<Button variant="destructive">Delete</Button>}
/>`}</code>
        </pre>
      </section>

      {/* Form Modal */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Form Modal</h2>
        <p className="text-muted-foreground text-sm">
          Optimized for forms with built-in scroll handling and submit/cancel actions.
        </p>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <FormModal
            title="Create New User"
            description="Fill in the details to create a new user account."
            onSubmit={async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000))
              console.log("User created")
            }}
            trigger={<Button>Create User</Button>}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder="Enter role" />
              </div>
            </div>
          </FormModal>

          <FormModal
            title="Edit Settings"
            description="Update your application settings."
            size="lg"
            submitLabel="Update Settings"
            onSubmit={async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000))
              console.log("Settings updated")
            }}
            trigger={<Button variant="outline">Large Form</Button>}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="My Application" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-url">Site URL</Label>
                <Input id="site-url" defaultValue="https://example.com" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter a description" />
              </div>
            </div>
          </FormModal>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<FormModal
  title="Create New User"
  description="Fill in the details."
  size="lg"
  onSubmit={async () => {
    await createUser(formData)
  }}
  trigger={<Button>Create User</Button>}
>
  <div className="space-y-4">
    <Input placeholder="Full Name" />
    <Input placeholder="Email" type="email" />
  </div>
</FormModal>`}</code>
        </pre>
      </section>

      {/* Filter Modal */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Filter Modal</h2>
        <p className="text-muted-foreground text-sm">
          Filter panels with apply/reset actions and active filter count badge.
        </p>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <FilterModal
            activeFilterCount={0}
            onApply={() => console.log("Filters applied")}
            onReset={() => console.log("Filters reset")}
          >
            <FilterSection title="Status">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="active" />
                  <Label htmlFor="active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pending" />
                  <Label htmlFor="pending">Pending</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="archived" />
                  <Label htmlFor="archived">Archived</Label>
                </div>
              </div>
            </FilterSection>
            <FilterSection title="Price Range">
              <Slider defaultValue={[50]} max={100} step={1} />
              <p className="text-xs text-muted-foreground mt-2">$0 - $100</p>
            </FilterSection>
          </FilterModal>

          <FilterModal
            title="Advanced Filters"
            activeFilterCount={3}
            onApply={() => console.log("Filters applied")}
            onReset={() => console.log("Filters reset")}
            trigger={<Button variant="secondary">With Active Filters</Button>}
          >
            <FilterSection title="Category">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="electronics" defaultChecked />
                  <Label htmlFor="electronics">Electronics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="clothing" defaultChecked />
                  <Label htmlFor="clothing">Clothing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="books" />
                  <Label htmlFor="books">Books</Label>
                </div>
              </div>
            </FilterSection>
            <FilterSection title="Rating">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="4stars" defaultChecked />
                  <Label htmlFor="4stars">4+ Stars</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="3stars" />
                  <Label htmlFor="3stars">3+ Stars</Label>
                </div>
              </div>
            </FilterSection>
          </FilterModal>
        </div>
      </section>

      {/* Real-World Filter Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Real-World Example: Chat Filters</h2>
        <p className="text-muted-foreground text-sm">
          A comprehensive filter modal similar to what you might use in a healthcare or CRM application.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <FilterModal
            title="Filtrar"
            activeFilterCount={8}
            onApply={() => console.log("Filters applied")}
            onReset={() => console.log("Filters reset")}
            applyLabel="Aplicar"
            cancelLabel="Cancelar"
            resetLabel="LIMPAR"
            trigger={<Button>Abrir Filtros do Chat</Button>}
          >
            <FilterSection title="Status">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um ou mais status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </FilterSection>

            <FilterSection title="Substatus">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um substatus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-atendimento">1º Atendimento Agendado</SelectItem>
                  <SelectItem value="retorno">Retorno Agendado</SelectItem>
                  <SelectItem value="aguardando">Aguardando Resposta</SelectItem>
                </SelectContent>
              </Select>
            </FilterSection>

            <FilterSection title="Conversas">
              <RadioGroup defaultValue="nao-lidas" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao-lidas" id="nao-lidas" />
                  <Label htmlFor="nao-lidas">Não lidas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lidas" id="lidas" />
                  <Label htmlFor="lidas">Lidas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="todas" id="todas" />
                  <Label htmlFor="todas">Todas</Label>
                </div>
              </RadioGroup>
            </FilterSection>

            <FilterSection title="Tempo de Resposta">
              <MultiSelect
                placeholder="Selecione um ou mais tempos de resposta"
                options={[
                  { value: "fora-prazo", label: "Fora do prazo" },
                  { value: "quase-prazo", label: "Quase no prazo" },
                  { value: "no-prazo", label: "No prazo" },
                ]}
              />
            </FilterSection>

            <FilterSection title="Grupo de Pacientes (0 de 14.065)">
              <MultiSelect
                placeholder="Selecione um ou mais grupos de pacientes"
                options={[
                  { value: "grupo-01", label: "Grupo 01" },
                  { value: "grupo-02", label: "Grupo 02" },
                  { value: "grupo-03", label: "Grupo 03" },
                ]}
              />
              <div className="flex items-center space-x-2 mt-3">
                <Checkbox id="sem-grupo" />
                <Label htmlFor="sem-grupo" className="text-sm">
                  Mostrar pacientes sem grupo (não cadastrados)
                </Label>
              </div>
            </FilterSection>

            <FilterSection title="Equipe de Cuidado (0 de 534)">
              <MultiSelect
                placeholder="Selecione uma ou mais equipes de cuidado"
                options={[
                  { value: "equipe-01", label: "Equipe 01" },
                  { value: "equipe-02", label: "Equipe 02" },
                  { value: "equipe-03", label: "Equipe 03" },
                ]}
              />
              <div className="flex items-center space-x-2 mt-3">
                <Checkbox id="sem-equipe" />
                <Label htmlFor="sem-equipe" className="text-sm">
                  Mostrar pacientes sem equipe de cuidado
                </Label>
              </div>
            </FilterSection>

            <FilterSection title="Profissional responsável (0 de 934)">
              <MultiSelect
                placeholder="Selecione um ou mais profissionais"
                options={[
                  { value: "anna", label: "Anna Nery (eu)" },
                  { value: "prof-01", label: "Profissional 01" },
                  { value: "prof-02", label: "Profissional 02" },
                  { value: "prof-03", label: "Profissional 03" },
                ]}
              />
            </FilterSection>

            <FilterSection title="Diretrizes (0 de 500)">
              <MultiSelect
                placeholder="Selecione uma ou mais diretrizes"
                options={[
                  { value: "diretriz-01", label: "Diretriz 01" },
                  { value: "diretriz-02", label: "Diretriz 02" },
                  { value: "diretriz-03", label: "Diretriz 03" },
                ]}
              />
            </FilterSection>

            <FilterSection title="Etiquetas (0 de 390)">
              <MultiSelect
                placeholder="Selecione uma ou mais etiquetas"
                options={[
                  { value: "etiqueta-01", label: "Etiqueta 01" },
                  { value: "etiqueta-02", label: "Etiqueta 02" },
                  { value: "etiqueta-03", label: "Etiqueta 03" },
                ]}
              />
            </FilterSection>
          </FilterModal>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { MultiSelect } from "@/components/ui/multi-select"

<FilterModal
  title="Filtrar"
  activeFilterCount={8}
  onApply={handleApplyFilters}
  onReset={handleResetFilters}
  applyLabel="Aplicar"
  cancelLabel="Cancelar"
  resetLabel="LIMPAR"
>
  <FilterSection title="Status">
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Selecione..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ativo">Ativo</SelectItem>
      </SelectContent>
    </Select>
  </FilterSection>

  <FilterSection title="Conversas">
    <RadioGroup defaultValue="nao-lidas" className="flex gap-4">
      <RadioGroupItem value="nao-lidas" id="nao-lidas" />
      <Label htmlFor="nao-lidas">Não lidas</Label>
    </RadioGroup>
  </FilterSection>

  {/* Use MultiSelect for fields that allow multiple selections */}
  <FilterSection title="Grupo de Pacientes">
    <MultiSelect
      placeholder="Selecione um ou mais grupos"
      options={[
        { value: "grupo-01", label: "Grupo 01" },
        { value: "grupo-02", label: "Grupo 02" },
      ]}
      value={selectedGroups}
      onValueChange={setSelectedGroups}
    />
  </FilterSection>
</FilterModal>`}</code>
        </pre>
      </section>

      {/* List Modal */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">List Modal</h2>
        <p className="text-muted-foreground text-sm">
          Searchable list selection with single or multi-select support.
        </p>
        <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
          <ListModal
            title="Select User"
            description="Choose a user from the list below."
            items={sampleUsers}
            onConfirm={(selected) => console.log("Selected:", selected)}
            trigger={<Button variant="outline">Single Select</Button>}
          />

          <ListModal
            title="Select Team Members"
            description="Choose multiple users to add to the team."
            items={sampleUsers}
            selectedIds={selectedUsers}
            onSelect={setSelectedUsers}
            onConfirm={(selected) => {
              console.log("Selected:", selected)
              setSelectedUsers([])
            }}
            multiple
            trigger={<Button variant="outline">Multi Select</Button>}
          />

          <ListModal
            title="Select Users"
            description="Search and select from available users."
            items={sampleUsers}
            size="lg"
            multiple
            searchPlaceholder="Search by name or email..."
            emptyMessage="No users match your search."
            confirmLabel="Add Selected"
            onConfirm={(selected) => console.log("Selected:", selected)}
            trigger={<Button>Large List Modal</Button>}
          />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ListModal
  title="Select Team Members"
  items={users}
  selectedIds={selectedIds}
  onSelect={setSelectedIds}
  onConfirm={(selected) => handleAddMembers(selected)}
  multiple
  searchPlaceholder="Search users..."
  trigger={<Button>Select Members</Button>}
/>`}</code>
        </pre>
      </section>

      {/* Components Table */}
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
                <td className="py-2 pr-4 font-mono text-xs">DialogContent</td>
                <td className="py-2 text-muted-foreground">Enhanced with size and scrollBehavior variants</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">DialogBody</td>
                <td className="py-2 text-muted-foreground">Scrollable content area for long content</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ConfirmationModal</td>
                <td className="py-2 text-muted-foreground">Pre-built confirmation dialog with intent variants</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">FormModal</td>
                <td className="py-2 text-muted-foreground">Form container with submit handling and scroll</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">FilterModal</td>
                <td className="py-2 text-muted-foreground">Filter panel with apply/reset actions</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">FilterSection</td>
                <td className="py-2 text-muted-foreground">Helper component for filter groups</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ListModal</td>
                <td className="py-2 text-muted-foreground">Searchable list with single/multi-select</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">MultiSelect</td>
                <td className="py-2 text-muted-foreground">Multi-select dropdown for filter fields</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* MultiSelect */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">MultiSelect</h2>
        <p className="text-muted-foreground text-sm">
          A multi-select dropdown component for filter fields that allows selecting multiple options.
        </p>
        <div className="p-6 bg-card rounded-lg border space-y-4">
          <div className="space-y-2 max-w-sm">
            <Label>Select multiple items</Label>
            <MultiSelect
              placeholder="Select options..."
              options={[
                { value: "option-1", label: "Option 1" },
                { value: "option-2", label: "Option 2" },
                { value: "option-3", label: "Option 3" },
                { value: "option-4", label: "Option 4" },
                { value: "option-5", label: "Option 5", disabled: true },
              ]}
            />
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<MultiSelect
  placeholder="Select options..."
  options={[
    { value: "option-1", label: "Option 1" },
    { value: "option-2", label: "Option 2" },
    { value: "option-3", label: "Option 3", disabled: true },
  ]}
  value={selectedValues}
  onValueChange={setSelectedValues}
  maxDisplayedItems={3}
/>`}</code>
        </pre>
      </section>

      {/* DialogContent Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">DialogContent Props</h2>
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
                <td className="py-2 pr-4 font-mono text-xs">size</td>
                <td className="py-2 pr-4 font-mono text-xs">sm | md | lg | xl | full</td>
                <td className="py-2 pr-4 text-muted-foreground">md</td>
                <td className="py-2 text-muted-foreground">Dialog width</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">scrollBehavior</td>
                <td className="py-2 pr-4 font-mono text-xs">default | scrollable</td>
                <td className="py-2 pr-4 text-muted-foreground">default</td>
                <td className="py-2 text-muted-foreground">Enable scroll container</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">hideCloseButton</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 text-muted-foreground">false</td>
                <td className="py-2 text-muted-foreground">Hide the X close button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* MultiSelect Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">MultiSelect Props</h2>
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
                <td className="py-2 pr-4 font-mono text-xs">options</td>
                <td className="py-2 pr-4 font-mono text-xs">MultiSelectOption[]</td>
                <td className="py-2 pr-4 text-muted-foreground">required</td>
                <td className="py-2 text-muted-foreground">Array of options with value, label, disabled</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">value</td>
                <td className="py-2 pr-4 font-mono text-xs">string[]</td>
                <td className="py-2 pr-4 text-muted-foreground">-</td>
                <td className="py-2 text-muted-foreground">Controlled selected values</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onValueChange</td>
                <td className="py-2 pr-4 font-mono text-xs">(value: string[]) =&gt; void</td>
                <td className="py-2 pr-4 text-muted-foreground">-</td>
                <td className="py-2 text-muted-foreground">Callback when selection changes</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">placeholder</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 text-muted-foreground">&quot;Select options...&quot;</td>
                <td className="py-2 text-muted-foreground">Placeholder text</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">maxDisplayedItems</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 text-muted-foreground">3</td>
                <td className="py-2 text-muted-foreground">Max badges shown before &quot;+N&quot;</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 text-muted-foreground">false</td>
                <td className="py-2 text-muted-foreground">Disable the select</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Focus is trapped within the modal when open</li>
          <li>Press Escape to close the modal</li>
          <li>Click outside the modal to close it (except ConfirmationModal)</li>
          <li>Title and Description are announced by screen readers</li>
          <li>Focus returns to trigger element when modal closes</li>
          <li>All modals built on top of Radix UI Dialog primitive</li>
        </ul>
      </section>

      {/* When to Use */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">When to Use</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Component</th>
                <th className="text-left py-2">Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">Dialog</td>
                <td className="py-2 text-muted-foreground">Generic modal needs, custom layouts, full control</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">ConfirmationModal</td>
                <td className="py-2 text-muted-foreground">Destructive actions, important confirmations, alerts</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">FormModal</td>
                <td className="py-2 text-muted-foreground">Creating/editing records, settings, user input forms</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">FilterModal</td>
                <td className="py-2 text-muted-foreground">Search filters, faceted navigation, data filtering</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">ListModal</td>
                <td className="py-2 text-muted-foreground">User/item selection, pickers, searchable lists</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">MultiSelect</td>
                <td className="py-2 text-muted-foreground">Filter fields, tags, categories, any multi-option selection</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
