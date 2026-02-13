"use client"

import * as React from "react"
import type { CampaignStateV3, CampaignActionV3 } from "@/lib/campaigns/types-v3"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { CampaignStepperV3 } from "./CampaignStepperV3"
import { CampaignFooterV3 } from "./CampaignFooterV3"
import { ObjectiveStepV3 } from "./steps/ObjectiveStepV3"
import { AudienceStepV3 } from "./steps/AudienceStepV3"
import { MessageStepV3 } from "./steps/MessageStepV3"
import { DistributionStep } from "./steps/DistributionStep"
import { ReviewStepV3 } from "./steps/ReviewStepV3"
import { CampaignSuccess } from "@/components/campaigns/CampaignSuccess"

// Initial state
const initialState: CampaignStateV3 = {
  step: 1,
  objective: null,
  objectiveName: null,
  audienceFile: null,
  audienceFileName: null,
  audienceValidation: null,
  selectedCampaign: null,
  distributionType: null,
  distributionConfig: null,
  quotaWarningAcknowledged: false,
  sequenceTimeline: null,
  validation: null,
  isLaunched: false,
}

// Reducer
function campaignReducerV3(state: CampaignStateV3, action: CampaignActionV3): CampaignStateV3 {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload }
    case "SELECT_OBJECTIVE":
      return {
        ...state,
        objective: action.payload.objective,
        objectiveName: action.payload.name,
        selectedCampaign: null, // Clear campaign when objective changes
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
    case "SET_DISTRIBUTION_TYPE":
      return {
        ...state,
        distributionType: action.payload,
        quotaWarningAcknowledged: false, // Reset acknowledgment when type changes
      }
    case "SET_DISTRIBUTION_CONFIG":
      return { ...state, distributionConfig: action.payload }
    case "ACKNOWLEDGE_QUOTA_WARNING":
      return { ...state, quotaWarningAcknowledged: true }
    case "UPDATE_TIMELINE":
      return { ...state, sequenceTimeline: action.payload }
    case "UPDATE_VALIDATION":
      return { ...state, validation: action.payload }
    case "LAUNCH_CAMPAIGN":
      return { ...state, isLaunched: true }
    case "RESET":
      return initialState
    default:
      return state
  }
}

// Context
interface CampaignContextV3Value {
  state: CampaignStateV3
  dispatch: React.Dispatch<CampaignActionV3>
}

const CampaignContextV3 = React.createContext<CampaignContextV3Value | null>(null)

export function useCampaignV3() {
  const context = React.useContext(CampaignContextV3)
  if (!context) {
    throw new Error("useCampaignV3 must be used within CampaignWizardV3")
  }
  return context
}

// Validation helpers
function canProceed(state: CampaignStateV3): boolean {
  switch (state.step) {
    case 1:
      return state.objective !== null
    case 2:
      return state.audienceFile !== null && (state.audienceValidation?.valid ?? 0) > 0
    case 3:
      return state.selectedCampaign !== null
    case 4:
      // Distribution step validation
      if (!state.distributionType || !state.distributionConfig) {
        return false
      }
      // Check if config is complete based on type
      const config = state.distributionConfig
      switch (config.type) {
        case "single_batch":
          if (!config.startDate || !config.startTime) return false
          break
        case "workday_daily":
          if (!config.startDate || !config.startTime) return false
          break
        case "weekly":
          if (!config.startDate || !config.startTime || !config.selectedDays?.length) return false
          break
        case "monthly":
          if (!config.ordinal || !config.weekday || !config.startTime || !config.startMonth) return false
          break
      }
      // Meta tier error is BLOCKING
      if (state.validation?.metaTierError) {
        return false
      }
      // Quota warning needs acknowledgment
      if (state.validation?.quotaWarning && !state.quotaWarningAcknowledged) {
        return false
      }
      return true
    case 5:
      return true
    default:
      return false
  }
}

// Main component
export function CampaignWizardV3() {
  const [state, dispatch] = React.useReducer(campaignReducerV3, initialState)

  const handleNext = () => {
    if (state.step === 5) {
      dispatch({ type: "LAUNCH_CAMPAIGN" })
    } else if (state.step < 5) {
      dispatch({ type: "SET_STEP", payload: (state.step + 1) as 1 | 2 | 3 | 4 | 5 })
    }
  }

  const handleBack = () => {
    if (state.step > 1) {
      dispatch({ type: "SET_STEP", payload: (state.step - 1) as 1 | 2 | 3 | 4 | 5 })
    }
  }

  const handleStepClick = (step: number) => {
    if (step < state.step) {
      dispatch({ type: "SET_STEP", payload: step as 1 | 2 | 3 | 4 | 5 })
    }
  }

  // Show success screen
  if (state.isLaunched) {
    return (
      <CampaignContextV3.Provider value={{ state, dispatch }}>
        <CampaignSuccess />
      </CampaignContextV3.Provider>
    )
  }

  return (
    <CampaignContextV3.Provider value={{ state, dispatch }}>
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
        <CampaignStepperV3 currentStep={state.step} onStepClick={handleStepClick} />

        {/* Main Content */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
          {state.step === 1 && <ObjectiveStepV3 />}
          {state.step === 2 && <AudienceStepV3 />}
          {state.step === 3 && <MessageStepV3 />}
          {state.step === 4 && <DistributionStep />}
          {state.step === 5 && <ReviewStepV3 />}
        </main>

        {/* Footer */}
        <CampaignFooterV3
          canProceed={canProceed(state)}
          onBack={handleBack}
          onNext={handleNext}
        />
      </div>
    </CampaignContextV3.Provider>
  )
}
