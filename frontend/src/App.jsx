import { HelmetProvider } from 'react-helmet-async'
import AppRouter from '@/routes/AppRouter'

const App = () => (
  <HelmetProvider>
    <AppRouter />
  </HelmetProvider>
)

export default App
