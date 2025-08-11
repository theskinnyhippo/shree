"use client"

import { motion } from "framer-motion"

export default function SectionTitle({
  eyebrow = "Section",
  title = "Section Title",
  subtitle = "Subtitle goes here",
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
}) {
  return (
    <div className="text-center md:text-left">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 ring-1 ring-[#FFD700]/30 text-[#A91515] text-xs tracking-wide uppercase"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <span>{eyebrow}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="mt-3 text-3xl md:text-4xl lg:text-5xl text-neutral-900"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-3 text-neutral-600 max-w-3xl md:max-w-none"
      >
        {subtitle}
      </motion.p>
    </div>
  )
}
