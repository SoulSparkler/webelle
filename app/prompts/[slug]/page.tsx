import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PromptPackView } from "@/components/prompt-pack-view"
import { promptCatalog } from "@/lib/prompts"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function PromptPage({ params }: Props) {
  const { slug } = await params

  if (!(slug in promptCatalog)) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentView="kits" />
      <main>
        <PromptPackView slug={slug} />
      </main>
      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(promptCatalog).map((slug) => ({ slug }))
}
