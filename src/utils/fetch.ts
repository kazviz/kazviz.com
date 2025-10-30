import { isResponseJson } from "./validator"
import { FEError } from "./error"

/**
 * Utility function for fetching data from Nazator backend servers.
 */
export async function fetchBE<T>(
  pathAPI: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  errCode: string,
  options?: {
    authKey?: string
    cookie?: Record<string, string> | null
    payload?: any
    query?: Record<string, string | string[] | number | boolean>
  }
): Promise<{ data: T } | undefined> {
  const headers = new Headers()
  headers.append("Accept", "application/json")
  headers.append("Content-Type", "application/json")
  if (options?.authKey)
    headers.append("Authorization", `Bearer ${options?.authKey}`)
  // Hanya tambahkan header Cookie di SSR, dan pastikan formatnya benar
  if (typeof window === "undefined") {
    headers.append("x-ssr", "true")
    if (
      options?.cookie &&
      typeof options.cookie === "object" &&
      Object.keys(options.cookie).length > 0
    ) {
      // Selalu format: foo=bar; baz=qux;
      const cookieStr = Object.entries(options.cookie)
        .map(([k, v]) => `${k}=${v}`)
        .join("; ")
      headers.append("Cookie", cookieStr)
    }
  }

  const queryOptions: RequestInit = {
    method,
    headers,
    credentials: "include"
  }

  if (options?.payload) queryOptions.body = JSON.stringify(options?.payload)

  const url = new URL(import.meta.env.VITE_BE_CORE_URL + pathAPI)

  if (options && options.query) {
    const query = options.query
    const params = new URLSearchParams()
    Object.keys(query).forEach((key) => {
      const value = query[key]
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item.toString()))
      } else {
        params.append(key, value.toString())
      }
    })
    url.search = params.toString()
  }

  const response = await fetch(url.toString(), queryOptions)

  if (!isResponseJson(response)) {
    if (!response.ok) {
      // Check for important HTTP status codes before processing JSON
      // Try to parse error details from response body if possible
      let errorBody: { error?: { message?: string; details?: unknown } } = {}
      try {
        if (isResponseJson(response)) {
          errorBody = await response.json()
        }
      } catch {
        // ignore JSON parse errors here
      }

      throw new FEError(
        `HTTP_${response.status}`,
        errorBody?.error?.message || response.statusText || "HTTP error",
        errCode,
        errorBody?.error?.details as Record<string, string | number> | undefined
      )
    } else {
      throw new FEError("INVALID_JSON", "Invalid JSON response", errCode)
    }
  }

  const data = await response.json()

  if (data && typeof data === "object") {
    if ("data" in data) {
      return data
    } else if ("error" in data) {
      return data
    }
  } else {
    throw new FEError(
      "INVALID_STRUCTURE",
      "Invalid response structure",
      errCode
    )
  }
}

/**
 * Utility function for fetching data from Nazator backend servers and return the data if succes of throw Error if BE send error response.
 */
export async function fetchBEResultOrThrow<T>(
  pathAPI: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  errCode: string,
  options?: {
    authKey?: string
    cookie?: Record<string, string> | null
    payload?: any
    query?: Record<string, string | string[] | number | boolean>
  }
): Promise<T | undefined> {
  const response = await fetchBE<T>(pathAPI, method, errCode, { ...options })

  if (!response)
    throw new FEError("RES_NONE", "No response from backend", errCode)

  if ("data" in response) {
    return response.data
  } else {
    throw new FEError(
      "INVALID_STRUCTURE",
      "Invalid response structure",
      errCode
    )
  }
}

/**
 * Utility function to fetch static JSON from /data/*.json in public folder.
 * Example: fetchJSON("/courses/list")
 *
 * `.json` extension is not required.
 *
 * Path must begin with root `/` which is means `./public/`
 */
export async function fetchJSON<T = unknown>(
  path: string,
  errCode = "fetchJSON"
): Promise<T> {
  const url = `${import.meta.env.VITE_BASE_URL}${path}.json`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })

  if (!response.ok) {
    throw new FEError(
      "FETCH_JSON_FAILED",
      `Failed to fetch JSON: ${url} (${response.status} ${response.statusText})`,
      errCode
    )
  }

  try {
    return await response.json()
  } catch {
    throw new FEError("JSON_INVALID", `Invalid JSON in ${url}`, errCode)
  }
}
