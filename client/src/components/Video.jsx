import { useState, useEffect } from 'react'
import axios from 'axios'
import VideoDetails from './VideoDetails'
import VideoUpload from './VideoUpload'
import VideoCard from './VideoCard'
import { Box, Container, VStack, Button, Text } from '@chakra-ui/react'

const Video = () => {
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos')
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

      await axios.post('/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      setIsUploading(false)

      const response = await axios.get('/api/videos')
      setVideos(response.data)
      setError(null)
    } catch (error) {
      console.error('Error uploading video:', error)
      setError('Failed to upload video.')
    }
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
            <Box>
              {videos.length > 0 ? (
                videos.map((video) => (
                  <VideoCard
                    key={video._id}
                    video={video}
                    onClick={() => setSelectedVideo(video)}
                  />
                ))
              ) : (
                <Text>No videos available.</Text>
              )}
            </Box>
            {selectedVideo && <VideoDetails video={selectedVideo} />}
          </>
        )}
      </VStack>
    </Container>
  )
}

export default Video
