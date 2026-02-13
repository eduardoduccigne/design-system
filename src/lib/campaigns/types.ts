// Campaign objective identifiers
export type CampaignObjective =
  | "preventive_care"
  | "appointment_reminder"
  | "lab_results"
  | "treatment_followup"
  | "patient_onboarding"
  | "general_announcement"

// Campaign message in a sequence
export interface CampaignMessage {
  id: string
  day: number // D0, D5, D12, etc.
  label: string
  content: string
}

// Campaign template with message sequence
export interface CampaignTemplate {
  id: string
  name: string
  description?: string
  messages: CampaignMessage[]
}

// Audience file validation result
export interface AudienceValidation {
  total: number
  valid: number
  invalid: number
  duplicates: number
  optedOut: number
  frozen: number
}
