import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-600">
                  <p>Musterstraße 123</p>
                  <p>10115 Berlin</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+493012345678" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  +49 30 12345678
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@kieferorthopadie.de" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  info@kieferorthopadie.de
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Öffnungszeiten</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="flex justify-between gap-4">
                    <span>Mo - Do:</span>
                    <span className="font-medium">8:00 - 18:00</span>
                  </p>
                  <p className="flex justify-between gap-4">
                    <span>Fr:</span>
                    <span className="font-medium">8:00 - 14:00</span>
                  </p>
                  <p className="flex justify-between gap-4">
                    <span>Sa - So:</span>
                    <span className="font-medium">Geschlossen</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Über uns</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Ihre Praxis für moderne Kieferorthopädie in Berlin.
              Wir bieten professionelle Behandlungen für Kinder,
              Jugendliche und Erwachsene in angenehmer Atmosphäre.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Kieferorthopädie Berlin. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}
