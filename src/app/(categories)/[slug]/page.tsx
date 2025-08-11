import Image from "next/image"
import Link from "next/link"
import OrderDialog from "@/src/components/order-dialog"

const CATEGORIES: Record<
  string,
  {
    title: string
    subtitle: string
    hero: string
    highlights: string[]
    description: string
  }
> = {
  "durga-puja": {
    title: "Durga Puja Collection",
    subtitle: "Invoking Shakti with auspicious sculptures and brass glow.",
    hero: "/durga-puja.png",
    highlights: ["Lotus & conch motifs", "Polished brass plates", "Natural pigments"],
    description:
      "Celebrate Durga Puja with handcrafted ritual sculptures shaped from rice flour and banana, painted with natural colors, and placed on polished brass plates. Each piece is packaged in eco‑friendly boxes with gold Bengali motifs — perfect for home puja and gifting.",
  },
  weddings: {
    title: "Wedding Collection",
    subtitle: "Ornate blessings for sacred unions.",
    hero: "/biye.png",
    highlights: ["Auspicious color palette", "Custom monograms", "Gift‑ready eco packaging"],
    description:
      "From engagement to wedding day, mark each ceremony with ritual art that honors Bengali traditions. Customize motifs and inscriptions to create heirlooms that speak to your story.",
  },
  "kali-puja": {
    title: "Kali Puja Collection",
    subtitle: "Embodying strength, devotion, and light.",
    hero: "/kali-puja.png",
    highlights: ["Bold vermillion hues", "Hand‑polished brass", "Blessing inscriptions"],
    description:
      "Crafted to honor Ma Kali, these pieces feature bold tones and traditional elements that illuminate your shrine with reverence.",
  },
  "saraswati-puja": {
    title: "Saraswati Puja Collection",
    subtitle: "Celebrating wisdom, music, and learning.",
    hero: "/saraswati-puja.png",
    highlights: ["Veena & lotus motifs", "Soft warm palette", "School & home ceremonies"],
    description:
      "Grace your Saraswati Puja with serene sculptures that echo knowledge and the arts, thoughtfully made and beautifully presented.",
  },
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
const { slug } = await params                 
const data = CATEGORIES[slug] ?? null   
  if (!data) {
    return (
      <main className="min-h-[60vh] bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
          <h1 className="text-2xl md:text-3xl font-semibold">Category not found</h1>
          <p className="mt-3 text-neutral-600">Please return to the shop to explore available collections.</p>
          <Link href="/#categories" className="btn-outline-brass mt-6 inline-flex">
            Back to Categories
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#F5F5F5]">
      {/* Hero banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[46vh] md:h-[56vh]">
          <Image
            src={data.hero || "/placeholder.svg"}
            alt={data.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/80" />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 10%, #FFD700 0.5px, transparent 0.6px), radial-gradient(circle at 60% 40%, #B08D57 0.5px, transparent 0.6px)",
              backgroundSize: "24px 24px, 30px 30px",
            }}
          />
          <div className="absolute bottom-6 left-0 right-0 mx-auto max-w-7xl px-4 md:px-6">
            <h1 className="text-5xl md:text-7xl font-semibold text-white drop-shadow-lg shadow-black " style={{ fontFamily: "var(--font-serif)" }}>
              {data.title}
            </h1>
            <p className="mt-4 text-white/60 pb-5">{data.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-[1.3fr_.7fr] gap-8 md:gap-12 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "var(--font-serif)" }}>
              About this collection
            </h2>
            <p className="mt-3 text-neutral-700">{data.description}</p>

            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {data.highlights.map((h) => (
                <div key={h} className="rounded-lg bg-white p-4 ring-1 ring-[#B08D57]/20">
                  <div className="text-sm text-[#A91515] font-semibold" style={{ fontFamily: "var(--font-serif)" }}>
                    {h}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-xl bg-white py-6 px-9 ring-1 ring-[#B08D57]/0 shadow-lg shadow-neutral-300">
            <div className="text-lg font-medium text-semibold" >
              Place an order
            </div>
            <p className="mt-2 text-md text-neutral-600">
              Share your details
            </p>
            <p className="mt-2 text-md text-neutral-600">
              we’ll verify your phone via OTP and call to confirm or discuss modifications.
            </p>
            <div className="mt-4">
              <OrderDialog category={data.title} />
            </div>
            <div className="mt-6 text-xs text-neutral-500">
              For confirming the order, we will contact you. And provide you our online paymentID. 50% of the payment oughta be done beforehand
            </div>
          </aside>
        </div>

        {/* Gallery preview */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl ring-1 ring-[#B08D57]/20">
              <img
                src={`/abstract-geometric-shapes.png?height=640&width=960&query=${encodeURIComponent(
                  data.title + " handcrafted ritual sculpture " + (i + 1),
                )}`}
                alt={data.title + " piece " + (i + 1)}
                className="h-130 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-transparent" />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
