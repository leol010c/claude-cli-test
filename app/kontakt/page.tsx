"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Send, AlertCircle } from "lucide-react"
import { useState } from "react"
import TurnstileWidget from "@/components/turnstile-widget"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: ["Musterstraße 123", "10115 Berlin"],
  },
  {
    icon: Phone,
    title: "Telefon",
    content: ["+49 30 12345678"],
    link: "tel:+493012345678"
  },
  {
    icon: Mail,
    title: "E-Mail",
    content: ["info@kieferorthopadie.de"],
    link: "mailto:info@kieferorthopadie.de"
  },
  {
    icon: Clock,
    title: "Öffnungszeiten",
    content: [
      "Mo - Do: 8:00 - 18:00",
      "Fr: 8:00 - 14:00",
      "Sa - So: Geschlossen"
    ],
  },
]

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    // Check if Turnstile token is present
    if (!turnstileToken) {
      setErrorMessage("Bitte bestätigen Sie, dass Sie kein Roboter sind.")
      setIsSubmitting(false)
      setSubmitStatus("error")
      return
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          turnstileToken,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.")
        setSubmitStatus("error")
      } else {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setTurnstileToken("")

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage("Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.")
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token)
    setErrorMessage("")
  }

  const handleTurnstileError = () => {
    setTurnstileToken("")
    setErrorMessage("Die Sicherheitsüberprüfung ist fehlgeschlagen. Bitte laden Sie die Seite neu.")
  }

  const handleTurnstileExpire = () => {
    setTurnstileToken("")
    setErrorMessage("Die Sicherheitsüberprüfung ist abgelaufen. Bitte bestätigen Sie erneut.")
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Kontakt
            </h1>
            <p className="text-xl text-gray-600">
              Wir freuen uns auf Ihre Nachricht und beraten Sie gerne zu allen
              Fragen rund um Ihre Zahngesundheit
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <div className="space-y-1">
                      {item.content.map((line, i) => (
                        item.link && i === 0 ? (
                          <a
                            key={i}
                            href={item.link}
                            className="block text-gray-600 hover:text-primary transition-colors"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={i} className="text-gray-600 text-sm">
                            {line}
                          </p>
                        )
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Schreiben Sie uns
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Füllen Sie das Formular aus und wir melden uns schnellstmöglich
                    bei Ihnen zurück.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ihr vollständiger Name"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        E-Mail *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ihre@email.de"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Nachricht *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Wie können wir Ihnen helfen?"
                        className="w-full min-h-[150px]"
                      />
                    </div>

                    {/* Turnstile Widget */}
                    <div>
                      <TurnstileWidget
                        onSuccess={handleTurnstileSuccess}
                        onError={handleTurnstileError}
                        onExpire={handleTurnstileExpire}
                      />
                    </div>

                    {/* Success Message */}
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm flex items-start gap-3"
                      >
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-medium">Erfolgreich gesendet!</p>
                          <p className="mt-1">Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.</p>
                        </div>
                      </motion.div>
                    )}

                    {/* Error Message */}
                    {submitStatus === "error" && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm flex items-start gap-3"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Fehler</p>
                          <p className="mt-1">{errorMessage}</p>
                        </div>
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || !turnstileToken}
                      className="w-full group"
                    >
                      {isSubmitting ? (
                        "Wird gesendet..."
                      ) : (
                        <>
                          Nachricht senden
                          <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 overflow-hidden">
                <CardContent className="p-0 h-full min-h-[600px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.4496486176846!2d13.388853976916994!3d52.52000097207537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sBrandenburg%20Gate!5e0!3m2!1sen!2sde!4v1704729600000!5m2!1sen!2sde"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "600px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Praxis Standort"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              So erreichen Sie uns
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Unsere Praxis liegt zentral in Berlin-Mitte und ist gut mit
              öffentlichen Verkehrsmitteln zu erreichen. Parkplätze finden Sie
              in den umliegenden Straßen und Parkhäusern.
            </p>
            <p className="text-gray-600">
              Bei akuten Beschwerden kontaktieren Sie uns bitte telefonisch,
              damit wir Ihnen schnellstmöglich einen Termin anbieten können.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
