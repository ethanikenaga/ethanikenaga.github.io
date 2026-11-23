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
        <figure className="polaroid polaroid-about" aria-hidden="true">
          <div className="polaroid-photo placeholder-green">+ hobby photo</div>
        </figure>
        <figure className="polaroid polaroid-life" aria-hidden="true">
          <div className="polaroid-photo placeholder-blue">+ candid / campus</div>
        </figure>
        <figure className="polaroid polaroid-me">
          <img className="polaroid-photo" src="/images/me.JPG" alt="A headshot photo of me!" />
        </figure>
      </div>

      <Navbar />
    </header>
  )
}

export default Header
