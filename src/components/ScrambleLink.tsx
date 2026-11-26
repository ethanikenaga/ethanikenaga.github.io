import { useCallback, useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const FRAME = 1000 / 60 // the timings below are counted in 60fps frames, whatever the screen's refresh rate
const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
const isScrambled = (char: string) => /[a-z0-9]/i.test(char) // spaces and dots stay put

// One letter of the link. Letters that are mid-scramble are drawn dimmer.
type Cell = { char: string; scrambling: boolean }

// A link whose text scrambles: every letter flickers through random letters and then settles into
// the real text, from left to right. It plays the first time the link scrolls into view, and again
// whenever the mouse moves over it (or it gets keyboard focus).
function ScrambleLink({ text, href, className }: { text: string; href: string; className?: string }) {
  const [cells, setCells] = useState<Cell[] | null>(null) // set while a scramble is running
  const link = useRef<HTMLAnchorElement>(null)
  const frame = useRef(0)
  const running = useRef(false)

  const scramble = useCallback(() => {
    if (running.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    running.current = true
    // every letter settles at its own moment, a little later the further along the text it is
    const queue = [...text].map((char, i) => ({
      char,
      end: 12 + i * 2 + Math.random() * 8,
      glyph: randomGlyph(),
    }))
    const startedAt = performance.now()

    const tick = (now: number) => {
      const frames = (now - startedAt) / FRAME
      let settled = 0
      const next = queue.map((q): Cell => {
        if (!isScrambled(q.char) || frames >= q.end) {
          settled++
          return { char: q.char, scrambling: false }
        }
        if (Math.random() < 0.3) q.glyph = randomGlyph()
        return { char: q.glyph, scrambling: true }
      })
      if (settled === queue.length) {
        running.current = false
        setCells(null)
        return
      }
      setCells(next)
      frame.current = window.requestAnimationFrame(tick)
    }
    frame.current = window.requestAnimationFrame(tick)
  }, [text])

  useEffect(() => () => window.cancelAnimationFrame(frame.current), [])

  // play once, the first time the link is on screen
  useEffect(() => {
    const el = link.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble()
          observer.disconnect()
        }
      },
      { threshold: 0.9 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [scramble])

  return (
    <a
      ref={link}
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={scramble}
      onFocus={scramble}
    >
      {/* screen readers get the real text, not the flickering letters */}
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {cells
          ? cells.map((cell, i) => (
              <span key={i} className={cell.scrambling ? 'scramble-scrambling' : undefined}>
                {cell.char}
              </span>
            ))
          : text}
      </span>
    </a>
  )
}

export default ScrambleLink
