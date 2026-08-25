import type { BusinessType } from "@/lib/site"

export interface KitInfo {
  type: BusinessType
  badge: string
  name: string
  tagline: string
  description: string
  starterPriceLabel: string
  premiumPriceLabel: string
  starterLink: string
  premiumLink: string
  includes: string[]
}

export const kitOrder: BusinessType[] = ["ai", "organizer", "curator", "active", "connector"]

export const kitCatalog: Record<BusinessType, KitInfo> = {
  organizer: {
    type: "organizer",
    badge: "MOST POPULAR",
    name: "Virtual Assistant",
    tagline: "Turn your organizational superpowers into a thriving service business.",
    description:
      "Perfect for natural organizers who love making things run smoothly. Help busy professionals and entrepreneurs manage their calendars, emails, and admin tasks.",
    starterPriceLabel: "$47",
    premiumPriceLabel: "$97",
    starterLink: "https://buy.stripe.com/dRmbJ2ckufSL0ib9UkcV20k",
    premiumLink: "https://buy.stripe.com/4gM3cw1FQcGz2qj0jKcV20l",
    includes: [
      "Zero-to-first-client launch guide",
      "Service menu and rate card template",
      "Client proposal template",
      "Onboarding checklist and welcome packet",
      "Service agreement template",
      "15 social posts and LinkedIn profile guide",
      "Ready-to-use prompts and a resource guide",
    ],
  },
  curator: {
    type: "curator",
    badge: "FOR CREATIVES",
    name: "Vintage and Antique Seller",
    tagline: "Turn your eye for treasure into a profitable business.",
    description:
      "Ideal for those who love the thrill of the hunt. Source unique finds and build a loyal customer base who appreciate curated quality.",
    starterPriceLabel: "$47",
    premiumPriceLabel: "$97",
    starterLink: "https://buy.stripe.com/3cI3cw3NYeOH4yr1nOcV20e",
    premiumLink: "https://buy.stripe.com/fZu8wQ0BMcGz9SL9UkcV20f",
    includes: [
      "Complete sourcing-to-first-sale launch guide",
      "Phone photography guide for vintage items",
      "Listing templates for Etsy, eBay, and Marketplace",
      "Pricing and margins calculator",
      "15 social media post templates",
      "Time-saving prompts for descriptions and marketing",
      "Curated resource guide",
    ],
  },
  active: {
    type: "active",
    badge: "GET ACTIVE",
    name: "Dog Walker and Pet Care",
    tagline: "Get paid to spend time with furry friends.",
    description:
      "Perfect for animal lovers who want to stay active. Build a local reputation and enjoy flexible hours while doing what you love.",
    starterPriceLabel: "$47",
    premiumPriceLabel: "$97",
    starterLink: "https://buy.stripe.com/7sY5kEesCayrd4XaYocV20i",
    premiumLink: "https://buy.stripe.com/8x2bJ2acm6ib5CvaYocV20j",
    includes: [
      "First-client-in-2-weeks launch guide",
      "Service pricing calculator",
      "Client intake and pet profile forms",
      "Professional service agreement",
      "Daily walk report template",
      "15 social posts and neighborhood flyer",
      "Ready-to-use prompts and a resource guide",
    ],
  },
  connector: {
    type: "connector",
    badge: "FOR NETWORKERS",
    name: "Real Estate Personal Brand",
    tagline: "Leverage your local knowledge and people skills.",
    description:
      "Great for natural connectors who know their community inside out. Help people find their dream homes while building valuable relationships.",
    starterPriceLabel: "$47",
    premiumPriceLabel: "$97",
    starterLink: "https://buy.stripe.com/cNi3cw2JU4a3c0TfeEcV20h",
    premiumLink: "https://buy.stripe.com/00w4gA3NY0XR2qj4A0cV20g",
    includes: [
      "Brand-building launch guide",
      "Listing presentation template",
      "Open house toolkit and follow-up emails",
      "Market analysis report template",
      "5-email client nurture sequence",
      "15 social media post templates",
      "Ready-to-use prompts and a resource guide",
    ],
  },
  ai: {
    type: "ai",
    badge: "LAUNCH PARTNER",
    name: "The 30-Day Business Kit",
    tagline: "Your plans, your templates, your own launch partner — a real 30-day path to your first customer.",
    description:
      "For women who are ready to stop planning and start building. You get realistic plans, ready-to-use templates, and Elle — a launch partner who checks in with you every step of the way. No tech skills needed. Launch your business in 30 days.",
    starterPriceLabel: "$47",
    premiumPriceLabel: "$97",
    starterLink: "https://buy.stripe.com/dRm4gA98i4a39SL5E4cV20d",
    premiumLink: "https://buy.stripe.com/bJe4gAcku35Zd4X5E4cV20c",
    includes: [
      "18-page Launch Guide — 7 chapters and a day-by-day 30-day plan",
      "Progress Tracker — your plan, your checklist, and time-saving prompts",
      "25 ready-to-use templates across 5 categories",
      "Content repurposing workflow — write once, post everywhere",
      "30-day Business Setup Checklist (printable tick-box sheet)",
      "15 social media posts for Instagram, LinkedIn, and Facebook",
      "Time-saving prompt kit — the 6 WebElle templates you'll use forever",
      "Resource Guide — curated tools, communities, and books",
      "Elle, your launch partner — available 24/7, knows every file in your kit",
    ],
  },
}
