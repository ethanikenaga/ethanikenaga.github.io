const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        {links.map((link) => (
          <li key={link.to}>
            <a href={link.to}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
