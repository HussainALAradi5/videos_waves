import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Text, Image, Container } from '@chakra-ui/react'
import Comments from '../components/Comments'
import { getToken } from '../service/auth'

const VideoPage = () => {
  const { videoId } = useParams()
  const [video, setVideo] = useState(null)
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/videos/${videoId}`
        )
        setVideo(response.data)
      } catch (error) {
        console.error('Error fetching video details:', error)
        setError('Failed to load video details.')
      }
    }

    const fetchUserId = async () => {
      try {
        const token = getToken()
        if (token) {
          const response = await axios.get(
            'http://localhost:5000/user/details',
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          )
          setUserId(response.data._id)
        }
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    fetchVideo()
    fetchUserId()
  }, [videoId])

  if (error) return <Text color="red.500">{error}</Text>

  return (
    <Container maxW="container.lg" p={4}>
      {video ? (
        <Box>
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            boxSize="full"
            objectFit="cover"
          />
          <Text fontSize="2xl" fontWeight="bold" mt={4}>
            {video.title}
          </Text>
          <Text mt={2}>{video.description}</Text>
          <Comments videoId={video._id} userId={userId} />
        </Box>
      ) : (
        <Text>Loading...</Text>
      )}
    </Container>
  )
}

export default VideoPage
