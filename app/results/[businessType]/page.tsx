import { notFound } from "next/navigation"
import { ResultPage as ResultPageClient } from "@/components/result-page"
import { isBusinessType } from "@/lib/site"

interface ResultPageProps {
  params: Promise<{ businessType: string }>
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { businessType } = await params

  if (!isBusinessType(businessType)) {
    notFound()
  }

  return <ResultPageClient businessType={businessType} />
}
