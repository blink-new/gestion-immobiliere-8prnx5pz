import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import PropertyList from '../components/PropertyList'
import PropertyMap from '../components/PropertyMap'
import FinancialCharts from '../components/FinancialCharts'
import type { Property } from '../components/PropertyMap'
import { 
  FiHome, 
  FiUsers, 
  FiDollarSign, 
  FiTool,
  FiTrendingUp,
  FiTrendingDown
} from 'react-icons/fi'

interface StatCard {
  title: string
  value: string | number
  change: string
  trend: 'up' | 'down'
  icon: React.ComponentType<{ className?: string }>
  bgColor: string
  iconColor: string
}

const stats: StatCard[] = [
  {
    title: 'Biens totaux',
    value: 12,
    change: '+2 ce mois',
    trend: 'up',
    icon: FiHome,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Locataires actifs',
    value: 28,
    change: '+5 ce mois',
    trend: 'up',
    icon: FiUsers,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    title: 'Revenus mensuels',
    value: '€ 15,750',
    change: '+12.5%',
    trend: 'up',
    icon: FiDollarSign,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Maintenances',
    value: 3,
    change: '-2 cette semaine',
    trend: 'down',
    icon: FiTool,
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600'
  }
]

// Données d'exemple des immeubles
const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Résidence Les Champs',
    address: '15 Avenue des Champs-Élysées, Paris',
    type: 'Immeuble résidentiel',
    units: 8,
    occupancy: 100,
    monthlyRevenue: 6400,
    lat: 48.8698,
    lng: 2.3077,
    status: 'excellent'
  },
  {
    id: '2',
    name: 'Villa Montmartre',
    address: '42 Rue de Montmartre, Paris',
    type: 'Maison individuelle',
    units: 1,
    occupancy: 100,
    monthlyRevenue: 2800,
    lat: 48.8846,
    lng: 2.3402,
    status: 'good'
  },
  {
    id: '3',
    name: 'Appartements du Marais',
    address: '8 Place des Vosges, Paris',
    type: 'Appartements',
    units: 6,
    occupancy: 83,
    monthlyRevenue: 4200,
    lat: 48.8553,
    lng: 2.3656,
    status: 'good'
  },
  {
    id: '4',
    name: 'Tour Moderne',
    address: '25 Rue de Rivoli, Paris',
    type: 'Immeuble moderne',
    units: 12,
    occupancy: 75,
    monthlyRevenue: 7800,
    lat: 48.8566,
    lng: 2.3522,
    status: 'average'
  },
  {
    id: '5',
    name: 'Résidence Saint-Germain',
    address: '14 Boulevard Saint-Germain, Paris',
    type: 'Résidence de standing',
    units: 10,
    occupancy: 90,
    monthlyRevenue: 8900,
    lat: 48.8506,
    lng: 2.3444,
    status: 'excellent'
  }
]

function Dashboard() {
  const handlePropertyClick = (property: Property) => {
    // Pour l'instant, on affiche juste une alerte
    // Plus tard, on pourra naviguer vers la fiche détaillée
    alert(`Ouverture de la fiche de ${property.name}`)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="mt-2 text-gray-600">
          Aperçu des performances de vos biens immobiliers
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === 'up' ? FiTrendingUp : FiTrendingDown
          
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {stat.value}
                      </p>
                      <div className="flex items-center mt-3 space-x-1">
                        <TrendIcon 
                          className={`w-4 h-4 ${
                            stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}
                        />
                        <span 
                          className={`text-sm font-medium ${
                            stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Properties List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <PropertyList 
          properties={mockProperties} 
          onPropertyClick={handlePropertyClick}
        />
      </motion.div>

      {/* Financial Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Analyses financières</h2>
          <p className="text-sm text-gray-600">
            Cliquez sur les graphiques pour voir plus de détails
          </p>
        </div>
        <FinancialCharts />
      </motion.div>

      {/* Interactive Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Localisation des biens</h2>
          <p className="text-sm text-gray-600">
            Cliquez sur les marqueurs pour voir les détails
          </p>
        </div>
        <PropertyMap 
          properties={mockProperties}
          onPropertyClick={handlePropertyClick}
          center={[48.8566, 2.3522]} // Paris
          zoom={12}
        />
      </motion.div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'Nouveau locataire', desc: 'Jean Dupont - Appartement 3B', time: 'Il y a 2 heures' },
                  { title: 'Paiement reçu', desc: 'Marie Martin - €850', time: 'Il y a 5 heures' },
                  { title: 'Maintenance terminée', desc: 'Réparation plomberie - Immeuble A', time: 'Hier' }
                ].map((activity, i) => (
                  <div key={i} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.desc}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Taux d'occupation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="relative inline-flex">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="16"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.92)}`}
                        className="text-blue-600 transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-800">92%</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600">Excellent taux d'occupation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard