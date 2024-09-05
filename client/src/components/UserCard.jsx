import { useState } from 'react'
import {
  Box,
  Text,
  Avatar,
  VStack,
  Button,
  useColorMode,
  useToast
} from '@chakra-ui/react'
import ProfileEdit from './ProfileEdit'

const UserCard = ({ user, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { colorMode } = useColorMode()
  const toast = useToast()

  const handleProfileUpdate = async () => {
    try {
      await onProfileUpdate()
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
      bg={colorMode === 'light' ? 'white' : 'gray.700'}
      boxShadow="lg"
      maxW="md"
      mx="auto"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
    >
      <VStack spacing={4} align="center">
        <Avatar
          name={user.userName}
          src={user.image}
          size="xl"
          borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
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
            <Text
              fontWeight="bold"
              fontSize="xl"
              color={colorMode === 'light' ? 'gray.800' : 'gray.200'}
            >
              Username: {user.userName}
            </Text>
            <Text color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
              Email: {user.email}
            </Text>
            <Text color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
              Admin: {user.isAdmin ? 'Yes' : 'No'}
            </Text>
            <Text color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
              User Status: {user.isActive ? 'Active' : 'Inactive'}
            </Text>
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
