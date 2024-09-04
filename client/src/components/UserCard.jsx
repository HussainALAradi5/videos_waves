import { Box, Text, Avatar, VStack } from '@chakra-ui/react'

const UserCard = ({ user }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white" boxShadow="md">
      <VStack spacing={4} align="start">
        <Avatar name={user.userName} src={user.image} />
        <Text fontWeight="bold">Username: {user.userName}</Text>
        <Text>Email: {user.email}</Text>
        <Text>isAdmin: {user.isAdmin}</Text>
      </VStack>
    </Box>
  )
}

export default UserCard
