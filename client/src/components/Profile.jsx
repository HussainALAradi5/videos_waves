import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Text, useToast } from '@chakra-ui/react'
import { getUserDetails, logout } from '../service/auth'

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
          duration: 4000,
          isClosable: true
        })
        navigate('/login')
      }
    }
    fetchUser()
  }, [navigate, toast])

  const handleLogout = () => {
    logout()
    toast({
      title: 'Logged out.',
      description: "You've been successfully logged out.",
      status: 'success',
      duration: 4000,
      isClosable: true
    })
    navigate('/')
  }

  return (
    <Box p={4}>
      {user ? (
        <>
          <Text mb={4}>Welcome, {user.userName}!</Text>
          <Button onClick={handleLogout} colorScheme="teal">
            Sign Out
          </Button>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  )
}

export default Profile
