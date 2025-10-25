// Updates the styles of a panel based on scroll position
function updatePanelStyles(
  element: HTMLElement,
  topOffset: number,
  shouldFixPanel: boolean
) {
  const scrollPos = window.scrollY

  // Adjusts the top position of the element based on the scroll position
  const topValue = scrollPos < topOffset ? topOffset - scrollPos + "px" : "0"

  element.style.top = topValue

  // If the panel should be fixed, adjust its height dynamically
  if (shouldFixPanel) {
    element.style.height =
      scrollPos < topOffset
        ? `calc(100vh - ${topOffset - scrollPos}px)`
        : "100vh"
  }
}

// Calculates the total height of the top elements (e.g., banner and harbor)
function calculateTopOffset(banner: HTMLElement | null): number {
  const harborHeight = document.getElementById("harbor")?.offsetHeight ?? 0
  const bannerHeight = banner?.offsetHeight ?? 0

  // If banner exists but has no height, it might not be fully rendered yet
  if (banner && bannerHeight === 0) {
    // Return harbor height only for now, will recalculate when banner is ready
    console.warn(
      "Banner element exists but has no height - it may not be fully rendered"
    )
    return harborHeight
  }

  return harborHeight + bannerHeight
}

// Adds event listeners for scroll and load events
function onScrollOrLoad(callback: () => void) {
  window.addEventListener("scroll", callback)
  window.addEventListener("load", callback)
}

// Creates a debounced version of a function to optimize performance
function debounce(fn: () => void, delay: number) {
  let timeout: number
  return function () {
    clearTimeout(timeout)
    timeout = window.setTimeout(fn, delay)
  }
}

/**
 * Adjusts the position and height of a panel based on the scroll position.
 * This ensures the panel remains properly positioned while scrolling.
 *
 * @param {HTMLElement} element - The panel element to be adjusted.
 * @param {boolean} [shouldFixPanel=true] - Determines whether the panel should be fixed.
 *
 * The function:
 * - Computes the height of top elements (`harbor` and `banner`).
 * - Adjusts the `top` and `height` styles dynamically based on scroll position.
 * - Uses debouncing to optimize performance and reduce unnecessary calculations.
 * - Listens to `scroll` and `load` events to update the panel when needed.
 * - Retries calculation if banner is not fully rendered on first attempt.
 */
export default function holdPanel(element: HTMLElement, shouldFixPanel = true) {
  const banner = document.getElementById("title-banner")
  let topOffset = calculateTopOffset(banner)

  // If banner exists but has no height, set up a retry mechanism
  if (banner && banner.offsetHeight === 0) {
    const retryCalculation = () => {
      const newTopOffset = calculateTopOffset(banner)
      if (newTopOffset !== topOffset) {
        topOffset = newTopOffset
        applyPanelStyles() // Recalculate with correct offset
      }
    }

    // Retry after a short delay
    setTimeout(retryCalculation, 50)
    // Also retry when window loads (in case of hot reload)
    window.addEventListener("load", retryCalculation, { once: true })
  }

  // Function to update panel styles
  const applyPanelStyles = () =>
    updatePanelStyles(element, topOffset, shouldFixPanel)

  // Debounced version of the function for better performance
  const debouncedApplyStyles = debounce(applyPanelStyles, 10)

  // Initial application of styles
  applyPanelStyles()

  // Attach debounced event listener for scrolling and loading
  onScrollOrLoad(debouncedApplyStyles)
}
