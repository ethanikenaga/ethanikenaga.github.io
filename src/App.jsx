function App() {
  return (
    <>
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

        <nav className="navbar">
          <ul className="nav-list">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/resume">Resume</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <hr className="divider" />

      <main>
        <section className="home-content"></section>
      </main>

      <footer className="footer">
        © 2026 Ethan Ikenaga | All Rights Reserved
      </footer>
    </>
  )
}

export default App