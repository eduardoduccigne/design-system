"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Upload,
  X,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Progress } from "./progress"

// ─── Health-system file format presets ────────────────────────────────────────

export const HEALTH_FILE_PRESETS = {
  /** Medical images: DICOM, JPEG, PNG, BMP, TIFF */
  medicalImages: {
    accept: {
      "application/dicom": [".dcm", ".dicom"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/bmp": [".bmp"],
      "image/tiff": [".tif", ".tiff"],
    },
    label: "Medical images (DICOM, JPEG, PNG, BMP, TIFF)",
  },
  /** Clinical documents: PDF, Word, RTF, plain text */
  clinicalDocuments: {
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/rtf": [".rtf"],
      "text/plain": [".txt"],
    },
    label: "Clinical documents (PDF, DOC, DOCX, RTF, TXT)",
  },
  /** Lab results: PDF, CSV, HL7, XML (CDA) */
  labResults: {
    accept: {
      "application/pdf": [".pdf"],
      "text/csv": [".csv"],
      "application/xml": [".xml"],
      "text/xml": [".xml"],
      "application/hl7-v2": [".hl7"],
    },
    label: "Lab results (PDF, CSV, HL7, XML)",
  },
  /** Prescriptions & forms: PDF, images */
  prescriptions: {
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    label: "Prescriptions (PDF, JPEG, PNG)",
  },
  /** General health files: broad set covering most clinical use cases */
  general: {
    accept: {
      "application/pdf": [".pdf"],
      "application/dicom": [".dcm", ".dicom"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/bmp": [".bmp"],
      "image/tiff": [".tif", ".tiff"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "text/csv": [".csv"],
      "text/plain": [".txt"],
      "application/xml": [".xml"],
      "application/hl7-v2": [".hl7"],
      "video/mp4": [".mp4"],
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
    },
    label: "All supported health files",
  },
} as const

// ─── Types ───────────────────────────────────────────────────────────────────

export type FileUploadStatus = "idle" | "uploading" | "success" | "error"

export interface UploadedFile {
  id: string
  file: File
  status: FileUploadStatus
  progress: number
  error?: string
}

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof fileUploadVariants> {
  /** Accepted file types as MIME → extensions map, or use a HEALTH_FILE_PRESETS key */
  accept?: Record<string, string[] | readonly string[]>
  /** Maximum file size in bytes (default 50 MB) */
  maxSize?: number
  /** Maximum number of files (default 10) */
  maxFiles?: number
  /** Allow multiple files */
  multiple?: boolean
  /** Disable the upload zone */
  disabled?: boolean
  /** Called when files are added */
  onFilesAdded?: (files: File[]) => void
  /** Called when a file is removed */
  onFileRemoved?: (file: UploadedFile) => void
  /** Externally controlled file list */
  files?: UploadedFile[]
  /** Hint text below the main label */
  hint?: string
}

// ─── Variants ────────────────────────────────────────────────────────────────

const fileUploadVariants = cva(
  "relative flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed transition-nilo cursor-pointer text-center",
  {
    variants: {
      size: {
        default: "min-h-[200px] p-8 gap-3",
        sm: "min-h-[140px] p-5 gap-2",
        lg: "min-h-[260px] p-10 gap-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function getFileIcon(file: File) {
  const type = file.type
  if (type.startsWith("image/")) return FileImage
  if (type.startsWith("video/")) return FileVideo
  if (type.startsWith("audio/")) return FileAudio
  if (type === "application/pdf" || type.includes("word") || type.includes("text"))
    return FileText
  return File
}

function getAllowedExtensions(accept?: Record<string, string[] | readonly string[]>): string[] {
  if (!accept) return []
  return Object.values(accept).flat()
}

function isFileTypeAllowed(file: File, accept?: Record<string, string[] | readonly string[]>): boolean {
  if (!accept) return true
  const mimeAllowed = Object.keys(accept).some((mime) => {
    if (mime.endsWith("/*")) return file.type.startsWith(mime.replace("/*", "/"))
    return file.type === mime
  })
  if (mimeAllowed) return true
  const ext = `.${file.name.split(".").pop()?.toLowerCase()}`
  return getAllowedExtensions(accept).includes(ext)
}

// ─── Component ───────────────────────────────────────────────────────────────

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      size,
      accept,
      maxSize = 50 * 1024 * 1024, // 50 MB
      maxFiles = 10,
      multiple = true,
      disabled = false,
      onFilesAdded,
      onFileRemoved,
      files: controlledFiles,
      hint,
      ...props
    },
    ref
  ) => {
    const [internalFiles, setInternalFiles] = React.useState<UploadedFile[]>([])
    const [isDragging, setIsDragging] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const files = controlledFiles ?? internalFiles
    const isControlled = controlledFiles !== undefined

    const extensions = getAllowedExtensions(accept)

    // ── Validation ─────────────────────────────────────────────────────────

    function validate(incoming: File[]): { valid: File[]; errors: string[] } {
      const valid: File[] = []
      const errors: string[] = []
      const remaining = maxFiles - files.length

      if (incoming.length > remaining) {
        errors.push(`Maximum of ${maxFiles} files allowed. You can add ${remaining} more.`)
        incoming = incoming.slice(0, remaining)
      }

      for (const file of incoming) {
        if (!isFileTypeAllowed(file, accept)) {
          errors.push(`"${file.name}" is not an allowed file type.`)
          continue
        }
        if (file.size > maxSize) {
          errors.push(`"${file.name}" exceeds the ${formatFileSize(maxSize)} size limit.`)
          continue
        }
        if (files.some((f) => f.file.name === file.name && f.file.size === file.size)) {
          errors.push(`"${file.name}" has already been added.`)
          continue
        }
        valid.push(file)
      }

      return { valid, errors }
    }

    // ── Handlers ───────────────────────────────────────────────────────────

    function handleFiles(incoming: File[]) {
      const { valid, errors } = validate(incoming)
      if (errors.length > 0) {
        // Set transient error files so user can see what went wrong
        const errorEntries: UploadedFile[] = errors.map((err) => ({
          id: generateId(),
          file: new window.File([], "error"),
          status: "error" as const,
          progress: 0,
          error: err,
        }))
        if (!isControlled) {
          setInternalFiles((prev) => [...prev, ...errorEntries])
          // Auto-remove error entries after 5 s
          setTimeout(() => {
            setInternalFiles((prev) =>
              prev.filter((f) => !errorEntries.some((e) => e.id === f.id))
            )
          }, 5000)
        }
      }
      if (valid.length === 0) return

      const newFiles: UploadedFile[] = valid.map((file) => ({
        id: generateId(),
        file,
        status: "idle" as const,
        progress: 0,
      }))

      if (!isControlled) {
        setInternalFiles((prev) => [...prev, ...newFiles])
      }
      onFilesAdded?.(valid)
    }

    function handleRemove(uploadedFile: UploadedFile) {
      if (!isControlled) {
        setInternalFiles((prev) => prev.filter((f) => f.id !== uploadedFile.id))
      }
      onFileRemoved?.(uploadedFile)
    }

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.files) {
        handleFiles(Array.from(e.target.files))
      }
      // Reset so the same file can be selected again
      e.target.value = ""
    }

    // ── Drag events ────────────────────────────────────────────────────────

    function onDragEnter(e: React.DragEvent) {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) setIsDragging(true)
    }

    function onDragLeave(e: React.DragEvent) {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
    }

    function onDragOver(e: React.DragEvent) {
      e.preventDefault()
      e.stopPropagation()
    }

    function onDrop(e: React.DragEvent) {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      if (disabled) return
      const droppedFiles = Array.from(e.dataTransfer.files)
      handleFiles(multiple ? droppedFiles : droppedFiles.slice(0, 1))
    }

    // ── Render ─────────────────────────────────────────────────────────────

    const acceptString = accept
      ? Object.entries(accept)
          .flatMap(([mime, exts]) => [mime, ...exts])
          .join(",")
      : undefined

    return (
      <div className="w-full space-y-3" ref={ref} {...props}>
        {/* Drop zone */}
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          aria-label="Upload files"
          onClick={() => !disabled && inputRef.current?.click()}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
              e.preventDefault()
              inputRef.current?.click()
            }
          }}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          className={cn(
            fileUploadVariants({ size }),
            "border-border bg-card hover:border-primary/50 hover:bg-primary/[0.02]",
            isDragging &&
              "border-primary bg-primary/5 shadow-[var(--shadow-sm)] scale-[1.01]",
            disabled &&
              "pointer-events-none opacity-50 cursor-not-allowed",
            className
          )}
        >
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            accept={acceptString}
            multiple={multiple}
            disabled={disabled}
            onChange={onInputChange}
            tabIndex={-1}
          />

          <div
            className={cn(
              "flex items-center justify-center rounded-full bg-primary/10 text-primary transition-nilo",
              size === "sm" ? "h-10 w-10" : "h-12 w-12",
              isDragging && "bg-primary/20 scale-110"
            )}
          >
            <Upload className={size === "sm" ? "h-5 w-5" : "h-6 w-6"} />
          </div>

          <div className="space-y-1">
            <p
              className={cn(
                "font-medium text-foreground",
                size === "sm" ? "text-sm" : "text-base"
              )}
            >
              {isDragging ? (
                "Drop your files here"
              ) : (
                <>
                  Drag & drop files or{" "}
                  <span className="text-primary underline underline-offset-4">
                    browse
                  </span>
                </>
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              {hint ??
                `${extensions.length > 0 ? extensions.join(", ") : "All files"} — up to ${formatFileSize(maxSize)}`}
            </p>
          </div>

          {multiple && (
            <p className="text-xs text-muted-foreground/70">
              {files.length}/{maxFiles} files
            </p>
          )}
        </div>

        {/* File list */}
        {files.length > 0 && (
          <ul className="space-y-2" aria-label="Uploaded files">
            {files.map((uploadedFile) => (
              <FileItem
                key={uploadedFile.id}
                uploadedFile={uploadedFile}
                onRemove={() => handleRemove(uploadedFile)}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }
)
FileUpload.displayName = "FileUpload"

// ─── File item sub-component ─────────────────────────────────────────────────

interface FileItemProps {
  uploadedFile: UploadedFile
  onRemove: () => void
}

function FileItem({ uploadedFile, onRemove }: FileItemProps) {
  const { file, status, progress, error } = uploadedFile
  const isError = status === "error"
  const isSuccess = status === "success"
  const isUploading = status === "uploading"
  const Icon = isError ? AlertCircle : getFileIcon(file)

  return (
    <li
      className={cn(
        "group flex items-center gap-3 rounded-lg border p-3 transition-nilo",
        "bg-card shadow-[var(--shadow-xs)]",
        isError && "border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/30",
        isSuccess && "border-green-200 bg-green-50/30 dark:border-green-900/50 dark:bg-green-950/20"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          isError
            ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
            : isSuccess
              ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
              : "bg-muted text-muted-foreground"
        )}
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Icon className="h-4 w-4" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium truncate text-foreground">
            {isError && error ? error : file.name}
          </p>
          {isSuccess && (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
          )}
        </div>
        {!isError && file.size > 0 && (
          <p className="text-xs text-muted-foreground">
            {formatFileSize(file.size)}
          </p>
        )}
        {isUploading && (
          <Progress value={progress} className="h-1.5" />
        )}
      </div>

      {/* Remove button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-nilo-fast"
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        aria-label={`Remove ${file.name}`}
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </li>
  )
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export { FileUpload, fileUploadVariants }
