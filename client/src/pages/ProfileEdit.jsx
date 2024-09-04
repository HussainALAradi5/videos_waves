import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { updateProfile } from '../service/auth'
import Form from '../components/Form'

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    userName: '',
    newPassword: ''
  })
  const toast = useToast()

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
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
        {
          name: 'userName',
          type: 'text',
          placeholder: 'New Username',
          value: formData.userName
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'New Password',
          value: formData.newPassword
        }
      ]}
      onSubmit={handleSubmit}
      buttonText="Update Profile"
    />
  )
}

export default ProfileEdit
