import { Outlet } from 'react-router-dom'
import Navbar from '../components/Layout/Navbar'
import Footer from '../components/Layout/Footer'

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
