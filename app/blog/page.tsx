"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card"
import { Button } from "@/components/button"
import { Badge } from "@/components/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

const blogPosts = [
  {
    slug: "find-your-perfect-business-quiz",
    title: "Find Your Perfect Business: Take Our Free Quiz",
    description: "2-minute assessment to discover your ideal side hustle or business path based on your skills and personality.",
    excerpt: "Don\'t waste months on a business that doesn\'t fit you. Take our quiz and discover which of these 4 proven business models matches your strengths.",
    date: "April 2026",
    readingTime: "2 minutes",
    category: "Quiz",
    featured: true
  },
  {
    slug: "virtual-assistant-costs-guide",
    title: "Virtual Assistant Costs in 2026: A Complete Pricing Guide",
    description: "Everything you need to know about hiring VAs in 2026, including hourly rates, hidden value, and ROI calculations.",
    excerpt: "How much does a virtual assistant really cost? Break down of 2026 pricing, what you get at each price point, and how to determine if hiring a VA is right for you.",
    date: "April 2026",
    readingTime: "8 minutes",
    category: "Virtual Assistant"
  },
  {
    slug: "vintage-reselling-start-guide",
    title: "How to Start a Vintage Reselling Business with €0",
    description: "The complete guide to launching a vintage resale operation with zero upfront investment using the consignment-first method.",
    excerpt: "Learn the consignment-first method, sourcing strategies, photography tips, and how to scale from €0 to €2,500/month.",
    date: "April 2026",
    readingTime: "10 minutes",
    category: "Vintage Reselling"
  },
  {
    slug: "dog-walking-business-guide",
    title: "The Dog Walker Business: Complete Guide to €500-2,000/Month",
    description: "Turn your love of dogs into a profitable business with minimal investment. Step-by-step launch plan and scaling strategies.",
    excerpt: "Complete guide to starting a dog walking business including pricing, client acquisition, and scaling to €2,000+/month.",
    date: "April 2026",
    readingTime: "9 minutes",
    category: "Dog Walking"
  },
  {
    slug: "real-estate-personal-branding-guide",
    title: "Real Estate Personal Branding: Stand Out in 2026",
    description: "The complete guide to building a personal brand that attracts high-value clients and differentiates you from competitors.",
    excerpt: "Content strategy, platform recommendations, lead magnets, and the exact 30-day launch plan top real estate agents use.",
    date: "April 2026",
    readingTime: "11 minutes",
    category: "Real Estate"
  }
]

export default function BlogPage() {
  const router = useRouter()

  const navigateToQuiz = () => {
    router.push("/quiz")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentView="home" navigateTo={() => {}} />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4">WebElle Blog</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent">
            Business Guides & Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your perfect business path with our comprehensive guides. 
            Practical advice, real numbers, and proven strategies to launch your dream business.
          </p>
        </div>

        {/* Featured Quiz */}
        <div className="mb-16">
          <Card className="max-w-3xl mx-auto border-2 border-[#FF6B6B] shadow-lg">
            <CardHeader className="text-center">
              <Badge variant="outline" className="mb-2">Free • 2 minutes</Badge>
              <CardTitle className="text-3xl mb-2">
                Find Your Perfect Business Quiz
              </CardTitle>
              <CardDescription className="text-lg">
                Don\'t waste time on a business that doesn\'t fit you. Discover your ideal path in minutes.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                size="lg" 
                className="bg-[#FF6B6B] hover:bg-[#ff5555] text-white text-lg px-8"
                onClick={navigateToQuiz}
              >
                Take the Quiz Now →
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Join 1,000+ entrepreneurs who discovered their perfect business match
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readingTime}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-[#FF6B6B] transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-muted rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Business?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Not sure where to begin? Take our free quiz or explore our Starter Kits designed for each business type.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#FF6B6B] hover:bg-[#ff5555]"
              onClick={navigateToQuiz}
            >
              Take the Quiz
            </Button>
            <Button size="lg" variant="outline">
              Browse Starter Kits
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
