"use client"

import * as React from "react"
import { Heart, Star, Bell, Zap, User } from "lucide-react"
import { Tag, CareLineTag, CustomTag, FixedTag } from "@/components/ui/tag"

export default function TagPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tag</h1>
        <p className="text-muted-foreground">
          Tags are used to label, categorize, or organize items using keywords that describe them.
          We have three main types: Care Lines, Custom Tags, and Fixed Tags.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { Tag, CareLineTag, CustomTag, FixedTag } from "@/components/ui/tag"`}</code>
        </pre>
      </section>

      {/* Care Lines */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Care Lines</h2>
        <p className="text-muted-foreground text-sm">
          Care Line tags have a fixed, consistent color across the system. All care lines look the same
          visually - only the text content changes. No icons allowed.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <div className="flex flex-wrap gap-2">
            <CareLineTag>Hipertensão</CareLineTag>
            <CareLineTag>Diabetes</CareLineTag>
            <CareLineTag>Gestante</CareLineTag>
            <CareLineTag>Idoso</CareLineTag>
            <CareLineTag>Atenção Domiciliar</CareLineTag>
            <CareLineTag>Acompanhamento</CareLineTag>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<CareLineTag>Hipertensão</CareLineTag>
<CareLineTag>Diabetes</CareLineTag>
<CareLineTag>Gestante</CareLineTag>`}</code>
        </pre>
      </section>

      {/* Custom Tags */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Tags</h2>
        <p className="text-muted-foreground text-sm">
          Custom tags are fully customizable by the user/client. They can have icons and any color
          combination for background and text.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <div className="flex flex-wrap gap-2">
            <CustomTag bgColor="#fecaca" textColor="#991b1b" icon={<Heart className="h-3 w-3" />}>
              Hipertensão
            </CustomTag>
            <CustomTag bgColor="#d9f99d" textColor="#3f6212">
              Desengajado
            </CustomTag>
            <CustomTag bgColor="#fed7aa" textColor="#c2410c">
              Orçamento Enviado
            </CustomTag>
            <CustomTag bgColor="#e9d5ff" textColor="#7c3aed">
              Atenção Domiciliar
            </CustomTag>
            <CustomTag bgColor="#fef3c7" textColor="#92400e" icon={<Star className="h-3 w-3" />}>
              Premium
            </CustomTag>
            <CustomTag bgColor="#dbeafe" textColor="#1e40af" icon={<Bell className="h-3 w-3" />}>
              Alerta
            </CustomTag>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<CustomTag
  bgColor="#fecaca"
  textColor="#991b1b"
  icon={<Heart className="h-3 w-3" />}
>
  Hipertensão
</CustomTag>

<CustomTag bgColor="#d9f99d" textColor="#3f6212">
  Desengajado
</CustomTag>`}</code>
        </pre>
      </section>

      {/* Fixed Tags */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Fixed Tags</h2>
        <p className="text-muted-foreground text-sm">
          Fixed tags use neutral colors and come in two variants: solid and outline.
          Used for general purposes like care teams, topics, insurance, and professionals.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Solid variant (default)</p>
              <div className="flex flex-wrap gap-2">
                <FixedTag>Equipe 01</FixedTag>
                <FixedTag>Careplus Premium</FixedTag>
                <FixedTag>Health 360</FixedTag>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Outline variant</p>
              <div className="flex flex-wrap gap-2">
                <FixedTag variant="outline">Dúvidas</FixedTag>
                <FixedTag variant="outline">Agendamento</FixedTag>
                <FixedTag variant="outline">Retorno</FixedTag>
              </div>
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<FixedTag>Equipe 01</FixedTag>
<FixedTag variant="solid">Careplus Premium</FixedTag>
<FixedTag variant="outline">Dúvidas</FixedTag>`}</code>
        </pre>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <p className="text-muted-foreground text-sm">
          All tag types support three sizes: sm, md (default), and lg.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <div className="flex flex-wrap items-center gap-3">
            <CareLineTag size="sm">Small</CareLineTag>
            <CareLineTag size="md">Medium</CareLineTag>
            <CareLineTag size="lg">Large</CareLineTag>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>
