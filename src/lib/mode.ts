import {
  selectID,
  isContainsClass,
  selectAllElements,
  replaceClass
} from "@util/dom"
import { setCookie } from "./cookie"

/** Get ambience mode value. Originally used for #galleon ambience class */
export function getAmbience(
  ambienceCookie: string | undefined | null
): Ambience {
  return ambienceCookie === "moon" ? ambienceCookie : "star"
}

export function getMode(modeCookie: string | undefined | null): Mode {
  return modeCookie === "zen" || modeCookie === "sen" ? modeCookie : "gen"
}

export function setAmbience() {
  const G = selectID("galleon")
  if (!G) return
  if (isContainsClass(G, "star")) {
    replaceClass(G, "star", "moon")
    setCookie("ambience", "moon", 30)
  } else if (isContainsClass(G, "moon")) {
    replaceClass(G, "moon", "star")
    setCookie("ambience", "star", 30)
  }
}

function toggleClass(elem: Element, a: string, b: string) {
  if (elem.classList.contains(a)) {
    elem.classList.replace(a, b)
    return b
  } else if (elem.classList.contains(b)) {
    elem.classList.replace(b, a)
    return a
  }
  return null
}

export function setMode(type: "zen" | "sen") {
  const G = selectID("galleon")
  if (!G) return
  const newMode = toggleClass(G, type, "gen")
  if (newMode) {
    setCookie("mode", newMode, 1)
  }
}

export function activateAmbienceButtons() {
  const ambienceButtons = selectAllElements(".fn-ambience")
  if (ambienceButtons && ambienceButtons.length > 0) {
    ambienceButtons.forEach((btn) => {
      btn.addEventListener("click", setAmbience)
    })
  }
}

export function activateZenButtons() {
  const zenButtons = selectAllElements(".fn-zen")
  if (zenButtons)
    zenButtons.forEach((bzn) => {
      bzn.addEventListener("click", () => setMode("zen"))
    })
}

export function activateSenButtons() {
  const zenButtons = selectAllElements(".fn-sen")
  if (zenButtons)
    zenButtons.forEach((bzn) => {
      bzn.addEventListener("click", () => setMode("sen"))
    })
}
