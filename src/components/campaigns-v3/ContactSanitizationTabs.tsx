"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FrozenNumbersList } from "./FrozenNumbersList"
import { InvalidNumbersList } from "./InvalidNumbersList"

export function ContactSanitizationTabs() {
  // In a real implementation, these counts would come from API/state
  const frozenCount = 8 // Mock count from FrozenNumbersList
  const invalidCount = 7 // Mock count from InvalidNumbersList

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Saneamento de Contatos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie números inacessíveis e inválidos por cliente
        </p>
      </div>

      <Tabs defaultValue="frozen" className="w-full">
        <TabsList>
          <TabsTrigger value="frozen">
            Números inacessíveis
            <Badge variant="warning" className="ml-2">
              {frozenCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="invalid">
            Números Inválidos
            <Badge variant="destructive" className="ml-2">
              {invalidCount}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="frozen" className="mt-6">
          <FrozenNumbersList />
        </TabsContent>

        <TabsContent value="invalid" className="mt-6">
          <InvalidNumbersList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
