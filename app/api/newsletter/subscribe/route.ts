import { NextRequest, NextResponse } from "next/server"

type SubscriptionSource = "newsletter" | "quiz"

interface SubscriptionPayload {
  email?: string
  firstName?: string
  lastName?: string
  source?: SubscriptionSource
}

function parseListIds(value: string | undefined) {
  if (!value) {
    return undefined
  }

  const listIds = value
    .split(",")
    .map((item) => Number.parseInt(item.trim(), 10))
    .filter((item) => Number.isFinite(item))

  return listIds.length > 0 ? listIds : undefined
}

function getConfiguredListIds(source: SubscriptionSource) {
  if (source === "quiz") {
    return (
      parseListIds(process.env.SENDFOX_QUIZ_LIST_IDS) ??
      parseListIds(process.env.SENDFOX_LIST_IDS)
    )
  }

  return (
    parseListIds(process.env.SENDFOX_NEWSLETTER_LIST_IDS) ??
    parseListIds(process.env.SENDFOX_LIST_IDS)
  )
}

function getErrorMessage(details: unknown) {
  if (typeof details === "string" && details.trim()) {
    return details
  }

  if (details && typeof details === "object") {
    const message = "message" in details ? details.message : undefined
    if (typeof message === "string" && message.trim()) {
      return message
    }

    const error = "error" in details ? details.error : undefined
    if (typeof error === "string" && error.trim()) {
      return error
    }

    const errors = "errors" in details ? details.errors : undefined
    if (Array.isArray(errors) && typeof errors[0] === "string") {
      return errors[0]
    }
  }

  return undefined
}

function isDuplicateContact(status: number, message: string | undefined) {
  if (status === 409) {
    return true
  }

  if (!message) {
    return false
  }

  const normalizedMessage = message.toLowerCase()
  return normalizedMessage.includes("already") || normalizedMessage.includes("exists")
}

function getContactId(details: unknown) {
  if (details && typeof details === "object" && "id" in details) {
    return details.id
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as SubscriptionPayload
    const email = payload.email?.toLowerCase().trim()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const apiToken = process.env.SENDFOX_API_KEY ?? process.env.SENDFOX_API_TOKEN
    if (!apiToken) {
      console.error("SendFox API key not configured")
      return NextResponse.json(
        { error: "Newsletter service not configured" },
        { status: 500 },
      )
    }

    const source = payload.source ?? "newsletter"
    const lists = getConfiguredListIds(source)
    const sendFoxPayload = {
      email,
      first_name: payload.firstName?.trim() || undefined,
      last_name: payload.lastName?.trim() || undefined,
      lists,
    }

    const response = await fetch("https://api.sendfox.com/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendFoxPayload),
    })

    const responseText = await response.text()
    let responseData: unknown = null

    if (responseText) {
      try {
        responseData = JSON.parse(responseText)
      } catch {
        responseData = responseText
      }
    }

    if (!response.ok) {
      const message = getErrorMessage(responseData)
      console.error("SendFox API error:", response.status, responseData)

      if (isDuplicateContact(response.status, message)) {
        return NextResponse.json(
          { success: true, alreadySubscribed: true, message: "Email already subscribed" },
          { status: 200 },
        )
      }

      return NextResponse.json(
        { error: message ?? "Failed to subscribe. Please try again." },
        { status: response.status },
      )
    }

    return NextResponse.json(
      {
        success: true,
        contactId: getContactId(responseData),
        message: "Successfully subscribed",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "An error occurred while subscribing. Please try again later." },
      { status: 500 },
    )
  }
}
