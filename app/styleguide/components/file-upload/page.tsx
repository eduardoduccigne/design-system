"use client"

import { useState } from "react"
import {
  FileUpload,
  HEALTH_FILE_PRESETS,
  type UploadedFile,
} from "@/components/ui/file-upload"

// Simulate upload progress for demo purposes
function useSimulatedUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])

  function handleFilesAdded(newFiles: File[]) {
    const entries: UploadedFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36).slice(2, 10),
      file,
      status: "uploading" as const,
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...entries])

    // Simulate progress for each file
    entries.forEach((entry) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30 + 10
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setFiles((prev) =>
            prev.map((f) =>
              f.id === entry.id ? { ...f, progress: 100, status: "success" as const } : f
            )
          )
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === entry.id ? { ...f, progress: Math.round(progress) } : f
            )
          )
        }
      }, 500)
    })
  }

  function handleFileRemoved(file: UploadedFile) {
    setFiles((prev) => prev.filter((f) => f.id !== file.id))
  }

  return { files, handleFilesAdded, handleFileRemoved }
}

export default function FileUploadPage() {
  const simulated = useSimulatedUpload()
  const [basicFiles, setBasicFiles] = useState<File[]>([])

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">File Upload</h1>
        <p className="text-muted-foreground">
          A drag-and-drop file upload component designed for health professionals and
          patients. Supports medical imaging (DICOM), clinical documents, lab results,
          prescriptions, and more.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { FileUpload, HEALTH_FILE_PRESETS } from "@/components/ui/file-upload"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <p className="text-sm text-muted-foreground">
          Basic upload area with drag-and-drop. Files are managed internally.
        </p>
        <div className="p-6 bg-card rounded-lg border max-w-lg">
          <FileUpload
            onFilesAdded={(files) => setBasicFiles((prev) => [...prev, ...files])}
          />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<FileUpload onFilesAdded={(files) => console.log(files)} />`}</code>
        </pre>
      </section>

      {/* With simulated upload */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Upload Progress</h2>
        <p className="text-sm text-muted-foreground">
          Controlled mode with simulated upload progress. Files show uploading, success,
          and error states.
        </p>
        <div className="p-6 bg-card rounded-lg border max-w-lg">
          <FileUpload
            files={simulated.files}
            accept={HEALTH_FILE_PRESETS.general.accept}
            onFilesAdded={simulated.handleFilesAdded}
            onFileRemoved={simulated.handleFileRemoved}
            hint={HEALTH_FILE_PRESETS.general.label}
          />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`const [files, setFiles] = useState<UploadedFile[]>([])

<FileUpload
  files={files}
  accept={HEALTH_FILE_PRESETS.general.accept}
  onFilesAdded={handleFilesAdded}
  onFileRemoved={handleFileRemoved}
  hint={HEALTH_FILE_PRESETS.general.label}
/>`}</code>
        </pre>
      </section>

      {/* Health Presets */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Health File Presets</h2>
        <p className="text-sm text-muted-foreground">
          Built-in presets for common healthcare file types. Use{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs">HEALTH_FILE_PRESETS</code>{" "}
          to quickly configure accepted formats.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Medical Images */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Medical Images</h3>
            <div className="p-4 bg-card rounded-lg border">
              <FileUpload
                size="sm"
                accept={HEALTH_FILE_PRESETS.medicalImages.accept}
                hint={HEALTH_FILE_PRESETS.medicalImages.label}
                maxFiles={5}
              />
            </div>
          </div>

          {/* Clinical Documents */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Clinical Documents</h3>
            <div className="p-4 bg-card rounded-lg border">
              <FileUpload
                size="sm"
                accept={HEALTH_FILE_PRESETS.clinicalDocuments.accept}
                hint={HEALTH_FILE_PRESETS.clinicalDocuments.label}
                maxFiles={5}
              />
            </div>
          </div>

          {/* Lab Results */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Lab Results</h3>
            <div className="p-4 bg-card rounded-lg border">
              <FileUpload
                size="sm"
                accept={HEALTH_FILE_PRESETS.labResults.accept}
                hint={HEALTH_FILE_PRESETS.labResults.label}
                maxFiles={5}
              />
            </div>
          </div>

          {/* Prescriptions */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Prescriptions</h3>
            <div className="p-4 bg-card rounded-lg border">
              <FileUpload
                size="sm"
                accept={HEALTH_FILE_PRESETS.prescriptions.accept}
                hint={HEALTH_FILE_PRESETS.prescriptions.label}
                maxFiles={5}
              />
            </div>
          </div>
        </div>

        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import { HEALTH_FILE_PRESETS } from "@/components/ui/file-upload"

// Available presets:
// HEALTH_FILE_PRESETS.medicalImages    → DICOM, JPEG, PNG, BMP, TIFF
// HEALTH_FILE_PRESETS.clinicalDocuments → PDF, DOC, DOCX, RTF, TXT
// HEALTH_FILE_PRESETS.labResults        → PDF, CSV, HL7, XML
// HEALTH_FILE_PRESETS.prescriptions     → PDF, JPEG, PNG
// HEALTH_FILE_PRESETS.general           → All of the above + XLS, MP4, MP3, WAV

<FileUpload
  accept={HEALTH_FILE_PRESETS.medicalImages.accept}
  hint={HEALTH_FILE_PRESETS.medicalImages.label}
/>`}</code>
        </pre>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="space-y-6 max-w-lg">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Small</h3>
            <div className="p-4 bg-card rounded-lg border">
              <FileUpload size="sm" maxFiles={3} />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Default</h3>
            <div className="p-4 bg-card rounded-lg border">
              <FileUpload maxFiles={3} />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Large</h3>
            <div className="p-4 bg-card rounded-lg border">
              <FileUpload size="lg" maxFiles={3} />
            </div>
          </div>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<FileUpload size="sm" />
