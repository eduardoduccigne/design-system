// Re-export everything from original data
export * from "./data"

import type {
  QuotaData,
  MetaAccountHealth,
  SequenceTimeline,
  DistributionValidation,
  DistributionConfig,
  TimelineBatch,
  BatchMessageMarker,
} from "./types-v3"
import type { CampaignMessage } from "./types"

// Available work hours (07:00-20:00 in half-hour increments)
export const workHours = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00",
]

// Ordinal weekday options for monthly distribution
export const ordinalOptions: { value: number; label: string }[] = [
  { value: 1, label: "1ª" },
  { value: 2, label: "2ª" },
  { value: 3, label: "3ª" },
  { value: 4, label: "4ª" },
  { value: -1, label: "Última" },
]

export const weekdayOptions: { value: number; label: string }[] = [
  { value: 1, label: "segunda-feira" },
  { value: 2, label: "terça-feira" },
  { value: 3, label: "quarta-feira" },
  { value: 4, label: "quinta-feira" },
  { value: 5, label: "sexta-feira" },
]

// Month names in Portuguese
const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

// Get month name from date
function getMonthName(date: Date): string {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
}

// Mock quota data — estimates react to distribution config
export function mockQuotaData(
  audienceSize: number,
  messages: CampaignMessage[],
  config?: DistributionConfig | null
): QuotaData {
  const monthlyQuota = 10000
  const alreadySent = 3240
  const scheduled = 1500
  const available = monthlyQuota - alreadySent - scheduled

  // Calculate total messages (worst case: all patients receive all messages)
  const totalMessages = audienceSize * messages.length

  // Calculate per-month estimates based on distribution config
  const campaignEstimateByMonth: { month: string; messages: number }[] = []

  if (config) {
    // Determine start date and sends per day from config
    let startDate: Date
    let patientsPerDay: number

    switch (config.type) {
      case "single_batch":
        startDate = new Date(config.startDate)
        patientsPerDay = audienceSize // All in one day
        break
      case "workday_daily":
        startDate = new Date(config.startDate)
        patientsPerDay = config.sendsPerDay
        break
      case "weekly":
        startDate = new Date(config.startDate)
        patientsPerDay = config.sendsPerDay
        break
      case "monthly":
        startDate = getNthWeekdayOfMonth(config.startMonth, config.ordinal, config.weekday)
        patientsPerDay = config.sendsPerDay
        break
    }

    // Calculate how many calendar days to distribute all initial sends
    let distributionCalendarDays = 1
    if (config.type === "workday_daily") {
      const workdaysNeeded = Math.ceil(audienceSize / patientsPerDay)
      distributionCalendarDays = Math.ceil(workdaysNeeded * (7 / 5))
    } else if (config.type === "weekly") {
      const daysPerWeek = (config as { selectedDays: string[] }).selectedDays?.length || 1
      const weeksNeeded = Math.ceil(audienceSize / (patientsPerDay * daysPerWeek))
      distributionCalendarDays = weeksNeeded * 7
    } else if (config.type === "monthly") {
      const monthsNeeded = Math.ceil(audienceSize / patientsPerDay)
      distributionCalendarDays = monthsNeeded * 30
    }

    // Get the last message day offset (e.g., D12 → 12 days after initial)
    const lastMessageDay = messages.length > 0 ? Math.max(...messages.map((m) => m.day)) : 0
    const totalCalendarDays = distributionCalendarDays + lastMessageDay

    // Distribute messages across actual months
    const monthMap = new Map<string, number>()
    const campaignStart = new Date(startDate)

    // For each message wave, estimate when messages land per month
    for (const msg of messages) {
      const waveStart = new Date(campaignStart)
      waveStart.setDate(waveStart.getDate() + msg.day)

      const waveEnd = new Date(waveStart)
      waveEnd.setDate(waveEnd.getDate() + distributionCalendarDays - 1)

      // Spread this wave's messages across the months it spans
      const current = new Date(waveStart)
      let remaining = audienceSize

      while (remaining > 0 && current <= waveEnd) {
        const monthKey = getMonthName(current)
        // Estimate messages this month (proportional to days in this month)
        const daysLeft = Math.ceil((waveEnd.getTime() - current.getTime()) / (1000 * 60 * 60 * 24)) + 1
        const daysInThisMonth = Math.min(
          daysLeft,
          new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate() - current.getDate() + 1
        )
        const msgsThisMonth = Math.min(remaining, Math.ceil((audienceSize * daysInThisMonth) / Math.max(1, distributionCalendarDays)))

        monthMap.set(monthKey, (monthMap.get(monthKey) ?? 0) + msgsThisMonth)
        remaining -= msgsThisMonth

        // Move to first day of next month
        current.setMonth(current.getMonth() + 1)
        current.setDate(1)
      }
    }

    // Convert map to sorted array
    for (const [month, msgs] of monthMap) {
      campaignEstimateByMonth.push({ month, messages: msgs })
    }
  } else {
    // No config yet — spread evenly across 3 months as fallback
    const today = new Date()
    const messagesPerMonth = Math.ceil(totalMessages / 3)
    for (let i = 0; i < 3; i++) {
      const monthDate = new Date(today.getFullYear(), today.getMonth() + i, 1)
      campaignEstimateByMonth.push({
        month: getMonthName(monthDate),
        messages: i === 2 ? totalMessages - (messagesPerMonth * 2) : messagesPerMonth,
      })
    }
  }

  const today = new Date()
  return {
    monthlyQuota,
    alreadySent,
    scheduled,
    available,
    currentMonth: getMonthName(today),
    campaignEstimateByMonth,
    totalCampaignEstimate: totalMessages,
  }
}

