"use client"

import { useCampaign } from "../CampaignWizard"
import { ObjectiveCard } from "../ObjectiveCard"
import { objectives } from "@/lib/campaigns/data"

export function ObjectiveStep() {
  const { state, dispatch } = useCampaign()

  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Qual é o objetivo da campanha?
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Selecione o tipo de ação que você deseja que os pacientes realizem.
        </p>
      </div>

      {/* Objectives Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {objectives.map((objective) => (
          <ObjectiveCard
            key={objective.id}
            id={objective.id}
            name={objective.name}
            description={objective.description}
            icon={objective.icon as "Heart" | "Calendar" | "FileText" | "ClipboardList" | "UserCheck" | "Megaphone"}
            selected={state.objective === objective.id}
            onSelect={() =>
              dispatch({
                type: "SELECT_OBJECTIVE",
                payload: { objective: objective.id, name: objective.name },
              })
            }
          />
        ))}
      </div>
    </div>
  )
}
