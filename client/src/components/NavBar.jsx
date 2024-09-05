import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Button,
  Flex,
  useToast,
  Box,
  Text,
  useColorMode,
  IconButton
} from '@chakra-ui/react'
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineLogout,
  AiOutlineUser,
  AiOutlineUpload,
  AiOutlineSun,
  AiOutlineMoon
} from 'react-icons/ai'
import { getToken, logout } from '../service/auth'

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const location = useLocation()
  const { colorMode, toggleColorMode } = useColorMode()

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
    <Box
      bg={colorMode === 'light' ? 'cyan.500' : 'cyan.800'}
      p={4}
      position="relative"
      overflow="hidden"
    >
      <Flex
        justify="space-between"
        align="center"
        position="relative"
        zIndex={1}
      >
        <Flex align="center">
          <Text fontSize="xl" fontWeight="bold" color="white" mr={4}>
            Videos Waves🌊
          </Text>
          <Button
            as={Link}
            to="/"
            colorScheme={colorMode === 'light' ? 'blue' : 'teal'}
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
              colorScheme={colorMode === 'light' ? 'blue' : 'teal'}
              variant="solid"
              leftIcon={<AiOutlineUpload />}
              mr={4}
            >
              Upload Video
            </Button>
          )}
        </Flex>
        <Flex align="center">
          <IconButton
            icon={colorMode === 'light' ? <AiOutlineMoon /> : <AiOutlineSun />}
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            mr={4}
          />
          {!isLoggedIn && !isProfilePage && (
            <>
              <Button
                as={Link}
                to="/register"
                colorScheme={colorMode === 'light' ? 'blue' : 'teal'}
                variant="solid"
                leftIcon={<AiOutlineUserAdd />}
                mr={4}
              >
                Register
              </Button>
              <Button
                as={Link}
                to="/login"
                colorScheme={colorMode === 'light' ? 'blue' : 'teal'}
                variant="solid"
                leftIcon={<AiOutlineLogin />}
              >
                Login
              </Button>
            </>
          )}
          {isLoggedIn && (
            <>
              <Button
                as={Link}
                to="/profile"
                colorScheme={colorMode === 'light' ? 'blue' : 'teal'}
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
      <Box
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
        height="100px"
        bg={colorMode === 'light' ? 'cyan.600' : 'cyan.900'}
        transform="skewY(-6deg)"
        zIndex={0}
      />
    </Box>
  )
}

export default NavBar
