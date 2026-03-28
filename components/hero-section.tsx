"use client"

import type { ViewType } from "@/app/page"

interface HeroSectionProps {
  navigateTo: (view: ViewType) => void
}

export function HeroSection({ navigateTo }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex flex-col">
      {/* Pink grid hero */}
      <div className="flex-1 bg-pink-hot grid-pattern relative">
        <div className="px-6 sm:px-12 lg:px-20 py-16 sm:py-24 lg:py-32 h-full flex flex-col">
          {/* Section label with green dot */}
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <span className="w-3 h-3 rounded-full bg-mint flex-shrink-0" />
            <span className="text-white font-bold text-sm sm:text-base tracking-wider uppercase">
              Dream. Build. Earn.
            </span>
          </div>

          {/* Large italic headline */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="font-[var(--font-serif-display)] italic text-white text-[8vw] sm:text-[7vw] lg:text-[5.5vw] leading-[1.05] tracking-tight max-w-6xl">
              After the 9-to-5 ends and the routine fades, your ambition deserves more than just a dream.
            </h1>

            {/* Body text positioned to the right */}
            <div className="mt-8 sm:mt-12 lg:mt-16 flex justify-end">
              <div className="max-w-md lg:max-w-lg text-white/90 text-base sm:text-lg leading-relaxed">
                <p className="mb-4">
                  Meet WebElle Business Starter Kits — a carefully curated collection of templates, guides, and tools designed to help you launch your own business.
                </p>
                <p>
                  Take the quiz, get your personalized kit, and wake up on Monday as a business owner (or at least on your way there).
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-12">
            <button
              onClick={() => navigateTo("quiz")}
              className="group flex items-center gap-3 bg-white text-pink-hot px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform"
            >
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              FIND MY PERFECT BUSINESS
            </button>
            <button
              onClick={() => navigateTo("kits")}
              className="px-8 py-4 rounded-full border-2 border-white text-white font-bold text-base sm:text-lg hover:bg-white hover:text-pink-hot transition-all"
            >
              BROWSE ALL KITS
            </button>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="bg-foreground py-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array(10).fill(null).map((_, i) => (
            <span key={i} className="text-white font-semibold text-lg mx-8 flex items-center gap-8">
              START YOUR BUSINESS THIS WEEKEND
              <span className="text-mint text-2xl">&#9733;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
