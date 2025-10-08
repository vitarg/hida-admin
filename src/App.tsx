import { AppRouter } from '@/router/AppRouter'
import { AuthProvider } from '@/stores/auth-context'

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
