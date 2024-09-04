import { useState } from 'react'
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
import { likeVideo, unlikeVideo } from '../service/auth' // Adjust the import path as necessary

const VideoCard = ({ video, onClick }) => {
  const [liked, setLiked] = useState(
    video.likedBy?.includes(localStorage.getItem('userId'))
  )
  const [numberOfLikes, setNumberOfLikes] = useState(video.numberOfLikes)
  const [loading, setLoading] = useState(false) // To manage loading state

  const handleLikeClick = async () => {
    if (loading) return // Prevent multiple clicks while loading

    setLoading(true)
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
      // Log specific error messages based on the server response
      if (error.response) {
        if (error.response.data.message === 'Already liked') {
          console.warn('You have already liked this video.')
        } else if (error.response.data.message === 'Already unliked') {
          console.warn('You have already unliked this video.')
        } else {
          console.error('Error liking/unliking video:', error.response.data)
        }
      } else {
        console.error('Error liking/unliking video:', error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const thumbnailUrl = video?.thumbnailUrl || 'default-thumbnail.png'
  const title = video?.title || 'Untitled Video'

  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
      onClick={onClick}
      cursor="pointer"
      _hover={{
        boxShadow: '2xl',
        transition: '1.5s'
      }}
      bg="gray.800"
      color="white"
      position="relative"
      width="400px"
      height="400px"
    >
      <Image
        src={thumbnailUrl}
        alt={title}
        boxSize="full"
        objectFit="cover"
        height="75%"
        width="100%"
        borderTopRadius="lg"
      />
      <VStack
        p={4}
        spacing={2}
        align="start"
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bgGradient="linear(to-t, blackAlpha.700, transparent)"
      >
        <Text fontWeight="bold" fontSize="xl">
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
              isLoading={loading} // Show loading state on button
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
      </VStack>
    </Box>
  )
}

export default VideoCard
