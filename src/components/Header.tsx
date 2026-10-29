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

      <img
        className="site-photo"
        src="/images/me.JPG"
        alt="A headshot photo of me!"
      />

      <Navbar />
    </header>
  )
}

export default Header
