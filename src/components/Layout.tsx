import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

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
