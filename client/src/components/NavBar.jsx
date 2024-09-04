import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button, Flex, useToast } from '@chakra-ui/react'
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineLogout,
  AiOutlineUser,
  AiOutlineUpload
} from 'react-icons/ai'
import { getToken, logout } from '../service/auth'

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const location = useLocation()

  useEffect(() => {
    const token = getToken()
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    toast({
      title: 'Logged out successfully.',
      status: 'success',
      duration: 2000,
      isClosable: true
    })
    navigate('/')
  }

  const isProfilePage = location.pathname === '/profile'

  return (
    <Flex bg="cyan.500" p={4} justify="space-between" align="center">
      <Flex>
        <Button
          as={Link}
          to="/"
          colorScheme="blue"
          variant="solid"
          leftIcon={<AiOutlineHome />}
          mr={4}
        >
          Home
        </Button>
        {isLoggedIn && (
          <Button
            as={Link}
            to="/upload"
            colorScheme="blue"
            variant="solid"
            leftIcon={<AiOutlineUpload />}
            mr={4}
          >
            Upload Video
          </Button>
        )}
      </Flex>
      <Flex>
        {!isLoggedIn && !isProfilePage && (
          <>
            <Button
              as={Link}
              to="/register"
              colorScheme="blue"
              variant="solid"
              leftIcon={<AiOutlineUserAdd />}
              mr={4}
            >
              Register
            </Button>
            <Button
              as={Link}
              to="/login"
              colorScheme="blue"
              variant="solid"
              leftIcon={<AiOutlineLogin />}
            >
              Login
            </Button>
          </>
        )}
        {isLoggedIn && !isProfilePage && (
          <>
            <Button
              as={Link}
              to="/profile"
              colorScheme="blue"
              variant="solid"
              leftIcon={<AiOutlineUser />}
              mr={4}
            >
              Profile
            </Button>
            <Button
              onClick={handleLogout}
              colorScheme="red"
              variant="solid"
              leftIcon={<AiOutlineLogout />}
            >
              Sign Out
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default NavBar
