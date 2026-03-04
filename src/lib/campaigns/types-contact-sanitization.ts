// Contact Sanitization Types

export interface CampaignFailure {
  id: string
  campaignId: string
  patient: {
    id: string
    name: string
    phone: string
  }
  errorCode: string // "131026", "131049", "130472"
  errorMessage: string // Raw error message from source
  errorMessagePT: string // Translated error message in PT-BR
  attemptCount: number
  source: "meta" | "botmaker"
  lastAttemptDate: string // ISO date
}

export type FailureSourceFilter = "all" | "meta" | "botmaker"
export type FailureAttemptsFilter = "all" | "1" | "2" | "3+"

// Frozen patient for master list
export interface FrozenPatient {
  id: string
  name: string
  cpf: string
  phone: string
  cohort: string // Patient cohort/group
  attemptCount: number
  frozenSince: string // ISO date
  lastDelivery: string | null // ISO date
  lastPatientMessage: string | null // ISO date
}

// ENHANCED: Frozen patient with calculated fields for redesigned UI
export interface FrozenPatientEnhanced {
  id: string
  name: string
  cpf: string
  niloId?: string // Nilo platform patient ID
  phone: string
  clientName: string // Client company name (Banco Safra, Disney, etc.)
  clientId: string // For grouping
  attemptCount: number
  frozenSince: string // ISO date
  daysInaccessible: number // Calculated field for timeline visualization
  lastDelivery: string | null // ISO date
  lastPatientMessage: string | null // ISO date
}

// Group patients by client company
export interface FrozenPatientsByClient {
  clientId: string
  clientName: string
  patientCount: number
  patients: FrozenPatientEnhanced[]
  earliestFrozenDate: string // For urgency sorting
  totalDaysInaccessible: number // Sum of all patient days
}

// Phone edit action
export interface PhoneEditRequest {
  patientId: string
  oldPhone: string
  newPhone: string
  reason?: string
}

// Unfreeze action
export interface UnfreezeRequest {
  patientId: string
  reason?: string
}

// Invalid patient (malformed or never-worked phone numbers)
export interface InvalidPatient {
  id: string
  name: string
  cpf: string
  phone: string
  clientName: string // Client company name
  clientId: string // For grouping
  invalidReason: string // "Formato inválido", "Número incompleto", etc.
  detectedDate: string // ISO date when invalid was detected
}

// Group invalid patients by client company
export interface InvalidPatientsByClient {
  clientId: string
  clientName: string
  patientCount: number
  patients: InvalidPatient[]
}
