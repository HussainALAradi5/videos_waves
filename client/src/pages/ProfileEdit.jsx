import { useToast } from '@chakra-ui/react'
import { updateProfile } from '../service/auth'
import { Form } from 'react-router-dom'

const ProfileEdit = () => {
  const toast = useToast()

  const handleSubmit = async (formData) => {
    try {
      await updateProfile(formData)
      toast({ title: 'Profile updated.', status: 'success', duration: 2000 })
    } catch (error) {
      toast({
        title: 'Error updating profile.',
        status: 'error',
        duration: 2000
      })
    }
  }

  return (
    <Form
      fields={[
        { name: 'userName', type: 'text', placeholder: 'New Username' },
        { name: 'newPassword', type: 'password', placeholder: 'New Password' }
      ]}
      onSubmit={handleSubmit}
      buttonText="Update Profile"
    />
  )
}

export default ProfileEdit
