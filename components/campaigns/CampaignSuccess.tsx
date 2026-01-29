"use client"

import * as React from "react"
import { useCampaign } from "./CampaignWizard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Plus, LayoutList } from "lucide-react"

export function CampaignSuccess() {
  const { state, dispatch } = useCampaign()

  // Play success sound on mount
  React.useEffect(() => {
    playSuccessSound()
  }, [])

  const handleNewCampaign = () => {
    dispatch({ type: "RESET" })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="max-w-lg w-full text-center space-y-6 animate-in fade-in-0 zoom-in-95 duration-500">
        {/* Success Icon */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" />
          <div className="relative w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-success animate-in zoom-in-50 duration-300 delay-200" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">
            Campanha lançada com sucesso!
          </h1>
          <p className="text-muted-foreground">
            Sua campanha foi configurada e será iniciada no horário agendado.
            Você receberá notificações sobre o progresso.
          </p>
        </div>

        {/* Details Card */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <DetailRow label="Campanha" value={state.selectedCampaign?.name ?? "—"} />
            <DetailRow label="Objetivo" value={state.objectiveName ?? "—"} />
            <DetailRow
              label="Público-alvo"
              value={
                state.audienceValidation
                  ? `${state.audienceValidation.valid.toLocaleString("pt-BR")} pacientes`
                  : "—"
              }
            />
            <DetailRow
              label="Início programado"
              value={
                state.scheduleDate && state.scheduleTime
                  ? `${state.scheduleDate} às ${state.scheduleTime}`
                  : "—"
              }
            />
            <DetailRow
              label="Mensagens na sequência"
              value={
                state.selectedCampaign
                  ? `${state.selectedCampaign.messages.length} mensagens`
                  : "—"
              }
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="secondary" onClick={handleNewCampaign}>
            <Plus className="w-4 h-4 mr-2" />
            Criar Nova Campanha
          </Button>
          <Button>
            <LayoutList className="w-4 h-4 mr-2" />
            Ver Todas as Campanhas
          </Button>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

function playSuccessSound() {
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()

    const notes = [
      { freq: 523.25, time: 0, duration: 0.1 },
      { freq: 659.25, time: 0.08, duration: 0.1 },
      { freq: 783.99, time: 0.16, duration: 0.15 },
    ]

    notes.forEach((note) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = note.freq
      oscillator.type = "sine"

      const now = audioContext.currentTime + note.time
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + note.duration)

      oscillator.start(now)
      oscillator.stop(now + note.duration)
    })
  } catch {
    // Silently fail if audio is not supported
  }
}
