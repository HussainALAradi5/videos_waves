import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import ReactPlayer from 'react-player'
import LikeButton from './LikeButton'
import Comments from './Comments'

const VideoCard = ({ video }) => {
  const [userId] = useState(localStorage.getItem('userId'))
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handlePlayClick = (event) => {
    event.stopPropagation()
    onOpen()
  }

  const thumbnailUrl = video?.thumbnailUrl || 'default-thumbnail.png'
  const title = video?.title || 'Untitled Video'
  const videoUrl = video?.videoUrl || ''

  return (
    <>
      <Box
        borderWidth={1}
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        _hover={{
          boxShadow: 'lg',
          transform: 'scale(1.03)',
          transition: '0.3s'
        }}
        bg="gray.800"
        color="white"
        position="relative"
        width="100%"
        maxW="400px"
      >
        <Link to={`/videos/${video._id}`} style={{ display: 'block' }}>
          <Image
            src={thumbnailUrl}
            alt={title}
            boxSize="full"
            objectFit="cover"
            height="250px"
            borderTopRadius="lg"
          />
        </Link>
        <VStack p={4} spacing={2} align="start">
          <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
            {title}
          </Text>
          <HStack spacing={4} w="full" justify="space-between">
            <LikeButton
              videoId={video._id}
              initialLikes={video.numberOfLikes}
              isLiked={video.likedBy?.includes(userId)}
            />
            <Button
              leftIcon={<AiOutlinePlayCircle />}
              variant="solid"
              colorScheme="teal"
              onClick={handlePlayClick}
            >
              Play
            </Button>
          </HStack>
          <Comments
            videoId={video._id}
            userId={userId}
            hideAddComment={video.numberOfComments > 3}
          />
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default VideoCard
