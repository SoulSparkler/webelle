"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhatsInKitSection } from "@/components/whats-in-kit-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { BrowseKitsSection } from "@/components/browse-kits-section"
import { CTASection } from "@/components/cta-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { BlogSection } from "@/components/blog-section"
import { useRouter } from "next/navigation"
import { getResultPath, getViewPath } from "@/lib/site"
import type { BusinessType, ViewType } from "@/lib/site"

export function HomePageClient() {
  const router = useRouter()

  const navigateTo = (view: ViewType) => {
    if (view === "result") return
    router.push(getViewPath(view))
  }

  const handleViewKit = (kitType: BusinessType) => {
    router.push(getResultPath(kitType))
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header currentView="home" />
      <main>
        <HeroSection navigateTo={navigateTo} />
        <WhatsInKitSection />
        <HowItWorksSection navigateTo={navigateTo} />
        <BrowseKitsSection onViewKit={handleViewKit} />
        <BlogSection navigateTo={navigateTo} />
        <CTASection navigateTo={navigateTo} />
        <NewsletterSection />
        <AboutSection />
        <Footer />
      </main>
    </div>
  )
}
