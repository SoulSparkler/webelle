"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { kitCatalog } from "@/lib/kits"
import { getResultPath } from "@/lib/site"
import type { BusinessType } from "@/lib/site"

interface QuizEmailCaptureProps {
  businessType: BusinessType
}

export function QuizEmailCapture({ businessType }: QuizEmailCaptureProps) {
  const router = useRouter()
  const kit = kitCatalog[businessType]
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("Please try again in a moment.")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email) {
      return
    }

    setStatus("loading")
    setErrorMessage("Please try again in a moment.")

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "quiz",
          businessType,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        setErrorMessage(data?.error ?? "Please try again in a moment.")
        setStatus("error")
        return
      }

      router.push(getResultPath(businessType))
    } catch {
      setStatus("error")
      setErrorMessage("Please try again in a moment.")
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-2xl rounded-3xl border border-border bg-card p-8 sm:p-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-3 w-3 rounded-full bg-mint" />
          <span className="rounded bg-primary px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground">
            One Last Step
          </span>
        </div>

        <h1 className="font-[var(--font-anton)] text-4xl sm:text-5xl uppercase tracking-tight mb-4">
          Get Your Match
        </h1>

        <p className="text-lg text-muted-foreground mb-3">
          We matched you with <span className="text-foreground font-semibold">{kit.name}</span>.
        </p>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Enter your email and we&apos;ll send your personalized business recommendation with next steps, then open your full result page.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="your@email.com"
            className="flex-1 rounded-full border border-border bg-background px-6 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="group flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-50"
          >
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            {status === "loading" ? "SENDING..." : "SEND MY RESULTS"}
          </button>
        </form>

        {status === "error" && (
          <p className="mt-4 font-medium text-red-600">{errorMessage}</p>
        )}

        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-8 text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; Back to home
        </button>
      </div>
    </div>
  )
}
