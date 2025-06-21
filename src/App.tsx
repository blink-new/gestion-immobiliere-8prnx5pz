import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserSelection from './pages/UserSelection'
import DashboardLayout from './pages/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Properties from './pages/Properties'
import AddProperty from './pages/AddProperty'
import PropertyDetails from './pages/PropertyDetails'
import PropertyDocuments from './pages/PropertyDocuments'
import Finance from './pages/Finance'
import { Building2 } from 'lucide-react'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSelection />} />
        <Route path="/app" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/add" element={<AddProperty />} />
          <Route path="properties/view/:id" element={<PropertyDetails />} />
          <Route path="properties/edit/:id" element={<AddProperty />} />
          <Route path="properties/documents/:id" element={<PropertyDocuments />} />
          <Route path="finance" element={<Finance />} />
          <Route path="tenants" element={<ComingSoonPage title="Locataires" />} />
          <Route path="maintenance" element={<ComingSoonPage title="Maintenance" />} />
          <Route path="documents" element={<ComingSoonPage title="Documents" />} />
          <Route path="settings" element={<ComingSoonPage title="Paramètres" />} />
        </Route>
      </Routes>
    </Router>
  )
}

const ComingSoonPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center bg-white rounded-xl shadow-sm p-8">
    <div className="p-4 bg-blue-600 rounded-2xl shadow-lg mb-6">
      <Building2 className="w-12 h-12 text-white" />
    </div>
    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    <p className="mt-4 text-lg text-gray-600">Cette page est en cours de construction.</p>
    <p className="mt-2 text-gray-500">Revenez bientôt pour découvrir cette fonctionnalité !</p>
  </div>
)

export default App