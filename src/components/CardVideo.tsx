import { useEffect, useRef } from 'react'
import { FLIGHT_END, FLIGHT_START, sceneAt, type Place } from './cardScene'

type Props = {
  /** path without extension, e.g. "/cards/jsa-card".
   *  Needs jsa-card.mp4 (the site tour) and jsa-card-site.jpg (its first frame) next to it. */
  src: string
  /** start the tour without waiting for the page to be scrolled (used inside the popup) */
  eager?: boolean
}

// The five petals of the sakura, as in the logo
const PETAL = 'M0,-13 C-22,-20 -28,-50 -14,-62 Q-6,-65 0,-55 Q6,-65 14,-62 C28,-50 22,-20 0,-13 Z'

function Flower({ petal, centre, centreFill }: { petal: string; centre: boolean; centreFill?: string }) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={PETAL} transform={`rotate(${i * 72})`} fill={petal} />
      ))}
      {centre && <circle r="8" fill={centreFill} />}
    </>
  )
}

// The JSA card, in three parts that hand over to each other without a visible jump:
//   1. idle    the sun breathes, the sakura turns, petals float. Drawn live, so it can stop at any moment
//   2. flight  once you have scrolled and 80% of the card is on screen, the sun flies into the
//              header logo of the framed site and the site fades in (also drawn live, from wherever
//              the idle motion happens to be)
//   3. tour    that last frame is identical to the first frame of the tour video, which now takes over
//              and plays through the site; its last frame is the idle state again, so it loops
// It never pauses when scrolled away. Reduced motion: a still of the idle scene, nothing else.
function CardVideo({ src, eager = false }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const stage = stageRef.current
    const video = videoRef.current
    if (!wrap || !stage || !video) return

    // the scene is laid out for a 624 x 380 card; scale it to whatever width the card has
    const fit = () => wrap.style.setProperty('--s', String(wrap.clientWidth / 624))
    fit()
    const resize = new ResizeObserver(fit)
    resize.observe(wrap)

    const part = (name: string) => stage.querySelector<HTMLElement | SVGElement>(`[data-part="${name}"]`)!
    const bg = part('bg')
    const site = part('site')
    const patch = part('patch')
    const moving = {
      halo: part('halo'),
      glow: part('glow'),
      sun: part('sun'),
      sakura: part('sakura'),
      sideL: part('sideL'),
      sideR: part('sideR'),
    }
    const put = (el: HTMLElement | SVGElement, p: Place) => {
      el.style.transform = p.transform
      el.style.opacity = String(p.opacity)
    }
    const draw = (tf: number, ti: number) => {
      const s = sceneAt(tf, ti)
      bg.style.opacity = String(s.bg)
      site.style.opacity = String(s.site)
      patch.style.opacity = String(s.patch)
      for (const name of Object.keys(moving) as (keyof typeof moving)[]) put(moving[name], s[name])
    }

    draw(0, 0)
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return () => resize.disconnect()

    type Phase = 'idle' | 'flight' | 'video'
    let phase: Phase = 'idle'
    let idleBase = performance.now() // ti = seconds since the idle motion was last at rest
    let flightStart = 0
    let visible = false // is 80% of the card on screen?
    let scrolled = eager // has the visitor scrolled yet? (not needed inside the popup)
    let repeat = false // after the first tour the cycle repeats by itself
    let broken = false // the tour video could not play: stay on the idle scene
    let raf = 0

    const showScene = () => {
      stage.style.opacity = '1'
      video.style.opacity = '0'
    }

    const startVideo = () => {
      video.currentTime = 0
      video
        .play()
        .then(() => {
          // swap as soon as the video has painted its first frame (which equals the scene's last)
          const reveal = () => {
            video.style.opacity = '1'
            stage.style.opacity = '0'
          }
          if ('requestVideoFrameCallback' in video) video.requestVideoFrameCallback(reveal)
          else window.setTimeout(reveal, 80)
        })
        .catch(() => {
          broken = true
          phase = 'idle'
          idleBase = performance.now()
        })
    }

    // the tour's last frame is the idle scene at rest, so carry on live from ti = 0
    const onEnded = () => {
      phase = 'idle'
      idleBase = performance.now()
      repeat = true
      draw(0, 0)
      showScene()
    }
    video.addEventListener('ended', onEnded)
    video.addEventListener('error', () => {
      broken = true
    })

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const ti = (now - idleBase) / 1000
      if (phase === 'idle') {
        draw(0, ti)
        const go = repeat ? ti >= 2.5 : scrolled && visible
        if (go && !broken) {
          phase = 'flight'
          flightStart = now
        }
      } else if (phase === 'flight') {
        const tf = FLIGHT_START + (now - flightStart) / 1000
        if (tf < FLIGHT_END) {
          draw(tf, ti)
        } else {
          draw(FLIGHT_END, ti)
          phase = 'video'
          startVideo()
        }
      }
    }
    raf = requestAnimationFrame(frame)

    const onScroll = () => {
      if (window.scrollY > 10) scrolled = true
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // the page may already be scrolled (e.g. after a refresh)

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0.8 }, // at least 80% of the card must be on screen
    )
    observer.observe(wrap)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      video.removeEventListener('ended', onEnded)
      observer.disconnect()
      resize.disconnect()
    }
  }, [eager])

  return (
    <div className="card-scene" ref={wrapRef} aria-hidden="true">
      <div className="card-scene-stage" ref={stageRef}>
        <div className="cs-bg" data-part="bg" />
        <img className="cs-site" src={`${src}-site.jpg`} alt="" data-part="site" />
        <div className="cs-patch" data-part="patch" />
        <div className="cs-halo cs-abs" data-part="halo" />
        <div className="cs-glow cs-abs" data-part="glow" />
        <div className="cs-sun cs-abs" data-part="sun" />
        <svg className="cs-abs" width="130" height="130" viewBox="-65 -65 130 130" data-part="sakura">
          <Flower petal="#FFFFFF" centre centreFill="#F0565A" />
        </svg>
        <svg className="cs-abs" width="47" height="47" viewBox="-65 -65 130 130" data-part="sideL">
          <Flower petal="#F6A9B3" centre centreFill="#F8C6CD" />
        </svg>
        <svg className="cs-abs" width="47" height="47" viewBox="-65 -65 130 130" data-part="sideR">
          <Flower petal="#F6A9B3" centre centreFill="#F8C6CD" />
        </svg>
      </div>
      <video ref={videoRef} className="project-card-art" style={{ opacity: 0 }} muted playsInline preload="auto">
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
    </div>
  )
}

export default CardVideo
