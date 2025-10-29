import {
  Accessor,
  createContext,
  createSignal,
  useContext,
  JSX
} from "solid-js"

type HarborMenu = "cross" | null

export const HarborContext = createContext<{
  openedHarborMenu: Accessor<HarborMenu>
  setOpenedHarborMenu: (menu: HarborMenu) => void
}>()

export function createHarborContext() {
  const [openedHarborMenu, setOpenedHarborMenu] = createSignal<HarborMenu>(null)

  return {
    openedHarborMenu,
    setOpenedHarborMenu
  }
}

export function HarborProvider(props: { children: JSX.Element }) {
  const harborContext = createHarborContext()

  return (
    <HarborContext.Provider value={harborContext}>
      {props.children}
    </HarborContext.Provider>
  )
}

export function useHarbor() {
  const ctx = useContext(HarborContext)
  if (!ctx) throw new Error("useHarbor must be used within a HarborProvider")
  return ctx
}
