import Navbar from './Navbar.tsx'

function Header() {
  return (
    <header className="site-header">
      <div className="site-intro">
        <p className="site-label">CS STUDENT</p>
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
          <figcaption>about me</figcaption>
        </figure>
        <figure className="polaroid polaroid-life" aria-hidden="true">
          <div className="polaroid-photo placeholder-blue">+ candid / campus</div>
          <figcaption>life lately</figcaption>
        </figure>
        <figure className="polaroid polaroid-me">
          <img className="polaroid-photo" src="/images/me.JPG" alt="A headshot photo of me!" />
          <figcaption>hi, that's me</figcaption>
        </figure>
      </div>

      <Navbar />
    </header>
  )
}

export default Header
