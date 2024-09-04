import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'

const VideoUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'video/*',
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0])
  })

  const handleTitleChange = (event) => setTitle(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (file && title) {
      onUpload({ file, title })
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
          <Button type="submit" colorScheme="teal">
            Upload Video
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default VideoUpload
