'use client'

import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
  age: number
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<Point[]>([])
  const mouse = useRef({ x: -1000, y: -1000 })
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      points.current.push({ x: e.clientX, y: e.clientY, age: 0 })
      // Keep trail length manageable
      if (points.current.length > 80) {
        points.current.shift()
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    const MAX_AGE = 60

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Age all points
      for (let i = 0; i < points.current.length; i++) {
        points.current[i].age++
      }
      // Remove old points
      points.current = points.current.filter((p) => p.age < MAX_AGE)

      if (points.current.length < 2) {
        animRef.current = requestAnimationFrame(draw)
        return
      }

      ctx.save()
      ctx.globalCompositeOperation = 'multiply'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      for (let i = 1; i < points.current.length; i++) {
        const p0 = points.current[i - 1]
        const p1 = points.current[i]

        const progress = 1 - p1.age / MAX_AGE
        // Slightly higher alpha for felt-tip pen feel
        const alpha = progress * 0.28
        // Thicker stroke — felt-tip rather than pencil
        const width = progress * 5 + 1.2

        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.strokeStyle = `rgba(99, 140, 190, ${alpha})`
        ctx.lineWidth = width
        ctx.stroke()
      }

      ctx.restore()

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}
