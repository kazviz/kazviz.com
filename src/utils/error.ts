type FieldKey = string

export type ErrorMapper = Record<string, FieldKey>

export class FEError extends Error {
  code: string
  source: string
  details?: Record<string, string | number>

  constructor(
    code: string,
    message: string,
    source: string,
    details?: Record<string, string | number>
  ) {
    super(message)
    this.name = "FEError"
    this.code = code
    this.source = source
    if (details) this.details = details
  }
}

function isFEError(error: unknown): error is FEErrorObject {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as FEErrorObject).name === "FEError"
  )
}

export function assignErrorMessage(
  error: FEErrorObject,
  // eslint-disable-next-line no-unused-vars
  setError: (field: string, msg: string) => void,
  mapper: ErrorMapper,
  errorMessages: Record<string, string>
) {
  let code = ""
  let fallbackMsg = "Unknown error"
  if (isFEError(error)) {
    code = error.code
    fallbackMsg = error.message
  }
  const message =
    errorMessages[code] || errorMessages["SERVER_ERR"] || fallbackMsg
  const field = mapper[code]

  if (field) {
    setError(field, message)
  } else {
    setError("api", message)
  }
}

export function handleErrorResponse(
  response: {
    error: FEErrorObject | FEErrorObject
  },
  // eslint-disable-next-line no-unused-vars
  setError: (field: string, msg: string) => void,
  errorMap: ErrorMapper,
  errorMessages: Record<string, string>
) {
  if (Array.isArray(response.error)) {
    response.error.forEach((err) =>
      assignErrorMessage(err, setError, errorMap, errorMessages)
    )
  } else {
    assignErrorMessage(response.error, setError, errorMap, errorMessages)
  }
}

export function handleBEError(
  error: unknown,
  // eslint-disable-next-line no-unused-vars
  setError: (field: string, msg: string) => void,
  errorMap: ErrorMapper,
  errorMessages: Record<string, string>
) {
  if (error instanceof FEError || isFEError(error)) {
    assignErrorMessage(
      error as FEErrorObject,
      setError,
      errorMap,
      errorMessages
    )
  } else {
    setError("api", errorMessages["SERVER_ERR"] || "Unknown error")
  }
}

export function handleBEErrorWithTranslation(
  error: unknown,
  // eslint-disable-next-line no-unused-vars
  setError: (field: string, msg: string) => void,
  errorMap: ErrorMapper,
  // eslint-disable-next-line no-unused-vars
  t: (key: string) => string
) {
  if (error instanceof FEError || isFEError(error)) {
    assignErrorMessageWithTranslation(
      error as FEErrorObject,
      setError,
      errorMap,
      t
    )
  } else {
    setError("api", t("SERVER_ERR") || "Unknown error")
  }
}

export function assignErrorMessageWithTranslation(
  error: FEErrorObject,
  // eslint-disable-next-line no-unused-vars
  setError: (field: string, msg: string) => void,
  mapper: ErrorMapper,
  // eslint-disable-next-line no-unused-vars
  t: (key: string) => string
) {
  let code = ""
  let fallbackMsg = "Unknown error"
  if (isFEError(error)) {
    code = error.code
    fallbackMsg = error.message
  }

  const message = t(code) || t("SERVER_ERR") || fallbackMsg
  const field = mapper[code]

  if (field) {
    setError(field, message)
  } else {
    setError("api", message)
  }
}
