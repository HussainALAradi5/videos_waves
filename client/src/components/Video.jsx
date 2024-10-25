import { useState, useEffect } from 'react'
import axios from 'axios'
import VideoDetails from './VideoDetails'
import VideoUpload from './VideoUpload'
import VideoCard from './VideoCard'
import {
  Box,
  Container,
  VStack,
  Button,
  Text,
  SimpleGrid
} from '@chakra-ui/react'

const Video = () => {
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/videos')
        setVideos(response.data)
      } catch (error) {
        console.error('Error fetching videos:', error)
        setError('Failed to load videos.')
      }
    }

    fetchVideos()
  }, [])

  const handleVideoUpload = async (videoData) => {
    try {
      const formData = new FormData()
      formData.append('file', videoData.file)
      formData.append('title', videoData.title)

      await axios.post('http://localhost:5000/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      setIsUploading(false)

      const response = await axios.get('http://localhost:5000/videos')
      setVideos(response.data)
      setError(null)
    } catch (error) {
      console.error('Error uploading video:', error)
      setError('Failed to upload video.')
    }
  }

  const handleVideoSelect = (video) => {
    setSelectedVideo(video)
  }

  const handleBackToList = () => {
    setSelectedVideo(null)
  }

  return (
    <Container maxW="container.lg" p={4}>
      <VStack spacing={4}>
        {error && <Text color="red.500">{error}</Text>}

        <Button
          onClick={() => setIsUploading(!isUploading)}
          colorScheme="teal"
          mb={4}
        >
          {isUploading ? 'Back to Video List' : 'Upload Video'}
        </Button>

        {isUploading ? (
          <VideoUpload onUpload={handleVideoUpload} />
        ) : (
          <>
            {!selectedVideo ? (
              <Box>
                {videos.length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                    {videos.map((video) => (
                      <VideoCard
                        key={video._id}
                        video={video}
                        onClick={() => handleVideoSelect(video)}
                      />
                    ))}
                  </SimpleGrid>
                ) : (
                  <Text>No videos available.</Text>
                )}
              </Box>
            ) : (
              <>
                <Button colorScheme="teal" mb={4} onClick={handleBackToList}>
                  Back to Video List
                </Button>
                <VideoDetails video={selectedVideo} />
              </>
            )}
          </>
        )}
      </VStack>
    </Container>
  )
}

export default Video
