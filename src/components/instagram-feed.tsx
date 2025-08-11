"use client"

import { motion } from "framer-motion"

const images = Array.from({ length: 6 }).map((_, i) => ({
  src: `/placeholder.svg?height=600&width=600&query=instagram%20ritual%20art%20sculpture%20${i + 1}`,
  alt: `Studio post ${i + 1}`,
}))

export default function InstagramFeed() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {images.map((img, i) => (
        <motion.div
          key={img.alt}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.05 }}
          className="group relative overflow-hidden rounded-xl ring-1 ring-[#B08D57]/20"
        >
          <img
            src={img.src || "/placeholder.svg"}
            alt={img.alt}
            className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-3 left-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            @{`shree.studio`}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
