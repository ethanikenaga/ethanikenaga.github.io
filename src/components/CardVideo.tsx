import { useEffect, useRef, useState } from 'react'

type Props = {
  /** path without extension, e.g. "/cards/jsa-card" (needs .mp4 and -poster.jpg) */
  src: string
}

// A muted video that starts playing as soon as the page loads and loops.
// It pauses while scrolled off screen, and stays a still poster for people
// who asked their system for reduced motion.
function CardVideo({ src }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [reduceMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const video = ref.current
    if (!video || reduceMotion) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <video
      ref={ref}
      className="project-card-art"
      autoPlay={!reduceMotion}
      muted
      loop
      playsInline
      preload="auto"
      poster={`${src}-poster.jpg`}
    >
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  )
}

export default CardVideo
