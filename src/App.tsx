import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import MainLayout from './layouts/MainLayout'

import Home from './pages/Home'
import ResidentialServices from './pages/ResidentialServices'
import CommercialServices from './pages/CommercialServices'
import ProjectGallery from './pages/ProjectGallery'
import WhoWeWorkWith from './pages/WhoWeWorkWith'
import Resources from './pages/Resources'

import InstantProjectEstimate from './pages/AIEstimator'
import RequestEstimate from './pages/RequestEstimate'

import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/residential-services"
            element={<ResidentialServices />}
          />

          <Route
            path="/commercial-services"
            element={<CommercialServices />}
          />

          <Route
            path="/project-gallery"
            element={<ProjectGallery />}
          />

          <Route
            path="/who-we-work-with"
            element={<WhoWeWorkWith />}
          />

          <Route
            path="/resources"
            element={<Resources />}
          />

          <Route
            path="/request-estimate"
            element={<RequestEstimate />}
          />

          <Route
            path="/instant-project-estimate"
            element={<InstantProjectEstimate />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App