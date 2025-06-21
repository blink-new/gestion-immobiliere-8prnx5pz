import { createContext, useState, useContext, ReactNode } from 'react';

// Définition du type pour une propriété
export interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  units: number;
  status: 'loué' | 'disponible' | 'maintenance';
  occupancy: number;
  revenue: string;
  yearBuilt?: string;
  floors?: number;
  totalArea?: string;
  cadastre?: string;
  owners?: string;
  manager?: string;
  fiscalType?: string;
  municipalValue?: string;
  marketValue?: string;
  lastMaintenance?: string;
  heatingType?: string;
  roofType?: string;
  roofDate?: string;
  documents?: Array<{ name: string; url: string; type?: string; size?: string; date?: string }>;
}

// Données d'exemple avec des prix en dollars
const initialProperties: Property[] = [
  {
    id: '1',
    name: 'Résidence Les Jardins',
    address: '123 Rue Principale, Paris',
    type: 'Immeuble',
    units: 12,
    status: 'loué',
    occupancy: 100,
    revenue: '$ 12,500',
    yearBuilt: '2015',
    floors: 5,
    totalArea: '1200 m²',
    cadastre: 'AB-123',
    owners: 'SCI Paris Invest',
    manager: 'GestionPro',
    fiscalType: 'Résidentiel',
    municipalValue: '$ 2,500,000',
    marketValue: '$ 2,800,000',
    lastMaintenance: '2023-10-15',
    heatingType: 'Gaz naturel',
    roofType: 'Ardoise',
    roofDate: '2018-05-20',
    documents: [
      { name: 'Acte d\'achat.pdf', url: '#', type: 'PDF', size: '2.3 MB', date: '2015-03-15' },
      { name: 'Certificat de localisation.pdf', url: '#', type: 'PDF', size: '1.8 MB', date: '2015-03-10' },
      { name: 'Plans architecturaux.pdf', url: '#', type: 'PDF', size: '5.2 MB', date: '2015-02-20' },
      { name: 'Rapport d\'inspection 2023.pdf', url: '#', type: 'PDF', size: '3.1 MB', date: '2023-10-15' },
    ],
  },
  {
    id: '2',
    name: 'Villa Moderne',
    address: '45 Avenue des Fleurs, Lyon',
    type: 'Maison',
    units: 1,
    status: 'disponible',
    occupancy: 0,
    revenue: '$ 0',
    yearBuilt: '2020',
    floors: 2,
    totalArea: '250 m²',
    cadastre: 'CD-456',
    owners: 'Jean Dupont',
    manager: 'Auto-géré',
    fiscalType: 'Résidentiel',
    municipalValue: '$ 450,000',
    marketValue: '$ 500,000',
    lastMaintenance: '2024-01-10',
    heatingType: 'Pompe à chaleur',
    roofType: 'Tuiles',
    roofDate: '2020-06-15',
    documents: [
      { name: 'Contrat de vente.pdf', url: '#', type: 'PDF', size: '1.5 MB', date: '2020-08-20' },
      { name: 'Certificat énergétique.pdf', url: '#', type: 'PDF', size: '800 KB', date: '2020-07-15' },
    ],
  },
  {
    id: '3',
    name: 'Appartement Centre-Ville',
    address: '78 Boulevard Central, Marseille',
    type: 'Appartement',
    units: 1,
    status: 'loué',
    occupancy: 100,
    revenue: '$ 1,850',
    yearBuilt: '2010',
    floors: 1,
    totalArea: '85 m²',
    cadastre: 'EF-789',
    owners: 'Marie Martin',
    manager: 'Agence Immobilière Plus',
    fiscalType: 'Résidentiel',
    municipalValue: '$ 280,000',
    marketValue: '$ 320,000',
    lastMaintenance: '2023-09-20',
    heatingType: 'Électrique',
    roofType: 'N/A',
    roofDate: 'N/A',
    documents: [
      { name: 'Bail de location.pdf', url: '#', type: 'PDF', size: '500 KB', date: '2023-06-01' },
      { name: 'État des lieux.pdf', url: '#', type: 'PDF', size: '1.2 MB', date: '2023-06-01' },
      { name: 'Règlement de copropriété.pdf', url: '#', type: 'PDF', size: '2.8 MB', date: '2010-11-30' },
    ],
  },
  {
    id: '4',
    name: 'Immeuble Commercial',
    address: '56 Rue du Commerce, Toulouse',
    type: 'Commercial',
    units: 6,
    status: 'maintenance',
    occupancy: 83,
    revenue: '$ 8,200',
    yearBuilt: '2005',
    floors: 3,
    totalArea: '800 m²',
    cadastre: 'GH-012',
    owners: 'Société Commerciale XYZ',
    manager: 'Property Management Pro',
    fiscalType: 'Commercial',
    municipalValue: '$ 1,800,000',
    marketValue: '$ 2,100,000',
    lastMaintenance: '2024-01-05',
    heatingType: 'Central',
    roofType: 'Membrane EPDM',
    roofDate: '2019-04-10',
    documents: [
      { name: 'Baux commerciaux.zip', url: '#', type: 'ZIP', size: '15.4 MB', date: '2023-12-01' },
      { name: 'Assurance immeuble.pdf', url: '#', type: 'PDF', size: '1.1 MB', date: '2024-01-01' },
      { name: 'Factures de maintenance.pdf', url: '#', type: 'PDF', size: '3.5 MB', date: '2024-01-05' },
    ],
  }
];

// Définition du type pour le contexte
interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: string, updatedProperty: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getPropertyById: (id: string) => Property | undefined;
}

// Création du contexte
const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

// Fournisseur de contexte
export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  const addProperty = (property: Omit<Property, 'id'>) => {
    const newProperty = { ...property, id: Date.now().toString() };
    setProperties(prev => [...prev, newProperty]);
  };

  const updateProperty = (id: string, updatedProperty: Partial<Property>) => {
    setProperties(prev => 
      prev.map(p => (p.id === id ? { ...p, ...updatedProperty } : p))
    );
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const getPropertyById = (id: string) => {
    return properties.find(p => p.id === id);
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, updateProperty, deleteProperty, getPropertyById }}>
      {children}
    </PropertyContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};