"use client"

import { useCampaign } from "../CampaignWizard"
import { ValidationPanel } from "../ValidationPanel"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUpload } from "@/components/ui/file-upload"
import { Button } from "@/components/ui/button"
import { AlertCircle, Download } from "lucide-react"
import { simulateFileValidation } from "@/lib/campaigns/data"

export function AudienceStep() {
  const { state, dispatch } = useCampaign()

  const handleFilesAdded = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0]
      // Simulate validation
      const validation = simulateFileValidation()
      dispatch({
        type: "SET_AUDIENCE_FILE",
        payload: { file, validation },
      })
    }
  }

  const handleDownloadTemplate = () => {
    // Generate template CSV
    const csvLines = [
      "CPF,Nome,Telefone,Email",
      "12345678900,João Silva,11987654321,joao.silva@example.com",
      "98765432100,Maria Santos,11976543210,maria.santos@example.com",
      "45678912300,Pedro Oliveira,11965432109,pedro.oliveira@example.com",
    ]
    const csvContent = csvLines.join("\n")
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "modelo_lista_pacientes.csv"
    link.click()
  }

  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Defina o público da campanha
        </h1>
        <p className="text-muted-foreground">
          Faça upload da lista de pacientes (apenas método de arquivo).
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        {/* Upload Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upload de Lista</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload
              accept={{
                "text/csv": [".csv"],
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
              }}
              maxSize={10 * 1024 * 1024}
              maxFiles={1}
              multiple={false}
              onFilesAdded={handleFilesAdded}
              hint="CSV, XLSX - Máx 50.000 linhas"
              size="default"
            />

            {/* Instructions */}
            <div className="pt-4 border-t space-y-3">
              <Alert variant="warning">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Atenção ao número de pacientes adicionados para não ultrapassar a
                  capacidade da equipe e o volume de envios mensais.
                </AlertDescription>
              </Alert>

              <p className="text-sm text-muted-foreground">
                Utilize nosso{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm"
                  onClick={handleDownloadTemplate}
                >
                  <Download className="w-3 h-3 mr-1" />
                  modelo de dados
                </Button>
                , depois envie o arquivo com os pacientes que receberão as mensagens
                da campanha.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Validation Panel */}
        <div className="lg:sticky lg:top-40">
          <ValidationPanel validation={state.audienceValidation} />
        </div>
      </div>
    </div>
  )
}
