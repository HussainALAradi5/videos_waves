const Video = require('../models/video')
const mongoose = require('mongoose')
const upload = async (req, res) => {
  try {
    const { title, userId } = req.body

    const video = new Video({
      title,
      userId,
      numberOfLikes: 0,
      numberOfViews: 0,
      comments: []
    })
    await video.save()
    res.status(201).json(video)
  } catch (error) {
    res.status(500).json({ massege: 'some technical issuse' })
  }
}
const showRandomVideo = async (req, res) => {
  try {
    const count = await Video.countDocuemnts()
    const random = Main.floor(Math.random() * count)
    const video = await Video.findOne().skip(random).populate('userId')
    res.status(200).json(video)
  } catch (error) {
    console.error(error)
    res.status(500).json({ massege: 'cant show random video' })
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
  try {
    const { id } = req.params
    const video = await Video.findByIdAndUpdate(id, req.body)
    if (!video) return res.stauts(404).json({ massege: 'Video is not exist!' })
    return res.status(200).json(video)
  } catch (error) {
    console.error(error)
    res.status(500).json({ massege: 'cant update the video details' })
  }
}
const removeVideo = async (req, res) => {
  try {
    const { id } = req.params
    const video = await Video.findByIdAndDelete(id)
    if (!video) return res.stauts(404).json({ massege: 'Video is not exist!' })
    return res
      .status(200)
      .json({ massege: 'Video have been deleted successfully' })
  } catch (error) {
    res.stauts(500).json({ massege: 'cant delete the video' })
  }
}
module.exports = {
  upload,
  showRandomVideo,
  getVideoById,
  updateVideo,
  removeVideo
}
