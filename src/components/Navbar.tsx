import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/expression', label: 'Expression' },
]

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to}>{link.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
