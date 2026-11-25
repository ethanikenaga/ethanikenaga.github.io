import { useState, type FocusEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CopyEmailButton from './CopyEmailButton.tsx'
import Navbar from './Navbar.tsx'
import ScrambleText from './ScrambleText.tsx'

// Which polaroid is on top of the pile follows the page you are on
function topPolaroid(pathname: string) {
  if (pathname.startsWith('/about')) return 'about'
  if (pathname.startsWith('/expression')) return 'expression'
  return 'work'
}

// The small text under the name changes with the page, like the polaroid on top of the pile
const blurbs = {
  work: { label: '01 / work', text: "Projects I've built and the experiences that shaped how I work." },
  about: { label: '02 / about', text: 'A Cal Poly student who likes good design and building useful things.' },
  expression: { label: '03 / expression', text: 'Photos, drawings and small experiments I make for fun.' },
}

function Header() {
  const { pathname } = useLocation()
  const blurb = blurbs[topPolaroid(pathname)]
  // The pile fans out while the mouse is over it (or a card has keyboard focus), and falls back
  // into a stack when you click a card, until the mouse leaves and comes back.
  const [spread, setSpread] = useState(false)

  const onFocus = (e: FocusEvent<HTMLElement>) => {
    if (e.target.matches(':focus-visible')) setSpread(true)
  }
  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setSpread(false)
  }

  return (
    <header className="site-header">
      <div className="site-intro">
        <h1 className="site-name">
          ethan
          <br />
          ikenaga
        </h1>
        <p className="site-eyebrow" aria-live="polite">
          <ScrambleText text={blurb.label} />
        </p>
        <p className="site-tagline" aria-live="polite">
          <ScrambleText text={blurb.text} />
        </p>
        <nav className="site-links" aria-label="Links">
          <a href="/files/resume.pdf" target="_blank" rel="noreferrer">
            Résumé
          </a>
          <a href="https://github.com/ethanikenaga" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/ethanikenaga" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <CopyEmailButton />
        </nav>
      </div>

      <div
        className={`polaroid-stack${spread ? ' is-spread' : ''}`}
        data-top={topPolaroid(pathname)}
        onMouseEnter={() => setSpread(true)}
        onMouseLeave={() => setSpread(false)}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <Link className="polaroid polaroid-about" to="/about" aria-label="About" onClick={() => setSpread(false)}>
          <img className="polaroid-photo" src="/images/about.jpg" alt="A photo of me" />
          <span className="polaroid-caption">about</span>
        </Link>
        <Link
          className="polaroid polaroid-expression"
          to="/expression"
          aria-label="Expression"
          onClick={() => setSpread(false)}
        >
          <img
            className="polaroid-photo"
            src="/images/expression.jpg"
            alt="Two pink cosmos flowers, one with a bee on it"
          />
          <span className="polaroid-caption">expression</span>
        </Link>
        <Link className="polaroid polaroid-work" to="/" aria-label="Work" onClick={() => setSpread(false)}>
          <img className="polaroid-photo" src="/images/me-selfie.jpg" alt="A headshot photo of me!" />
          <span className="polaroid-caption">work</span>
        </Link>
      </div>

      <Navbar />
    </header>
  )
}

export default Header
