"use client"

import type { BusinessType } from "@/lib/site"
import { kitCatalog, kitOrder } from "@/lib/kits"

interface BrowseKitsSectionProps {
  onViewKit: (kitType: BusinessType) => void
}

export function BrowseKitsSection({ onViewKit }: BrowseKitsSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-3 h-3 rounded-full bg-mint" />
          <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm font-semibold uppercase tracking-wide">
            Ready-Made Kits
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kitOrder.map((type) => {
            const kit = kitCatalog[type]

            return (
              <div
                key={type}
                className="bg-card border border-border rounded-2xl p-6 hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <span className="inline-block self-start bg-peach text-foreground px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
                  {kit.badge}
                </span>

                <h3 className="font-[var(--font-anton)] text-2xl uppercase tracking-tight mb-2">
                  {kit.name}
                </h3>

                <p className="text-muted-foreground text-sm mb-6 flex-1">
                  {kit.tagline}
                </p>

                <div className="mb-4">
                  <span className="text-3xl font-bold">{kit.starterPriceLabel}</span>
                  <span className="text-muted-foreground text-sm ml-2">or {kit.premiumPriceLabel} with website</span>
                </div>

                <button
                  onClick={() => onViewKit(type)}
                  className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground w-full py-3 rounded-full font-semibold hover:scale-[1.02] transition-transform"
                >
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  VIEW KIT
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
