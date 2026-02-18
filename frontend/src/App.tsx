import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext'
import { AppRouter } from './routes/AppRouter'

function App() {
  return (
    <>
      <AuthProvider>
        <AppRouter />
        <Toaster position='top-center' />
      </AuthProvider>
    </>
  )
}

export default App
