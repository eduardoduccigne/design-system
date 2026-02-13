"use client"

import * as React from "react"
import { useCampaignV3 } from "../CampaignWizardV3"
import { FileUpload, type UploadedFile } from "@/components/ui/file-upload"
import { ValidationPanel } from "@/components/campaigns/ValidationPanel"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, Download } from "lucide-react"
import { simulateFileValidation } from "@/lib/campaigns/data"

export function AudienceStepV3() {
  const { state, dispatch } = useCampaignV3()
  const [files, setFiles] = React.useState<UploadedFile[]>([])

  // Sync files state with audience file from context
  React.useEffect(() => {
    if (state.audienceFile && files.length === 0) {
      setFiles([{
        id: "audience-file",
        file: state.audienceFile,
        status: "success",
        progress: 100,
      }])
    } else if (!state.audienceFile && files.length > 0) {
      setFiles([])
    }
  }, [state.audienceFile, files.length])

  const handleFilesAdded = (addedFiles: File[]) => {
    if (addedFiles.length > 0) {
      const file = addedFiles[0]
      // Simulate validation (in production, this would be an API call)
      const validation = simulateFileValidation()

      dispatch({
        type: "SET_AUDIENCE_FILE",
        payload: { file, validation },
      })

      setFiles([{
        id: "audience-file",
        file,
        status: "success",
        progress: 100,
      }])
    }
  }

  const handleFileRemoved = () => {
    dispatch({ type: "CLEAR_AUDIENCE" })
    setFiles([])
  }

  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Envie a lista de pacientes
        </h1>
        <p className="text-muted-foreground">
          Faça upload de um arquivo CSV com os dados dos pacientes para esta campanha.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Left Column - Upload */}
        <div className="space-y-4">
          <FileUpload
            accept={{
              "text/csv": [".csv"],
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
            }}
            maxSize={10 * 1024 * 1024}
            maxFiles={1}
            multiple={false}
            onFilesAdded={handleFilesAdded}
            onFileRemoved={handleFileRemoved}
            files={files}
            hint="CSV ou XLSX, até 10MB"
          />

          {/* Helper link */}
          <div className="flex items-center gap-2">
            <Button variant="link" className="p-0 h-auto text-primary">
              <Download className="w-4 h-4 mr-1" />
              Baixar modelo de CSV
            </Button>
          </div>

          {/* Info Alert */}
          <Alert variant="info">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              O arquivo deve conter as colunas: nome, telefone (com DDD), e data de nascimento.
              Telefones inválidos, opt-outs e pacientes com WhatsApp inacessível serão automaticamente excluídos.
            </AlertDescription>
          </Alert>
        </div>

        {/* Right Column - Validation Panel */}
        {state.audienceValidation && (
          <div className="lg:sticky lg:top-40 self-start">
            <ValidationPanel validation={state.audienceValidation} />
          </div>
        )}
      </div>
    </div>
  )
}
