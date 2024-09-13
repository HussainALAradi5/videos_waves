import { useState, useEffect } from 'react'
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  IconButton,
  Avatar
} from '@chakra-ui/react'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import {
  addComment,
  editComment,
  removeComment,
  getToken
} from '../service/auth'

const Comments = ({ videoId, userId, displayLimit = 3 }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [editCommentId, setEditCommentId] = useState(null)
  const [editCommentText, setEditCommentText] = useState('')
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const location = useLocation()
  const isVideoPage = location.pathname.startsWith(`/videos/${videoId}`)

  useEffect(() => {
    fetchComments()
    checkIfLoggedIn()
  }, [videoId])

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/videos/${videoId}/comments`
      )
      const data = await response.json()
      setComments(data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const checkIfLoggedIn = () => {
    const token = getToken()
    setLoggedIn(!!token)
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    setLoading(true)
    try {
      await addComment(videoId, newComment)
      setNewComment('')
      fetchComments()
    } catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditComment = async () => {
    if (!editCommentText.trim()) return
    setLoading(true)
    try {
      await editComment(videoId, editCommentId, editCommentText)
      setEditCommentId(null)
      setEditCommentText('')
      fetchComments()
    } catch (error) {
      console.error('Error editing comment:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveComment = async (commentId) => {
    setLoading(true)
    try {
      await removeComment(videoId, commentId)
      fetchComments()
    } catch (error) {
      console.error('Error removing comment:', error)
    } finally {
      setLoading(false)
    }
  }

  const commentsToDisplay = isVideoPage
    ? comments
    : comments.slice(0, displayLimit)

  return (
    <VStack spacing={4} align="start" mt={4}>
      {commentsToDisplay.length > 0 ? (
        commentsToDisplay.map((comment) => (
          <HStack
            key={comment._id}
            borderWidth={1}
            borderRadius="md"
            p={4}
            bg="gray.700"
            color="white"
            width="100%"
            spacing={4}
          >
            <Avatar
              src={comment.userId.image}
              name={comment.userId.userName}
              size="md"
            />
            <Box flex="1">
              <Text fontWeight="bold">{comment.userId.userName}</Text>
              <Text>{comment.comment}</Text>
              {comment.userId._id === userId && (
                <HStack spacing={2} mt={2}>
                  <IconButton
                    icon={<AiOutlineEdit />}
                    colorScheme="teal"
                    aria-label="Edit"
                    size="sm"
                    onClick={() => {
                      setEditCommentId(comment._id)
                      setEditCommentText(comment.comment)
                    }}
                  />
                  <IconButton
                    icon={<AiOutlineDelete />}
                    colorScheme="red"
                    aria-label="Delete"
                    size="sm"
                    onClick={() => handleRemoveComment(comment._id)}
                  />
                </HStack>
              )}
            </Box>
          </HStack>
        ))
      ) : (
        <Text>No comments yet. Be the first to comment!</Text>
      )}

      {!isVideoPage && comments.length > displayLimit && (
        <Link to={`/videos/${videoId}`}>
          <Text
            color="teal.300"
            _hover={{ textDecoration: 'underline' }}
            mt={2}
          >
            You can read more comments or add a comment by clicking here
          </Text>
        </Link>
      )}

      {loggedIn && (isVideoPage || comments.length <= displayLimit) && (
        <>
          <Input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            placeholder="Add a comment"
            size="sm"
            bg="gray.600"
            color="white"
            borderColor="gray.500"
          />
          <Button
            onClick={handleAddComment}
            colorScheme="teal"
            size="sm"
            isLoading={loading}
          >
            Add Comment
          </Button>
        </>
      )}

      {editCommentId && (
        <Box mt={4}>
          <Input
            value={editCommentText}
            onChange={(event) => setEditCommentText(event.target.value)}
            placeholder="Edit comment"
            size="sm"
            bg="gray.600"
            color="white"
            borderColor="gray.500"
          />
          <HStack mt={2}>
            <Button
              onClick={handleEditComment}
              colorScheme="teal"
              size="sm"
              isLoading={loading}
            >
              Save
            </Button>
            <Button
              onClick={() => setEditCommentId(null)}
              colorScheme="gray"
              size="sm"
            >
              Cancel
            </Button>
          </HStack>
        </Box>
      )}
    </VStack>
  )
}

export default Comments
