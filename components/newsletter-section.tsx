"use client"

import { useState } from "react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    
    try {
      // SendFox integration placeholder
      await fetch("https://api.sendfox.com/forms/PLACEHOLDER/subscribe", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      setStatus("success")
      setEmail("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-pink">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-[var(--font-anton)] text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight mb-4">
          Not Ready Yet?
        </h2>
        <p className="text-lg text-foreground/80 mb-8 max-w-xl mx-auto">
          Join The Starter &mdash; fresh business ideas, success stories, and launch tips. Monthly. Free.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full sm:flex-1 px-6 py-4 rounded-full border-2 border-foreground/20 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
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
          <p className="mt-4 text-foreground font-medium">Welcome to The Starter!</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-600 font-medium">Something went wrong. Please try again.</p>
        )}

        <p className="mt-6 text-sm text-foreground/60">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
