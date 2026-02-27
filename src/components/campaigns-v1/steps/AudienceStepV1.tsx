"use client"

import * as React from "react"
import { useCampaignV1 } from "../CampaignWizardV1"
import { FileUpload, type UploadedFile } from "@/components/ui/file-upload"
import { ValidationPanelV1 } from "@/components/campaigns/ValidationPanelV1"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { simulateFileValidationV1 } from "@/lib/campaigns/data-v1"

export function AudienceStepV1() {
  const { state, dispatch } = useCampaignV1()
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
      const validation = simulateFileValidationV1()

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
          Faça upload de um arquivo .xlsx com os dados dos pacientes para esta campanha.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Left Column - Upload */}
        <div className="space-y-4">
          <FileUpload
            accept={{
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
            }}
            maxSize={10 * 1024 * 1024}
            maxFiles={1}
            multiple={false}
            onFilesAdded={handleFilesAdded}
            onFileRemoved={handleFileRemoved}
            files={files}
            hint="XLSX, até 10MB"
          />

          {/* Info Alert */}
          <Alert variant="info">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              O arquivo no formato .xlsx deve conter uma das opções: coluna <strong>ID NILO</strong> ou colunas <strong>NOME COMPLETO + CPF</strong>.
              Pacientes sem telefone válido serão automaticamente excluídos.{" "}
              <Button variant="link" className="p-0 h-auto text-primary inline">
                Baixar modelos de planilha
              </Button>
            </AlertDescription>
          </Alert>
        </div>

        {/* Right Column - Validation Panel */}
        {state.audienceValidation && (
          <div className="lg:sticky lg:top-40 self-start">
            <ValidationPanelV1 validation={state.audienceValidation} />
          </div>
        )}
      </div>
    </div>
  )
}