// Mock Meta account health
export function mockMetaHealth(): MetaAccountHealth {
  return {
    dailySendingLimit: 1000,
    qualityRating: "green",
    sentToday: 342,
  }
}

// Calculate workdays between two dates
function countWorkdays(startDate: Date, endDate: Date): number {
  let count = 0
  const current = new Date(startDate)
  while (current <= endDate) {
    const day = current.getDay()
    if (day !== 0 && day !== 6) count++ // Mon-Fri
    current.setDate(current.getDate() + 1)
  }
  return count
}

// Add workdays to a date
function addWorkdays(date: Date, days: number): Date {
  const result = new Date(date)
  let added = 0
  while (added < days) {
    result.setDate(result.getDate() + 1)
    const day = result.getDay()
    if (day !== 0 && day !== 6) added++
  }
  return result
}

// Format date to PT-BR
function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
}

// Get the Nth weekday of a given month (e.g. 2nd Wednesday of March 2026)
// ordinal: 1-4 (1st-4th), -1 (Last)
// weekday: 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri
export function getNthWeekdayOfMonth(yearMonth: string, ordinal: number, weekday: number): Date {
  const [year, month] = yearMonth.split("-").map(Number)
  // JS Date: month is 0-indexed, getDay() returns 0=Sun, 1=Mon...6=Sat
  const jsWeekday = weekday % 7 // Convert: 1=Mon->1, 2=Tue->2...5=Fri->5

  if (ordinal === -1) {
    // Last occurrence: start from last day of month and go backwards
    const lastDay = new Date(year, month, 0) // Last day of target month
    let dayOfMonth = lastDay.getDate()
    while (new Date(year, month - 1, dayOfMonth).getDay() !== jsWeekday) {
      dayOfMonth--
    }
    return new Date(year, month - 1, dayOfMonth)
  }

  const firstOfMonth = new Date(year, month - 1, 1)
  const firstDayOfWeek = firstOfMonth.getDay() // 0=Sun...6=Sat

  // Find the first occurrence of the target weekday
  let dayOfMonth = 1 + ((jsWeekday - firstDayOfWeek + 7) % 7)

  // Add weeks to get the Nth occurrence
  dayOfMonth += (ordinal - 1) * 7

  return new Date(year, month - 1, dayOfMonth)
}

