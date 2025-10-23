"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Award, Heart, Users2 } from "lucide-react"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

const teamMembers = [
  {
    name: "Dr. med. dent. Anna Schmidt",
    role: "Fachärztin für Kieferorthopädie",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=faces",
    specialization: "Unsichtbare Aligner, Digitale Kieferorthopädie",
    description: "Mit über 15 Jahren Erfahrung ist Dr. Schmidt Spezialistin für moderne, ästhetische Behandlungsmethoden.",
  },
  {
    name: "Dr. med. dent. Michael Weber",
    role: "Facharzt für Kieferorthopädie",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=faces",
    specialization: "Kinder- und Jugendbehandlung",
    description: "Dr. Weber ist spezialisiert auf Frühbehandlung und begleitet junge Patienten mit viel Einfühlungsvermögen.",
  },
  {
    name: "Julia Müller",
    role: "Praxismanagerin",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
    specialization: "Organisation & Patientenbetreuung",
    description: "Julia koordiniert alle Abläufe in unserer Praxis und ist Ihre erste Ansprechpartnerin.",
  },
  {
    name: "Sarah Koch",
    role: "Zahnmedizinische Fachangestellte",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=faces",
    specialization: "Behandlungsassistenz",
    description: "Sarah unterstützt unser Team mit ihrer jahrelangen Erfahrung in der Patientenbetreuung.",
  },
  {
    name: "Lisa Hoffmann",
    role: "Zahnmedizinische Fachangestellte",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
    specialization: "Prophylaxe & Beratung",
    description: "Lisa ist Expertin für Prophylaxe und berät Sie umfassend zur Mundhygiene während der Behandlung.",
  },
  {
    name: "Thomas Becker",
    role: "Zahntechniker",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
    specialization: "Individueller Zahnersatz",
    description: "Thomas fertigt in unserem praxiseigenen Labor präzise Apparaturen für optimale Behandlungsergebnisse.",
  },
]

const stats = [
  {
    icon: Users2,
    value: "6",
    label: "Teammitglieder"
  },
  {
    icon: Award,
    value: "25+",
    label: "Jahre Erfahrung"
  },
  {
    icon: Heart,
    value: "2000+",
    label: "Zufriedene Patienten"
  },
  {
    icon: GraduationCap,
    value: "100%",
    label: "Engagement"
  }
]

export default function TeamPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Unser Team
            </h1>
            <p className="text-xl text-gray-600">
              Lernen Sie die Menschen kennen, die sich täglich mit Leidenschaft
              und Fachkompetenz für Ihr schönstes Lächeln einsetzen
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center border-2 hover:border-primary/50 transition-all">
                  <CardContent className="p-6">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
                  <div className="relative h-80 overflow-hidden bg-gray-100">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        {member.specialization}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Unsere Philosophie
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Wir glauben daran, dass jeder Patient einzigartig ist und eine
              individuelle Behandlung verdient. Deshalb nehmen wir uns Zeit für
              ausführliche Beratungen und entwickeln maßgeschneiderte
              Behandlungskonzepte, die perfekt zu Ihnen passen.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Unser Team bildet sich kontinuierlich fort, um Ihnen stets die
              modernsten und schonendsten Behandlungsmethoden anbieten zu können.
              Ihre Zufriedenheit und Ihr Wohlbefinden stehen dabei immer im
              Mittelpunkt unseres Handelns.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
