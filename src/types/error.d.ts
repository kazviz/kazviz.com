interface FEErrorObject {
  code: string
  message: string
  cause: string
  name: string
  details?: Record<string, string | number>
}
