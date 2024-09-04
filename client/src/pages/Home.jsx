import { useState, useEffect } from 'react'
import { Container, Grid, Heading, Text } from '@chakra-ui/react'

import axios from 'axios'
import VideoCard from '../components/VideoCard'

const HomePage = () => {
  const [videos, setVideos] = useState([])
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

  return (
    <Container maxW="container.xl" p={4}>
      <Heading mb={6}>Trending Videos</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
        {videos.length > 0 ? (
          videos.map((video) => <VideoCard key={video._id} video={video} />)
        ) : (
          <Text>No videos available.</Text>
        )}
      </Grid>
    </Container>
  )
}

export default HomePage
