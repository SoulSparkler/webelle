export interface PromptPackInfo {
  slug: string
  badge: string
  name: string
  headline: string
  tagline: string
  description: string
  priceLabel: string
  stripeLink: string
  includes: string[]
}

export const promptCatalog: Record<string, PromptPackInfo> = {
  "business-in-a-box": {
    slug: "business-in-a-box",
    badge: "TEMPLATE LIBRARY",
    name: "Business in a Box",
    headline: "The Complete Template Library",
    tagline: "Ready-to-use templates for selling & marketing",
    description:
      "110 copy-and-paste templates that help you write, market, and grow your business in a fraction of the time. No tech skills needed. Just paste, tweak, and go.",
    priceLabel: "$9.99",
    stripeLink: "https://buy.stripe.com/cNicN684e21V7KDaYocV20o",
    includes: [
      "110 ready-to-use copy-and-paste templates",
      "Content templates",
      "SEO templates",
      "Email marketing templates",
      "Social media templates",
      "Works with the tools you already use",
      "Instant download — PDF format",
    ],
  },
}
