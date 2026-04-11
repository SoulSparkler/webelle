"use client"

import type { ViewType } from "@/lib/site"

interface HeroSectionProps {
  navigateTo: (view: ViewType) => void
}

export function HeroSection({ navigateTo }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-16">
      {/* Hero content */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Massive hero text */}
        <h1 className="font-[var(--font-anton)] text-[15vw] sm:text-[12vw] lg:text-[10vw] leading-[0.85] tracking-tight uppercase text-center mb-8">
          WEB ELLE
        </h1>
        
        {/* Tagline with highlighted words */}
        <p className="text-lg sm:text-xl lg:text-2xl text-center max-w-3xl mx-auto leading-relaxed mb-12">
          We help women start{" "}
          <span className="bg-pink px-2 py-0.5 rounded">real businesses</span>
          {" "}&mdash; whether you&apos;re dreaming of a{" "}
          <span className="bg-lavender px-2 py-0.5 rounded">side hustle</span>
          , leaving corporate, or simply ready for{" "}
          <span className="bg-mint px-2 py-0.5 rounded">something of your own</span>.
        </p>

        {/* CTA Buttons */}
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

      {/* Marquee strip */}
      <div className="bg-pink py-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array(10).fill(null).map((_, i) => (
            <span key={i} className="text-foreground font-semibold text-lg mx-8 flex items-center gap-8">
              START YOUR BUSINESS THIS WEEKEND
              <span className="text-2xl">&#9733;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
