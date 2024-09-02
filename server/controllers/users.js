const User = require('../models/user')
const authService = require('../service/auth')

const invalidData = (fields) => {
  return fields.some((field) => !field)
}

const register = async (req, res) => {
  const { userName, password, email } = req.body

  if (invalidData([userName, password, email])) {
    return res.status(400).json({ message: 'You must fill all the fields!' })
  }

  try {
    const isExist = await User.findOne({ email })
    if (isExist)
      return res.status(400).json({ message: 'User already exists!' })

    const hashed = await authService.hashPassword(password)
    const user = new User({ userName, password_digest: hashed, email })
    await user.save()
    res
      .status(201)
      .json({ message: 'User has been registered successfully 😊' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Some technical issue 😒' })
  }
}

const login = async (req, res) => {
  const { email, userName, password } = req.body

  // Validate required fields
  if (invalidData([email || userName, password])) {
    return res.status(400).json({ message: 'You must fill all the fields!' })
  }

  try {
    const user = await User.findOne({
      $or: [{ email: email }, { userName: userName }]
    })

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const isMatch = await authService.comparePassword(
      password,
      user.password_digest
    )
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = authService.generateToken(user)
    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}
const editProfile = async (req, res) => {
  const { userId } = req.user
  const { userName, newPassword } = req.body

  // Check if at least one field is provided
  if (!userName && !newPassword) {
    return res
      .status(400)
      .json({ message: 'You must provide a new username or password!' })
  }

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found!' })
    }

    if (userName) {
      user.userName = userName
    }

    if (newPassword) {
      const hashedPassword = await authService.hashPassword(newPassword)
      user.password_digest = hashedPassword
    }

    await user.save()
    res.json({ message: 'Profile updated successfully!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}
const deleteUser = async (req, res) => {
  const { userId } = req.user

  try {
    // Find the user by ID and update the 'isActive' field
    const user = await User.findByIdAndUpdate(userId, { isActive: false })

    if (!user) {
      return res.status(404).json({ message: 'User not found!' })
    }

    res.json({ message: 'User marked as inactive successfully!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = {
  register,
  login,
  editProfile,
  deleteUser
}
