import type { FrozenPatientEnhanced, FrozenPatientsByClient } from "./types-contact-sanitization"

/**
 * Group patients by client company and sort by urgency (earliest frozen date)
 */
export function groupPatientsByClient(
  patients: FrozenPatientEnhanced[]
): FrozenPatientsByClient[] {
  // Group patients by clientId
  const grouped = patients.reduce((acc, patient) => {
    const key = patient.clientId
    if (!acc[key]) {
      acc[key] = {
        clientId: patient.clientId,
        clientName: patient.clientName,
        patients: [],
        patientCount: 0,
        earliestFrozenDate: patient.frozenSince,
        totalDaysInaccessible: 0,
      }
    }
    acc[key].patients.push(patient)
    acc[key].patientCount++
    acc[key].totalDaysInaccessible += patient.daysInaccessible

    // Track earliest frozen date for urgency sorting
    if (new Date(patient.frozenSince) < new Date(acc[key].earliestFrozenDate)) {
      acc[key].earliestFrozenDate = patient.frozenSince
    }

    return acc
  }, {} as Record<string, FrozenPatientsByClient>)

  // Sort by urgency (earliest frozen date first)
  return Object.values(grouped).sort(
    (a, b) => new Date(a.earliestFrozenDate).getTime() - new Date(b.earliestFrozenDate).getTime()
  )
}

/**
 * Calculate days between frozen date and today
 */
export function calculateDaysInaccessible(frozenSince: string): number {
  const today = new Date()
  const frozen = new Date(frozenSince)
  const diffMs = today.getTime() - frozen.getTime()
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

/**
 * Export client-specific CSV with full patient data
 */
export function exportClientCSV(
  clientName: string,
  patients: FrozenPatientEnhanced[]
): void {
  const csv = [
    "patient_id,nome,cpf,telefone,dias_inacessivel,tentativas,data_congelamento",
    ...patients.map(p =>
      `${p.id},${p.name},${p.cpf},${p.phone},${p.daysInaccessible},${p.attemptCount},${p.frozenSince}`
    )
  ].join("\n")

  const blob = new Blob([csv], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `numeros-congelados-${clientName.toLowerCase().replace(/\s+/g, '-')}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
