"use client"

import Link from "next/link"
import { getFeaturedBlogPosts } from "@/lib/blog"
import type { ViewType } from "@/lib/site"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function BlogSection({ navigateTo }: { navigateTo: (view: ViewType) => void }) {
  const featuredPosts = getFeaturedBlogPosts().slice(0, 3)

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4">Resources</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent">
            Latest from the Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Long-form guides built to answer the search terms your future customers are already typing in.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2 gap-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readingTime}</span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-[#FF6B6B] transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">{post.publishedAt}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" onClick={() => navigateTo("blog")}>
            View All Posts &rarr;
          </Button>
        </div>
      </div>
    </section>
  )
}
