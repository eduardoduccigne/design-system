// Re-export shared types
export type { CampaignMessage, CampaignTemplate } from "./types"
import type { CampaignObjective as BaseCampaignObjective } from "./types"

// V1 objectives: base objectives + "no_objective", minus "lab_results"
export type CampaignObjectiveV1 = Exclude<BaseCampaignObjective, "lab_results"> | "no_objective"

// Simplified audience validation (no optedOut / frozen)
export interface AudienceValidationV1 {
  total: number
  valid: number
  invalid: number
  duplicates: number
}

// Schedule config (replaces distribution)
export interface ScheduleConfig {
  startDate: string // ISO date string (YYYY-MM-DD)
  startTime: string // HH:mm format, 30-minute increments
}

// Campaign state for v1
export interface CampaignStateV1 {
  step: 1 | 2 | 3 | 4
  objective: CampaignObjectiveV1 | null
  objectiveName: string | null
  audienceFile: File | null
  audienceFileName: string | null
  audienceValidation: AudienceValidationV1 | null
  selectedCampaign: import("./types").CampaignTemplate | null
  schedule: ScheduleConfig | null
  campaignName: string | null
  isLaunched: boolean
}

// Actions for v1
export type CampaignActionV1 =
  | { type: "SET_STEP"; payload: 1 | 2 | 3 | 4 }
  | { type: "SELECT_OBJECTIVE"; payload: { objective: CampaignObjectiveV1; name: string } }
  | { type: "SET_AUDIENCE_FILE"; payload: { file: File; validation: AudienceValidationV1 } }
  | { type: "CLEAR_AUDIENCE" }
  | { type: "SELECT_CAMPAIGN"; payload: import("./types").CampaignTemplate }
  | { type: "SET_SCHEDULE"; payload: ScheduleConfig }
  | { type: "SET_CAMPAIGN_NAME"; payload: string }
  | { type: "LAUNCH_CAMPAIGN" }
  | { type: "RESET" }
