export interface CompanyProfile {
  id: string
  userId?: string
  name: string
  email: string
  phone?: string | null
  address?: string | null
  description?: string | null
  logoUrl?: string | null
  deliveryAreas?: string[]
  workingHours?: string
  createdAt?: string
  updatedAt?: string
}

export interface CompanyStats {
  totalOrders: number
  activeOrders: number
  productsCount: number
  totalRevenue: number
}
