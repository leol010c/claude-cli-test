"use client"

import { Turnstile } from "@marsidev/react-turnstile"

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void
  onError?: () => void
  onExpire?: () => void
}

export default function TurnstileWidget({ onSuccess, onError, onExpire }: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  if (!siteKey) {
    console.error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not configured")
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
        Turnstile ist nicht konfiguriert. Bitte kontaktieren Sie den Administrator.
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <Turnstile
        siteKey={siteKey}
        onSuccess={onSuccess}
        onError={() => {
          console.error("Turnstile error occurred")
          onError?.()
        }}
        onExpire={() => {
          console.warn("Turnstile token expired")
          onExpire?.()
        }}
        options={{
          theme: "light",
          size: "normal",
        }}
      />
    </div>
  )
}
