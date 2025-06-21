import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Settings, Wrench, User, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'

interface UserType {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
}

const userTypes: UserType[] = [
  {
    id: 'proprietaire',
    title: 'Propriétaire',
    description: 'Gérer mes biens immobiliers, locataires et revenus',
    icon: Building2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100'
  },
  {
    id: 'administrateur',
    title: 'Administrateur',
    description: 'Superviser l\'ensemble des opérations et utilisateurs',
    icon: Settings,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100'
  },
  {
    id: 'personnel',
    title: 'Personnel d\'entretien',
    description: 'Gérer les interventions et maintenance des biens',
    icon: Wrench,
    color: 'text-green-600',
    bgColor: 'bg-green-50 hover:bg-green-100'
  },
  {
    id: 'locataire',
    title: 'Locataire',
    description: 'Accéder à mon espace locataire et services',
    icon: User,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 hover:bg-orange-100'
  }
]

function UserSelection() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId)
    setIsAnimating(true)
    
    // Navigate to dashboard after animation
    setTimeout(() => {
      navigate('/app/dashboard', { state: { userType: userId } })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
              <Building2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Gestion Immobilière
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choisissez votre profil pour accéder à votre espace personnalisé
          </p>
        </motion.div>

        {/* User Type Selection Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userTypes.map((userType, index) => {
              const Icon = userType.icon
              const isSelected = selectedUser === userType.id
              
              return (
                <motion.div
                  key={userType.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`
                      cursor-pointer transition-all duration-300 shadow-lg border-2
                      ${isSelected ? 'border-blue-500 shadow-xl' : 'border-transparent hover:shadow-xl'}
                      ${userType.bgColor}
                    `}
                    onClick={() => handleUserSelect(userType.id)}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl ${userType.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                          <Icon className={`w-8 h-8 ${userType.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-slate-800 mb-2">
                            {userType.title}
                          </h3>
                          <p className="text-slate-600 leading-relaxed">
                            {userType.description}
                          </p>
                        </div>
                        <ArrowRight className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                          isSelected ? 'translate-x-1' : ''
                        }`} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Action Button */}
          {selectedUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mt-12"
            >
              <Button 
                size="lg"
                className="px-8 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg"
                onClick={() => handleUserSelect(selectedUser)}
                disabled={isAnimating}
              >
                {isAnimating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connexion en cours...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Accéder à mon espace</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 text-slate-500"
        >
          <p className="text-sm">
            © 2024 Gestion Immobilière - Solution moderne pour la gestion de vos biens
          </p>
        </motion.div>
      </div>

      {/* Loading Overlay */}
      {isAnimating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-blue-600/90 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="text-center text-white">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
            />
            <p className="text-xl font-semibold">Chargement de votre espace...</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default UserSelection