import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon, divIcon, Map as LeafletMap } from 'leaflet'
import { motion } from 'framer-motion'
import { Building2, MapPin } from 'lucide-react'
import { Button } from './ui/button'
import 'leaflet/dist/leaflet.css'

// Import des images par défaut de Leaflet
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'



// Icône personnalisée pour les immeubles
const propertyIcon = divIcon({
  className: 'custom-div-icon',
  html: `
    <div style="
      background: #2563eb; 
      border: 3px solid white; 
      border-radius: 50%; 
      width: 40px; 
      height: 40px; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    ">
      <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
        <path d="M19 4h-4V2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM9 3h4v1H9V3zm-4 17V6h2v14H5zm12 0h-8V6h8v14z"/>
        <rect x="7" y="8" width="2" height="2"/>
        <rect x="11" y="8" width="2" height="2"/>
        <rect x="15" y="8" width="2" height="2"/>
        <rect x="7" y="12" width="2" height="2"/>
        <rect x="11" y="12" width="2" height="2"/>
        <rect x="15" y="12" width="2" height="2"/>
      </svg>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
})

export interface Property {
  id: string
  name: string
  address: string
  type: string
  units: number
  occupancy: number
  monthlyRevenue: number
  lat: number
  lng: number
  status: 'excellent' | 'good' | 'average' | 'poor'
}

interface PropertyMapProps {
  properties: Property[]
  onPropertyClick: (property: Property) => void
  center?: [number, number]
  zoom?: number
}

const PropertyMap: React.FC<PropertyMapProps> = ({ 
  properties, 
  onPropertyClick, 
  center = [48.8566, 2.3522], // Paris par défaut
  zoom = 12 
}) => {
  const mapRef = useRef<LeafletMap | null>(null)

  useEffect(() => {
    // Correction du bug d'affichage des icônes de Leaflet
    delete (Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl
    Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg border border-gray-200"
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.lat, property.lng]}
            icon={propertyIcon}
            eventHandlers={{
              click: () => onPropertyClick(property)
            }}
          >
            <Popup>
              <div className="min-w-[250px] p-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {property.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{property.address}</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{property.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Unités:</span>
                        <span className="font-medium">{property.units}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Occupation:</span>
                        <span className="font-medium">{property.occupancy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenus:</span>
                        <span className="font-medium text-green-600">
                          €{property.monthlyRevenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="mt-3 w-full"
                      onClick={() => onPropertyClick(property)}
                    >
                      Voir la fiche
                    </Button>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </motion.div>
  )
}

export default PropertyMap