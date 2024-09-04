import VideoDetails from './VideoDetails'
import VideoUpload from './VideoUpload'
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'

const Video = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Flex direction={isMobile ? 'column' : 'row'} p={4}>
      <Box flex={1} p={2}>
        <VideoDetails />
      </Box>
      <Box flex={1} p={2}>
        <VideoUpload />
      </Box>
    </Flex>
  )
}

export default Video
