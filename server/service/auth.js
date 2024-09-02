const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.Salt_Rounds))
  return await bcrypt.hash(password, salt)
}

const comparePassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword)
}

const generateToken = (user) => {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  })
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken
}
