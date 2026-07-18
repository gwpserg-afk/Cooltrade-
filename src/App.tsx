import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { CatalogPage } from './pages/CatalogPage'
import { ServicesPage } from './pages/ServicesPage'
import { ProPage } from './pages/ProPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { LegalPage } from './pages/LegalPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { AdminApp } from './admin/AdminApp'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalogue" element={<CatalogPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/espace-pro" element={<ProPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/mentions-legales" element={<LegalPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Admin panel — its own chrome, outside the marketing Layout */}
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  )
}
