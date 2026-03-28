"use client"

export function AboutSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-3 h-3 rounded-full bg-mint" />
          <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm font-semibold uppercase tracking-wide">
            About WebElle
          </span>
        </div>

        <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground">
          Built by a woman who started multiple businesses from scratch &mdash; a vintage shop, a dog walking service, online stores, digital products. Every kit contains the{" "}
          <span className="bg-pink px-1.5 py-0.5 rounded text-foreground">shortcuts</span> and{" "}
          <span className="bg-lavender px-1.5 py-0.5 rounded text-foreground">real-world lessons</span>{" "}
          I wish I&apos;d had on Day 1.
        </p>
      </div>
    </section>
  )
}
