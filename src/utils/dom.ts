// utility DOM functions

export function selectID(target: string): HTMLElement | null {
  if (typeof document === "undefined") return null
  return document.getElementById(target)
}

export function selectElement(target: string): HTMLElement | null {
  if (typeof document === "undefined") return null
  return document.querySelector(target)
}

export function selectAllElements(target: string): NodeList | null {
  if (typeof document === "undefined") return null
  return document.querySelectorAll(target)
}

export function isContainsClass(elem: HTMLElement, contains: string): boolean {
  if (typeof document === "undefined") return false
  return elem.classList.contains(contains)
}

export function replaceClass(
  elem: HTMLElement | undefined | null,
  replace: string,
  str: string
): void {
  if (!elem) return
  if (typeof document === "undefined") return
  elem.classList.replace(replace, str)
}

export function removeClass(elem: HTMLElement, str: string): void {
  if (typeof document === "undefined") return
  elem.classList.remove(str)
}

export function toggleClass(
  elem: HTMLElement | undefined | null,
  str: string
): void {
  if (!elem) return
  if (typeof document === "undefined") return
  elem.classList.toggle(str)
}

export const onAstroLoad = (dosmth: () => void) =>
  document.addEventListener("astro:page-load", dosmth)

export const onAstroSwap = (dosmth: () => void) =>
  document.addEventListener("astro:after-swap", dosmth)

export const onDocumentSwap = (dosmth: () => void) =>
  document.addEventListener("DOMContentLoaded", dosmth)

/* === BREAKPOINTS HELPER === */

/** Check if the window width is below 1025px (desktop size). */
export const isBelowDesktop =
  typeof window !== "undefined" ? window.innerWidth < 1250 : false

/** Check if the window width is above 1024px (tablet size). */
export const isAboveTablet =
  typeof window !== "undefined" ? window.innerWidth > 1249 : false

/** Check if the window width is above 599px (mobile size). */
export const isAboveMobile =
  typeof window !== "undefined" ? window.innerWidth > 799 : false

/** Check if the window width is below 600px (mobile size). */
export const isMobile =
  typeof window !== "undefined" ? window.innerWidth < 800 : false
