"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhatsInKitSection } from "@/components/whats-in-kit-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { BrowseKitsSection } from "@/components/browse-kits-section"
import { CTASection } from "@/components/cta-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { QuizView } from "@/components/quiz-view"
import { ResultView } from "@/components/result-view"
import { KitBrowserView } from "@/components/kit-browser-view"
import { NewsletterView } from "@/components/newsletter-view"
import { BlogSection } from "@/components/blog-section"

export type ViewType = "home" | "quiz" | "result" | "kits" | "newsletter"
export type BusinessType = "curator" | "active" | "organizer" | "connector"

export interface QuizAnswers {
  skills?: BusinessType
  time?: string
  budget?: string
  location?: string
  priority?: string
}

export default function WebEllePage() {
  const [currentView, setCurrentView] = useState<ViewType>("home")
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({})
  const [matchedBusiness, setMatchedBusiness] = useState<BusinessType | null>(null)
  const [selectedKit, setSelectedKit] = useState<BusinessType | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentView])

  const handleQuizComplete = (answers: QuizAnswers) => {
    setQuizAnswers(answers)
    if (answers.skills) {
      setMatchedBusiness(answers.skills)
      setCurrentView("result")
    }
  }

  const handleViewKit = (kitType: BusinessType) => {
    setSelectedKit(kitType)
    setMatchedBusiness(kitType)
    setCurrentView("result")
  }

  const navigateTo = (view: ViewType) => {
    setCurrentView(view)
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header currentView={currentView} navigateTo={navigateTo} />
      
      {currentView === "home" && (
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
      )}

      {currentView === "quiz" && (
        <QuizView 
          onComplete={handleQuizComplete} 
          onBack={() => navigateTo("home")} 
        />
      )}

      {currentView === "result" && matchedBusiness && (
        <ResultView 
          businessType={matchedBusiness} 
          navigateTo={navigateTo}
        />
      )}

      {currentView === "kits" && (
        <KitBrowserView 
          onViewKit={handleViewKit} 
          navigateTo={navigateTo}
        />
      )}

      {currentView === "newsletter" && (
        <NewsletterView navigateTo={navigateTo} />
      )}
    </div>
  )
}
