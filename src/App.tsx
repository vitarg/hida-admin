import { QueryClientProvider } from '@tanstack/react-query'

import { AppRouter } from '@/router/AppRouter'
import { AuthProvider } from '@/stores/auth-context'
import { queryClient } from '@/lib/query-client'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
