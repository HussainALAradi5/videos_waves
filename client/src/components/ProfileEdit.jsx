import { useState } from 'react'
import { Box, Button, Input, useToast } from '@chakra-ui/react'
import { updateProfile } from '../service/auth'

const ProfileEdit = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    userName: initialData.userName || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const toast = useToast()

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async () => {
    if (
      !formData.userName ||
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast({
        title: 'Missing fields.',
        description: 'Please fill out all fields.',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: 'Password mismatch.',
        description: 'New password and confirm password do not match.',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
      return
    }

    try {
      await updateProfile(formData)
      toast({ title: 'Profile updated.', status: 'success', duration: 2000 })
      onSave()
    } catch (error) {
      toast({
        title: 'Error updating profile.',
        description:
          error.message || 'An error occurred while updating your profile.',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }

  return (
    <Box p={4} bg="white" borderRadius="lg" boxShadow="md">
      <Input
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        mb={2}
        placeholder="New Username"
      />
      <Input
        name="currentPassword"
        type="password"
        value={formData.currentPassword}
        onChange={handleChange}
        mb={2}
        placeholder="Current Password"
      />
      <Input
        name="newPassword"
        type="password"
        value={formData.newPassword}
        onChange={handleChange}
        mb={2}
        placeholder="New Password"
      />
      <Input
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        mb={4}
        placeholder="Confirm New Password"
      />
      <Button colorScheme="blue" onClick={handleSubmit}>
        Update Profile
      </Button>
      <Button ml={2} onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  )
}

export default ProfileEdit
