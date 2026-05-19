import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllBlogPosts, getBlogPost, getRelatedBlogPosts } from "@/lib/blog"
import { markdownToHtml } from "@/lib/markdown"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

function CtaButton({
  href,
  label,
  external,
  variant = "default",
}: {
  href: string
  label: string
  external?: boolean
  variant?: "default" | "outline"
}) {
  if (external) {
    return (
      <Button asChild size="lg" variant={variant} className={variant === "default" ? "bg-[#FF6B6B] hover:bg-[#ff5555]" : ""}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      </Button>
    )
  }

  return (
    <Button asChild size="lg" variant={variant} className={variant === "default" ? "bg-[#FF6B6B] hover:bg-[#ff5555]" : ""}>
      <Link href={href}>{label}</Link>
    </Button>
  )
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: "Post Not Found | WebElle Blog",
    }
  }

  return {
    title: `${post.title} | WebElle Blog`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedBlogPosts(post).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header currentView="blog" />

      <main className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Button asChild variant="ghost">
              <Link href="/blog">&larr; Back to blog</Link>
            </Button>
          </div>

          <article>
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-10">
              <span>{post.publishedAt}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>

            <div className="blog-content" dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />

            <div className="mt-12 rounded-3xl border border-border bg-muted/40 p-8">
              <h2 className="text-2xl font-bold mb-3">Next step</h2>
              <p className="text-muted-foreground mb-6">
                {post.businessType
                  ? "This article lines up with a specific WebElle kit, so you can move straight from reading into action."
                  : "If you want to keep exploring, jump into the wider WebElle blog or visit the linked external resource."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <CtaButton href={post.primaryCta.href} label={post.primaryCta.label} external={post.primaryCta.external} />
                {post.secondaryCta ? (
                  <CtaButton
                    href={post.secondaryCta.href}
                    label={post.secondaryCta.label}
                    external={post.secondaryCta.external}
                    variant="outline"
                  />
                ) : null}
              </div>
            </div>

            {relatedPosts.length > 0 ? (
              <div className="mt-14">
                <h2 className="text-2xl font-bold mb-6">Related posts</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group">
                      <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-lg leading-tight group-hover:text-[#FF6B6B] transition-colors">
                            {relatedPost.title}
                          </CardTitle>
                          <CardDescription>{relatedPost.readingTime}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
