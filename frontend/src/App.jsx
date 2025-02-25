import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import FileUpload from './components/FileUpload'
import FileList from "./pages/FileList";
import Home from "./pages/Home";
import ProtectedRoutes from './components/ProtectedRoutes'
import Navbar from './components/Navbar'
import { useAuth } from './contexts/AuthContext'
import About from './pages/About'

function App() {
  const { isAuthenticated } = useAuth();

  const Logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <BrowserRouter>
        {
          isAuthenticated && <Navbar />
        }
        <Routes>
          <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Navigate to={'/'} />} />
          <Route path='/login' element={<Login />} /> 
          <Route path='/register' element={<Register />} /> 
          <Route path='/logout' element={<Logout />} />
          <Route path="/upload" element={<ProtectedRoutes><FileUpload /></ProtectedRoutes>} />
          <Route path="/files" element={<ProtectedRoutes><FileList /></ProtectedRoutes>} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App