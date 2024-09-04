import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { login } from '../service/auth'
import Form from '../components/Form'

const Login = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = async (formData) => {
    try {
      await login(formData)
      toast({
        title: 'Login successful.',
        description: 'You are now logged in. Redirecting to profile...',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      setTimeout(() => navigate('/profile'), 4000)
    } catch (error) {
      toast({
        title: 'Login failed.',
        description: error.response?.data?.message || 'An error occurred.',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }
  }

  const fields = [
    {
      name: 'usernameOrEmail',
      type: 'text',
      placeholder: 'Username or Email',
      required: true
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      required: true
    }
  ]

  return <Form fields={fields} onSubmit={handleSubmit} buttonText="Login" />
}

export default Login
