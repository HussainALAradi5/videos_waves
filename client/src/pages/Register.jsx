import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { register } from '../service/auth'
import Form from '../components/Form'

const Register = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = async (formData) => {
    try {
      await register(formData)
      toast({
        title: 'Registration successful.',
        description: 'You are now registered. Redirecting to login...',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      setTimeout(() => navigate('/login'), 4000)
    } catch (error) {
      toast({
        title: 'Registration failed.',
        description: error.response?.data?.message || 'An error occurred.',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }
  }

  const fields = [
    { name: 'userName', type: 'text', placeholder: 'Username', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', required: true },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      required: true
    }
  ]

  return <Form fields={fields} onSubmit={handleSubmit} buttonText="Register" />
}

export default Register
