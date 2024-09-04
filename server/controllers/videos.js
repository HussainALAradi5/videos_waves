const Video = require('../models/video')
const authService = require('../service/auth')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../client/public/videos')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
multer({ storage })
const uploadVideo = async (req, res) => {
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
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('userId')
    res.status(200).json(videos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching videos' })
  }
}
const likeVideo = async (req, res) => {
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

    if (!video.likedBy) {
      video.likedBy = []
    }

    // Check if the user has already liked the video
    if (video.likedBy.includes(decoded.id)) {
      return res.status(400).json({ message: 'Already liked' })
    }

    video.likedBy.push(decoded.id)
    video.numberOfLikes += 1

    await video.save()
    res.status(200).json(video)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error while liking video' })
  }
}

const unlikeVideo = async (req, res) => {
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

    if (!video.likedBy) {
      video.likedBy = []
    }

    if (!video.likedBy.includes(decoded.id)) {
      return res.status(400).json({ message: 'Not liked yet' })
    }

    video.likedBy = video.likedBy.filter(
      (userId) => userId.toString() !== decoded.id.toString()
    )
    video.numberOfLikes -= 1

    await video.save()
    res.status(200).json(video)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error while unliking video' })
  }
}
module.exports = {
  uploadVideo,
  showRandomVideo,
  getVideoById,
  updateVideo,
  removeVideo,
  getAllVideos,
  likeVideo,
  unlikeVideo
}
