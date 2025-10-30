export function isResponseJson(response: Response): boolean {
  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) return true
  else return false
}

export function isValidData<T>(data: unknown, keyProperty: string): data is T {
  return typeof data === "object" && data !== null && keyProperty in data
}
