import { Box, Heading, Text, Image, Button, VStack } from '@chakra-ui/react'

const VideoDetails = () => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Image
        src="https://via.placeholder.com/600x400"
        alt="Video Thumbnail"
        borderRadius="md"
        mb={4}
      />
      <VStack spacing={4} align="start">
        <Heading as="h2" size="lg">
          Video Title
        </Heading>
        <Text>
          Description of the video goes here. This is where you can add more
          details about the content of the video.
        </Text>
        <Button colorScheme="teal">Watch Now</Button>
      </VStack>
    </Box>
  )
}

export default VideoDetails
