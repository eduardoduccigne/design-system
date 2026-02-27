"use client"

import * as React from "react"
import type { CampaignStateV1, CampaignActionV1 } from "@/lib/campaigns/types-v1"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { CampaignStepperV1 } from "./CampaignStepperV1"
import { CampaignFooterV1 } from "./CampaignFooterV1"
import { ObjectiveStepV1 } from "./steps/ObjectiveStepV1"
import { AudienceStepV1 } from "./steps/AudienceStepV1"
import { MessageStepV1 } from "./steps/MessageStepV1"
import { ReviewStepV1 } from "./steps/ReviewStepV1"
import { CampaignSuccessV1 } from "./CampaignSuccessV1"

// Initial state
const initialState: CampaignStateV1 = {
  step: 1,
  objective: null,
  objectiveName: null,
  audienceFile: null,
  audienceFileName: null,
  audienceValidation: null,
  selectedCampaign: null,
  schedule: null,
  campaignName: null,
  isLaunched: false,
}

// Reducer
function campaignReducerV1(state: CampaignStateV1, action: CampaignActionV1): CampaignStateV1 {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload }
    case "SELECT_OBJECTIVE":
      return {
        ...state,
        objective: action.payload.objective,
        objectiveName: action.payload.name,
        selectedCampaign: null,
      }
    case "SET_AUDIENCE_FILE":
      return {
        ...state,
        audienceFile: action.payload.file,
        audienceFileName: action.payload.file.name,
        audienceValidation: action.payload.validation,
      }
    case "CLEAR_AUDIENCE":
      return {
        ...state,
        audienceFile: null,
        audienceFileName: null,
        audienceValidation: null,
      }
    case "SELECT_CAMPAIGN":
      return { ...state, selectedCampaign: action.payload }
    case "SET_SCHEDULE":
      return { ...state, schedule: action.payload }
    case "SET_CAMPAIGN_NAME":
      return { ...state, campaignName: action.payload }
    case "LAUNCH_CAMPAIGN":
      return { ...state, isLaunched: true }
    case "RESET":
      return initialState
    default:
      return state
  }
}

// Context
interface CampaignContextV1Value {
  state: CampaignStateV1
  dispatch: React.Dispatch<CampaignActionV1>
}

const CampaignContextV1 = React.createContext<CampaignContextV1Value | null>(null)

export function useCampaignV1() {
  const context = React.useContext(CampaignContextV1)
  if (!context) {
    throw new Error("useCampaignV1 must be used within CampaignWizardV1")
  }
  return context
}

// Validation helpers
function canProceed(state: CampaignStateV1): boolean {
  switch (state.step) {
    case 1:
      return state.objective !== null
    case 2:
      return state.audienceFile !== null && (state.audienceValidation?.valid ?? 0) > 0
    case 3:
      return (
        state.selectedCampaign !== null &&
        !!state.schedule?.startDate &&
        !!state.schedule?.startTime
      )
    case 4:
      return true
    default:
      return false
  }
}

// Main component
export function CampaignWizardV1() {
  const [state, dispatch] = React.useReducer(campaignReducerV1, initialState)

  const handleNext = () => {
    if (state.step === 4) {
      // Auto-set campaign name if not manually set
      if (!state.campaignName) {
        const objectivePart = state.objectiveName ?? "Campanha"
        const datePart = state.schedule?.startDate
          ? new Date(state.schedule.startDate + "T00:00:00").toLocaleDateString("pt-BR")
          : ""
        const autoName = datePart ? `${objectivePart} ${datePart}` : objectivePart
        dispatch({ type: "SET_CAMPAIGN_NAME", payload: autoName })
      }
      dispatch({ type: "LAUNCH_CAMPAIGN" })
    } else if (state.step < 4) {
      dispatch({ type: "SET_STEP", payload: (state.step + 1) as 1 | 2 | 3 | 4 })
    }
  }

  const handleBack = () => {
    if (state.step > 1) {
      dispatch({ type: "SET_STEP", payload: (state.step - 1) as 1 | 2 | 3 | 4 })
    }
  }

  const handleStepClick = (step: number) => {
    if (step < state.step) {
      dispatch({ type: "SET_STEP", payload: step as 1 | 2 | 3 | 4 })
    }
  }

  // Show success screen
  if (state.isLaunched) {
    return (
      <CampaignContextV1.Provider value={{ state, dispatch }}>
        <CampaignSuccessV1 />
      </CampaignContextV1.Provider>
    )
  }

  return (
    <CampaignContextV1.Provider value={{ state, dispatch }}>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-card">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Campanhas
            </Button>
            <h1 className="text-lg font-semibold text-foreground">Nova Campanha</h1>
            <Badge variant="warning">Rascunho</Badge>
          </div>
        </header>

        {/* Stepper */}
        <CampaignStepperV1 currentStep={state.step} onStepClick={handleStepClick} />

        {/* Main Content */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
          {state.step === 1 && <ObjectiveStepV1 />}
          {state.step === 2 && <AudienceStepV1 />}
          {state.step === 3 && <MessageStepV1 />}
          {state.step === 4 && <ReviewStepV1 />}
        </main>

        {/* Footer */}
        <CampaignFooterV1
          canProceed={canProceed(state)}
          onBack={handleBack}
          onNext={handleNext}
        />
      </div>
    </CampaignContextV1.Provider>
  )
}
