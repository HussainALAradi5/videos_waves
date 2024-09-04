const Video = require('../models/video')
const mongoose = require('mongoose')
const upload = async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authorization denied, no token provided' })
  }

  const decoded = authService.verifyToken(token)
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const { title } = req.body
    const userId = decoded.id

    const newVideo = new Video({
      title,
      userId,
      numberOfLikes: 0,
      numberOfViews: 0,
      comments: []
    })

    await newVideo.save()
    res.status(201).json(newVideo)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error while uploading video' })
  }
}

const showRandomVideo = async (req, res) => {
  try {
    const count = await Video.countDocuments()
    const random = Math.floor(Math.random() * count)
    const video = await Video.findOne().skip(random).populate('userId')
    res.status(200).json(video)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Can't show random video" })
  }
}
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('userId')
    if (!video)
      return res.status(404).json({ massege: 'there is no such video!' })
    res.status(200).json(video)
  } catch (error) {
    console.error(error)
    res.status(500).json({ massege: 'error cant fetch the video' })
  }
}
const updateVideo = async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authorization denied, no token provided' })
  }

  const decoded = authService.verifyToken(token)
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const video = await Video.findById(req.params.id)
    if (!video) {
      return res.status(404).json({ message: 'Video not found' })
    }

    if (video.userId.toString() !== decoded.id) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to update this video' })
    }

    Object.assign(video, req.body)
    await video.save()

    res.status(200).json(video)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error while updating video' })
  }
}

const removeVideo = async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authorization denied, no token provided' })
  }

  const decoded = authService.verifyToken(token)
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const video = await Video.findById(req.params.id)
    if (!video) {
      return res.status(404).json({ message: 'Video not found' })
    }

    // Check if the logged-in user is the owner of the video
    if (video.userId.toString() !== decoded.id) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to delete this video' })
    }

    await video.remove()
    res.status(200).json({ message: 'Video deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error while deleting video' })
  }
}

module.exports = {
  upload,
  showRandomVideo,
  getVideoById,
  updateVideo,
  removeVideo
}
