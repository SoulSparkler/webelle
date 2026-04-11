"use client"

import type { ViewType } from "@/lib/site"

interface CTASectionProps {
  navigateTo: (view: ViewType) => void
}

export function CTASection({ navigateTo }: CTASectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-[var(--font-anton)] text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight mb-8">
          Ready to Start?
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Take our 2-minute quiz to find your perfect business match, or browse our full collection of starter kits.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigateTo("quiz")}
            className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform"
          >
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            FIND MY PERFECT BUSINESS
          </button>
          <button
            onClick={() => navigateTo("kits")}
            className="px-8 py-4 rounded-full border-2 border-primary font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all"
          >
            BROWSE ALL KITS
          </button>
        </div>
      </div>
    </section>
  )
}
