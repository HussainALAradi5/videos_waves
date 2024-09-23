import { useState } from 'react'
import { IconButton, HStack, Text, useToast } from '@chakra-ui/react'
import { AiOutlineLike } from 'react-icons/ai'
import { likeVideo, unlikeVideo } from '../service/auth'

const LikeButton = ({ videoId, initialLikes, isLiked }) => {
  const [liked, setLiked] = useState(isLiked)
  const [numberOfLikes, setNumberOfLikes] = useState(initialLikes)
  const toast = useToast()

  const handleLikeClick = async (event) => {
    event.stopPropagation()
    try {
      if (liked) {
        await unlikeVideo(videoId)
        setLiked(false)
        setNumberOfLikes((prev) => prev - 1)
        toast({
          title: 'Disliked',
          description: 'You have disliked this video.',
          status: 'info',
          duration: 3000,
          isClosable: true,
          colorScheme: 'red',
          position: 'top-right'
        })
      } else {
        await likeVideo(videoId)
        setLiked(true)
        setNumberOfLikes((prev) => prev + 1)
        toast({
          title: 'Liked',
          description: 'You have liked this video.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          colorScheme: 'purple',
          position: 'top-right'
        })
      }
    } catch (error) {
      console.error(
        'Error liking/unliking video:',
        error.response ? error.response.data : error.message
      )
      toast({
        title: 'Error',
        description: 'There was an error while liking/unliking the video.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
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
  )
}

export default LikeButton
