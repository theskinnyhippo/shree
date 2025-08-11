"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

/* ---------- helpers ---------- */
function getMonthMatrix(year: number, month: number) {
  const firstDay = new Date(year, month, 1)
  const startDay = firstDay.getDay() // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const weeks: number[][] = []
  let day = 1 - startDay
  for (let w = 0; w < 6; w++) {
    const week: number[] = []
    for (let d = 0; d < 7; d++) {
      week.push(day >= 1 && day <= daysInMonth ? day : 0)
      day++
    }
    weeks.push(week)
  }
  return weeks
}

const festivalsSeed: Record<string, string> = {}

/* ---------- component ---------- */
export default function FestivalCalendar() {
  const now = new Date()
  const [cursor, setCursor] = useState(new Date(now.getFullYear(), now.getMonth(), 1))

  /* tooltip state */
  const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(null)

  const months = useMemo(() => {
    return [0, 1, 2].map((i) => new Date(cursor.getFullYear(), cursor.getMonth() + i, 1))
  }, [cursor])

  const isFestival = (y: number, m: number, d: number) => {
    const key = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
    const sample: Record<string, string> = {
      [`${now.getFullYear()}-09-21`]: "Mahalaya",
      [`${now.getFullYear()}-09-27`]: "Durga-Panchami",
      [`${now.getFullYear()}-09-28`]: "Durga-Shashthi",
      [`${now.getFullYear()}-09-29`]: "Durga-Saptami",
      [`${now.getFullYear()}-09-30`]: "Durga-Ashtami",
      [`${now.getFullYear()}-10-01`]: "Durga-Navami",
      [`${now.getFullYear()}-10-02`]: "Dusshera",
      [`${now.getFullYear()}-10-06`]: "Laxmi Puja",
      [`${now.getFullYear()}-10-20`]: "Kali Puja",
      [`${now.getFullYear()}-02-14`]: "Saraswati Puja",
    }
    return sample[key] || festivalsSeed[key]
  }

  /* tooltip helpers */
  const showTip = (e: React.MouseEvent, text: string) =>
    setTip({ text, x: e.clientX + 12, y: e.clientY - 24 })
  const hideTip = () => setTip(null)

  return (
    <div className="w-full overflow-hidden">
      {/* arrows */}
      <div className="flex items-center justify-end gap-2">
        <button
          className="icon-btn"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          className="icon-btn"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {months.map((date, idx) => {
          const y = date.getFullYear()
          const m = date.getMonth()
          const matrix = getMonthMatrix(y, m)
          const monthName = date.toLocaleString(undefined, { month: "long", year: "numeric" })

          return (
            <div key={idx} className="rounded-xl bg-white p-4 ring-1 ring-[#B08D57]/20 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                  {monthName}
                </div>
                <div className="text-xs text-neutral-500">Festivals</div>
              </div>

              <div className="mt-3 grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-[11px] text-neutral-500 text-center">
                    {d}
                  </div>
                ))}
                {matrix.flatMap((week, wi) =>
                  week.map((day, di) => {
                    const fest = day ? isFestival(y, m, day) : undefined
                    const today =
                      day && y === now.getFullYear() && m === now.getMonth() && day === now.getDate()

                    return (
                      <div
                        key={`${wi}-${di}`}
                        className="relative h-10 rounded-md border border-transparent hover:border-[#FFD700]/50 transition-colors"
                        onMouseEnter={fest ? (e) => showTip(e, fest) : undefined}
                        onMouseLeave={fest ? hideTip : undefined}
                      >
                        {day ? (
                          <div className="relative h-full w-full flex items-center justify-center">
                            <span className={`text-sm ${fest ? "text-[#A91515] font-semibold" : "text-neutral-700"}`}>
                              {day}
                            </span>
                            <AnimatePresence>
                              {fest && (
                                <motion.span
                                  layoutId="fest-highlight"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 0.18, scale: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                                  className="absolute inset-0 rounded-md bg-[#FFD700]"
                                />
                              )}
                            </AnimatePresence>
                            {today && <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-[#A91515]" />}
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>
                    )
                  }),
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* floating tooltip */}
      <AnimatePresence>
        {tip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ left: tip.x, top: tip.y }}
            className="fixed z-50 px-2 py-1 text-xs rounded shadow-lg bg-neutral-900 text-white pointer-events-none"
          >
            {tip.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}