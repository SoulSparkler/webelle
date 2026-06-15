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
    badge: "PROMPT PACK",
    name: "Business in a Box",
    headline: "The Complete Prompt Library",
    tagline: "Claude AI Small Business Prompt Pack",
    description:
      "110 copy-and-paste prompts that help you write, market, and grow your business in a fraction of the time. No tech skills needed. Just paste, tweak, and go.",
    priceLabel: "$9.99",
    stripeLink: "https://buy.stripe.com/cNicN684e21V7KDaYocV20o",
    includes: [
      "110 ready-to-use copy-and-paste prompts",
      "Content Creation prompts",
      "SEO prompts",
      "Email Marketing prompts",
      "Social Media prompts",
      "Works with ChatGPT and Claude",
      "Instant download — PDF format",
    ],
  },
}
