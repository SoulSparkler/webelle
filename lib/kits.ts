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

export const kitOrder: BusinessType[] = ["organizer", "curator", "active", "connector"]

export const kitCatalog: Record<BusinessType, KitInfo> = {
  organizer: {
    type: "organizer",
    badge: "MOST POPULAR",
    name: "Virtual Assistant",
    tagline: "Turn your organizational superpowers into a thriving service business.",
    description:
      "Perfect for natural organizers who love making things run smoothly. Help busy professionals and entrepreneurs manage their calendars, emails, and admin tasks.",
    starterPriceLabel: "EUR 47",
    premiumPriceLabel: "EUR 97",
    starterLink: "https://buy.stripe.com/3cI3cwbgq35Zd4X5E4cV204",
    premiumLink: "https://buy.stripe.com/00w4gA70a4a3gh99UkcV203",
    includes: [
      "Zero-to-first-client launch guide",
      "Service menu and rate card template",
      "Client proposal template",
      "Onboarding checklist and welcome packet",
      "Service agreement template",
      "15 social posts and LinkedIn profile guide",
      "AI prompt kit and resource guide",
    ],
  },
  curator: {
    type: "curator",
    badge: "FOR CREATIVES",
    name: "Vintage and Antique Seller",
    tagline: "Turn your eye for treasure into a profitable business.",
    description:
      "Ideal for those who love the thrill of the hunt. Source unique finds and build a loyal customer base who appreciate curated quality.",
    starterPriceLabel: "EUR 47",
    premiumPriceLabel: "EUR 97",
    starterLink: "https://buy.stripe.com/8x25kEckueOH9SLaYocV20a",
    premiumLink: "https://buy.stripe.com/bJeaEYgAK9un0ibd6wcV209",
    includes: [
      "Complete sourcing-to-first-sale launch guide",
      "Phone photography guide for vintage items",
      "Listing templates for Etsy, eBay, and Marketplace",
      "Pricing and margins calculator",
      "15 social media post templates",
      "AI prompt kit for descriptions and marketing",
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
    starterPriceLabel: "EUR 47",
    premiumPriceLabel: "EUR 97",
    starterLink: "https://buy.stripe.com/cNi5kE2JU4a35Cv5E4cV206",
    premiumLink: "https://buy.stripe.com/4gMcN6gAK8qj9SL5E4cV205",
    includes: [
      "First-client-in-2-weeks launch guide",
      "Service pricing calculator",
      "Client intake and pet profile forms",
      "Professional service agreement",
      "Daily walk report template",
      "15 social posts and neighborhood flyer",
      "AI prompt kit and resource guide",
    ],
  },
  connector: {
    type: "connector",
    badge: "FOR NETWORKERS",
    name: "Real Estate Personal Brand",
    tagline: "Leverage your local knowledge and people skills.",
    description:
      "Great for natural connectors who know their community inside out. Help people find their dream homes while building valuable relationships.",
    starterPriceLabel: "EUR 47",
    premiumPriceLabel: "EUR 97",
    starterLink: "https://buy.stripe.com/eVq6oI98idKDd4X7MccV207",
    premiumLink: "https://buy.stripe.com/5kQeVebgq21V2qjfeEcV208",
    includes: [
      "Brand-building launch guide",
      "Listing presentation template",
      "Open house toolkit and follow-up emails",
      "Market analysis report template",
      "5-email client nurture sequence",
      "15 social media post templates",
      "AI prompt kit and resource guide",
    ],
  },
}
