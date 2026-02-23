import { Toaster } from 'sonner'
import { AuthProvider, Context } from './context/AuthContext'
import { AppRouter } from './routes/AppRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { setupInterceptors } from './services/authInterceptor'

const queryClient = new QueryClient()

function App() {
  const context = useContext(Context)

  useEffect(() => {
    if (context?.handleLogout) {
      setupInterceptors(context.handleLogout)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
        <Toaster position='top-center' />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
