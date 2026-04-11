"use client"

import { useState } from "react"
import type { BusinessType, ViewType } from "@/lib/site"
import { kitCatalog } from "@/lib/kits"

interface ResultViewProps {
  businessType: BusinessType
  navigateTo: (view: ViewType) => void
}

export function ResultView({ businessType, navigateTo }: ResultViewProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("Please try again.")
  const kit = kitCatalog[businessType]

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    setErrorMessage("Please try again.")

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter" }),
      })

      if (response.ok) {
        setStatus("success")
        setEmail("")
      } else {
        const data = await response.json().catch(() => null)
        setErrorMessage(data?.error ?? "Please try again.")
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-3 h-3 rounded-full bg-mint" />
          <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm font-semibold uppercase tracking-wide">
            Your Perfect Business
          </span>
        </div>

        <h1 className="font-[var(--font-anton)] text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight mb-4">
          {kit.name}
        </h1>

        <p className="text-xl sm:text-2xl mb-6">
          <span className="bg-pink px-2 py-0.5 rounded">{kit.tagline}</span>
        </p>

        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          {kit.description}
        </p>

        <div className="mb-12">
          <h2 className="font-[var(--font-anton)] text-2xl uppercase tracking-tight mb-6">
            Your Kit Includes:
          </h2>
          <ul className="space-y-3">
            {kit.includes.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-mint font-bold text-lg">&#10003;</span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <span className="inline-block bg-peach text-foreground px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
              STARTER
            </span>
            <div className="mb-6">
              <span className="text-5xl font-bold">{kit.starterPriceLabel}</span>
            </div>
            <p className="text-muted-foreground mb-6">Kit only &mdash; everything you need to launch</p>
            <a
              href={kit.starterLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground w-full py-4 rounded-full font-semibold text-lg hover:scale-[1.02] transition-transform"
            >
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              GET KIT
            </a>
          </div>

          <div className="bg-card border-2 border-lavender rounded-2xl p-8 hover:shadow-lg transition-shadow relative">
            <span className="inline-block bg-peach text-foreground px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
              BEST VALUE
            </span>
            <div className="mb-6">
              <span className="text-5xl font-bold">{kit.premiumPriceLabel}</span>
            </div>
            <p className="text-muted-foreground mb-6">Kit + Live Website &mdash; ready to go online</p>
            <a
              href={kit.premiumLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground w-full py-4 rounded-full font-semibold text-lg hover:scale-[1.02] transition-transform"
            >
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              GET KIT + WEBSITE
            </a>
          </div>
        </div>

        <div className="bg-pink-light rounded-2xl p-8 mb-8">
          <h3 className="font-[var(--font-anton)] text-xl uppercase tracking-tight mb-4">
            Not Sure Yet?
          </h3>
          <p className="text-muted-foreground mb-6">
            Join The Starter newsletter for business ideas and launch tips. Free.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-6 py-3 rounded-full border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform disabled:opacity-50"
            >
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              {status === "loading" ? "JOINING..." : "JOIN FREE"}
            </button>
          </form>
          {status === "success" && (
            <p className="mt-4 text-foreground font-medium">Welcome to The Starter!</p>
          )}
          {status === "error" && (
            <p className="mt-4 font-medium text-red-600">{errorMessage}</p>
          )}
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Digital product · Delivered within 48 hours · All sales final
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigateTo("kits")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Browse other kits
          </button>
          <span className="hidden sm:inline text-muted-foreground">·</span>
          <button
            onClick={() => navigateTo("quiz")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Take the quiz again
          </button>
        </div>
      </div>
    </div>
  )
}
