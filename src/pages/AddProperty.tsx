import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { useProperties } from '../context/PropertyContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { 
  FiArrowLeft, 
  FiSave, 
  FiHome, 
  FiCamera, 
  FiFileText, 
  FiTool, 
  FiUpload, 
  FiDollarSign,
  FiMapPin,
  FiImage,
  FiVideo,
  FiX
} from 'react-icons/fi'

interface FormData {
  name: string
  address: string
  type: string
  units: string
  status: 'loué' | 'disponible' | 'maintenance'
  occupancy: string
  revenue: string
  yearBuilt: string
  floors: string
  totalArea: string
  cadastre: string
  owners: string
  manager: string
  fiscalType: string
  municipalValue: string
  marketValue: string
  lastMaintenance: string
  heatingType: string
  roofType: string
  roofDate: string
}

function AddProperty() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { addProperty, updateProperty, getPropertyById } = useProperties()
  const [activeTab, setActiveTab] = useState('general')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; type: string; size: string }>>([])
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    type: '',
    units: '',
    status: 'disponible',
    occupancy: '0',
    revenue: '0',
    yearBuilt: '',
    floors: '',
    totalArea: '',
    cadastre: '',
    owners: '',
    manager: '',
    fiscalType: '',
    municipalValue: '',
    marketValue: '',
    lastMaintenance: '',
    heatingType: '',
    roofType: '',
    roofDate: ''
  })

  useEffect(() => {
    if (id) {
      const property = getPropertyById(id)
      if (property) {
        setFormData({
          name: property.name,
          address: property.address,
          type: property.type,
          units: property.units.toString(),
          status: property.status,
          occupancy: property.occupancy.toString(),
          revenue: property.revenue.replace(/[^0-9]/g, ''),
          yearBuilt: property.yearBuilt || '',
          floors: property.floors?.toString() || '',
          totalArea: property.totalArea || '',
          cadastre: property.cadastre || '',
          owners: property.owners || '',
          manager: property.manager || '',
          fiscalType: property.fiscalType || '',
          municipalValue: property.municipalValue?.replace(/[^0-9]/g, '') || '',
          marketValue: property.marketValue?.replace(/[^0-9]/g, '') || '',
          lastMaintenance: property.lastMaintenance || '',
          heatingType: property.heatingType || '',
          roofType: property.roofType || '',
          roofDate: property.roofDate || ''
        })
      }
    }
  }, [id, getPropertyById])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Formatter les données pour correspondre au type Property
    const propertyData = {
      name: formData.name,
      address: formData.address,
      type: formData.type,
      units: parseInt(formData.units) || 1,
      status: formData.status,
      occupancy: parseInt(formData.occupancy) || 0,
      revenue: `$ ${parseInt(formData.revenue || '0').toLocaleString()}`,
      yearBuilt: formData.yearBuilt,
      floors: parseInt(formData.floors) || undefined,
      totalArea: formData.totalArea,
      cadastre: formData.cadastre,
      owners: formData.owners,
      manager: formData.manager,
      fiscalType: formData.fiscalType,
      municipalValue: formData.municipalValue ? `$ ${parseInt(formData.municipalValue).toLocaleString()}` : undefined,
      marketValue: formData.marketValue ? `$ ${parseInt(formData.marketValue).toLocaleString()}` : undefined,
      lastMaintenance: formData.lastMaintenance,
      heatingType: formData.heatingType,
      roofType: formData.roofType,
      roofDate: formData.roofDate,
      documents: uploadedFiles.map(file => ({
        name: file.name,
        url: '#',
        type: file.type.includes('pdf') ? 'PDF' : 'IMG',
        size: file.size,
        date: new Date().toISOString().split('T')[0]
      }))
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (id) {
      updateProperty(id, propertyData)
    } else {
      addProperty(propertyData)
    }
    
    setIsSubmitting(false)
    navigate('/app/properties')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const newFiles = files.map(file => ({
      name: file.name,
      type: file.type,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

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
            <h1 className="text-3xl font-bold text-gray-800">
              {id ? 'Modifier la fiche' : 'Nouvelle fiche d\'immeuble'}
            </h1>
            <p className="text-gray-600">
              {id ? 'Modifiez les informations de votre bien' : 'Créez une fiche complète pour votre bien immobilier'}
            </p>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.name || !formData.address}
          className="bg-blue-600 hover:bg-blue-700 px-6"
        >
          <FiSave className="w-4 h-4 mr-2" />
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </motion.div>

      {/* Form Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white border shadow-sm">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <FiHome className="w-4 h-4" />
              <span className="hidden sm:inline">Général</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <FiFileText className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-2">
              <FiTool className="w-4 h-4" />
              <span className="hidden sm:inline">Technique</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FiUpload className="w-4 h-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <FiDollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Finance</span>
            </TabsTrigger>
          </TabsList>

          {/* Informations générales */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiHome className="w-5 h-5 text-blue-600" />
                  Informations générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de l'immeuble *</Label>
                    <Input
                      id="name"
                      placeholder="ex: Immeuble Saint-Laurent"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de propriété *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Immeuble">Immeuble</SelectItem>
                        <SelectItem value="Maison">Maison</SelectItem>
                        <SelectItem value="Appartement">Appartement</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Industriel">Industriel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse complète *</Label>
                  <Input
                    id="address"
                    placeholder="123 Rue Principale, Ville"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="yearBuilt">Année de construction</Label>
                    <Input
                      id="yearBuilt"
                      type="number"
                      placeholder="2020"
                      value={formData.yearBuilt}
                      onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="units">Nombre d'unités</Label>
                    <Input
                      id="units"
                      type="number"
                      placeholder="12"
                      value={formData.units}
                      onChange={(e) => handleInputChange('units', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floors">Nombre d'étages</Label>
                    <Input
                      id="floors"
                      type="number"
                      placeholder="3"
                      value={formData.floors}
                      onChange={(e) => handleInputChange('floors', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value as 'loué' | 'disponible' | 'maintenance')}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="loué">Loué</SelectItem>
                        <SelectItem value="disponible">Disponible</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupancy">Taux d'occupation (%)</Label>
                    <Input
                      id="occupancy"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="100"
                      value={formData.occupancy}
                      onChange={(e) => handleInputChange('occupancy', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalArea">Superficie totale</Label>
                    <Input
                      id="totalArea"
                      placeholder="1200 m²"
                      value={formData.totalArea}
                      onChange={(e) => handleInputChange('totalArea', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Données administratives */}
          <TabsContent value="admin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiFileText className="w-5 h-5 text-green-600" />
                  Données administratives
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cadastre">Numéro de lot / Cadastre</Label>
                    <Input
                      id="cadastre"
                      placeholder="123-456-789"
                      value={formData.cadastre}
                      onChange={(e) => handleInputChange('cadastre', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owners">Propriétaire(s) inscrit(s)</Label>
                    <Input
                      id="owners"
                      placeholder="Jean Dupont, Marie Martin"
                      value={formData.owners}
                      onChange={(e) => handleInputChange('owners', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="manager">Gestionnaire associé</Label>
                    <Input
                      id="manager"
                      placeholder="Société de gestion ABC"
                      value={formData.manager}
                      onChange={(e) => handleInputChange('manager', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fiscalType">Type de propriété fiscale</Label>
                    <Select value={formData.fiscalType} onValueChange={(value) => handleInputChange('fiscalType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Résidentiel">Résidentiel</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Industriel">Industriel</SelectItem>
                        <SelectItem value="Mixte">Mixte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="municipalValue">Valeur municipale ($)</Label>
                    <Input
                      id="municipalValue"
                      type="number"
                      placeholder="850000"
                      value={formData.municipalValue}
                      onChange={(e) => handleInputChange('municipalValue', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketValue">Valeur marchande ($)</Label>
                    <Input
                      id="marketValue"
                      type="number"
                      placeholder="950000"
                      value={formData.marketValue}
                      onChange={(e) => handleInputChange('marketValue', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dossier technique */}
          <TabsContent value="technical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiTool className="w-5 h-5 text-orange-600" />
                  Dossier technique
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="lastMaintenance">Date du dernier entretien</Label>
                    <Input
                      id="lastMaintenance"
                      type="date"
                      value={formData.lastMaintenance}
                      onChange={(e) => handleInputChange('lastMaintenance', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heatingType">Type de chauffage</Label>
                    <Select value={formData.heatingType} onValueChange={(value) => handleInputChange('heatingType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Électrique">Électrique</SelectItem>
                        <SelectItem value="Gaz naturel">Gaz naturel</SelectItem>
                        <SelectItem value="Mazout">Mazout</SelectItem>
                        <SelectItem value="Pompe à chaleur">Pompe à chaleur</SelectItem>
                        <SelectItem value="Bois">Bois</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="roofType">Type de toiture</Label>
                    <Select value={formData.roofType} onValueChange={(value) => handleInputChange('roofType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asphalte">Asphalte</SelectItem>
                        <SelectItem value="Métal">Métal</SelectItem>
                        <SelectItem value="Tuiles">Tuiles</SelectItem>
                        <SelectItem value="Ardoise">Ardoise</SelectItem>
                        <SelectItem value="Membrane EPDM">Membrane EPDM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roofDate">Date de réfection de la toiture</Label>
                    <Input
                      id="roofDate"
                      type="date"
                      value={formData.roofDate}
                      onChange={(e) => handleInputChange('roofDate', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiUpload className="w-5 h-5 text-indigo-600" />
                  Documents téléversables
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Glissez vos documents ici ou cliquez pour sélectionner</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="documents"
                  />
                  <Button variant="outline" onClick={() => document.getElementById('documents')?.click()}>
                    Sélectionner des documents
                  </Button>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Fichiers téléversés</h3>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded">
                              <FiFileText className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-gray-500">{file.size}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiX className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Informations financières */}
          <TabsContent value="financial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiDollarSign className="w-5 h-5 text-green-600" />
                  Informations financières
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    ℹ️ Ces informations sont facultatives et peuvent être complétées ultérieurement.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="revenue">Revenus mensuels ($)</Label>
                    <Input
                      id="revenue"
                      type="number"
                      placeholder="12500"
                      value={formData.revenue}
                      onChange={(e) => handleInputChange('revenue', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Bottom Spacer */}
      <div className="h-20" />
    </div>
  )
}

export default AddProperty