"use client"

import * as React from "react"
import type { CampaignState, CampaignAction } from "@/lib/campaigns/types"
import { CampaignStepper } from "./CampaignStepper"
import { CampaignFooter } from "./CampaignFooter"
import { ObjectiveStep } from "./steps/ObjectiveStep"
import { AudienceStep } from "./steps/AudienceStep"
import { MessageStep } from "./steps/MessageStep"
import { ReviewStep } from "./steps/ReviewStep"
import { CampaignSuccess } from "./CampaignSuccess"

// Initial state
const initialState: CampaignState = {
  step: 1,
  objective: null,
  objectiveName: null,
  audienceFile: null,
  audienceFileName: null,
  audienceValidation: null,
  selectedCampaign: null,
  scheduleDate: null,
  scheduleTime: null,
  isLaunched: false,
}

// Reducer
function campaignReducer(state: CampaignState, action: CampaignAction): CampaignState {
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
    case "SET_SCHEDULE_DATE":
      return { ...state, scheduleDate: action.payload }
    case "SET_SCHEDULE_TIME":
      return { ...state, scheduleTime: action.payload }
    case "LAUNCH_CAMPAIGN":
      return { ...state, isLaunched: true }
    case "RESET":
      return initialState
    default:
      return state
  }
}

// Context
interface CampaignContextValue {
  state: CampaignState
  dispatch: React.Dispatch<CampaignAction>
}

const CampaignContext = React.createContext<CampaignContextValue | null>(null)

export function useCampaign() {
  const context = React.useContext(CampaignContext)
  if (!context) {
    throw new Error("useCampaign must be used within CampaignWizard")
  }
  return context
}

// Validation helpers
function canProceed(state: CampaignState): boolean {
  switch (state.step) {
    case 1:
      return state.objective !== null
    case 2:
      return state.audienceFile !== null && (state.audienceValidation?.valid ?? 0) > 0
    case 3:
      return (
        state.selectedCampaign !== null &&
        state.scheduleDate !== null &&
        state.scheduleTime !== null
      )
    case 4:
      return true
    default:
      return false
  }
}

// Main component
export function CampaignWizard() {
  const [state, dispatch] = React.useReducer(campaignReducer, initialState)

  const handleNext = () => {
    if (state.step === 4) {
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
      <CampaignContext.Provider value={{ state, dispatch }}>
        <CampaignSuccess />
      </CampaignContext.Provider>
    )
  }

  return (
    <CampaignContext.Provider value={{ state, dispatch }}>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-card">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Campanhas
            </button>
            <h1 className="text-lg font-semibold text-foreground">Nova Campanha</h1>
            <span className="px-2 py-1 text-xs font-medium rounded-md bg-yellow-100 text-yellow-700">
              Rascunho
            </span>
          </div>
        </header>

        {/* Stepper */}
        <CampaignStepper currentStep={state.step} onStepClick={handleStepClick} />

        {/* Main Content */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
          {state.step === 1 && <ObjectiveStep />}
          {state.step === 2 && <AudienceStep />}
          {state.step === 3 && <MessageStep />}
          {state.step === 4 && <ReviewStep />}
        </main>

        {/* Footer */}
        <CampaignFooter
          canProceed={canProceed(state)}
          onBack={handleBack}
          onNext={handleNext}
        />
      </div>
    </CampaignContext.Provider>
  )
}
