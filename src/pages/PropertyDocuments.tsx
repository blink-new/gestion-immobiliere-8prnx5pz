import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'
import { Badge } from '../components/ui/badge'
import { 
  FiArrowLeft, 
  FiSearch, 
  FiDownload, 
  FiEye, 
  FiTrash2, 
  FiUpload,
  FiFile,
  FiFileText
} from 'react-icons/fi'
import { Building2, FileText } from 'lucide-react'
import { useProperties } from '../context/PropertyContext'
import { useState } from 'react'

function PropertyDocuments() {
  const { id } = useParams<{ id: string }>()
  const { getPropertyById } = useProperties()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const property = getPropertyById(id || '')

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Propriété introuvable</p>
          <Button onClick={() => navigate('/app/properties')} className="mt-4">
            Retour aux propriétés
          </Button>
        </div>
      </div>
    )
  }

  const getDocumentIcon = (type: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'PDF': <FiFileText className="w-5 h-5 text-red-600" />,
      'ZIP': <FiFile className="w-5 h-5 text-yellow-600" />,
      'DOC': <FiFileText className="w-5 h-5 text-blue-600" />,
      'IMG': <FiFile className="w-5 h-5 text-green-600" />
    }
    return iconMap[type] || <FiFile className="w-5 h-5 text-gray-600" />
  }

  const documents = property.documents || []
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6"
      >
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(`/app/properties/view/${id}`)}
          >
            <FiArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Documents - {property.name}</h1>
            <p className="mt-1 text-gray-600">
              Gérez tous les documents relatifs à ce bien immobilier
            </p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FiUpload className="w-4 h-4 mr-2" />
          Ajouter un document
        </Button>
      </motion.div>

      {/* Property Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{property.name}</h3>
                <p className="text-gray-600">{property.address}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total documents</p>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Document Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Documents légaux</p>
                <p className="text-2xl font-bold mt-1">
                  {documents.filter(d => d.name.includes('Acte') || d.name.includes('Certificat')).length}
                </p>
              </div>
              <FiFileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Plans & Dessins</p>
                <p className="text-2xl font-bold mt-1">
                  {documents.filter(d => d.name.includes('Plans') || d.name.includes('plan')).length}
                </p>
              </div>
              <FiFile className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contrats</p>
                <p className="text-2xl font-bold mt-1">
                  {documents.filter(d => d.name.includes('Bail') || d.name.includes('Contrat')).length}
                </p>
              </div>
              <FiFileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Autres</p>
                <p className="text-2xl font-bold mt-1">
                  {documents.filter(d => 
                    !d.name.includes('Acte') && 
                    !d.name.includes('Certificat') && 
                    !d.name.includes('Plans') &&
                    !d.name.includes('Bail') &&
                    !d.name.includes('Contrat')
                  ).length}
                </p>
              </div>
              <FiFile className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6 relative"
      >
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Rechercher un document..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      {/* Documents Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Tous les documents</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Nom du document</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead>Date d'ajout</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        Aucun document trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDocuments.map((document, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                            {getDocumentIcon(document.type || 'PDF')}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {document.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {document.size || 'N/A'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {document.date || new Date().toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FiEye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FiDownload className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                              <FiTrash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default PropertyDocuments