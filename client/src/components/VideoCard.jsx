import { Box, Image, Text, VStack, IconButton } from '@chakra-ui/react'
import { AiFillHeart, AiOutlineComment } from 'react-icons/ai'

const VideoCard = () => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      position="relative"
      maxW="sm"
    >
      <Image
        src="https://via.placeholder.com/600x400"
        alt="Video Thumbnail"
        borderRadius="md"
        mb={4}
      />
      <VStack position="absolute" bottom="4" left="4" spacing={2} color="white">
        <IconButton
          icon={<AiFillHeart />}
          aria-label="Like"
          colorScheme="red"
          variant="solid"
        />
        <IconButton
          icon={<AiOutlineComment />}
          aria-label="Comment"
          colorScheme="blue"
          variant="solid"
        />
        <Text fontSize="lg" fontWeight="bold">
          Video Title
        </Text>
        <Text fontSize="sm">
          A brief description of the video. This is where you can give viewers
          an idea of what to expect.
        </Text>
      </VStack>
    </Box>
  )
}

export default VideoCard
