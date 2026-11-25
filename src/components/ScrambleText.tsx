import { useEffect, useRef, useState } from 'react'

const GLYPHS = 'abcdefghijklmnopqrstuvwxyz'
const HOLD_MS = 250 // the old text stays put for a moment before it starts to change
const SWEEP_MS = 900 // how long the left-to-right scramble takes
const BAND = 0.15 // how wide the flickering band is, as a fraction of the text's width
const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

type Cell = { char: string; state: 'old' | 'scrambling' | 'done' }

// Where each letter of `text` sits across the block, from 0 (left edge) to 1 (right edge), measured
// from the real layout. Letters on different lines but at the same x get the same number, which is
// what lets every line change at the same time instead of one line after another.
function columnPositions(el: HTMLElement | null, text: string): number[] {
  const node = el?.firstChild
  if (!el || !node || node.nodeType !== Node.TEXT_NODE) {
    return text.split('').map((_, i) => (text.length > 1 ? i / (text.length - 1) : 0)) // fallback: by letter order
  }
  const range = document.createRange()
  const left = el.getBoundingClientRect().left
  const xs: number[] = []
  let rightMost = 1
  let previous = 0
  for (let i = 0; i < text.length; i++) {
    range.setStart(node, i)
    range.setEnd(node, i + 1)
    const rect = range.getClientRects()[0]
    const x = rect ? rect.left - left : previous // a space at the end of a line has no box
    if (rect) rightMost = Math.max(rightMost, rect.right - left)
    xs.push(x)
    previous = x
  }
  return xs.map((x) => Math.min(1, Math.max(0, x / rightMost)))
}

// Shows `text`. When `text` changes, the text already on screen scrambles into the new text with one
// front that sweeps across from the left: letters just behind the front flicker through random
// letters (dimmer), letters ahead of it are still the old text, and letters behind that are new.
function ScrambleText({ text }: { text: string }) {
  const [shown, setShown] = useState(text) // the settled text currently on screen
  const [cells, setCells] = useState<Cell[] | null>(null) // set while a scramble is running
  const previous = useRef(text)
  const onScreen = useRef(text) // exactly what is visible right now, so an interrupted scramble carries on from it
  const measureRef = useRef<HTMLSpanElement>(null) // an invisible copy of the new text, used to find where each letter sits

  useEffect(() => {
    if (previous.current === text) return // first render: nothing to animate
    previous.current = text

    let frame = 0
    const timers: number[] = []
    const settle = () => {
      onScreen.current = text
      setShown(text)
      setCells(null)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timers.push(window.setTimeout(settle, 0))
    } else {
      timers.push(
        window.setTimeout(() => {
          const from = onScreen.current.split('')
          const to = text.split('')
          const length = Math.max(from.length, to.length)
          const columns = columnPositions(measureRef.current, text)
          const lastColumn = columns[columns.length - 1] ?? 0
          const glyphs = Array.from({ length }, randomGlyph)
          const startedAt = performance.now()

          const tick = (now: number) => {
            const progress = Math.min((now - startedAt) / SWEEP_MS, 1)
            if (progress === 1) {
              settle()
              return
            }
            const front = progress * (1 + BAND)
            const next = Array.from({ length }, (_, i): Cell => {
              const column = i < columns.length ? columns[i] : lastColumn
              if (front < column) return { char: from[i] ?? '', state: 'old' }
              if (front < column + BAND && to[i] !== undefined && to[i] !== ' ') {
                if (Math.random() < 0.35) glyphs[i] = randomGlyph()
                return { char: glyphs[i], state: 'scrambling' }
              }
              return { char: to[i] ?? '', state: 'done' }
            })
            onScreen.current = next.map((cell) => cell.char).join('')
            setCells(next)
            frame = window.requestAnimationFrame(tick)
          }
          frame = window.requestAnimationFrame(tick)
        }, HOLD_MS),
      )
    }

    return () => {
      timers.forEach((id) => window.clearTimeout(id))
      window.cancelAnimationFrame(frame)
    }
  }, [text])

  const visual = cells
    ? cells.map((cell, i) => (
        <span key={i} className={cell.state === 'scrambling' ? 'scramble-scrambling' : undefined}>
          {cell.char}
        </span>
      ))
    : shown

  return (
    <>
      <span className="visually-hidden">{text}</span>
      <span className="scramble-wrap" aria-hidden="true">
        <span className="scramble-measure" ref={measureRef}>
          {text}
        </span>
        {visual}
      </span>
    </>
  )
}

export default ScrambleText
