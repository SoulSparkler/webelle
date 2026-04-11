"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterView } from "@/components/newsletter-view"
import { getViewPath } from "@/lib/site"
import type { ViewType } from "@/lib/site"

export default function NewsletterPage() {
  const router = useRouter()

  const navigateTo = (view: ViewType) => {
    if (view === "result") {
      return
    }

    router.push(getViewPath(view))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentView="newsletter" />
      <main>
        <NewsletterView navigateTo={navigateTo} />
      </main>
      <Footer />
    </div>
  )
}