<Tag size="lg">Large</Tag>`}</code>
        </pre>
      </section>

      {/* Removable Tags */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Removable Tags</h2>
        <p className="text-muted-foreground text-sm">
          Tags can be made removable with an X button for filtering interfaces.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <div className="flex flex-wrap gap-2">
            <CareLineTag removable onRemove={() => console.log("removed")}>
              Hipertensão
            </CareLineTag>
            <FixedTag removable onRemove={() => console.log("removed")}>
              Equipe 01
            </FixedTag>
            <CustomTag bgColor="#dbeafe" textColor="#1e40af" removable onRemove={() => console.log("removed")}>
              Custom
            </CustomTag>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<CareLineTag removable onRemove={() => handleRemove()}>
  Hipertensão
</CareLineTag>`}</code>
        </pre>
      </section>

      {/* Real-World Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Real-World Example: Patient Profile</h2>
        <p className="text-muted-foreground text-sm">
          A patient profile combining different tag types for various information categories.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Care Lines (system-defined)</p>
              <div className="flex flex-wrap gap-2">
                <CareLineTag>Hipertensão</CareLineTag>
                <CareLineTag>Diabetes</CareLineTag>
                <CareLineTag>Gestante</CareLineTag>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Custom Tags (user-defined colors)</p>
              <div className="flex flex-wrap gap-2">
                <CustomTag bgColor="#fecaca" textColor="#991b1b">Urgente</CustomTag>
                <CustomTag bgColor="#d9f99d" textColor="#3f6212">Desengajado</CustomTag>
                <CustomTag bgColor="#fed7aa" textColor="#c2410c">Orçamento Enviado</CustomTag>
                <CustomTag bgColor="#e9d5ff" textColor="#7c3aed">Atenção Domiciliar</CustomTag>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Care Team & Insurance (Fixed Tags)</p>
              <div className="flex flex-wrap gap-2">
                <FixedTag>Equipe 01</FixedTag>
                <FixedTag>Careplus Premium</FixedTag>
                <FixedTag>Health 360</FixedTag>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Topics & Categories (Fixed Tags - Outline)</p>
              <div className="flex flex-wrap gap-2">
                <FixedTag variant="outline">Dúvidas</FixedTag>
                <FixedTag variant="outline">Agendamento</FixedTag>
                <FixedTag variant="outline">Medicação</FixedTag>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Props Tables */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tag Props</h2>
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
                <td className="py-2 pr-4 font-mono text-xs">variant</td>
                <td className="py-2 pr-4 font-mono text-xs">solid | outline | careLine</td>
                <td className="py-2 pr-4 text-muted-foreground">solid</td>
                <td className="py-2 text-muted-foreground">Tag style variant</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">size</td>
                <td className="py-2 pr-4 font-mono text-xs">sm | md | lg</td>
                <td className="py-2 pr-4 text-muted-foreground">md</td>
                <td className="py-2 text-muted-foreground">Tag size</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">icon</td>
                <td className="py-2 pr-4 font-mono text-xs">ReactNode</td>
                <td className="py-2 pr-4 text-muted-foreground">-</td>
                <td className="py-2 text-muted-foreground">Icon element (custom tags only)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">bgColor</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 text-muted-foreground">-</td>
                <td className="py-2 text-muted-foreground">Custom background color</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">textColor</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 text-muted-foreground">-</td>
                <td className="py-2 text-muted-foreground">Custom text color</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">removable</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 text-muted-foreground">false</td>
                <td className="py-2 text-muted-foreground">Show remove button</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onRemove</td>
                <td className="py-2 pr-4 font-mono text-xs">() =&gt; void</td>
                <td className="py-2 pr-4 text-muted-foreground">-</td>
                <td className="py-2 text-muted-foreground">Remove button callback</td>
              </tr>
            </tbody>
          </table>
        </div>
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
                <td className="py-2 pr-4 font-medium">CareLineTag</td>
                <td className="py-2 text-muted-foreground">Medical conditions, health status, clinical categories (system-defined, consistent look)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">CustomTag</td>
                <td className="py-2 text-muted-foreground">Client/user-specific categories, branded tags, custom classifications with custom colors</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">FixedTag (solid)</td>
                <td className="py-2 text-muted-foreground">Care teams, insurance plans, professionals, institutions</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">FixedTag (outline)</td>
                <td className="py-2 text-muted-foreground">Chat topics, conversation categories, secondary classifications</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
