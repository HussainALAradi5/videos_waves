import { useState, useEffect, useRef } from 'react'
import {
  Box,
  Text,
  Textarea,
  Button,
  VStack,
  HStack,
  IconButton,
  useToast,
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
  const toast = useToast()

  const newCommentRef = useRef(null)
  const editCommentRef = useRef(null)

  useEffect(() => {
    fetchComments()
    checkIfLoggedIn()
  }, [videoId])

  useEffect(() => {
    if (newCommentRef.current) {
      newCommentRef.current.style.height = 'auto'
      newCommentRef.current.style.height = `${newCommentRef.current.scrollHeight}px`
    }
  }, [newComment])

  useEffect(() => {
    if (editCommentRef.current) {
      editCommentRef.current.style.height = 'auto'
      editCommentRef.current.style.height = `${editCommentRef.current.scrollHeight}px`
    }
  }, [editCommentText])

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
      toast({
        title: 'Comment added.',
        description: 'Your comment has been added successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } catch (error) {
      console.error('Error adding comment:', error)
      toast({
        title: 'Error adding comment.',
        description: 'There was a problem adding your comment.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
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
      toast({
        title: 'Comment edited.',
        description: 'Your comment has been updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } catch (error) {
      console.error('Error editing comment:', error)
      toast({
        title: 'Error editing comment.',
        description: 'There was a problem editing your comment.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveComment = async (commentId) => {
    setLoading(true)
    try {
      await removeComment(videoId, commentId)
      fetchComments()
      toast({
        title: 'Comment deleted.',
        description: 'Your comment has been removed successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    } catch (error) {
      console.error('Error removing comment:', error)
      toast({
        title: 'Error removing comment.',
        description: 'There was a problem removing your comment.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
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
          <Box
            key={comment._id}
            borderWidth={1}
            borderRadius="md"
            p={4}
            bg="gray.700"
            color="white"
            width="100%"
            position="relative"
          >
            <HStack spacing={3} mb={2}>
              <Avatar
                src={comment.userId.image}
                name={comment.userId.userName}
              />
              <Box flex="1">
                <Text fontWeight="bold">{comment.userId.userName}</Text>
                <Text>{comment.comment}</Text>
              </Box>
            </HStack>
            {comment.userId._id === userId && (
              <HStack spacing={2} mt={2} position="absolute" top={4} right={4}>
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
          <Textarea
            ref={newCommentRef}
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            placeholder="Add a comment"
            size="sm"
            bg="gray.600"
            color="white"
            borderColor="gray.500"
            resize="none"
            minHeight="40px"
            maxHeight="200px"
            overflow="hidden"
            borderRadius="md"
            p={2}
          />
          <Button
            onClick={handleAddComment}
            colorScheme="teal"
            size="md"
            isLoading={loading}
            mt={2}
            p={4}
            fontSize="lg"
            fontWeight="bold"
            borderRadius="md"
            _hover={{ bg: 'teal.500' }}
            _active={{ bg: 'teal.600' }}
          >
            Add Comment
          </Button>
        </>
      )}

      {editCommentId && (
        <Box
          borderWidth={1}
          borderRadius="md"
          p={4}
          bg="gray.700"
          color="white"
          width="100%"
        >
          <Textarea
            ref={editCommentRef}
            value={editCommentText}
            onChange={(event) => setEditCommentText(event.target.value)}
            placeholder="Edit comment"
            size="sm"
            bg="gray.600"
            color="white"
            borderColor="gray.500"
            resize="none"
            minHeight="40px"
            maxHeight="200px"
            overflow="hidden"
            borderRadius="md"
            p={2}
          />
          <HStack mt={2}>
            <Button
              onClick={handleEditComment}
              colorScheme="teal"
              size="md"
              isLoading={loading}
              fontSize="lg"
              fontWeight="bold"
              borderRadius="md"
              _hover={{ bg: 'teal.500' }}
              _active={{ bg: 'teal.600' }}
            >
              Save
            </Button>
            <Button
              onClick={() => setEditCommentId(null)}
              colorScheme="gray"
              size="md"
              fontSize="lg"
              fontWeight="bold"
              borderRadius="md"
              _hover={{ bg: 'gray.500' }}
              _active={{ bg: 'gray.600' }}
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
