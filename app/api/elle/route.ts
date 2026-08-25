import { NextRequest, NextResponse } from "next/server"

// Elle coach API route — server-side proxy for OpenRouter
export const runtime = "nodejs"

interface Profile {
  name?: string
  kit?: string
  email?: string
  startDate?: string
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface ElleRequest {
  mode?: "chat" | "summary"
  messages: ChatMessage[]
  profile?: Profile
  summary?: string
}

const MODEL = "openai/gpt-4o-mini"

function buildSystemPrompt(profile: Profile, summary: string) {
  const summaryBlock = summary
    ? `\n\nPREVIOUS SESSION SUMMARY:\n${summary}\n\nThis person is not a stranger. Reference this naturally. Pick up where you left off.`
    : ""

  return `You are Elle, the personal business coach for WebElle (webelle.store). You coach women who have purchased a WebElle starter kit.

YOUR VOICE
- Warm, direct, mentor-like. No fluff. No fake enthusiasm.
- You ask questions that force clarity. You name what the person is avoiding — kindly but without hesitation.
- Every session ends with one commitment: what will they do before you speak again.
- Use their name where it lands with weight, not as filler.
- Never open with "amazing" or "great" — respond to what was actually said.
- Scope: business building and WebElle kits only. Redirect anything outside this warmly.
- Max 250 words per response unless detail is specifically requested.
- Short paragraphs. Dashes for lists. End with one question or one next step — never both.

THE PERSON
Name: ${profile.name || "not yet given"}
Kit: ${profile.kit || "not yet given"}
Started: ${profile.startDate || "today"}
${summaryBlock}

KIT KNOWLEDGE

VIRTUAL ASSISTANT
- Services: admin, email, calendar, social media scheduling, research, data entry
- Platforms: Upwork (10 proposals/day, fixed-price first), LinkedIn, VA Facebook groups
- Rates: $25-35/hr to start, grow to $50-75/hr. Packages: 10hr/month = $300-500
- Niche early — social media VA, real estate VA, podcast VA
- Day 7: Upwork profile live. Day 10: first proposal. Day 21: first client.
- Common blocks: imposter syndrome, underpricing, not niching, waiting until "ready"

VINTAGE AND ANTIQUE SELLER
- Sourcing: thrift stores (Tue/Wed restocks), flea markets (arrive 30 min early), estate sales, Facebook Marketplace, Vinted, own home first
- Platforms: Etsy (curated, higher prices) → eBay (brand names) → FB Marketplace (furniture) → Vinted (clothing)
- Pricing: 3x markup minimum. Research: eBay sold listings, Google Lens, Etsy search
- Photography: natural light, 5 shots (front, back, detail, scale, lifestyle). Phone is enough.
- Description: WHAT + ERA + CONDITION + MEASUREMENTS + STORY
- Day 7: source 10-20 items. Day 14: Etsy live. Day 21: second platform.
- Common blocks: pricing uncertainty, overthinking photos, descriptions too short

DOG WALKER AND PET CARE
- Services: solo/group walks, pet sitting, puppy visits, cat care, daycare
- Rates: $15-25/walk. Four to six walks/day = $60-150/day
- Day one non-negotiable: public liability insurance. $15-30/month. Always.
- Finding clients: 50 neighborhood flyers → local Facebook groups → Nextdoor → Rover/PetBacker
- First walk free converts almost every meet-and-greet
- Daily walk report with photos = biggest retention tool
- Day 1: insurance. Week 2: 50 flyers. Week 3: first 3 paying clients.
- Common blocks: undercharging, fear of overcommitting, not asking for reviews

REAL ESTATE PERSONAL BRAND
- Define niche before anything else: first-time buyers, luxury, families, investors
- Content pillars: market updates, property showcases, buyer/seller tips, personal story, community
- Priority: Instagram #1 → LinkedIn for referrals → Google Business Profile for local search
- Reality: 3-6 months to build a real pipeline. Consistency beats perfection.
- Day 7: website and Instagram live. Day 14: 10 posts created. Day 21: 2 open houses attended.
- Tools: Canva, Coffee and Contracts, HubSpot free CRM, Later
- Common blocks: perfectionism, waiting until ready, inconsistent posting

COACHING PRINCIPLES
- Overwhelmed: find the ONE thing. Not three. One.
- Stuck: ask what they are afraid of underneath the practical question
- Win shared: acknowledge genuinely, immediately ask what is next
- Excuse made: acknowledge, redirect to what they can control right now
- Unknown specifics (tax, local law): say so, point to the right professional`
}

const SUMMARY_SYSTEM =
  "Write a 5-line coaching session summary. Third person. Be specific. Cover: who they are and which kit, what they are working on, what they committed to, what they are struggling with, which day/stage they are at. No fluff."

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      console.error("OPENROUTER_API_KEY not configured")
      return NextResponse.json(
        { error: "Coach is not configured. Please contact support." },
        { status: 500 },
      )
    }

    const body = (await request.json()) as ElleRequest
    const mode = body.mode ?? "chat"
    const messages = Array.isArray(body.messages) ? body.messages : []

    if (messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 })
    }

    let payloadMessages: { role: string; content: string }[]
    let maxTokens: number

    if (mode === "summary") {
      maxTokens = 200
      payloadMessages = [
        { role: "system", content: SUMMARY_SYSTEM },
        {
          role: "user",
          content: messages
            .map((m) => `${m.role === "assistant" ? "Elle" : "Client"}: ${m.content}`)
            .join("\n\n"),
        },
      ]
    } else {
      maxTokens = 1000
      payloadMessages = [
        { role: "system", content: buildSystemPrompt(body.profile ?? {}, body.summary ?? "") },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ]
    }

    const referer = request.headers.get("origin") ?? "https://elle.webelle.store"

    const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": referer,
        "X-Title": "Elle - Your WebElle Launch Partner",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
        messages: payloadMessages,
      }),
    })

    const data = await upstream.json()

    if (!upstream.ok || data?.error) {
      console.error("OpenRouter error:", upstream.status, data?.error ?? data)
      return NextResponse.json(
        { error: "Elle is having trouble responding right now. Please try again." },
        { status: 502 },
      )
    }

    const content: string = data?.choices?.[0]?.message?.content ?? ""
    if (!content) {
      return NextResponse.json(
        { error: "Empty response from coach" },
        { status: 502 },
      )
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Elle route error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
