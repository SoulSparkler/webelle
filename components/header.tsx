"use client"

import type { ViewType } from "@/app/page"

interface HeaderProps {
  currentView: ViewType
  navigateTo: (view: ViewType) => void
}

export function Header({ currentView, navigateTo }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => navigateTo("home")}
          className="font-[var(--font-anton)] text-2xl tracking-tight uppercase hover:opacity-70 transition-opacity"
        >
          WebElle
        </button>

        {/* Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigateTo("quiz")}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground ${
              currentView === "quiz" 
                ? "bg-primary text-primary-foreground" 
                : "border-primary/30 hover:border-primary"
            }`}
          >
            Find Your Business
          </button>
          <button
            onClick={() => navigateTo("kits")}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground ${
              currentView === "kits" 
                ? "bg-primary text-primary-foreground" 
                : "border-primary/30 hover:border-primary"
            }`}
          >
            Browse Kits
          </button>
          <button
            onClick={() => navigateTo("newsletter")}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground ${
              currentView === "newsletter" 
                ? "bg-primary text-primary-foreground" 
                : "border-primary/30 hover:border-primary"
            }`}
          >
            The Starter
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => {
            const menu = document.getElementById("mobile-menu")
            menu?.classList.toggle("hidden")
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-menu" className="hidden md:hidden border-t border-border bg-background">
        <div className="px-4 py-4 flex flex-col gap-3">
          <button
            onClick={() => {
              navigateTo("quiz")
              document.getElementById("mobile-menu")?.classList.add("hidden")
            }}
            className="px-5 py-3 rounded-full border border-primary/30 text-sm font-medium text-center hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Find Your Business
          </button>
          <button
            onClick={() => {
              navigateTo("kits")
              document.getElementById("mobile-menu")?.classList.add("hidden")
            }}
            className="px-5 py-3 rounded-full border border-primary/30 text-sm font-medium text-center hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Browse Kits
          </button>
          <button
            onClick={() => {
              navigateTo("newsletter")
              document.getElementById("mobile-menu")?.classList.add("hidden")
            }}
            className="px-5 py-3 rounded-full border border-primary/30 text-sm font-medium text-center hover:bg-primary hover:text-primary-foreground transition-all"
          >
            The Starter
          </button>
        </div>
      </div>
    </header>
  )
}
