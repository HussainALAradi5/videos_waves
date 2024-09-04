import { Box, Text, Avatar, VStack } from '@chakra-ui/react'

const UserCard = ({ user }) => {
  const admin = user.isAdmin ? 'yes' : 'no'
  const active = user.isActive ? 'activate' : 'inactivate'
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
        <Text fontWeight="bold" fontSize="xl">
          Username: {user.userName}
        </Text>
        <Text>Email: {user.email}</Text>
        <Text>Admin: {admin}</Text>
        <Text>User Stauts: {active}</Text>
      </VStack>
    </Box>
  )
}

export default UserCard
