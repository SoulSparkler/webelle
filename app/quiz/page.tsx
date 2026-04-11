"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QuizView } from "@/components/quiz-view"
import { QuizEmailCapture } from "@/components/quiz-email-capture"
import type { BusinessType, QuizAnswers } from "@/lib/site"
import { useState } from "react"

export default function QuizPage() {
  const router = useRouter()
  const [matchedBusiness, setMatchedBusiness] = useState<BusinessType | null>(null)

  const handleQuizComplete = (answers: QuizAnswers) => {
    if (answers.skills) {
      setMatchedBusiness(answers.skills)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentView="quiz" />
      <main>
        {matchedBusiness ? (
          <QuizEmailCapture businessType={matchedBusiness} />
        ) : (
          <QuizView onComplete={handleQuizComplete} onBack={() => router.push("/")} />
        )}
      </main>
      <Footer />
    </div>
  )
}
