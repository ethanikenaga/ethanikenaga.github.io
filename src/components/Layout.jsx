import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function Layout() {
  return (
    <>
      <Header />
      <hr className="divider" />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
