type Lang = "en" | "id"
type Region = "ID" | "PH" | "SG" | "TH" | "VN" | "US"

interface HrefLang {
  lang: Lang | "x-default"
  href: string
}

type Translation = Record<string, string>
type TFunction = (
  key: string,
  values?: Record<string, string | number | undefined>
) => string
