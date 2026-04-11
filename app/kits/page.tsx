"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { KitBrowserView } from "@/components/kit-browser-view"
import { getResultPath, getViewPath } from "@/lib/site"
import type { BusinessType, ViewType } from "@/lib/site"

export default function KitsPage() {
  const router = useRouter()

  const navigateTo = (view: ViewType) => {
    if (view === "result") {
      return
    }

    router.push(getViewPath(view))
  }

  const handleViewKit = (kitType: BusinessType) => {
    router.push(getResultPath(kitType))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentView="kits" />
      <main>
        <KitBrowserView onViewKit={handleViewKit} navigateTo={navigateTo} />
      </main>
      <Footer />
    </div>
  )
}
