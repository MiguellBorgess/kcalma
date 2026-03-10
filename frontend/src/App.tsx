import { Toaster } from 'sonner'
import { Context } from './context/AuthContext'
import { AppRouter } from './routes/AppRouter'
import { useContext, useEffect } from 'react'
import { setupInterceptors } from './services/authInterceptor'

function App() {
  const context = useContext(Context)

  useEffect(() => {
    if (context?.handleLogout) {
      setupInterceptors(context.handleLogout)
    }
  }, [])

  return (<>
    <AppRouter />
    <Toaster position='top-center' />
  </>)
}

export default App
