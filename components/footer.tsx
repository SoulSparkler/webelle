"use client"

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-[var(--font-anton)] text-xl tracking-tight uppercase">
          WebElle
        </span>
        <p className="text-sm text-muted-foreground text-center">
          © 2026 WebElle · webelle.store · All digital products are final sale.
        </p>
      </div>
    </footer>
  )
}
