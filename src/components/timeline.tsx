"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const steps = [
  {
    title: "Sourcing",
    text: "Rice flour and banana(kathali kola) are carefully taken at the right amount for the texture and strength, and mixed for the white clay base.",
    img: "/natural-ingredients.png",
  },
  {
    title: "Colouring",
    text: "Vibrant non-toxic colours are used with the clay base, to make it ready to be moulded and curved.",
    img: "/colors.png",
  },
  {
    title: "Structuring",
    text: `Artisans cleverly shape lotus, conch motifs and other designs and use them on the main body, with innovated tools.`,
    img: "/complete.jpeg",
  },
  {
    title: "Brass Plating",
    text: "Each piece is mounted on a brass plate provided by the customers. If not we will make arrangements of a polished and designer brass plate and make the final product.",
    img: "/brass-plate.png",
  },
  {
    title: "Final Product",
    text: "And there you go, it's ready to be taken away. Customer has to take great care for this part, slight mistake can lead to a disaster, it outghta be handled with care. We will take care of the best suited packaging for them for longer distances",
    img: "/eco-friendly-gift-packaging-bengali-motifs.png",
  },
]

export default function Timeline() {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#FFD700] to-transparent pointer-events-none" />
      <div className="space-y-12">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: i * 0.05 }}
            className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${i % 2 ? "md:[&>*:first-child]:order-last" : ""}`}
          >
            <div className="relative">
              <Image
                src={s.img || "/placeholder.svg"}
                width={720}
                height={480}
                alt={`${s.title} step`}
                className="rounded-xl shadow-lg ring-1 ring-[#B08D57]/20"
              />
              <div className="absolute -left-3 -top-3 h-10 w-10 rounded-full bg-white flex items-center justify-center ring-2 ring-[#FFD700]/60 shadow-gold">
                <span className="text-[#A91515] font-semibold" style={{ fontFamily: "var(--font-serif)" }}>
                  {i + 1}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl" style={{ fontFamily: "var(--font-serif)" }}>
                {s.title}
              </h3>
              <p className="mt-3 text-neutral-700">{s.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
