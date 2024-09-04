import { Box, Image, Text, VStack, Button } from '@chakra-ui/react'
import Comments from './Comments'

const VideoDetails = ({ video }) => {
  if (!video) return null

  return (
    <Box>
      <Image
        src={video.thumbnailUrl}
        alt={video.title}
        boxSize="full"
        objectFit="cover"
        mb={4}
      />
      <VStack spacing={4} align="start">
        <Text fontWeight="bold" fontSize="2xl">
          {video.title}
        </Text>
        <Text>{video.description}</Text>
        <Comments videoId={video._id} userId={localStorage.getItem('userId')} />
      </VStack>
    </Box>
  )
}

export default VideoDetails
