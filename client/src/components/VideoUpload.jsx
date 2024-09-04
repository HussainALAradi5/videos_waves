import { useState } from 'react'
import { Box, Button, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'

const VideoUpload = () => {
  const [file, setFile] = useState(null)
  const toast = useToast()

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'No file selected.',
        description: 'Please select a video file to upload.',
        status: 'warning',
        duration: 3000,
        isClosable: true
      })
      return
    }

    const formData = new FormData()
    formData.append('video', file)

    try {
      await axios.post('/api/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      toast({
        title: 'Upload successful!',
        description: 'Your video has been uploaded.',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      setFile(null)
    } catch (error) {
      toast({
        title: 'Upload failed.',
        description: 'There was an error uploading your video.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Input type="file" accept="video/*" onChange={handleFileChange} mb={4} />
      <Button colorScheme="teal" onClick={handleUpload}>
        Upload Video
      </Button>
    </Box>
  )
}

export default VideoUpload
