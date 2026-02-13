"use client"

import * as React from "react"
import { useCampaignV3 } from "../CampaignWizardV3"
import { QuotaDisplayPanel } from "../distribution/QuotaDisplayPanel"
import { MetaAccountHealth } from "../distribution/MetaAccountHealth"
import { DistributionTypeSelector } from "../distribution/DistributionTypeSelector"
import { SingleBatchConfig } from "../distribution/SingleBatchConfig"
import { WorkdayDailyConfig } from "../distribution/WorkdayDailyConfig"
import { WeeklyConfig } from "../distribution/WeeklyConfig"
import { MonthlyConfig } from "../distribution/MonthlyConfig"
import { SequenceTimelineGantt } from "../distribution/SequenceTimelineGantt"
import { DistributionValidation } from "../distribution/DistributionValidation"
import { DeliveryDisclaimer } from "../distribution/DeliveryDisclaimer"
import {
  mockQuotaData,
  mockMetaHealth,
  calculateTimeline,
  validateDistribution,
} from "@/lib/campaigns/data-v3"
import type {
  DistributionType,
  DistributionConfig,
  SingleBatchConfig as SingleBatchConfigType,
  WorkdayDailyConfig as WorkdayDailyConfigType,
  WeeklyConfig as WeeklyConfigType,
  MonthlyConfig as MonthlyConfigType,
} from "@/lib/campaigns/types-v3"

// Check if distribution config has all required fields for timeline calculation
function isConfigComplete(config: DistributionConfig | null): boolean {
  if (!config) return false

  switch (config.type) {
    case "single_batch":
      return Boolean(config.startDate && config.startTime)
    case "workday_daily":
      return Boolean(config.startDate && config.startTime && config.sendsPerDay)
    case "weekly":
      return Boolean(config.startDate && config.startTime && config.selectedDays?.length && config.sendsPerDay)
    case "monthly":
      return Boolean(config.ordinal && config.weekday && config.startTime && config.startMonth && config.sendsPerDay)
    default:
      return false
  }
}

export function DistributionStep() {
  const { state, dispatch } = useCampaignV3()

  // Get audience size and messages
  const audienceSize = state.audienceValidation?.valid ?? 0
  const messages = state.selectedCampaign?.messages ?? []

  // Mock data (would be fetched from API in real app)
  // Quota recalculates when distribution config changes (per spec 5.2)
  const completeConfig = isConfigComplete(state.distributionConfig) ? state.distributionConfig : null
  const quota = React.useMemo(
    () => mockQuotaData(audienceSize, messages, completeConfig),
    [audienceSize, messages, completeConfig]
  )
  const metaHealth = React.useMemo(() => mockMetaHealth(), [])

  // Calculate timeline when config is complete
  const timeline = React.useMemo(() => {
    if (!isConfigComplete(state.distributionConfig) || messages.length === 0) return null
    return calculateTimeline(state.distributionConfig!, messages, audienceSize)
  }, [state.distributionConfig, messages, audienceSize])

  // Validate distribution only when config is complete
  const validation = React.useMemo(() => {
    if (!isConfigComplete(state.distributionConfig)) return null
    return validateDistribution(state.distributionConfig!, audienceSize, quota, metaHealth)
  }, [state.distributionConfig, audienceSize, quota, metaHealth])

  // Update validation in state
  React.useEffect(() => {
    if (validation) {
      dispatch({ type: "UPDATE_VALIDATION", payload: validation })
    }
  }, [validation, dispatch])

  // Update timeline in state
  React.useEffect(() => {
    if (timeline) {
      dispatch({ type: "UPDATE_TIMELINE", payload: timeline })
    }
  }, [timeline, dispatch])

  const handleTypeChange = (type: DistributionType) => {
    dispatch({ type: "SET_DISTRIBUTION_TYPE", payload: type })
    // Reset config when type changes
    dispatch({
      type: "SET_DISTRIBUTION_CONFIG",
      payload: { type } as DistributionConfig,
    })
  }

  const handleConfigChange = (config: Partial<DistributionConfig>) => {
    if (state.distributionType) {
      dispatch({
        type: "SET_DISTRIBUTION_CONFIG",
        payload: { type: state.distributionType, ...config } as DistributionConfig,
      })
    }
  }

  const handleAcknowledgeWarning = () => {
    dispatch({ type: "ACKNOWLEDGE_QUOTA_WARNING" })
  }

  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Configure a distribuição de envios
        </h1>
        <p className="text-muted-foreground">
          Defina como e quando as mensagens serão enviadas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Left Column - Main content */}
        <div className="space-y-6">
          {/* Distribution type selector */}
          <DistributionTypeSelector
            value={state.distributionType}
            onChange={handleTypeChange}
          />

          {/* Config form based on selected type */}
          {state.distributionType === "single_batch" && (
            <SingleBatchConfig
              config={(state.distributionConfig as SingleBatchConfigType) ?? {}}
              audienceSize={audienceSize}
              onChange={handleConfigChange}
            />
          )}
          {state.distributionType === "workday_daily" && (
            <WorkdayDailyConfig
              config={(state.distributionConfig as WorkdayDailyConfigType) ?? {}}
              audienceSize={audienceSize}
              onChange={handleConfigChange}
            />
          )}
          {state.distributionType === "weekly" && (
            <WeeklyConfig
              config={(state.distributionConfig as WeeklyConfigType) ?? {}}
              audienceSize={audienceSize}
              onChange={handleConfigChange}
            />
          )}
          {state.distributionType === "monthly" && (
            <MonthlyConfig
              config={(state.distributionConfig as MonthlyConfigType) ?? {}}
              audienceSize={audienceSize}
              onChange={handleConfigChange}
            />
          )}

          {/* Timeline visualization */}
          {timeline && (
            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
              <SequenceTimelineGantt
                timeline={timeline}
                audienceSize={audienceSize}
                messageCount={messages.length}
              />
            </div>
          )}

          {/* Delivery disclaimer */}
          <DeliveryDisclaimer />
        </div>

        {/* Right Column - Sidebar with status panels */}
        <div className="lg:sticky lg:top-40 self-start space-y-4">
          {/* Meta account status */}
          <MetaAccountHealth health={metaHealth} />

          {/* Quota panel */}
          <QuotaDisplayPanel
            quota={quota}
            showCampaignEstimate={isConfigComplete(state.distributionConfig)}
          />

          {/* Validation alerts */}
          {validation && (
            <div className="animate-in fade-in-0 slide-in-from-top-2 duration-300">
              <DistributionValidation
                validation={validation}
                onAcknowledgeWarning={handleAcknowledgeWarning}
                quotaWarningAcknowledged={state.quotaWarningAcknowledged}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
