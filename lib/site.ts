export type ViewType = "home" | "quiz" | "result" | "kits" | "newsletter" | "blog"
export type BusinessType = "curator" | "active" | "organizer" | "connector" | "ai"

export interface QuizAnswers {
  skills?: BusinessType
  time?: string
  budget?: string
  location?: string
  priority?: string
}

export const businessTypes: BusinessType[] = ["organizer", "curator", "active", "connector", "ai"]

export function getViewPath(view: Exclude<ViewType, "result">) {
  switch (view) {
    case "home":
      return "/"
    case "quiz":
      return "/quiz"
    case "kits":
      return "/kits"
    case "newsletter":
      return "/newsletter"
    case "blog":
      return "/blog"
  }
}

export function getResultPath(businessType: BusinessType) {
  return `/results/${businessType}`
}

export function isBusinessType(value: string): value is BusinessType {
  return businessTypes.includes(value as BusinessType)
}
