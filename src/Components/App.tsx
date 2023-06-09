import Signup from './Signup'
import { AuthProvider } from '@/contexts/AuthContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoutes from './PrivateRoutes'
import UpdateProfile from './UpdateProfile'
import StoreProvider from '@/contexts/StoreProvider'
import { ToastProvider } from '@/contexts/ToastContext'
import { ApiProvider } from '@/contexts/ApiContext'
import AppContextProviders from '@/contexts/AppContextProvider'
import 'react-toastify/dist/ReactToastify.min.css'

function App() {
  const providers = [ToastProvider, AuthProvider, ApiProvider, StoreProvider]

  return (
    <Router>
      <AppContextProviders components={providers}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/" />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AppContextProviders>
    </Router>
  )
}

export default App
