"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Plus, List, Users } from "lucide-react"
import { useCampaignV1 } from "./CampaignWizardV1"

export function CampaignSuccessV1() {
  const { state } = useCampaignV1()

  const campaignName = state.campaignName
    ?? state.objectiveName
    ?? "Campanha"

  const audienceCount = state.audienceValidation?.valid ?? 0

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Animated check */}
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-success-pop mb-8">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>

        <Card>
          <CardContent className="pt-6 pb-6 space-y-4">
            <h1 className="text-2xl font-semibold text-foreground">
              Campanha lançada!
            </h1>
            <p className="text-lg font-medium text-foreground">
              {campaignName}
            </p>
            <p className="text-muted-foreground flex items-center justify-center gap-1.5">
              <Users className="w-4 h-4" />
              Público-alvo: {audienceCount.toLocaleString("pt-BR")} pacientes
            </p>
            <p className="text-muted-foreground text-sm">
              Os envios serão realizados de acordo com o agendamento configurado.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center mt-6">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <Plus className="w-4 h-4 mr-2" />
            Criar nova campanha
          </Button>
          <Button>
            <List className="w-4 h-4 mr-2" />
            Ver todas as campanhas
          </Button>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes success-pop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-success-pop {
          animation: success-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  )
}
