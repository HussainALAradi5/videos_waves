import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, useToast } from '@chakra-ui/react'
import { getUserDetails, logout } from '../service/auth'
import ProfileEdit from '../pages/ProfileEdit'
import ProfileDetails from '../pages/ProfileDetails'

const Profile = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await getUserDetails()
        setUser(userDetails)
      } catch (error) {
        toast({
          title: 'Error fetching user details.',
          description: 'Please log in again.',
          status: 'error',
          duration: 2000,
          isClosable: true
        })
        navigate('/login')
      }
    }
    fetchUser()
  }, [navigate, toast])

  return (
    <Box p={4}>
      <ProfileDetails />
      <ProfileEdit />
    </Box>
  )
}

export default Profile
