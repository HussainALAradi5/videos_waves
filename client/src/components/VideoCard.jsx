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

const VideoCard = ({ video, onClick }) => {
  const thumbnailUrl = video?.thumbnailUrl || 'default-thumbnail.png'
  const title = video?.title || 'Untitled Video'
  const numberOfLikes = video?.numberOfLikes ?? 0

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
              aria-label="Like"
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
