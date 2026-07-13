import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import MainLayout from './layouts/MainLayout'

import Home from './pages/Home'
import ResidentialServices from './pages/ResidentialServices'
import CommercialServices from './pages/CommercialServices'
import Gallery from './pages/Gallery'
import WhoWeWorkWith from './pages/WhoWeWorkWith'
import Resources from './pages/Resources'
import HomeMaintenanceResources from './pages/resources/HomeMaintenanceResources'
import CommercialFacilityResources from './pages/resources/CommercialFacilityResources'
import PropertyManagementResources from './pages/resources/PropertyManagementResources'
import PropertyInspectionResources from './pages/resources/PropertyInspectionResources'
import RepairPlanningResources from './pages/resources/RepairPlanningResources'
import AssessmentReportResources from './pages/resources/AssessmentReportResources'
import SeasonalHomeMaintenanceGuide from './pages/resources/SeasonalHomeMaintenanceGuide'
import CommercialPreventativeMaintenanceGuide from './pages/resources/CommercialPreventativeMaintenanceGuide'
import RentalPropertyTurnoverGuide from './pages/resources/RentalPropertyTurnoverGuide'
import WaterDamagePreventionGuide from './pages/resources/WaterDamagePreventionGuide'
import HVACMaintenanceGuide from './pages/resources/HVACMaintenanceGuide'
import EmergencyRepairPreparationGuide from './pages/resources/EmergencyRepairPreparationGuide'

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
            element={<Gallery />}
          />

          <Route
            path="/gallery"
            element={<Gallery />}
          />

          <Route
            path="/who-we-work-with"
            element={<WhoWeWorkWith />}
          />

          <Route
            path="/resources"
            element={<Resources />}
          />

          <Route path="/resources/home-maintenance" element={<HomeMaintenanceResources />} />
          <Route path="/resources/commercial-facilities" element={<CommercialFacilityResources />} />
          <Route path="/resources/property-management" element={<PropertyManagementResources />} />
          <Route path="/resources/property-inspections" element={<PropertyInspectionResources />} />
          <Route path="/resources/repair-planning" element={<RepairPlanningResources />} />
          <Route path="/resources/assessment-reports" element={<AssessmentReportResources />} />
          <Route path="/resources/guides/seasonal-home-maintenance" element={<SeasonalHomeMaintenanceGuide />} />
          <Route path="/resources/guides/commercial-preventative-maintenance" element={<CommercialPreventativeMaintenanceGuide />} />
          <Route path="/resources/guides/rental-property-turnover" element={<RentalPropertyTurnoverGuide />} />
          <Route path="/resources/guides/water-damage-prevention" element={<WaterDamagePreventionGuide />} />
          <Route path="/resources/guides/hvac-maintenance" element={<HVACMaintenanceGuide />} />
          <Route path="/resources/guides/emergency-repair-preparation" element={<EmergencyRepairPreparationGuide />} />

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
