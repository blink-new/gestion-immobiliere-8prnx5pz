import { motion } from 'framer-motion'
import { Building2, MapPin, Users, TrendingUp, Eye } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import type { Property } from './PropertyMap'

interface PropertyListProps {
  properties: Property[]
  onPropertyClick: (property: Property) => void
}

const getStatusColor = (status: Property['status']) => {
  switch (status) {
    case 'excellent': return 'bg-green-100 text-green-800'
    case 'good': return 'bg-blue-100 text-blue-800'
    case 'average': return 'bg-yellow-100 text-yellow-800'
    case 'poor': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status: Property['status']) => {
  switch (status) {
    case 'excellent': return 'Excellent'
    case 'good': return 'Bon'
    case 'average': return 'Moyen'
    case 'poor': return 'Nécessite attention'
    default: return 'Non défini'
  }
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onPropertyClick }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Mes Immeubles</h2>
        <Badge variant="secondary" className="text-sm">
          {properties.length} bien{properties.length > 1 ? 's' : ''}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 truncate">
                        {property.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{property.address}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(property.status)}>
                    {getStatusLabel(property.status)}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <p className="font-medium text-gray-800">{property.type}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Unités:</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-gray-500" />
                        <span className="font-medium text-gray-800">{property.units}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Occupation:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${property.occupancy}%` }}
                          />
                        </div>
                        <span className="font-medium text-gray-800">{property.occupancy}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Revenus/mois:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="font-medium text-green-600">
                          €{property.monthlyRevenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => onPropertyClick(property)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Voir la fiche
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default PropertyList