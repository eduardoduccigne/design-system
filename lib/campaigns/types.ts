// Campaign objective types
export type CampaignObjective =
  | "program"
  | "appointment"
  | "exam"
  | "survey"
  | "reengagement"
  | "awareness"

// Objective metadata
export interface ObjectiveInfo {
  id: CampaignObjective
  name: string
  description: string
  icon: string // Lucide icon name
}

// Campaign message structure
export interface CampaignMessage {
  day: number
  text: string
}

// Campaign template
export interface CampaignTemplate {
  id: string
  name: string
  messages: CampaignMessage[]
}

// Uploaded file validation results
export interface AudienceValidation {
  total: number
  valid: number
  invalidPhone: number
  optOut: number
  missingData: number
}

// Main campaign state
export interface CampaignState {
  step: 1 | 2 | 3 | 4
  objective: CampaignObjective | null
  objectiveName: string | null
  audienceFile: File | null
  audienceFileName: string | null
  audienceValidation: AudienceValidation | null
  selectedCampaign: CampaignTemplate | null
  scheduleDate: string | null
  scheduleTime: string | null
  isLaunched: boolean
}

// Action types for reducer
export type CampaignAction =
  | { type: "SET_STEP"; payload: 1 | 2 | 3 | 4 }
  | { type: "SELECT_OBJECTIVE"; payload: { objective: CampaignObjective; name: string } }
  | { type: "SET_AUDIENCE_FILE"; payload: { file: File; validation: AudienceValidation } }
  | { type: "CLEAR_AUDIENCE" }
  | { type: "SELECT_CAMPAIGN"; payload: CampaignTemplate }
  | { type: "SET_SCHEDULE_DATE"; payload: string }
  | { type: "SET_SCHEDULE_TIME"; payload: string }
  | { type: "LAUNCH_CAMPAIGN" }
  | { type: "RESET" }
