"use client"

import { useState } from "react"
import type { BusinessType, ViewType } from "@/app/page"
import { kitsData } from "./browse-kits-section"

interface ResultViewProps {
  businessType: BusinessType
  navigateTo: (view: ViewType) => void
}

const kitIncludes: Record<BusinessType, string[]> = {
  organizer: [
    "Zero-to-first-client launch guide",
    "Service menu & rate card template",
    "Client proposal template",
    "Onboarding checklist & welcome packet",
    "Service agreement template",
    "15 social posts + LinkedIn profile guide",
    "AI prompt kit + resource guide",
  ],
  curator: [
    "Complete sourcing-to-first-sale launch guide",
    "Phone photography guide for vintage items",
    "Listing templates for Etsy, eBay & Marketplace",
    "Pricing & margins calculator",
    "15 social media post templates",
    "AI prompt kit for descriptions & marketing",
    "Curated resource guide",
  ],
  active: [
    "First-client-in-2-weeks launch guide",
    "Service pricing calculator",
    "Client intake & pet profile forms",
    "Professional service agreement",
    "Daily walk report template",
    "15 social posts + neighborhood flyer",
    "AI prompt kit + resource guide",
  ],
  connector: [
    "Brand-building launch guide",
    "Listing presentation template",
    "Open house toolkit + follow-up emails",
    "Market analysis report template",
    "5-email client nurture sequence",
    "15 social media post templates",
    "AI prompt kit + resource guide",
  ],
}

export function ResultView({ businessType, navigateTo }: ResultViewProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const kit = kitsData[businessType]
  const includes = kitIncludes[businessType]

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (response.ok) {
        setStatus("success")
        setEmail("")
      }
    } catch {
      setStatus("success") // Still show success for better UX
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-3 h-3 rounded-full bg-mint" />
          <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm font-semibold uppercase tracking-wide">
            Your Perfect Business
          </span>
        </div>

        {/* Business title */}
        <h1 className="font-[var(--font-anton)] text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight mb-4">
          {kit.name}
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl mb-6">
          <span className="bg-pink px-2 py-0.5 rounded">{kit.tagline}</span>
        </p>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          {kit.description}
        </p>

        {/* What's included */}
        <div className="mb-12">
          <h2 className="font-[var(--font-anton)] text-2xl uppercase tracking-tight mb-6">
            Your Kit Includes:
          </h2>
          <ul className="space-y-3">
            {includes.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-mint font-bold text-lg">&#10003;</span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Starter kit */}
          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <span className="inline-block bg-peach text-foreground px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
              STARTER
            </span>
            <div className="mb-6">
              <span className="text-5xl font-bold">€47</span>
            </div>
            <p className="text-muted-foreground mb-6">Kit only &mdash; everything you need to launch</p>
            <a
              href="https://buy.stripe.com/6oUeVeacmdKD4yreaAcV201"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground w-full py-4 rounded-full font-semibold text-lg hover:scale-[1.02] transition-transform"
            >
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              GET KIT
            </a>
          </div>

          {/* Best value kit */}
          <div className="bg-card border-2 border-lavender rounded-2xl p-8 hover:shadow-lg transition-shadow relative">
            <span className="inline-block bg-peach text-foreground px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
              BEST VALUE
            </span>
            <div className="mb-6">
              <span className="text-5xl font-bold">€97</span>
            </div>
            <p className="text-muted-foreground mb-6">Kit + Live Website &mdash; ready to go online</p>
            <a
              href="https://buy.stripe.com/8x2dRa98i21V9SL3vWcV202"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground w-full py-4 rounded-full font-semibold text-lg hover:scale-[1.02] transition-transform"
            >
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              GET KIT + WEBSITE
            </a>
          </div>
        </div>

        {/* Not sure yet section */}
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
        </div>

        {/* Small print */}
        <p className="text-sm text-muted-foreground text-center">
          Digital product · Delivered within 48 hours · All sales final
        </p>

        {/* Navigation */}
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
