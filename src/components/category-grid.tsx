"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const categories = [
  {
    name: "Durga Puja",
    img: "/durga-puja.png",
    href: "/durga-puja"
  },
  {
    name: "Weddings",
    img: "/biye.png",
    href: "/weddings"
  },
  {
    name: "Kali Puja",
    img: "/kali-puja.png",
    href: "/kali-puja"
  },
  {
    name: "Saraswati Puja",
    img: "/saraswati-puja.png",
    href: "/saraswati-puja"
  },
]

export default function CategoryGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
        >
          <Link
            href={c.href}
            className="group relative block overflow-hidden rounded-xl ring-1 ring-[#B08D57]/20"
            aria-label={"Explore " + c.name}
          >
            <img
              src={c.img || "/placeholder.svg"}
              alt={`${c.name} category`}
              className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-transparent group-hover:ring-[#FFD700]/60 transition-all duration-300 shadow-hover-gold" />
            <div className="absolute bottom-4 left-4">
              <div className="text-white text-lg font-bold drop-shadow-black" style={{ fontFamily: "var(--font-serif)" }}>
                {c.name}
              </div>
              <div className="mt-1 text-black/90 text-xs">Explore</div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
