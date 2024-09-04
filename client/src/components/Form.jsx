import { useState } from 'react'
import {
  Box,
  Button,
  Input,
  VStack,
  useBreakpointValue
} from '@chakra-ui/react'

const Form = ({ fields, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({})

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(formData)
  }

  const containerWidth = useBreakpointValue({
    base: '90%',
    md: '50%',
    lg: '40%'
  })

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxW="lg"
      mx="auto"
      p="10"
      mt="10"
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="blue.50"
      width={containerWidth}
    >
      <VStack spacing={4} align="stretch">
        {fields.map((field) => (
          <Box key={field.name}>
            <Input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              onChange={handleChange}
              required={field.required}
              variant="filled"
              bg="white"
              _placeholder={{ color: 'gray.500' }}
              value={formData[field.name] || ''} // Ensure value is controlled
            />
          </Box>
        ))}
        <Button type="submit" colorScheme="blue" size="lg" mt={4}>
          {buttonText}
        </Button>
      </VStack>
    </Box>
  )
}

export default Form
