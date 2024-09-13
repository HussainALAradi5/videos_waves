import axios from 'axios'

const API_URL = 'http://localhost:5000'

const getToken = () => localStorage.getItem('token')

const handleError = (error) => {
  // Centralized error handling
  const errorMessage =
    error.response?.data?.message ||
    error.message ||
    'An unexpected error occurred'
  throw new Error(errorMessage)
}

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

const likeVideo = async (videoId) => {
  const token = getToken()
  if (!token) throw new Error('No token found')

  try {
    await axios.post(
      `${API_URL}/videos/${videoId}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
  } catch (error) {
    handleError(error)
  }
}

const unlikeVideo = async (videoId) => {
  const token = getToken()
  if (!token) throw new Error('No token found')

  try {
    await axios.post(
      `${API_URL}/videos/${videoId}/unlike`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
  } catch (error) {
    handleError(error)
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
    handleError(error)
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
    handleError(error)
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
    handleError(error)
  }
}

const addComment = async (videoId, comment) => {
  const token = getToken()

  if (!token) throw new Error('No token found')

  try {
    const response = await axios.post(
      `${API_URL}/videos/${videoId}/comments`,
      { comment },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return response.data
  } catch (error) {
    handleError(error)
  }
}

const editComment = async (videoId, commentId, updatedComment) => {
  const token = getToken()
  if (!token) throw new Error('No token found')

  try {
    const response = await axios.put(
      `${API_URL}/videos/${videoId}/comments/${commentId}`,
      { comment: updatedComment },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return response.data
  } catch (error) {
    handleError(error)
  }
}

const removeComment = async (videoId, commentId) => {
  const token = getToken()
  if (!token) throw new Error('No token found')

  try {
    const response = await axios.delete(
      `${API_URL}/videos/${videoId}/comments/${commentId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return response.data
  } catch (error) {
    handleError(error)
  }
}
const getVideoById = async (videoId) => {
  const token = getToken()
  if (!token) throw new Error('No token found')

  try {
    const response = await axios.get(`${API_URL}/videos/${videoId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export {
  register,
  login,
  logout,
  getUserDetails,
  getToken,
  updateProfile,
  likeVideo,
  unlikeVideo,
  addComment,
  editComment,
  removeComment,
  getVideoById
}
