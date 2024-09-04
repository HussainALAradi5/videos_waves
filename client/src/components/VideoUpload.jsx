import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Progress,
  useToast
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

const VideoUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const toast = useToast()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'video/*',
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0])
  })

  const handleTitleChange = (event) => setTitle(event.target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!file) {
      toast({
        title: 'No file selected.',
        description: 'Please select a video file to upload.',
        status: 'warning',
        duration: 2000,
        isClosable: true
      })
      return
    }

    if (!title.trim()) {
      toast({
        title: 'Title is required.',
        description: 'Please enter a title for the video.',
        status: 'warning',
        duration: 2000,
        isClosable: true
      })
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)

    try {
      const response = await axios.post(
        'http://localhost:5000/videos/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            setProgress(percentCompleted)
          }
        }
      )

      console.log('Upload response:', response.data)

      toast({
        title: 'Upload successful.',
        status: 'success',
        duration: 2000,
        isClosable: true
      })

      if (onUpload) {
        onUpload(response.data)
      }
    } catch (error) {
      console.error('Error uploading video:', error.response?.data || error)

      toast({
        title: 'Upload failed.',
        description:
          error.response?.data?.message ||
          'There was an error uploading your video.',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    } finally {
      setUploading(false)
      setFile(null)
      setTitle('')
      setProgress(0)
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Video Title</FormLabel>
            <Input value={title} onChange={handleTitleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Video File</FormLabel>
            <Box
              {...getRootProps()}
              border="2px dashed"
              borderColor="gray.300"
              p={4}
              textAlign="center"
              cursor="pointer"
              _hover={{ borderColor: 'gray.500' }}
            >
              <input {...getInputProps()} />
              {file ? (
                <Text>{file.name}</Text>
              ) : (
                <Text>
                  {isDragActive
                    ? 'Drop the video here...'
                    : 'Drag & drop a video file here, or click to select one'}
                </Text>
              )}
            </Box>
          </FormControl>
          {uploading && (
            <Box width="100%">
              <Progress value={progress} colorScheme="teal" mb={4} />
            </Box>
          )}
          <Button type="submit" colorScheme="teal" isLoading={uploading}>
            Upload Video
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default VideoUpload
