"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  alpha: number
}

export default function ParticlesCanvas({ count = 80 }: { count?: number } = { count: 80 }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio)
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio)
    ctx.scale(devicePixelRatio, devicePixelRatio)

    const init = () => {
      particlesRef.current = Array.from({ length: count }).map(() => ({
        x: Math.random() * (w / devicePixelRatio),
        y: Math.random() * (h / devicePixelRatio),
        r: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.2 - Math.random() * 0.3,
        alpha: 0.5 + Math.random() * 0.5,
      }))
    }

    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, w / devicePixelRatio, h / devicePixelRatio)
      for (const p of particlesRef.current) {
        // Golden gradient glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        grad.addColorStop(0, "rgba(255,215,0,0.9)")
        grad.addColorStop(1, "rgba(176,141,87,0)")
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()

        p.x += p.vx
        p.y += p.vy
        p.alpha -= 0.0015

        if (p.y < -10 || p.alpha <= 0) {
          p.x = Math.random() * (w / devicePixelRatio)
          p.y = h / devicePixelRatio + 10
          p.alpha = 0.5 + Math.random() * 0.5
        }
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio
      h = canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
      init()
    }

    init()
    draw()
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(rafRef.current || 0)
      window.removeEventListener("resize", onResize)
    }
  }, [count])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
}
