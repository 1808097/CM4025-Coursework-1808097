import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  originId: {
    type: String,
    trim: true,
    required: 'Id is required'
  },
  user: {
    type: String,
    trim: true,
    required: 'User is required'
  },
  comment: {
    type: String,
    trim: true,
    required: 'Comment Body is required'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})


const commentModel = mongoose.model('Comment', CommentSchema);
commentModel.createIndexes();
export default commentModel
