import { Link } from 'react-router-dom'
import Navbar from './Navbar.tsx'

function Header() {
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

      <div className="polaroid-stack" tabIndex={0}>
        <Link className="polaroid polaroid-about" to="/about" aria-label="About">
          <div className="polaroid-photo placeholder-green">+ hobby photo</div>
        </Link>
        <Link className="polaroid polaroid-life" to="/expression" aria-label="Expression">
          <div className="polaroid-photo placeholder-blue">+ candid / campus</div>
        </Link>
        <Link className="polaroid polaroid-me" to="/" aria-label="Work">
          <img className="polaroid-photo" src="/images/me.JPG" alt="A headshot photo of me!" />
        </Link>
      </div>

      <Navbar />
    </header>
  )
}

export default Header
