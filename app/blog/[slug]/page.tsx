"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card"
import { Button } from "@/components/button"
import { Badge } from "@/components/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface BlogPost {
  slug: string
  title: string
  description: string
  excerpt: string
  date: string
  readingTime: string
  category: string
  content: string
}

const blogPosts: Record<string, BlogPost> = {
  "virtual-assistant-costs-guide": {
    slug: "virtual-assistant-costs-guide",
    title: "Virtual Assistant Costs in 2026: A Complete Pricing Guide",
    description: "Everything you need to know about hiring VAs in 2026.",
    excerpt: "Break down of 2026 pricing and how to determine if hiring a VA is right for you.",
    date: "April 2026",
    readingTime: "8 minutes",
    category: "Virtual Assistant",
    content: "# Virtual Assistant Costs in 2026\n\nRunning a small business in 2026 means wearing many hats—but you don't have to do it all alone.\n\n## Virtual Assistant Hourly Rates in 2026\n\n### Entry-Level VAs (€8-€15/hour)\n- Inbox management\n- Calendar scheduling\n- Data entry\n- Basic customer service\n\n### Mid-Level VAs (€15-€25/hour)\n- CRM management\n- Basic bookkeeping\n- Content scheduling\n- Customer onboarding\n\n### Advanced VAs (€25-€45/hour)\n- Website management\n- Email automation\n- Project management\n- Video editing\n\n## ROI Calculator\n\n| Metric | Your Business | With VA | Difference |\n|--------|---------------|---------|------------|\n| Hours/week on admin | 15 | 5 | -10 hrs |\n| Hourly value | €40 | €40 | - |\n| Net Weekly Gain | €600 | €850 | +€250 |\n\n[Get VA Starter Kit →](/kits)\n\n[Take Quiz →](/quiz)"
  },
  "vintage-reselling-start-guide": {
    slug: "vintage-reselling-start-guide",
    title: "How to Start a Vintage Reselling Business with €0",
    description: "The complete guide to launching vintage resale with zero upfront investment.",
    excerpt: "Consignment-first method, sourcing strategies, and scaling to €2,500/month.",
    date: "April 2026",
    readingTime: "10 minutes",
    category: "Vintage Reselling",
    content: "# Start a Vintage Reselling Business with €0\n\nThe vintage resale market hit €47 billion globally in 2025.\n\n## The €0 Startup Method: Consignment First\n\nInstead of buying inventory upfront:\n1. Partner with local vintage collectors\n2. Photograph their pieces\n3. List on eBay, Depop, or Instagram\n4. Ship ONLY when something sells\n5. Split profits 50/50\n\n## Realistic Timeline to Profit\n\n**Month 1:** €0-200 profit\n**Month 2:** €200-500 profit\n**Month 3+:** €500-1,500/month\n\n[Get Vintage Kit →](/kits)\n\n[Take Quiz →](/quiz)"
  },
  "dog-walking-business-guide": {
    slug: "dog-walking-business-guide",
    title: "The Dog Walker Business: €500-2,000/Month",
    description: "Turn your love of dogs into a profitable business with minimal investment.",
    excerpt: "Step-by-step launch plan, pricing, client acquisition, and scaling strategies.",
    date: "April 2026",
    readingTime: "9 minutes",
    category: "Dog Walking",
    content: "# The Dog Walker Business\n\nPeople love their dogs more than ever. Start with €0 investment.\n\n## Realistic Earnings\n\n**Small Town:** €400-1,800/month\n**Major Cities:** €1,000-5,000/month\n\n## Your First Month: Step-by-Step\n\n**Week 1:** Legal setup, equipment (€20-40), define services\n**Week 2:** Find clients on Nextdoor, Facebook groups, local boards\n**Week 3-4:** Build recurring clients, create systems\n\n## Scaling\n\n**Phase 1 (Months 1-3):** €1,200-2,000/month\n**Phase 2 (Months 4-6):** €2,500-3,500/month\n**Phase 3 (Months 6-12):** €4,000-6,000/month\n\n[Get Dog Walker Kit →](/kits)\n\n[Take Quiz →](/quiz)"
  },
  "real-estate-personal-branding-guide": {
    slug: "real-estate-personal-branding-guide",
    title: "Real Estate Personal Branding: Stand Out in 2026",
    description: "Build a personal brand that attracts high-value clients.",
    excerpt: "Content strategy, platform recommendations, and the 30-day launch plan.",
    date: "April 2026",
    readingTime: "11 minutes",
    category: "Real Estate",
    content: "# Real Estate Personal Branding\n\nYour personal brand is now your biggest competitive advantage.\n\n## Your 5 Pillars\n\n### 1. Your Niche & Differentiation\nFind your niche: first-time buyers, luxury, investment, relocation\n\n### 2. Content That Builds Trust\n- Educational (60%): Market updates, tips\n- Social Proof (20%): Testimonials, just-sold\n- Behind-the-Scenes (15%): Day-in-life\n- Personal (5%): Your story\n\n### 3. Platform Strategy\n- Instagram: Visual storytelling (4-5 posts/week)\n- LinkedIn: Professional expertise (2-3 posts/week)\n- Facebook: Community (3-4 posts/week)\n\n## Your 30-Day Launch Plan\n\n**Week 1:** Define niche, headshot, brand colors\n**Week 2:** Create 10 posts, film videos, set up email\n**Week 3:** Post consistently, engage daily\n**Week 4:** Review analytics, plan next month\n\n[Get Real Estate Kit →](/kits)\n\n[Take Quiz →](/quiz)"
  },
  "find-your-perfect-business-quiz": {
    slug: "find-your-perfect-business-quiz",
    title: "Find Your Perfect Business: Free 2-Minute Quiz",
    description: "Discover your ideal side hustle based on your skills and personality.",
    excerpt: "Don't waste months on a business that doesn't fit you.",
    date: "April 2026",
    readingTime: "2 minutes",
    category: "Quiz",
    content: "# Find Your Perfect Business\n\nMost entrepreneurs fail because they picked the wrong business for their personality.\n\n## The 4 Business Paths\n\n### 🖥️ The Curator (Virtual Assistant)\n**You're a fit if you:** Love organizing, administrative tasks, flexible remote work\n**Earnings:** €1,000-4,000/month\n\n### 🛍️ The Active Hunter (Vintage Reselling)\n**You're a fit if you:** Have eye for style, enjoy hunting, like creative freedom\n**Earnings:** €500-2,500/month\n\n### 🐕 The Organizer (Dog Walking)\n**You're a fit if you:** Love animals, want outdoor work, enjoy active tasks\n**Earnings:** €800-3,000/month\n\n### 📊 The Connector (Real Estate)\n**You're a fit if you:** Enjoy networking, communication, high earning potential\n**Earnings:** €3,000-15,000+/month\n\n## Take The Quiz\n\n[TAKE THE QUIZ NOW](/quiz)\n\nDon't waste months on a business that doesn't fit you."
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function BlogPostPage({ params }: PageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    params.then(({ slug }) => {
      const foundPost = blogPosts[slug]
      if (foundPost) {
        setPost(foundPost)
      }
      setLoading(false)
    })
  }, [params])

  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B6B] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header currentView="home" navigateTo={() => {}} />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Button onClick={() => router.push("/blog")}>Back to Blog</Button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentView="home" navigateTo={() => {}} />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-8">
          ← Back to Blog
        </Button>

        <article>
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mb-8 text-muted-foreground">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>

          <div className="prose prose-lg max-w-none mb-12 whitespace-pre-line">
            {post.content}
          </div>

          <div className="p-8 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-lg text-white mb-12">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Business?</h3>
            <p className="mb-6 opacity-90">Get the complete Starter Kit for your business path.</p>
            <Button 
              size="lg" 
              className="bg-white text-[#FF6B6B] hover:bg-gray-100"
              onClick={() => router.push("/kits")}
            >
              Browse Starter Kits →
            </Button>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.values(blogPosts)
                .filter(p => p.slug !== post.slug)
                .slice(0, 4)
                .map(p => (
                  <Link key={p.slug} href={`/blog/${p.slug}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg">{p.title}</CardTitle>
                        <CardDescription>{p.readingTime} read</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  )
}
