import { Box, Text, VStack } from '@chakra-ui/react'

const VideoDetails = ({ video }) => {
  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="bold">
          {video.title}
        </Text>
        <Text>Likes: {video.numberOfLikes}</Text>
        <Text>Views: {video.numberOfViews}</Text>
      </VStack>
    </Box>
  )
}

export default VideoDetails
