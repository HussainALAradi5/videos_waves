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
    throw new Error(
      error.response?.data?.message ||
        'An error occurred while liking the video'
    )
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
    throw new Error(
      error.response?.data?.message ||
        'An error occurred while unliking the video'
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
const addComment = async (videoId, comment) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.post(
      `${API_URL}/videos/${videoId}/comments`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(
      'Error adding comment:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

const editComment = async (videoId, commentId, updatedComment) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.put(
      `${API_URL}/videos/${videoId}/comments/${commentId}`,
      { comment: updatedComment },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(
      'Error editing comment:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

const removeComment = async (videoId, commentId) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.delete(
      `${API_URL}/videos/${videoId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(
      'Error removing comment:',
      error.response ? error.response.data : error.message
    )
    throw error
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
  removeComment
}
