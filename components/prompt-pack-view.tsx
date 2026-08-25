"use client"

import { promptCatalog } from "@/lib/prompts"

interface PromptPackViewProps {
  slug: string
}

export function PromptPackView({ slug }: PromptPackViewProps) {
  const pack = promptCatalog[slug]

  if (!pack) return null

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-3 h-3 rounded-full bg-mint" />
          <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm font-semibold uppercase tracking-wide">
            {pack.badge}
          </span>
        </div>

        <h1 className="font-[var(--font-anton)] text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight mb-2">
          {pack.name}
        </h1>
        <h2 className="font-[var(--font-anton)] text-2xl sm:text-3xl uppercase tracking-tight mb-4 text-muted-foreground">
          {pack.headline}
        </h2>

        <p className="text-xl sm:text-2xl mb-6">
          <span className="bg-pink px-2 py-0.5 rounded">{pack.tagline}</span>
        </p>

        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          {pack.description}
        </p>

        <div className="mb-12">
          <h2 className="font-[var(--font-anton)] text-2xl uppercase tracking-tight mb-6">
            {"What's Inside:"}
          </h2>
          <ul className="space-y-3">
            {pack.includes.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-mint font-bold text-lg">&#10003;</span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-sm mb-16">
          <div className="bg-card border-2 border-lavender rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <span className="inline-block bg-peach text-foreground px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
              INSTANT DOWNLOAD
            </span>
            <div className="mb-2">
              <span className="text-5xl font-bold">{pack.priceLabel}</span>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              110 templates &middot; Works with the tools you already use
            </p>
            <a
              href={pack.stripeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground w-full py-4 rounded-full font-semibold text-lg hover:scale-[1.02] transition-transform"
            >
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              GET INSTANT ACCESS
            </a>
          </div>
        </div>

        <p className="text-sm text-muted-foreground text-center mb-12">
          Digital product &middot; Instant download &middot; All sales final
        </p>

        <div className="flex items-center justify-center">
          <a href="/kits" className="text-muted-foreground hover:text-foreground transition-colors">
            &larr; Browse all products
          </a>
        </div>
      </div>
    </div>
  )
}
