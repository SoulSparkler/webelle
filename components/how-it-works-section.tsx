"use client"

import type { ViewType } from "@/app/page"

interface HowItWorksSectionProps {
  navigateTo: (view: ViewType) => void
}

const steps = [
  {
    number: "1",
    title: "Take the 2-minute quiz",
    description: "Answer a few quick questions about your skills and preferences.",
  },
  {
    number: "2",
    title: "Get matched with your perfect business",
    description: "Our algorithm finds the ideal business type for your lifestyle.",
  },
  {
    number: "3",
    title: "Choose your kit",
    description: "€47 for the essentials or €97 with a live website included.",
  },
  {
    number: "4",
    title: "Launch this weekend",
    description: "Everything you need to start earning is right there.",
  },
]

export function HowItWorksSection({ navigateTo }: HowItWorksSectionProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-lavender relative overflow-hidden">
      {/* Radial gradient orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-radial from-white/40 via-lavender/20 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section title */}
        <h2 className="font-[var(--font-anton)] text-5xl sm:text-6xl lg:text-7xl text-center uppercase tracking-tight text-white mb-16">
          How It Works
        </h2>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Large outlined number */}
              <span className="font-[var(--font-anton)] text-[120px] leading-none text-transparent stroke-white absolute -top-8 -left-2 opacity-20" style={{ WebkitTextStroke: "2px white" }}>
                {step.number}
              </span>
              <div className="relative z-10 pt-20">
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigateTo("quiz")}
            className="group inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform"
          >
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            START THE QUIZ
          </button>
        </div>
      </div>
    </section>
  )
}
