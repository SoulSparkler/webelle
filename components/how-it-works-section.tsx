"use client"

import type { ViewType } from "@/app/page"

interface HowItWorksSectionProps {
  navigateTo: (view: ViewType) => void
}

const steps = [
  {
    number: "01",
    title: "Take the quiz",
    description: "Answer a few quick questions about your skills, interests, and how much time you have.",
  },
  {
    number: "02",
    title: "Get matched",
    description: "Our algorithm finds the ideal business type that fits your lifestyle and strengths.",
  },
  {
    number: "03",
    title: "Choose your kit",
    description: "Pick the essentials package or go premium with a live website included.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Everything you need to start earning is right there. Go live this weekend.",
  },
]

export function HowItWorksSection({ navigateTo }: HowItWorksSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Hot pink background with grid pattern */}
      <div className="absolute inset-0 bg-[#FF69B4]" />
      <div className="absolute inset-0 grid-pattern" />
      
      <div className="relative z-10 py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
            {/* Left side - Label */}
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-mint" />
              <span className="text-sm font-bold tracking-wider text-white uppercase">
                Simple. Fast. Done.
              </span>
            </div>
            
            {/* Right side - Large italic headline */}
            <div className="lg:max-w-3xl lg:text-right">
              <h2 className="font-[var(--font-anton)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white italic leading-[1.1]">
                From idea to income in four simple steps.
              </h2>
            </div>
          </div>

          {/* Steps - Horizontal layout on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-bold text-white/30 font-[var(--font-anton)]">
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-white/20" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {step.description}
                </p>
                
                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/30 group-hover:bg-mint transition-colors" />
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-8 pt-12 border-t border-white/20">
            <p className="text-white/90 text-lg max-w-md">
              Ready to discover your perfect business match? It only takes 2 minutes.
            </p>
            <button
              onClick={() => navigateTo("quiz")}
              className="group inline-flex items-center gap-3 bg-white text-[#FF69B4] px-8 py-4 rounded-full font-bold text-lg hover:bg-black hover:text-white transition-all duration-300"
            >
              START THE QUIZ
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FF69B4] text-white group-hover:bg-white group-hover:text-black transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
