import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
    required: 'Price is required'
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
    required: 'Stock is required'
  },
})

const itemModel = mongoose.model('Item', ItemSchema);
itemModel.createIndexes();
export default itemModel
