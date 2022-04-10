import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  user: {
    type: String,
    trim: true,
    required: 'User is required'
  },
  comment: {
    type: String,
    trim: true,
    required: 'Email is required'
  }
})


const commentModel = mongoose.model('Comment', CommentSchema);
commentModel.createIndexes();
export default commentModel
