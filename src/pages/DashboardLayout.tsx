import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiHome, 
  FiFileText, 
  FiDollarSign, 
  FiUsers, 
  FiSettings,
  FiTool,
  FiMenu,
  FiX,
  FiLogOut
} from 'react-icons/fi'
import { Building2 } from 'lucide-react'
import { Button } from '../components/ui/button'

interface NavItem {
  path: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { path: 'dashboard', label: 'Tableau de bord', icon: FiHome },
  { path: 'properties', label: 'Biens immobiliers', icon: FiFileText },
  { path: 'finance', label: 'Finances', icon: FiDollarSign },
  { path: 'tenants', label: 'Locataires', icon: FiUsers },
  { path: 'maintenance', label: 'Maintenance', icon: FiTool },
  { path: 'documents', label: 'Documents', icon: FiFileText },
  { path: 'settings', label: 'Paramètres', icon: FiSettings }
]

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const userType = location.state?.userType || 'proprietaire'

  const getUserTypeLabel = () => {
    switch (userType) {
      case 'proprietaire': return 'Propriétaire'
      case 'administrateur': return 'Administrateur'
      case 'personnel': return 'Personnel d\'entretien'
      case 'locataire': return 'Locataire'
      default: return 'Utilisateur'
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
      </Button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isSidebarOpen || window.innerWidth >= 1024 ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          fixed lg:static 
          w-72 h-full bg-white shadow-xl z-40
          lg:shadow-md lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Gestion Locative</h2>
                <p className="text-sm text-gray-600">{getUserTypeLabel()}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>

          {/* User Actions */}
          <div className="p-4 border-t border-gray-200">
            <NavLink
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </NavLink>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout