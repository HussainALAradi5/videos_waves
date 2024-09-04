import axios from 'axios'

const API_URL = 'http://localhost:5000'

const getToken = () => localStorage.getItem('token')

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'An error occurred during registration'
    )
  }
}

const updateProfile = async (profileData) => {
  const token = getToken()
  if (!token) throw new Error('No token found')

  try {
    const response = await axios.put(`${API_URL}/user/edit`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'An error occurred while updating profile'
    )
  }
}

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, userData)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'An error occurred during login'
    )
  }
}

const logout = () => {
  localStorage.removeItem('token')
}

const getUserDetails = async () => {
  const token = getToken()
  if (!token) throw new Error('No token found')

  try {
    const response = await axios.get(`${API_URL}/user/details`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'An error occurred while fetching user details'
    )
  }
}

export { register, login, logout, getUserDetails, getToken, updateProfile }
