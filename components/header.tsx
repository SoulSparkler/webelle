"use client"

import Link from "next/link"
import { useState } from "react"
import { getViewPath } from "@/lib/site"
import type { ViewType } from "@/lib/site"

interface HeaderProps {
  currentView: ViewType
}

const navigationItems: Array<{ label: string; href: string; view: ViewType }> = [
  { label: "Find Your Business", href: getViewPath("quiz"), view: "quiz" },
  { label: "Browse Kits", href: getViewPath("kits"), view: "kits" },
  { label: "The Starter", href: getViewPath("newsletter"), view: "newsletter" },
  { label: "Blog", href: getViewPath("blog"), view: "blog" },
]

export function Header({ currentView }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navClassName = (view: ViewType) =>
    `px-5 py-2 rounded-full border text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground ${
      currentView === view ? "bg-primary text-primary-foreground" : "border-primary/30 hover:border-primary"
    }`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href={getViewPath("home")}
          className="font-[var(--font-anton)] text-2xl tracking-tight uppercase hover:opacity-70 transition-opacity"
        >
          WebElle
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {navigationItems.map((item) => (
            <Link key={item.view} href={item.href} className={navClassName(item.view)}>
              {item.label}
            </Link>
          ))}
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navigationItems.map((item) => (
              <Link
                key={item.view}
                href={item.href}
                className="px-5 py-3 rounded-full border border-primary/30 text-sm font-medium text-center hover:bg-primary hover:text-primary-foreground transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
