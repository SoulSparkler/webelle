"use client"

import type { BusinessType } from "@/app/page"

interface BrowseKitsSectionProps {
  onViewKit: (kitType: BusinessType) => void
}

export const kitsData = {
  organizer: {
    badge: "MOST POPULAR",
    name: "Virtual Assistant",
    tagline: "Turn your organizational superpowers into a thriving service business.",
    description: "Perfect for natural organizers who love making things run smoothly. Help busy professionals and entrepreneurs manage their calendars, emails, and admin tasks.",
  },
  curator: {
    badge: "FOR CREATIVES",
    name: "Vintage & Antique Seller",
    tagline: "Turn your eye for treasure into a profitable business.",
    description: "Ideal for those who love the thrill of the hunt. Source unique finds and build a loyal customer base who appreciate curated quality.",
  },
  active: {
    badge: "GET ACTIVE",
    name: "Dog Walker & Pet Care",
    tagline: "Get paid to spend time with furry friends.",
    description: "Perfect for animal lovers who want to stay active. Build a local reputation and enjoy flexible hours while doing what you love.",
  },
  connector: {
    badge: "FOR NETWORKERS",
    name: "Real Estate Personal Brand",
    tagline: "Leverage your local knowledge and people skills.",
    description: "Great for natural connectors who know their community inside out. Help people find their dream homes while building valuable relationships.",
  },
}

export function BrowseKitsSection({ onViewKit }: BrowseKitsSectionProps) {
  const kitTypes: BusinessType[] = ["organizer", "curator", "active", "connector"]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="w-3 h-3 rounded-full bg-mint" />
          <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm font-semibold uppercase tracking-wide">
            Ready-Made Kits
          </span>
        </div>

        {/* Kits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kitTypes.map((type) => {
            const kit = kitsData[type]
            return (
              <div
                key={type}
                className="bg-card border border-border rounded-2xl p-6 hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Badge */}
                <span className="inline-block self-start bg-peach text-foreground px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
                  {kit.badge}
                </span>

                {/* Kit name */}
                <h3 className="font-[var(--font-anton)] text-2xl uppercase tracking-tight mb-2">
                  {kit.name}
                </h3>

                {/* Tagline */}
                <p className="text-muted-foreground text-sm mb-6 flex-1">
                  {kit.tagline}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-3xl font-bold">€47</span>
                  <span className="text-muted-foreground text-sm ml-2">or €97 with website</span>
                </div>

                {/* CTA */}
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
