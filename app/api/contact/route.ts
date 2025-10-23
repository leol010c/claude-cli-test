import { NextRequest, NextResponse } from "next/server"

interface TurnstileResponse {
  success: boolean
  "error-codes"?: string[]
  challenge_ts?: string
  hostname?: string
}

interface ContactFormData {
  name: string
  email: string
  message: string
  turnstileToken: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, message, turnstileToken } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Bitte füllen Sie alle Pflichtfelder aus."
        },
        { status: 400 }
      )
    }

    // Validate Turnstile token
    if (!turnstileToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Bitte bestätigen Sie, dass Sie kein Roboter sind."
        },
        { status: 400 }
      )
    }

    // Verify Turnstile token with Cloudflare
    const secretKey = process.env.TURNSTILE_SECRET_KEY

    if (!secretKey) {
      console.error("TURNSTILE_SECRET_KEY is not configured")
      return NextResponse.json(
        {
          success: false,
          error: "Serverkonfigurationsfehler. Bitte kontaktieren Sie den Administrator."
        },
        { status: 500 }
      )
    }

    const turnstileVerification = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: secretKey,
          response: turnstileToken,
          remoteip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
        }),
      }
    )

    const turnstileResult: TurnstileResponse = await turnstileVerification.json()

    if (!turnstileResult.success) {
      console.error("Turnstile verification failed:", turnstileResult["error-codes"])
      return NextResponse.json(
        {
          success: false,
          error: "Die Sicherheitsüberprüfung ist fehlgeschlagen. Bitte versuchen Sie es erneut."
        },
        { status: 400 }
      )
    }

    // Turnstile verification successful
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM
    // For now, we'll just log and return success

    console.log("Contact form submission received:", {
      name,
      email,
      message: message.substring(0, 50) + "...",
      timestamp: new Date().toISOString(),
      verified: true,
    })

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json(
      {
        success: true,
        message: "Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen."
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
      },
      { status: 500 }
    )
  }
}
