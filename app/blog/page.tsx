import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllBlogPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "WebElle Blog | Business Guides and Resources",
  description:
    "Explore WebElle's blog for practical business guides on virtual assistance, vintage reselling, dog walking, real estate, and more.",
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="min-h-screen bg-background">
      <Header currentView="blog" />

      <main className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-3xl text-center mb-14">
          <Badge className="mb-4">WebElle Blog</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent">
            Business Guides That Lead to the Right Kit
          </h1>
          <p className="text-lg text-muted-foreground">
            Actionable launch guides, realistic startup advice, and direct paths into the WebElle kits that match each business model.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readingTime}</span>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-[#FF6B6B] transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{post.publishedAt}</span>
                  <span>Read article</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-muted/40 p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Not sure which business fits you best?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Take the quiz or jump straight into the kits page if you already know the direction you want to build in.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-[#FF6B6B] hover:bg-[#ff5555]">
              <Link href="/quiz">Take the Quiz</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/kits">Browse Kits</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