<FileUpload />           {/* default */}
<FileUpload size="lg" />`}</code>
        </pre>
      </section>

      {/* Single file */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Single File</h2>
        <p className="text-sm text-muted-foreground">
          Set <code className="bg-muted px-1.5 py-0.5 rounded text-xs">multiple=false</code> to
          accept a single file only.
        </p>
        <div className="p-6 bg-card rounded-lg border max-w-lg">
          <FileUpload
            multiple={false}
            accept={HEALTH_FILE_PRESETS.prescriptions.accept}
            hint="Upload a single prescription (PDF, JPEG, PNG)"
          />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<FileUpload
  multiple={false}
  accept={HEALTH_FILE_PRESETS.prescriptions.accept}
  hint="Upload a single prescription (PDF, JPEG, PNG)"
/>`}</code>
        </pre>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled</h2>
        <div className="p-6 bg-card rounded-lg border max-w-lg">
          <FileUpload disabled />
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<FileUpload disabled />`}</code>
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Prop</th>
                <th className="text-left py-2 pr-4">Type</th>
                <th className="text-left py-2 pr-4">Default</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">accept</td>
                <td className="py-2 pr-4 font-mono text-xs">{`Record<string, string[]>`}</td>
                <td className="py-2 pr-4 font-mono text-xs">—</td>
                <td className="py-2 text-muted-foreground">Accepted MIME types mapped to extensions. Use HEALTH_FILE_PRESETS for convenience.</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">maxSize</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">52428800</td>
                <td className="py-2 text-muted-foreground">Maximum file size in bytes (default 50 MB)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">maxFiles</td>
                <td className="py-2 pr-4 font-mono text-xs">number</td>
                <td className="py-2 pr-4 font-mono text-xs">10</td>
                <td className="py-2 text-muted-foreground">Maximum number of files allowed</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">multiple</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">true</td>
                <td className="py-2 text-muted-foreground">Allow multiple file selection</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">disabled</td>
                <td className="py-2 pr-4 font-mono text-xs">boolean</td>
                <td className="py-2 pr-4 font-mono text-xs">false</td>
                <td className="py-2 text-muted-foreground">Disable the upload zone</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">size</td>
                <td className="py-2 pr-4 font-mono text-xs">{`"sm" | "default" | "lg"`}</td>
                <td className="py-2 pr-4 font-mono text-xs">"default"</td>
                <td className="py-2 text-muted-foreground">Size variant of the drop zone</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">files</td>
                <td className="py-2 pr-4 font-mono text-xs">UploadedFile[]</td>
                <td className="py-2 pr-4 font-mono text-xs">—</td>
                <td className="py-2 text-muted-foreground">Externally controlled file list (controlled mode)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onFilesAdded</td>
                <td className="py-2 pr-4 font-mono text-xs">{`(files: File[]) => void`}</td>
                <td className="py-2 pr-4 font-mono text-xs">—</td>
                <td className="py-2 text-muted-foreground">Callback when valid files are added</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">onFileRemoved</td>
                <td className="py-2 pr-4 font-mono text-xs">{`(file: UploadedFile) => void`}</td>
                <td className="py-2 pr-4 font-mono text-xs">—</td>
                <td className="py-2 text-muted-foreground">Callback when a file is removed from the list</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">hint</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">—</td>
                <td className="py-2 text-muted-foreground">Custom hint text below the upload label</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">className</td>
                <td className="py-2 pr-4 font-mono text-xs">string</td>
                <td className="py-2 pr-4 font-mono text-xs">—</td>
                <td className="py-2 text-muted-foreground">Additional CSS classes for the drop zone</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Health Presets Reference */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Health File Presets Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Preset</th>
                <th className="text-left py-2 pr-4">Formats</th>
                <th className="text-left py-2">Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">medicalImages</td>
                <td className="py-2 pr-4 text-muted-foreground">DICOM, JPEG, PNG, BMP, TIFF</td>
                <td className="py-2 text-muted-foreground">X-rays, MRIs, CT scans, ultrasounds</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">clinicalDocuments</td>
                <td className="py-2 pr-4 text-muted-foreground">PDF, DOC, DOCX, RTF, TXT</td>
                <td className="py-2 text-muted-foreground">Medical records, referral letters, discharge summaries</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">labResults</td>
                <td className="py-2 pr-4 text-muted-foreground">PDF, CSV, HL7, XML</td>
                <td className="py-2 text-muted-foreground">Blood work, pathology reports, interoperability data</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">prescriptions</td>
                <td className="py-2 pr-4 text-muted-foreground">PDF, JPEG, PNG</td>
                <td className="py-2 text-muted-foreground">Prescription photos, digital prescriptions</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">general</td>
                <td className="py-2 pr-4 text-muted-foreground">All above + XLS, XLSX, MP4, MP3, WAV</td>
                <td className="py-2 text-muted-foreground">General-purpose health file uploads</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
