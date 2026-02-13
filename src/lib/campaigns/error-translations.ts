// WhatsApp/Meta and Botmaker error code translations to Portuguese

const ERROR_CODES: Record<string, string> = {
  // Meta WhatsApp API errors
  "131026": "Mensagem não entregue",
  "131049":
    "Mensagem não entregue para manter engajamento saudável do ecossistema",
  "130472": "Número do usuário faz parte de um experimento",
  // Botmaker errors
  SCHEMA_ENUM: "Erro de esquema JSON no campo 'category'",
  GENERIC: "Erro genérico do botmaker",
}

export function translateErrorCode(code: string): string {
  return ERROR_CODES[code] || `Erro ${code}`
}
