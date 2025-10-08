import type { PostgrestSingleResponse } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase'
import type { CompanyProfile, CompanyStats } from '@/types/company'

interface CompanyQueryResult {
  id: string
  user_id: string
  name: string
  email: string
  phone: string | null
  address: string | null
  description: string | null
  logo_url: string | null
  delivery_areas: string[] | null
  working_hours: string | null
  created_at: string
  updated_at: string
  total_orders: number
  active_orders: number
  products_count: number
  total_revenue: number
}

export async function fetchCompanyProfileByUserId(userId: string) {
  const query = supabase
    .from('companies_view')
    .select(
      `
        id,
        user_id,
        name,
        email,
        phone,
        address,
        description,
        logo_url,
        delivery_areas,
        working_hours,
        created_at,
        updated_at,
        total_orders,
        active_orders,
        products_count,
        total_revenue
      `,
    )
    .eq('user_id', userId)
    .single()

  const { data, error }: PostgrestSingleResponse<CompanyQueryResult> = await query

  if (error) {
    if (/companies_view/i.test(error.message)) {
      throw new Error('Представление companies_view отсутствует. Создайте его, как описано в docs/entities.md.')
    }

    throw new Error(error.message)
  }

  if (!data) {
    throw new Error('Компания не найдена')
  }

  return mapCompany(data)
}

function mapCompany(data: CompanyQueryResult): { company: CompanyProfile; stats: CompanyStats } {
  return {
    company: {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      email: data.email ?? '',
      phone: data.phone,
      address: data.address,
      description: data.description,
      logoUrl: data.logo_url ?? undefined,
      deliveryAreas: data.delivery_areas ?? [],
      workingHours: data.working_hours ?? undefined,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    },
    stats: {
      totalOrders: data.total_orders,
      activeOrders: data.active_orders,
      productsCount: data.products_count,
      totalRevenue: data.total_revenue,
    },
  }
}
