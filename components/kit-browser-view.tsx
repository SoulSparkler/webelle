"use client"

import type { BusinessType, ViewType } from "@/app/page"
import { kitsData } from "./browse-kits-section"

interface KitBrowserViewProps {
  onViewKit: (kitType: BusinessType) => void
  navigateTo: (view: ViewType) => void
}

export function KitBrowserView({ onViewKit, navigateTo }: KitBrowserViewProps) {
  const kitTypes: BusinessType[] = ["organizer", "curator", "active", "connector"]

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-3 h-3 rounded-full bg-mint" />
            <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm font-semibold uppercase tracking-wide">
              All Business Kits
            </span>
          </div>
          <h1 className="font-[var(--font-anton)] text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight mb-4">
            Browse Kits
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each kit is designed to take you from idea to first customer. Pick your path and start this weekend.
          </p>
        </div>

        {/* Kits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {kitTypes.map((type) => {
            const kit = kitsData[type]
            return (
              <div
                key={type}
                className="bg-card border border-border rounded-2xl p-8 hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300"
              >
                {/* Badge */}
                <span className="inline-block bg-peach text-foreground px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
                  {kit.badge}
                </span>

                {/* Kit name */}
                <h2 className="font-[var(--font-anton)] text-3xl uppercase tracking-tight mb-3">
                  {kit.name}
                </h2>

                {/* Tagline */}
                <p className="text-pink font-medium mb-4">
                  {kit.tagline}
                </p>

                {/* Description */}
                <p className="text-muted-foreground mb-6">
                  {kit.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold">€47</span>
                  <span className="text-muted-foreground ml-2">or €97 with website</span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onViewKit(type)}
                  className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground w-full py-4 rounded-full font-semibold text-lg hover:scale-[1.02] transition-transform"
                >
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  VIEW KIT DETAILS
                </button>
              </div>
            )
          })}
        </div>

        {/* Quiz CTA */}
        <div className="bg-lavender-light rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="font-[var(--font-anton)] text-3xl sm:text-4xl uppercase tracking-tight mb-4">
            {"Don't see your dream business?"}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Take our 2-minute quiz and we&apos;ll match you with the perfect business based on your skills and lifestyle.
          </p>
          <button
            onClick={() => navigateTo("quiz")}
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform"
          >
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            TAKE THE QUIZ
          </button>
        </div>

        {/* Back to home */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigateTo("home")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Back to home
          </button>
        </div>
      </div>
    </div>
  )
}
