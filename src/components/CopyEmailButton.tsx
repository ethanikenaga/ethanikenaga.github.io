import { useEffect, useRef, useState } from 'react'

const EMAIL = 'ethanikenaga@gmail.com'
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const FRAME = 1000 / 60 // the timings below are counted in 60fps frames, whatever the screen's refresh rate
const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

// One letter of the label. Letters that are mid-scramble are drawn dimmer.
type Cell = { char: string; scrambling: boolean }
const toCells = (text: string): Cell[] => [...text].map((char) => ({ char, scrambling: false }))

// Clicking copies the email address. The label reads "Copied" for a moment, then each letter
// scrambles into "Email" on its own timing, starting from the old letter.
function CopyEmailButton() {
  const [cells, setCells] = useState<Cell[]>(toCells('Email'))
  const [announcement, setAnnouncement] = useState('')
  const holdTimer = useRef<number | undefined>(undefined)
  const frame = useRef<number>(0)

  const stop = () => {
    window.clearTimeout(holdTimer.current)
    window.cancelAnimationFrame(frame.current)
  }

  useEffect(() => stop, [])

  const scrambleTo = (from: string, to: string) => {
    const length = Math.max(from.length, to.length)
    // every letter starts and finishes at its own moment, so they don't all change together
    const queue = Array.from({ length }, (_, i) => {
      const start = Math.floor(Math.random() * 14)
      return {
        from: from[i] ?? '',
        to: to[i] ?? '',
        start,
        end: start + 10 + Math.floor(Math.random() * 14),
        glyph: '',
      }
    })
    const startedAt = performance.now()

    const tick = (now: number) => {
      const frames = (now - startedAt) / FRAME
      let finished = 0
      const next: Cell[] = []
      for (const q of queue) {
        if (frames >= q.end) {
          finished++
          if (q.to) next.push({ char: q.to, scrambling: false }) // a letter with no match simply drops out
        } else if (frames >= q.start) {
          if (!q.glyph || Math.random() < 0.3) q.glyph = randomGlyph()
          next.push({ char: q.glyph, scrambling: true })
        } else if (q.from) {
          next.push({ char: q.from, scrambling: false })
        }
      }
      setCells(next)
      if (finished < queue.length) frame.current = window.requestAnimationFrame(tick)
    }
    frame.current = window.requestAnimationFrame(tick)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      window.location.href = `mailto:${EMAIL}` // copying isn't allowed here, so open the mail app instead
      return
    }
    stop()
    setCells(toCells('Copied'))
    setAnnouncement('Email copied')
    holdTimer.current = window.setTimeout(() => {
      setAnnouncement('')
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setCells(toCells('Email'))
      else scrambleTo('Copied', 'Email')
    }, 1200)
  }

  return (
    <>
      <button type="button" onClick={copy} aria-label="Copy email address">
        {cells.map((cell, i) => (
          <span key={i} className={cell.scrambling ? 'is-scrambling' : undefined}>
            {cell.char}
          </span>
        ))}
      </button>
      <span className="visually-hidden" role="status">
        {announcement}
      </span>
    </>
  )
}

export default CopyEmailButton
