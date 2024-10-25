import { useState } from 'react'
import { Box, Text, Avatar, VStack, Button } from '@chakra-ui/react'
import ProfileEdit from './ProfileEdit'

const ProfileDetails = ({ user, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
    onProfileUpdate()
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
              newPassword: ''
            }}
            onSave={handleSave}
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

export default ProfileDetails
