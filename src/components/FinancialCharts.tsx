import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from './ui/chart'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart as PieChartIcon,
  BarChart3,
  LineChart as LineChartIcon
} from 'lucide-react'

// Données financières d'exemple
const monthlyRevenueData = [
  { month: 'Jan', revenus: 15200, depenses: 8500, profit: 6700 },
  { month: 'Fév', revenus: 15800, depenses: 9200, profit: 6600 },
  { month: 'Mar', revenus: 16100, depenses: 8800, profit: 7300 },
  { month: 'Avr', revenus: 15900, depenses: 9500, profit: 6400 },
  { month: 'Mai', revenus: 16500, depenses: 8900, profit: 7600 },
  { month: 'Jun', revenus: 16800, depenses: 9100, profit: 7700 }
]

const expenseBreakdown = [
  { name: 'Maintenance', value: 3200, color: '#FF6B6B' },
  { name: 'Assurance', value: 1800, color: '#4ECDC4' },
  { name: 'Taxes foncières', value: 2100, color: '#45B7D1' },
  { name: 'Frais de gestion', value: 1500, color: '#96CEB4' },
  { name: 'Autres', value: 1000, color: '#FECA57' }
]

const rentabilityData = [
  { property: 'Champs-Élysées', rentabilite: 8.5, revenus: 6400 },
  { property: 'Montmartre', rentabilite: 7.2, revenus: 2800 },
  { property: 'Le Marais', rentabilite: 6.8, revenus: 4200 },
  { property: 'Rivoli', rentabilite: 5.9, revenus: 7800 },
  { property: 'Saint-Germain', rentabilite: 9.1, revenus: 8900 }
]

const chartConfig = {
  revenus: {
    label: 'Revenus',
    color: '#10B981'
  },
  depenses: {
    label: 'Dépenses', 
    color: '#EF4444'
  },
  profit: {
    label: 'Profit',
    color: '#3B82F6'
  },
  rentabilite: {
    label: 'Rentabilité (%)',
    color: '#8B5CF6'
  }
}

interface FinancialChartsProps {
  onChartClick?: () => void
}

const FinancialCharts: React.FC<FinancialChartsProps> = ({ onChartClick }) => {
  const navigate = useNavigate()

  const handleChartClick = () => {
    if (onChartClick) {
      onChartClick()
    } else {
      navigate('/app/finance')
    }
  }

  const totalRevenues = monthlyRevenueData.reduce((sum, item) => sum + item.revenus, 0)
  const totalExpenses = monthlyRevenueData.reduce((sum, item) => sum + item.depenses, 0)
  const totalProfit = totalRevenues - totalExpenses
  const avgRentability = rentabilityData.reduce((sum, item) => sum + item.rentabilite, 0) / rentabilityData.length

  return (
    <div className="space-y-6">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={handleChartClick}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenus totaux</p>
                  <p className="text-2xl font-bold text-green-600">€{totalRevenues.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12.5%</span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={handleChartClick}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Dépenses totales</p>
                  <p className="text-2xl font-bold text-red-600">€{totalExpenses.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-sm text-red-600">-3.2%</span>
                  </div>
                </div>
                <div className="p-3 bg-red-100 rounded-xl">
                  <PieChartIcon className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={handleChartClick}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profit net</p>
                  <p className="text-2xl font-bold text-blue-600">€{totalProfit.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                    <span className="text-sm text-blue-600">+18.7%</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={handleChartClick}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rentabilité moy.</p>
                  <p className="text-2xl font-bold text-purple-600">{avgRentability.toFixed(1)}%</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-purple-500 mr-1" />
                    <span className="text-sm text-purple-600">+2.1%</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <LineChartIcon className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={handleChartClick}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Revenus vs Dépenses</CardTitle>
              <Badge variant="outline">6 derniers mois</Badge>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="revenus" fill="var(--color-revenus)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="depenses" fill="var(--color-depenses)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Expense Breakdown Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={handleChartClick}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Répartition des dépenses</CardTitle>
              <Badge variant="outline">Ce mois</Badge>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length > 0) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white p-3 border rounded-lg shadow-lg">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm text-gray-600">€{data.value.toLocaleString()}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profit Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={handleChartClick}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Évolution du profit</CardTitle>
              <Badge variant="outline" className="text-green-600 border-green-600">+18.7%</Badge>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="var(--color-profit)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--color-profit)', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: 'var(--color-profit)', strokeWidth: 2 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rentability by Property */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={handleChartClick}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Rentabilité par bien</CardTitle>
              <Badge variant="outline">Performance</Badge>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={rentabilityData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 10]} />
                  <YAxis dataKey="property" type="category" width={100} />
                  <ChartTooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length > 0) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white p-3 border rounded-lg shadow-lg">
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-purple-600">Rentabilité: {data.rentabilite}%</p>
                            <p className="text-sm text-gray-600">Revenus: €{data.revenus.toLocaleString()}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="rentabilite" fill="var(--color-rentabilite)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default FinancialCharts