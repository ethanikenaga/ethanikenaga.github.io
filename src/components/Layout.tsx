import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <Header />
      <hr className="divider" />
      <main>
        {/* the key makes the page fade in again every time the route changes */}
        <div className="page-transition" key={pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Layout
