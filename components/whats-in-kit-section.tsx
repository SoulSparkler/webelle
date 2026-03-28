"use client"

const kitItems = [
  {
    title: "Launch Guide",
    description: "Step-by-step roadmap from zero to first client, with real timelines and actionable tasks.",
    bgColor: "bg-pink-light",
  },
  {
    title: "Website Template",
    description: "Professional, mobile-ready website template you can customize in minutes (€97 kit only).",
    bgColor: "bg-lavender-light",
  },
  {
    title: "Template Pack",
    description: "Contracts, proposals, pricing guides, and client onboarding documents ready to use.",
    bgColor: "bg-mint-light",
  },
  {
    title: "AI Prompt Kit",
    description: "Done-for-you prompts for marketing copy, social posts, and client communications.",
    bgColor: "bg-peach-light",
  },
]

export function WhatsInKitSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="w-3 h-3 rounded-full bg-mint" />
          <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm font-semibold uppercase tracking-wide">
            What You Get
          </span>
        </div>

        {/* Grid of items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kitItems.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} p-8 rounded-2xl hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300`}
            >
              <h3 className="font-[var(--font-anton)] text-2xl uppercase tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
