import { Container, Grid, Heading } from '@chakra-ui/react'
import VideoCard from '../components/VideoCard'

const HomePage = () => {
  return (
    <Container maxW="container.xl" p={4}>
      <Heading mb={6}>Trending Videos</Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </Grid>
    </Container>
  )
}

export default HomePage
