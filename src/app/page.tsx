"use client"

import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Instagram, ShoppingBag } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Playfair_Display, Inter } from "next/font/google"
import { useRef } from "react"
import ParticlesCanvas from "@/src/components/particles-canvas"
import SectionTitle from "@/src/components/section-title"
import Timeline from "@/src/components/timeline"
import CategoryGrid from "@/src/components/category-grid"
import FestivalCalendar from "@/src/components/festival-calendar"
import TestimonialsCarousel from "@/src/components/testimonials-carousel"
import InstagramFeed from "@/src/components/instagram-feed"
import ContactForm from "@/src/components/contact-form"
import "@/src/app/shree.css"
import Element3D from "@/src/components/elements/element3D"
import HeroVid from "../components/elements/hero-vid"

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const y = useTransform(scrollY, [0, 400], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.6])

  return (
    <main
      className={`${serif.variable} ${sans.variable} font-[var(--font-sans)] bg-[#F5F5F5] text-neutral-900`}
      style={{
        // Provide CSS variables for brand palette
        // Use via var(--gold), var(--vermillion), var(--offwhite), var(--brass)
        // Tailwind classes still used for most styling
        ["--gold" as any]: "#FFD700",
        ["--vermillion" as any]: "#A91515",
        ["--offwhite" as any]: "#F5F5F5",
        ["--brass" as any]: "#B08D57",
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-[#F5F5F5]/70 border-b border-[#B08D57]/20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="#" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#FFD700] to-[#B08D57] ring-2 ring-[#FFD700]/60 shadow-[0_0_20px_rgba(255,215,0,0.35)]" />
            <span
              className="text-xl tracking-wide group-hover:text-[#A91515] transition-colors"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Shree
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#journey" className="nav-link">
              Crafting Journey
            </a>
            <a href="#categories" className="nav-link">
              Categories
            </a>
            <a href="#calendar" className="nav-link">
              Festival Calendar
            </a>
            <a href="#testimonials" className="nav-link">
              Testimonials
            </a>
            <a href="#contact" className="nav-link">
              Custom Orders
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button className="btn-gold hidden sm:inline-flex px-9 py-4 rounded-full">
              <ShoppingBag className="h-4 w-4 mr-2" />
              <Link href="#categories">Shop</Link>
            </Button>
          </div>
        </div>
        <div className="gold-line" />
      </header>

      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="relative min-h-screen w-full overflow-hidden">
        {/* Video background: replace /videos/hero.mp4 with your artisan video */}
        <HeroVid />
        {/* className="absolute inset-0 w-full h-full object-cover" Soft overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/25" />
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 10%, #FFD700 0.5px, transparent 0.6px), radial-gradient(circle at 60% 40%, #B08D57 0.5px, transparent 0.6px)",
            backgroundSize: "24px 24px, 30px 30px",
          }}
        />
        {/* Floating gold particles */}
        <ParticlesCanvas />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto hover:opacity-0 px-4 md:px-6 pt-40 md:pt-36 pb-24"
          style={{ y, opacity }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl lg:text-8xl max-w-6xl text-amber-200 mt-35 drop-shadow-xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Blessings shine brighter when Shree is beautiful
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="mt-4 md:mt-6 max-w-2xl text-base md:text-lg text-white/90"
          >
            <i>
            In every fold of color, happiness blooms.
            Blessings take shape beneath gentle hands.
            Beauty glows softly, carrying peace to your home.
            This is Shree — where devotion becomes art.
            </i>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 flex gap-4"
          >
            <Button className="btn-outline-brass bg-white/50 text-lg text-black rounded-full px-9 py-7 hover:bg-black/50 hover:text-white" asChild>
              <Link href="#about">Our Story</Link>
            </Button>
            <Button className="btn-gold bg-white/50 text-lg text-black rounded-full px-9 py-7 hover:bg-black/50 hover:text-white" asChild>
              <Link href="#categories">Shop Now</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 md:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Element3D />
            <div className="absolute -bottom-6 -right-6 p-4 rounded-lg bg-white/80 backdrop-blur ring-1 ring-[#FFD700]/40 shadow-gold mb-3">
              <div className="text-sm text-neutral-600">Est. in Kolkata</div>
              <div className="text-lg  font-semibold text-[#A91515]" style={{ fontFamily: "var(--font-serif)" }}>
                Handcrafted with Love and pride
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <SectionTitle
              eyebrow="About Shree"
              title="Where ritual becomes art"
              subtitle=""
            />
            <div className="mt-6 space-y-4 text-neutral-700">
              <p><i>
                  We blend rice flour, banana and non-toxic Holi colors to make the vibrant clay, and then mould intricate forms. Each piece rests on a brass plate, radiating a
                timeless glow.
              </i>
              </p>
              <p><i>
                  Every corner of the Shree is made with high precision, maintaining the aesthetics. And it's customisable, based on the theme given by the customers, and their requirement. 
                Customers can go for a one-to-one conversation with the artist.
              </i>
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge className="badge-brass">Floral Motifs</Badge>
              <Badge className="badge-brass">Conch Patterns</Badge>
              <Badge className="badge-brass">Amazing options</Badge>
              <Badge className="badge-brass">You think we make</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Crafting Journey Timeline */}
      <section id="journey" className="relative py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionTitle
            eyebrow="The Crafting Journey"
            title="From sacred ingredients to timeless sculpture"
            subtitle="Follow the steps — each one animated just as it unfolds at our studio."
          />
          <div className="mt-10">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section id="categories" className="relative py-20 md:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionTitle
            eyebrow="Shop by Category"
            title="Complete your event with a beautiful twist"
            subtitle="Explore Shree curated for festivals, weddings, and cultural ceremonies."
          />
          <div className="mt-10">
            <CategoryGrid />
          </div>
        </div>
      </section>

      {/* Festival Calendar */}
      <section id="calendar" className="relative py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionTitle
            eyebrow="Festival Calendar"
            title="Mark the dates, celebrate with Shree"
            subtitle="Animated highlights for the season’s most auspicious days."
          />
          <div className="mt-10">
            <FestivalCalendar />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative py-20 md:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionTitle
            eyebrow="Voices of Blessing"
            title="What our patrons say"
            subtitle="Stories of Love, Devotion, and Culture — wrapped in gold."
          />
          <div className="mt-10">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section id="instagram" className="relative py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <SectionTitle
              eyebrow="From Our Studio"
              title="Instagram"
              subtitle="Follow @shree.studio for behind&#45;the&#45;scenes and release drops."
            />
            <a href="#" className="btn-outline-brass shrink-0 hidden md:inline-flex">
              <Instagram className="h-4 w-4 mr-2" />
              Follow
            </a>
          </div>
          <div className="mt-10">
            <InstagramFeed />
          </div>
        </div>
      </section>

      {/* Contact / Custom Orders */}
      <section id="contact" className="relative py-20 md:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionTitle
            eyebrow="Custom Orders"
            title="Customize your order"
            subtitle="Provide your contact details, we will reach you out :)"
          />
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[#B08D57]/30 bg-white">
        <div className="gold-line gold-line--slow" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#FFD700] to-[#B08D57] ring-2 ring-[#FFD700]/60" />
              <span className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                Shree
              </span>
            </div>
            <p className="mt-3 text-neutral-600">
              Handcrafted ritual art from Kolkata — honoring tradition with every piece.
            </p>
          </div>
          <div>
            <div className="footer-title">Explore</div>
            <ul className="mt-3 space-y-2">
              <li>
                <a className="footer-link" href="#categories">
                  Shop
                </a>
              </li>
              <li>
                <a className="footer-link" href="#journey">
                  Crafting Journey
                </a>
              </li>
              <li>
                <a className="footer-link" href="#calendar">
                  Festival Calendar
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-title">Support</div>
            <ul className="mt-3 space-y-2">
              <li>
                <a className="footer-link" href="#contact">
                  Custom Orders
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a className="footer-link" href="#">
                  Care Guide
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-title">Connect</div>
            <ul className="mt-3 space-y-2">
              <li className="footer-link">Kolkata, West Bengal</li>
              <li className="footer-link">helloshree77@gmail.com</li>
              <li className="footer-link">@shree.studio</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#B08D57]/20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 text-xs text-neutral-600 flex justify-between">
            <span>&copy; {new Date().getFullYear()} Shree. All rights reserved.</span>
            <div className="flex gap-4">
              <a className="footer-link" href="#">
                Terms
              </a>
              <a className="footer-link" href="#">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
