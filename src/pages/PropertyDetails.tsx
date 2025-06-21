import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Separator } from '../components/ui/separator'
import { 
  FiArrowLeft, 
  FiEdit, 
  FiTrash2, 
  FiHome, 
  FiCamera, 
  FiFileText, 
  FiTool, 
  FiUpload, 
  FiDollarSign,
  FiMapPin
} from 'react-icons/fi'
import { useProperties } from '../context/PropertyContext'
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '../components/ui/alert-dialog'

function PropertyDetails() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { getPropertyById, deleteProperty } = useProperties()

  const property = getPropertyById(id || '')

  if (!property) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Immeuble non trouvé</h1>
        <Button onClick={() => navigate('/app/properties')} className="mt-4">
          Retour à la liste
        </Button>
      </div>
    )
  }

  const handleDelete = () => {
    deleteProperty(property.id)
    navigate('/app/properties')
  }

  // Extraire le montant du revenu pour l'affichage
  const revenueAmount = parseInt(property.revenue.replace(/[^0-9]/g, '')) || 0

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/app/properties')}
            className="h-10 w-10 rounded-full"
          >
            <FiArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{property.name}</h1>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <FiMapPin className="w-4 h-4" />
              <span>{property.address}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate(`/app/properties/edit/${property.id}`)}>
            <FiEdit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <FiTrash2 className="w-4 h-4 mr-2" />
                Supprimer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet immeuble ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Toutes les données associées à l'immeuble "{property.name}" seront définitivement supprimées.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </motion.div>

      {/* Property Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FiHome className="w-5 h-5 text-blue-600" />
                Informations générales
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div><p className="text-sm text-gray-500">Type</p><p>{property.type}</p></div>
              <div><p className="text-sm text-gray-500">Année construction</p><p>{property.yearBuilt || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Unités</p><p>{property.units}</p></div>
              <div><p className="text-sm text-gray-500">Étages</p><p>{property.floors || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Superficie</p><p>{property.totalArea || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Statut</p><p className="capitalize">{property.status}</p></div>
            </CardContent>
          </Card>

          {/* Technical Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FiTool className="w-5 h-5 text-orange-600" />
                Dossier technique
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div><p className="text-sm text-gray-500">Dernier entretien</p><p>{property.lastMaintenance || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Chauffage</p><p>{property.heatingType || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Toiture</p><p>{property.roofType || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Réfection toiture</p><p>{property.roofDate || 'N/A'}</p></div>
            </CardContent>
          </Card>

          {/* Administrative Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FiFileText className="w-5 h-5 text-green-600" />
                Données administratives
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div><p className="text-sm text-gray-500">Cadastre</p><p>{property.cadastre || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Propriétaires</p><p>{property.owners || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Gestionnaire</p><p>{property.manager || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Type fiscal</p><p>{property.fiscalType || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Valeur municipale</p><p>{property.municipalValue || 'N/A'}</p></div>
              <div><p className="text-sm text-gray-500">Valeur marchande</p><p>{property.marketValue || 'N/A'}</p></div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FiDollarSign className="w-5 h-5 text-purple-600" />
                Résumé financier
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Revenus mensuels</span>
                <span className="font-bold text-green-600">$ {revenueAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taux d'occupation</span>
                <span className="font-bold text-blue-600">{property.occupancy}%</span>
              </div>
              <Separator />
              <Button className="w-full" onClick={() => navigate('/app/finance')}>
                Voir les détails financiers
              </Button>
            </CardContent>
          </Card>

          {/* Media */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FiCamera className="w-5 h-5 text-red-600" />
                Médias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-lg mb-4">
                {/* Placeholder for an image carousel */}
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop" 
                  alt={property.name} 
                  className="w-full h-full object-cover rounded-lg" 
                />
              </div>
              <Button variant="outline" className="w-full">Voir la galerie</Button>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FiUpload className="w-5 h-5 text-indigo-600" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {property.documents && property.documents.slice(0, 2).map((doc, index) => (
                  <li key={index} className="flex items-center justify-between text-sm">
                    <span className="truncate">{doc.name}</span>
                    <Button size="sm" variant="ghost">Voir</Button>
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate(`/app/properties/documents/${property.id}`)}
              >
                Voir tous les documents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails