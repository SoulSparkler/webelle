"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card"
import { Button } from "@/components/button"
import { Badge } from "@/components/badge"
import Link from "next/link"

export function BlogSection({ navigateTo }: { navigateTo: (view: string) => void }) {
  const blogPosts = [
    {
      slug: "find-your-perfect-business-quiz",
      title: "Find Your Perfect Business Quiz",
      excerpt: "Discover your ideal business path in 2 minutes with our free assessment.",
      category: "Quiz",
      readingTime: "2 min"
    },
    {
      slug: "vintage-reselling-start-guide",
      title: "Start Vintage Reselling with €0",
      excerpt: "The complete guide to launching vintage resale with zero upfront investment.",
      category: "Vintage Reselling",
      readingTime: "10 min"
    },
    {
      slug: "dog-walking-business-guide",
      title: "The Dog Walker Business Guide",
      excerpt: "Turn your love of dogs into a profitable €500-2,000/month business.",
      category: "Dog Walking",
      readingTime: "9 min"
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4">Resources</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent">
            Latest from Our Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical guides and strategies to help you launch and grow your dream business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readingTime}</span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-[#FF6B6B] transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigateTo("blog")}
          >
            View All Posts →
          </Button>
        </div>
      </div>
    </section>
  )
}
