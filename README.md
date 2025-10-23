# Kieferorthopädie Website

Eine moderne, elegante Website für eine deutsche kieferorthopädische Praxis, gebaut mit Next.js, TypeScript, Tailwind CSS und Framer Motion.

## Features

- **Moderne UI/UX**: Elegantes, minimalistisches Design mit Tailwind CSS und Shadcn/UI
- **Animationen**: Sanfte Animationen und Übergänge mit Framer Motion
- **Responsive Design**: Vollständig responsive für Desktop und Mobile
- **Deutsche Sprache**: Komplett auf Deutsch
- **Drei Hauptseiten**:
  - **Startseite**: Ansprechende Landing Page mit Hero-Bereich, Features und Services
  - **Team**: Teamübersicht mit Fotos und Beschreibungen
  - **Kontakt**: Kontaktformular, Standortinformationen und eingebettete Google Maps

## Technologie-Stack

- **Framework**: Next.js 15 mit App Router
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS
- **UI-Komponenten**: Shadcn/UI
- **Animationen**: Framer Motion
- **Icons**: Lucide React

## Installation

### Voraussetzungen

- Node.js 18.x oder höher
- npm oder yarn

### Schritte

1. Repository klonen oder Ordner öffnen:
```bash
cd D:\Projects\claude-cli-test
```

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Entwicklungsserver starten:
```bash
npm run dev
```

4. Browser öffnen und zu [http://localhost:3000](http://localhost:3000) navigieren

## Verfügbare Skripte

- `npm run dev` - Startet den Entwicklungsserver
- `npm run build` - Erstellt eine optimierte Production-Build
- `npm start` - Startet den Production-Server
- `npm run lint` - Führt ESLint zur Code-Qualitätsprüfung aus

## Projektstruktur

```
.
├── app/                      # Next.js App Router
│   ├── kontakt/             # Kontaktseite
│   ├── team/                # Teamseite
│   ├── globals.css          # Globale Styles
│   ├── layout.tsx           # Root Layout
│   └── page.tsx             # Startseite
├── components/              # React Komponenten
│   ├── ui/                  # Shadcn/UI Komponenten
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   ├── footer.tsx           # Footer Komponente
│   └── navigation.tsx       # Navigationsleiste
├── lib/                     # Utility Funktionen
│   └── utils.ts
├── public/                  # Statische Assets
├── .eslintrc.json          # ESLint Konfiguration
├── .gitignore              # Git Ignore Datei
├── next.config.js          # Next.js Konfiguration
├── package.json            # Projekt-Dependencies
├── postcss.config.js       # PostCSS Konfiguration
├── tailwind.config.ts      # Tailwind CSS Konfiguration
└── tsconfig.json           # TypeScript Konfiguration
```

## Anpassungen

### Farben ändern

Die Hauptfarben können in `app/globals.css` angepasst werden. Die primäre Farbe ist aktuell ein Blau-Ton:

```css
--primary: 200 90% 45%;
```

### Inhalte ändern

- **Startseite**: `app/page.tsx`
- **Team**: `app/team/page.tsx`
- **Kontakt**: `app/kontakt/page.tsx`

### Kontaktinformationen

Kontaktinformationen werden in `components/footer.tsx` und `app/kontakt/page.tsx` angezeigt und können dort angepasst werden.

### Google Maps

Die eingebettete Google Maps-Karte in `app/kontakt/page.tsx` kann durch Anpassen der `src`-URL des iframes geändert werden. Nutzen Sie [Google Maps Embed API](https://developers.google.com/maps/documentation/embed) für Ihre spezifische Adresse.

## Bilder

Die Website nutzt Platzhalterbilder von Unsplash. Für die Produktion sollten diese durch eigene Fotos ersetzt werden:

- Team-Fotos: In `app/team/page.tsx` im `teamMembers` Array
- Andere Bilder: Ablegen in `/public` und Pfade entsprechend anpassen

## Browser-Unterstützung

Die Website ist kompatibel mit allen modernen Browsern:
- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)

## Deployment

### Vercel (Empfohlen)

Die einfachste Methode ist das Deployment über [Vercel](https://vercel.com):

1. GitHub Repository erstellen und Code pushen
2. Vercel-Konto erstellen
3. Repository importieren
4. Automatisches Deployment startet

### Andere Hosting-Plattformen

Alternativ kann die Website auf jeder Plattform gehostet werden, die Node.js unterstützt:

```bash
npm run build
npm start
```

## Performance

Die Website ist optimiert für beste Performance:
- Server-Side Rendering mit Next.js
- Optimierte Bilder mit Next.js Image
- Code-Splitting
- Lazy Loading von Komponenten

## Support

Bei Fragen oder Problemen erstellen Sie bitte ein Issue im Repository oder kontaktieren Sie den Entwickler.

## Lizenz

Dieses Projekt ist für die Verwendung durch die Kieferorthopädie-Praxis bestimmt.
