"use client"

import { useCampaignV1 } from "../CampaignWizardV1"
import { ObjectiveCardV1 } from "../ObjectiveCardV1"
import { objectivesV1 } from "@/lib/campaigns/data-v1"
import type { CampaignObjectiveV1 } from "@/lib/campaigns/types-v1"

export function ObjectiveStepV1() {
  const { state, dispatch } = useCampaignV1()

  const handleSelect = (objective: CampaignObjectiveV1, name: string) => {
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
        {objectivesV1.map((obj) => (
          <ObjectiveCardV1
            key={obj.id}
            name={obj.name}
            description={obj.description}
            icon={obj.icon as "Heart" | "Calendar" | "ClipboardList" | "UserCheck" | "Megaphone" | "CircleDashed"}
            selected={state.objective === obj.id}
            onSelect={() => handleSelect(obj.id, obj.name)}
          />
        ))}
      </div>
    </div>
  )
}
