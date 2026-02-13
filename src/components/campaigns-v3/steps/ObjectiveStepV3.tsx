"use client"

import { useCampaignV3 } from "../CampaignWizardV3"
import { ObjectiveCard } from "@/components/campaigns/ObjectiveCard"
import { objectives } from "@/lib/campaigns/data"
import type { CampaignObjective } from "@/lib/campaigns/types"

export function ObjectiveStepV3() {
  const { state, dispatch } = useCampaignV3()

  const handleSelect = (objective: CampaignObjective, name: string) => {
    dispatch({
      type: "SELECT_OBJECTIVE",
      payload: { objective, name },
    })
  }

  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Qual é o objetivo da sua campanha?
        </h1>
        <p className="text-muted-foreground">
          Selecione o tipo de comunicação que você deseja enviar.
        </p>
      </div>

      {/* Objective Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {objectives.map((obj) => (
          <ObjectiveCard
            key={obj.id}
            id={obj.id}
            name={obj.name}
            description={obj.description}
            icon={obj.icon as "Heart" | "Calendar" | "FileText" | "ClipboardList" | "UserCheck" | "Megaphone"}
            selected={state.objective === obj.id}
            onSelect={() => handleSelect(obj.id, obj.name)}
          />
        ))}
      </div>
    </div>
  )
}
