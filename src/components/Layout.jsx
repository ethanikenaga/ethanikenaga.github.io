import { Outlet } from 'react-router-dom'
import SiteHeader from './SiteHeader.jsx'
import Footer from './Footer.jsx'

function Layout() {
  return (
    <>
      <SiteHeader />
      <hr className="divider" />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
