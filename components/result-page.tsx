"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResultView } from "@/components/result-view"
import { getViewPath } from "@/lib/site"
import type { BusinessType, ViewType } from "@/lib/site"

export function ResultPage({ businessType }: { businessType: BusinessType }) {
  const router = useRouter()

  const navigateTo = (view: ViewType) => {
    if (view === "result") {
      return
    }

    router.push(getViewPath(view))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentView="result" />
      <main>
        <ResultView businessType={businessType} navigateTo={navigateTo} />
      </main>
      <Footer />
    </div>
  )
}
