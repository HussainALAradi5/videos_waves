import { useEffect, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { getUserDetails } from '../service/auth'
import UserCard from '../components/UserCard'

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
    <Box p={4}>
      <UserCard user={user} />
    </Box>
  )
}

export default ProfileDetails
