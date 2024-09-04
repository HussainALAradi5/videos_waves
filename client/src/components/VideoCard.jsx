import { useState, useEffect } from 'react'
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  IconButton,
  Button
} from '@chakra-ui/react'
import { AiOutlineLike, AiOutlinePlayCircle } from 'react-icons/ai'
import { likeVideo, unlikeVideo } from '../service/auth'
import Comments from './Comments'

const VideoCard = ({ video, onClick }) => {
  const [liked, setLiked] = useState(
    video.likedBy?.includes(localStorage.getItem('userId'))
  )
  const [numberOfLikes, setNumberOfLikes] = useState(video.numberOfLikes)
  const [userId, setUserId] = useState(localStorage.getItem('userId'))

  useEffect(() => {
    // Any additional logic on component mount
  }, [video._id])

  const handleLikeClick = async () => {
    try {
      if (liked) {
        await unlikeVideo(video._id)
        setLiked(false)
        setNumberOfLikes((prev) => prev - 1)
      } else {
        await likeVideo(video._id)
        setLiked(true)
        setNumberOfLikes((prev) => prev + 1)
      }
    } catch (error) {
      console.error(
        'Error liking/unliking video:',
        error.response ? error.response.data : error.message
      )
    }
  }

  const thumbnailUrl = video?.thumbnailUrl || 'default-thumbnail.png'
  const title = video?.title || 'Untitled Video'

  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      _hover={{ boxShadow: 'lg', transform: 'scale(1.03)', transition: '0.3s' }}
      bg="gray.800"
      color="white"
      position="relative"
      width="100%"
      maxW="400px"
    >
      <Image
        src={thumbnailUrl}
        alt={title}
        boxSize="full"
        objectFit="cover"
        height="250px"
        borderTopRadius="lg"
      />
      <VStack p={4} spacing={2} align="start">
        <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
          {title}
        </Text>
        <HStack spacing={4} w="full" justify="space-between">
          <HStack>
            <IconButton
              icon={<AiOutlineLike />}
              variant="ghost"
              colorScheme="teal"
              aria-label={liked ? 'Unlike' : 'Like'}
              onClick={handleLikeClick}
            />
            <Text>{numberOfLikes}</Text>
          </HStack>
          <Button
            leftIcon={<AiOutlinePlayCircle />}
            variant="solid"
            colorScheme="teal"
            onClick={onClick}
          >
            Play
          </Button>
        </HStack>
        <Comments videoId={video._id} userId={userId} />
      </VStack>
    </Box>
  )
}

export default VideoCard
