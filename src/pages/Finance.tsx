import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import FinancialCharts from '../components/FinancialCharts'
import { 
  Download, 
  FileText, 
  Calculator,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

// Données détaillées pour la page Finance
const recentTransactions = [
  {
    id: 1,
    date: '2024-01-15',
    type: 'revenue',
    description: 'Loyer - Résidence Les Champs (Apt 3B)',
    amount: 1600,
    status: 'completed'
  },
  {
    id: 2,
    date: '2024-01-14',
    type: 'expense',
    description: 'Maintenance plomberie - Villa Montmartre',
    amount: -350,
    status: 'completed'
  },
  {
    id: 3,
    date: '2024-01-12',
    type: 'revenue',
    description: 'Loyer - Tour Moderne (Bureau 101)',
    amount: 2200,
    status: 'pending'
  },
  {
    id: 4,
    date: '2024-01-10',
    type: 'expense',
    description: 'Assurance habitation - Le Marais',
    amount: -120,
    status: 'completed'
  },
  {
    id: 5,
    date: '2024-01-08',
    type: 'revenue',
    description: 'Loyer - Résidence Saint-Germain',
    amount: 1890,
    status: 'completed'
  }
]

const upcomingPayments = [
  {
    id: 1,
    date: '2024-01-25',
    description: 'Taxe foncière - Tous les biens',
    amount: 2100,
    priority: 'high'
  },
  {
    id: 2,
    date: '2024-01-30',
    description: 'Maintenance préventive - Chaudières',
    amount: 850,
    priority: 'medium'
  },
  {
    id: 3,
    date: '2024-02-01',
    description: 'Renouvellement assurance',
    amount: 1200,
    priority: 'high'
  }
]

function Finance() {
  const getTransactionColor = (type: string) => {
    return type === 'revenue' ? 'text-green-600' : 'text-red-600'
  }

  const getStatusIcon = (status: string) => {
    return status === 'completed' ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <AlertTriangle className="w-4 h-4 text-yellow-500" />
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Finances</h1>
          <p className="mt-2 text-gray-600">
            Gestion complète des revenus, dépenses et analyses financières
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
          <Button className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Rapport mensuel
          </Button>
        </div>
      </motion.div>

      {/* Financial Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FinancialCharts />
      </motion.div>

      {/* Detailed Financial Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Paiements à venir
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Analyses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Transactions récentes</span>
                  <Badge variant="outline">{recentTransactions.length} transactions</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {getStatusIcon(transaction.status)}
                        <div>
                          <p className="font-medium text-gray-800">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(transaction.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${getTransactionColor(transaction.type)}`}>
                          {transaction.amount > 0 ? '+' : ''}€{Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}
                        >
                          {transaction.status === 'completed' ? 'Terminé' : 'En attente'}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Paiements à venir</span>
                  <Badge variant="outline">{upcomingPayments.length} paiements</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingPayments.map((payment, index) => (
                    <motion.div
                      key={payment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800">
                            {payment.description}
                          </p>
                          <p className="text-sm text-gray-600">
                            Échéance: {new Date(payment.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-red-600">
                          -€{payment.amount.toLocaleString()}
                        </p>
                        <Badge className={getPriorityColor(payment.priority)}>
                          {payment.priority === 'high' ? 'Priorité haute' : 
                           payment.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Performance mensuelle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cash-flow moyen</span>
                      <span className="font-bold text-green-600">+€7,100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">ROI moyen</span>
                      <span className="font-bold text-blue-600">7.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Taux d'occupation</span>
                      <span className="font-bold text-purple-600">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Croissance annuelle</span>
                      <span className="font-bold text-green-600">+12.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-blue-600" />
                    Ratios financiers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Ratio dépenses/revenus</span>
                      <span className="font-bold text-gray-800">54%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Marge bénéficiaire</span>
                      <span className="font-bold text-green-600">46%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Coût de maintenance</span>
                      <span className="font-bold text-orange-600">18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Rentabilité nette</span>
                      <span className="font-bold text-blue-600">8.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

export default Finance