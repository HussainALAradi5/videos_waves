import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { getToken } from './service/auth'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './components/Profile'
import VideoUpload from './components/VideoUpload'

import VideoPage from './pages/VideoPage'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    navigate('/profile')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            isAuthenticated ? <Profile /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/upload"
          element={
            isAuthenticated ? <VideoUpload /> : <Login onLogin={handleLogin} />
          }
        />
        <Route path="/videos/:videoId" element={<VideoPage />} />
      </Routes>
    </>
  )
}

export default App
