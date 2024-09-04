import { useEffect, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { getUserDetails } from '../service/auth'

const ProfileDetails = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userData = await getUserDetails()
      setUser(userData)
    }

    fetchUserDetails()
  }, [])

  if (!user) return <Text>Loading...</Text>

  return (
    <Box>
      <Text>Username: {user.userName}</Text>
      <Text>Email: {user.email}</Text>
    </Box>
  )
}

export default ProfileDetails
