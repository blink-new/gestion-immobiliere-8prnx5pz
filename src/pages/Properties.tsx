import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'
import { Badge } from '../components/ui/badge'
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye, FiDollarSign } from 'react-icons/fi'
import { Building2 } from 'lucide-react'
import { useState } from 'react'
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
import { useProperties } from '../context/PropertyContext'

function Properties() {
  const { properties, deleteProperty } = useProperties()
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusBadge = (status: string) => {
    const styles = {
      'loué': 'bg-green-100 text-green-700',
      'disponible': 'bg-blue-100 text-blue-700',
      'maintenance': 'bg-orange-100 text-orange-700'
    }
    
    return (
      <Badge className={`${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700'} border-0`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    deleteProperty(id)
  }

  const filteredProperties = properties.filter(property => 
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculer le revenu total à partir des revenus formatés
  const totalRevenue = properties.reduce((sum, property) => {
    const revenue = parseInt(property.revenue.replace(/[^0-9]/g, '')) || 0
    return sum + revenue
  }, 0)

  // Calculer l'occupation moyenne
  const averageOccupancy = properties.length > 0 
    ? Math.round(properties.reduce((sum, property) => sum + property.occupancy, 0) / properties.length)
    : 0

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des biens</h1>
          <p className="mt-2 text-gray-600">
            Liste de vos immeubles et appartements
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/app/properties/add')}>
          <FiPlus className="w-4 h-4 mr-2" />
          Ajouter un bien
        </Button>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6 relative"
      >
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Rechercher un bien par nom ou adresse..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      {/* Properties Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6"
      >
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom du bien</TableHead>
                    <TableHead>Adresse</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-center">Unités</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-center">Occupation</TableHead>
                    <TableHead className="text-right">Revenus/mois</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((property, index) => (
                    <motion.tr
                      key={property.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <Building2 className="w-4 h-4 text-blue-600" />
                          </div>
                          <span>{property.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{property.address}</TableCell>
                      <TableCell>{property.type}</TableCell>
                      <TableCell className="text-center">{property.units}</TableCell>
                      <TableCell>{getStatusBadge(property.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${property.occupancy}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{property.occupancy}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {property.revenue}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/app/properties/view/${property.id}`)}>
                            <FiEye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/app/properties/edit/${property.id}`)}>
                            <FiEdit2 className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                                <FiTrash2 className="w-4 h-4" />
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
                                <AlertDialogAction onClick={() => handleDelete(property.id)} className="bg-red-600 hover:bg-red-700">
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total des biens</p>
                  <p className="text-2xl font-bold mt-1">{properties.length}</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taux d'occupation moyen</p>
                  <p className="text-2xl font-bold mt-1">{averageOccupancy}%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">↑</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Revenus totaux/mois</p>
                  <p className="text-2xl font-bold mt-1">$ {totalRevenue.toLocaleString()}</p>
                </div>
                <FiDollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Properties