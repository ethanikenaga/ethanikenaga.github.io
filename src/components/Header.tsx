import { useState, type FocusEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from './Navbar.tsx'

// Which polaroid is on top of the pile follows the page you are on
function topPolaroid(pathname: string) {
  if (pathname.startsWith('/about')) return 'about'
  if (pathname.startsWith('/expression')) return 'expression'
  return 'work'
}

function Header() {
  const { pathname } = useLocation()
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
        <p className="site-tagline">
          Designing tools to make
          <br />
          the world a better place.
        </p>
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
