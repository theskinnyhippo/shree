"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

type Testimonial = {
  quote: string
  name: string
  role: string
  img: string
}

const testimonials: Testimonial[] = [
  {
    quote: "The craftsmanship is exquisite. We customised a shree for my cousin's wedding and our families were moved.",
    name: "Arjun Kansari",
    role: "Kolkata",
    img: "/placeholder.svg?height=200&width=200",
  },
  {
    quote: "Ordered for our family Durga Puja. It was amazing.",
    name: "S. Mukherjee",
    role: "Howrah",
    img: "/placeholder.svg?height=200&width=200",
  },
  {
    quote: "We ordered a custom Saraswati idol for our school ceremony, it was simply beautiful.",
    name: "Anjali Roy",
    role: "Kolkata",
    img: "/placeholder.svg?height=200&width=200",
  },
]

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0)
const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearTimeout(timeoutRef.current)
  }, [index])

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-[#B08D57]/20 shadow-gold p-6 md:p-10">
        <button className="icon-btn absolute left-3 top-1/2 -translate-y-1/2" onClick={prev} aria-label="Previous">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button className="icon-btn absolute right-3 top-1/2 -translate-y-1/2" onClick={next} aria-label="Next">
          <ChevronRight className="h-4 w-4" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-[160px_1fr] gap-6 items-center"
          >
            <img
              src={testimonials[index].img || "/placeholder.svg"}
              alt={`${testimonials[index].name} photo`}
              className="h-40 w-40 rounded-full object-cover ring-2 ring-[#FFD700]/60 justify-self-center"
            />
            <div>
              <Quote className="h-6 w-6 text-[#B08D57]" />
              <p className="mt-3 text-lg md:text-xl text-neutral-800">
                {"“"}
                {testimonials[index].quote}
                {"”"}
              </p>
              <div className="mt-4 text-sm text-neutral-600">
                <span className="font-medium text-neutral-800">{testimonials[index].name}</span> ·{" "}
                {testimonials[index].role}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