// Format ordinal weekday to human-readable label
export function formatOrdinalWeekday(ordinal: number, weekday: number): string {
  const weekdayLabels = ["", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira"]
  if (ordinal === -1) return `última ${weekdayLabels[weekday]}`
  const ordinalLabels = ["1ª", "2ª", "3ª", "4ª"]
  return `${ordinalLabels[ordinal - 1]} ${weekdayLabels[weekday]}`
}

// Calculate sequence timeline based on distribution config (batch-based)
export function calculateTimeline(
  config: DistributionConfig,
  messages: CampaignMessage[],
  audienceSize: number
): SequenceTimeline {
  const colors: ("primary" | "secondary" | "tertiary")[] = ["primary", "secondary", "tertiary"]

  // --- Step 1: Generate batch D0 dates and sizes ---
  const batchStartDates: Date[] = []
  const batchSizes: number[] = []
  let remaining = audienceSize

  switch (config.type) {
    case "single_batch": {
      batchStartDates.push(new Date(config.startDate))
      batchSizes.push(audienceSize)
      remaining = 0
      break
    }
    case "workday_daily": {
      const current = new Date(config.startDate)
      while (remaining > 0) {
        const dow = current.getDay()
        if (dow !== 0 && dow !== 6) {
          const size = Math.min(config.sendsPerDay, remaining)
          batchStartDates.push(new Date(current))
          batchSizes.push(size)
          remaining -= size
        }
        current.setDate(current.getDate() + 1)
      }
      break
    }
    case "weekly": {
      const weekdayMap: Record<string, number> = {
        mon: 1, tue: 2, wed: 3, thu: 4, fri: 5,
      }
      const selectedJsDays = new Set(config.selectedDays.map((d) => weekdayMap[d]))
      const current = new Date(config.startDate)
      while (remaining > 0) {
        if (selectedJsDays.has(current.getDay())) {
          const size = Math.min(config.sendsPerDay, remaining)
          batchStartDates.push(new Date(current))
          batchSizes.push(size)
          remaining -= size
        }
        current.setDate(current.getDate() + 1)
      }
      break
    }
    case "monthly": {
      const [startYear, startMonth] = config.startMonth.split("-").map(Number)
      let curYear = startYear
      let curMonth = startMonth
      while (remaining > 0) {
        const ym = `${curYear}-${String(curMonth).padStart(2, "0")}`
        const sendDate = getNthWeekdayOfMonth(ym, config.ordinal, config.weekday)
        const size = Math.min(config.sendsPerDay, remaining)
        batchStartDates.push(sendDate)
        batchSizes.push(size)
        remaining -= size
        curMonth++
        if (curMonth > 12) {
          curMonth = 1
          curYear++
        }
      }
      break
    }
  }

  // --- Step 2: Build batch objects with message markers ---
  const batchLabels = ["Primeiro lote", "Segundo lote", "Terceiro lote"]

  const batches: TimelineBatch[] = batchStartDates.map((d0Date, bi) => {
    const markers: BatchMessageMarker[] = messages.map((msg, mi) => {
      const markerDate = new Date(d0Date)
      markerDate.setDate(markerDate.getDate() + msg.day)
      return {
        dayOffset: msg.day,
        label: `D${msg.day}`,
        description: mi === 0 ? "Inicial" : `Follow-up ${mi}`,
        calendarDate: markerDate.toISOString().split("T")[0],
        color: colors[mi % 3],
      }
    })

    const lastMarkerDate =
      markers.length > 0 ? markers[markers.length - 1].calendarDate : d0Date.toISOString().split("T")[0]

    return {
      id: `batch-${bi}`,
      batchIndex: bi,
      label: bi < 3 ? batchLabels[bi] : `Lote ${bi + 1}`,
      patientCount: batchSizes[bi],
      startDate: d0Date.toISOString().split("T")[0],
      endDate: lastMarkerDate,
      messages: markers,
    }
  })

  // --- Step 3: Summary fields ---
  const firstBatch = batches[0]
  const lastBatch = batches[batches.length - 1]

  const firstD0 = firstBatch ? new Date(firstBatch.startDate) : new Date()
  const lastEndDate = lastBatch ? new Date(lastBatch.endDate) : new Date()
  const lastBatchD0 = lastBatch ? new Date(lastBatch.startDate) : new Date()
  const totalDuration = Math.max(1, Math.ceil((lastEndDate.getTime() - firstD0.getTime()) / (1000 * 60 * 60 * 24)))

  const initialSendsRange =
    batches.length === 1 ? formatDate(firstD0) : `${formatDate(firstD0)} - ${formatDate(lastBatchD0)}`

  const lastFollowupDate = formatDate(lastEndDate)
  const totalMessages = audienceSize * messages.length

  // Quota impact: count messages per calendar month from all batch markers
  const monthMsgMap = new Map<string, number>()
  for (const batch of batches) {
    for (const marker of batch.messages) {
      const date = new Date(marker.calendarDate)
      const monthKey = getMonthName(date)
      monthMsgMap.set(monthKey, (monthMsgMap.get(monthKey) ?? 0) + batch.patientCount)
    }
  }

  const monthlyQuota = 10000
  const quotaImpactByMonth: { month: string; messages: number; quota: number; exceeds: boolean }[] = []
  for (const [month, msgs] of monthMsgMap) {
    quotaImpactByMonth.push({
      month,
      messages: msgs,
      quota: monthlyQuota,
      exceeds: msgs > monthlyQuota,
    })
  }

  return {
    batches,
    totalBatchCount: batches.length,
    totalDuration,
    initialSendsRange,
    lastFollowupDate,
    totalMessages,
    quotaImpactByMonth,
  }
}

// Validate distribution against quota and Meta limits
export function validateDistribution(
  config: DistributionConfig,
  audienceSize: number,
  quota: QuotaData,
  meta: MetaAccountHealth
): DistributionValidation {
  // Calculate daily volume based on config (uses sendsPerDay from user input)
  let dailyVolume: number

  switch (config.type) {
    case "single_batch":
      dailyVolume = audienceSize
      break
    case "workday_daily":
      dailyVolume = config.sendsPerDay
      break
    case "weekly":
      dailyVolume = config.sendsPerDay
      break
    case "monthly":
      dailyVolume = config.sendsPerDay
      break
  }

  // Check Meta tier limit
  const metaTierError = dailyVolume > meta.dailySendingLimit

  // Check quota warning (first month estimate exceeds available)
  const firstMonthEstimate = quota.campaignEstimateByMonth[0]?.messages ?? 0
  const quotaWarning = firstMonthEstimate > quota.available

  return {
    quotaWarning,
    metaTierError,
    currentDailyVolume: dailyVolume,
    metaDailyLimit: meta.dailySendingLimit,
    exceedsMonth: quotaWarning ? quota.currentMonth : undefined,
    availableQuota: quota.available,
  }
}

// Get next available months for monthly config
export function getAvailableMonths(count: number = 6): { value: string; label: string }[] {
  const months: { value: string; label: string }[] = []
  const today = new Date()

  for (let i = 0; i < count; i++) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() + i, 1)
    months.push({
      value: `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`,
      label: getMonthName(monthDate),
    })
  }

  return months
}

// Get minimum date (today)
export function getMinDate(): string {
  return new Date().toISOString().split("T")[0]
}
