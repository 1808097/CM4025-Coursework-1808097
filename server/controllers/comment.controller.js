import Comment from '../models/comment.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

const create = async (req, res) => {
  const comment = new Comment(req.body)
  try {
    await comment.save()
    return res.status(200).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
    let comments = await Comment.find().select('user comment updated created')
    res.json(comments)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const commentByID = async (req, res, next, id) => {
  try {
    let comment = await Comment.findById(id)
    if (!comment)
      return res.status('400').json({
        error: "Comment not found"
      })
    req.profile = comment
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve comment"
    })
  }
}


const update = async (req, res) => {
  try {
    console.log(req.profile)
    console.log(req.body)

    let comment = req.profile
    comment = extend(comment, req.body)
    comment.updated = Date.now()
    await comment.save()
    res.json(comment)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


const remove = async (req, res) => {
  try {
    let comment = req.profile
    let deletedComment = await comment.remove()
    res.json(deletedComment)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


export default {
  create,
  commentByID,
  list,
  remove,
  update
}
