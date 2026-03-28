"use client"

import { useState } from "react"
import type { ViewType } from "@/app/page"

interface NewsletterViewProps {
  navigateTo: (view: ViewType) => void
}

export function NewsletterView({ navigateTo }: NewsletterViewProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center animate-fade-in">
      <div className="max-w-2xl mx-auto text-center">
        {/* Large title */}
        <h1 className="font-[var(--font-anton)] text-6xl sm:text-7xl lg:text-8xl uppercase tracking-tight mb-6">
          The Starter
        </h1>

        {/* Highlighted tagline */}
        <p className="text-xl sm:text-2xl mb-8">
          <span className="bg-pink px-2 py-1 rounded">Free monthly newsletter for women ready to build</span>
        </p>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
          Every month: a fresh business idea you can actually start, a success story from a real woman who launched, and practical tips you can use that weekend. No fluff. No hustle-bro energy.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full sm:flex-1 px-6 py-4 rounded-full border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform disabled:opacity-50 whitespace-nowrap"
          >
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            {status === "loading" ? "JOINING..." : "JOIN FREE"}
          </button>
        </form>

        {status === "success" && (
          <p className="text-foreground font-medium mb-6">Welcome to The Starter! Check your inbox.</p>
        )}
        {status === "error" && (
          <p className="text-red-600 font-medium mb-6">Something went wrong. Please try again.</p>
        )}

        <p className="text-sm text-muted-foreground mb-12">
          No spam. Unsubscribe anytime.
        </p>

        {/* Back link */}
        <button
          onClick={() => navigateTo("home")}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Back to home
        </button>
      </div>
    </div>
  )
}
