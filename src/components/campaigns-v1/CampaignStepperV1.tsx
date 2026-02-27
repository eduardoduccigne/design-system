"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface CampaignStepperV1Props {
  currentStep: number
  onStepClick: (step: number) => void
}

const steps = [
  { number: 1, label: "Objetivo" },
  { number: 2, label: "Público" },
  { number: 3, label: "Mensagem" },
  { number: 4, label: "Revisão" },
]

export function CampaignStepperV1({ currentStep, onStepClick }: CampaignStepperV1Props) {
  return (
    <div className="border-b bg-card">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              {/* Step */}
              <button
                onClick={() => onStepClick(step.number)}
                disabled={step.number >= currentStep}
                className={cn(
                  "flex items-center gap-1 sm:gap-2 transition-colors",
                  step.number < currentStep && "cursor-pointer"
                )}
              >
                {/* Indicator */}
                <div
                  className={cn(
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all",
                    step.number < currentStep &&
                      "bg-primary-100 text-primary-700",
                    step.number === currentStep &&
                      "bg-primary text-primary-foreground",
                    step.number > currentStep &&
                      "bg-muted text-muted-foreground"
                  )}
                >
                  {step.number < currentStep ? (
                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    step.number
                  )}
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "text-xs sm:text-sm font-medium transition-colors hidden md:inline",
                    step.number < currentStep && "text-primary-700",
                    step.number === currentStep && "text-foreground",
                    step.number > currentStep && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </button>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-4 sm:w-8 lg:w-12 h-0.5 mx-1 sm:mx-2 transition-colors",
                    step.number < currentStep ? "bg-primary-300" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
