import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, useToast } from '@chakra-ui/react'
import { getUserDetails } from '../service/auth'
import UserCard from './UserCard'

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

  const handleProfileUpdate = async () => {
    try {
      const userDetails = await getUserDetails()
      setUser(userDetails)
    } catch (error) {
      toast({
        title: 'Error updating profile.',
        description: 'Please try again later.',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }

  return (
    <Box p={4}>
      {user && <UserCard user={user} onProfileUpdate={handleProfileUpdate} />}
    </Box>
  )
}

export default Profile
