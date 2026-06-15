import type { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog'
import { promptCatalog } from '@/lib/prompts'

const BASE_URL = 'https://webelle.store'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/kits`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/quiz`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const businessTypes = ['curator', 'active', 'organizer', 'connector', 'ai']
  const resultRoutes: MetadataRoute.Sitemap = businessTypes.map((type) => ({
    url: `${BASE_URL}/results/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const promptRoutes: MetadataRoute.Sitemap = Object.values(promptCatalog).map((pack) => ({
    url: `${BASE_URL}/prompts/${pack.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...resultRoutes, ...blogRoutes, ...promptRoutes]
}
