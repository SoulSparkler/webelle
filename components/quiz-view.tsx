"use client"

import { useState, useEffect } from "react"
import type { QuizAnswers } from "@/lib/site"

interface QuizViewProps {
  onComplete: (answers: QuizAnswers) => void
  onBack: () => void
}

interface QuizOption {
  label: string
  description: string
  value: string
  color: "pink" | "lavender" | "mint" | "peach"
}

interface QuizQuestion {
  id: keyof QuizAnswers
  question: string
  options: QuizOption[]
}

const questions: QuizQuestion[] = [
  {
    id: "skills",
    question: "What comes naturally to you?",
    options: [
      { label: "Finding beautiful things", description: "Vintage, antiques, flea markets, hidden gems", value: "curator", color: "pink" },
      { label: "Being active & outdoors", description: "Animals, nature, movement, fresh air", value: "active", color: "mint" },
      { label: "Organizing & helping", description: "Lists, planning, making things run smoothly", value: "organizer", color: "lavender" },
      { label: "Connecting people & places", description: "Local expert, networking, community", value: "connector", color: "peach" },
      { label: "Working smarter with AI", description: "Prompts, tools, automation — making tech work for you", value: "ai", color: "lavender" },
    ],
  },
  {
    id: "time",
    question: "How much time can you invest per week?",
    options: [
      { label: "5–10 hours", description: "A gentle start", value: "light", color: "pink" },
      { label: "15–25 hours", description: "Serious side hustle", value: "medium", color: "lavender" },
      { label: "30+ hours", description: "All in", value: "full", color: "mint" },
    ],
  },
  {
    id: "budget",
    question: "What's your startup budget?",
    options: [
      { label: "Under €50", description: "Near zero, and that's okay", value: "minimal", color: "mint" },
      { label: "€50–€200", description: "A small investment", value: "small", color: "lavender" },
      { label: "€200+", description: "Ready to invest", value: "ready", color: "pink" },
    ],
  },
  {
    id: "location",
    question: "Your ideal Tuesday morning?",
    options: [
      { label: "Home — laptop & coffee", description: "Cozy, flexible, focused", value: "home", color: "lavender" },
      { label: "Out there — moving & meeting", description: "Active, social, outside", value: "outside", color: "mint" },
    ],
  },
  {
    id: "priority",
    question: "What matters most to you?",
    options: [
      { label: "Flexibility", description: "My schedule, my rules", value: "flexibility", color: "pink" },
      { label: "Independence", description: "No more bosses", value: "independence", color: "lavender" },
      { label: "Purpose", description: "Work I care about", value: "purpose", color: "mint" },
      { label: "Income — fast", description: "I need to earn now", value: "income", color: "peach" },
    ],
  },
]

const colorMap = {
  pink: { dot: "bg-pink", border: "border-pink", bg: "bg-pink-light" },
  lavender: { dot: "bg-lavender", border: "border-lavender", bg: "bg-lavender-light" },
  mint: { dot: "bg-mint", border: "border-mint", bg: "bg-mint-light" },
  peach: { dot: "bg-peach", border: "border-peach", bg: "bg-peach-light" },
}

export function QuizView({ onComplete, onBack }: QuizViewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const question = questions[currentQuestion]
  const totalQuestions = questions.length
  const progress = ((currentQuestion) / totalQuestions) * 100

  useEffect(() => {
    if (selectedOption !== null) {
      const timer = setTimeout(() => {
        const newAnswers = { ...answers, [question.id]: selectedOption }
        setAnswers(newAnswers)

        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedOption(null)
        } else {
          onComplete(newAnswers as QuizAnswers)
        }
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [selectedOption, answers, currentQuestion, question.id, onComplete, totalQuestions])

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(null)
    } else {
      onBack()
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex gap-2">
            {Array(totalQuestions).fill(null).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i < currentQuestion ? "bg-pink" : i === currentQuestion ? "bg-pink" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>
        </div>

        {/* Question card */}
        <div className="bg-card border border-border rounded-3xl p-8 sm:p-12 animate-fade-in">
          <h2 className="font-[var(--font-anton)] text-3xl sm:text-4xl uppercase tracking-tight mb-8">
            {question.question}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-4">
            {question.options.map((option) => {
              const colors = colorMap[option.color]
              const isSelected = selectedOption === option.value

              return (
                <button
                  key={option.value}
                  onClick={() => setSelectedOption(option.value)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all hover:translate-y-[-2px] ${
                    isSelected
                      ? `${colors.border} ${colors.bg}`
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`w-3 h-3 rounded-full ${colors.dot} mt-1.5 flex-shrink-0`} />
                    <div>
                      <span className="font-bold text-lg">{option.label}</span>
                      <p className="text-muted-foreground mt-1">{option.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Back button */}
          <button
            onClick={handleBack}
            className="mt-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Back
          </button>
        </div>
      </div>
    </div>
  )
}
