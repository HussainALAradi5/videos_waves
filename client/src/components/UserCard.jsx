import { useState } from 'react'
import { Box, Text, Avatar, VStack, Button } from '@chakra-ui/react'
import ProfileEdit from './ProfileEdit'
import { useToast } from '@chakra-ui/react'

const UserCard = ({ user, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const toast = useToast()

  const handleProfileUpdate = async () => {
    try {
      ;(await onProfileUpdate()) /
        toast({
          title: 'Profile updated.',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
    } catch (error) {
      toast({
        title: 'Error updating profile.',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      bg="white"
      boxShadow="lg"
      maxW="md"
      mx="auto"
    >
      <VStack spacing={4} align="center">
        <Avatar
          name={user.userName}
          src={user.image}
          size="xl"
          borderColor="black.200"
          borderWidth="2px"
        />
        {isEditing ? (
          <ProfileEdit
            initialData={{
              userName: user.userName,
              email: user.email
            }}
            onSave={handleProfileUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <Box>
            <Text fontWeight="bold" fontSize="xl">
              Username: {user.userName}
            </Text>
            <Text>Email: {user.email}</Text>
            <Text>Admin: {user.isAdmin ? 'Yes' : 'No'}</Text>
            <Text>User Status: {user.isActive ? 'Active' : 'Inactive'}</Text>
            <Button
              mt={4}
              colorScheme="blue"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  )
}

export default UserCard
