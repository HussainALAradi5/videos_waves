import { Box, Image, Text, VStack } from '@chakra-ui/react'
import ReactPlayer from 'react-player'
import Comments from './Comments'

const VideoDetails = ({ video }) => {
  if (!video) return null

  return (
    <Box>
      <Box mb={4}>
        {video.videoUrl ? (
          <ReactPlayer
            url={video.videoUrl}
            controls
            width="100%"
            height="auto"
          />
        ) : (
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            boxSize="full"
            objectFit="cover"
            mb={4}
          />
        )}
      </Box>
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
