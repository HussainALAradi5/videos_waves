import { useState, useEffect } from 'react'
import { Container, Grid, Heading, Text, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import VideoCard from '../components/VideoCard'
import InfiniteScroll from 'react-infinite-scroll-component'

const HomePage = () => {
  const [videos, setVideos] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `http://localhost:5000/videos?page=${page}&limit=10`
      )
      const newVideos = response.data

      setVideos((prevVideos) => [...prevVideos, ...newVideos])

      if (newVideos.length === 0 || newVideos.length < 10) {
        setHasMore(false)
      }

      setPage(page + 1)
    } catch (error) {
      console.error('Error fetching videos:', error)
      setError('Failed to load videos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  return (
    <Container maxW="container.xl" p={4}>
      <Heading mb={6}>Trending Videos</Heading>
      {error && <Text color="red.500">{error}</Text>}

      <InfiniteScroll
        dataLength={videos.length}
        next={fetchVideos}
        hasMore={hasMore}
        loader={<Spinner size="xl" />}
        endMessage={
          <Text textAlign="center" mt={6}>
            No more videos to display.
          </Text>
        }
      >
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {videos.length > 0 ? (
            videos.map((video) => <VideoCard key={video._id} video={video} />)
          ) : (
            <Text>No videos available.</Text>
          )}
        </Grid>
      </InfiniteScroll>
    </Container>
  )
}

export default HomePage
