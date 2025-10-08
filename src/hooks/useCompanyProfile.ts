import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { fetchCompanyProfileByUserId } from '@/services/company'
import type { CompanyProfile, CompanyStats } from '@/types/company'

interface UseCompanyProfileOptions {
  userId: string | undefined
  enabled?: boolean
}

interface CompanyProfileResult {
  company: CompanyProfile | undefined
  stats: CompanyStats | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useCompanyProfile({ userId, enabled = true }: UseCompanyProfileOptions): CompanyProfileResult {
  const query = useQuery({
    queryKey: ['company', userId],
    enabled: Boolean(userId) && enabled,
    queryFn: async () => {
      if (!userId) {
        throw new Error('Пользователь не задан')
      }
      return fetchCompanyProfileByUserId(userId)
    },
    staleTime: 1000 * 60 * 5,
  })

  const { company, stats } = useMemo(() => {
    if (!query.data) {
      return { company: undefined, stats: undefined }
    }

    return {
      company: query.data.company,
      stats: query.data.stats,
    }
  }, [query.data])

  return {
    company,
    stats,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as Error) ?? null,
    refetch: async () => {
      const result = await query.refetch()
      if (result.error) {
        throw result.error
      }
    },
  }
}
