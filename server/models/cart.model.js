import mongoose from 'mongoose'
import Item from './item.model'

const CartSchema = new mongoose.Schema({
  items: {
    type: [Item],
    required: 'ItemList Required'
  },
  ownerId: {
    type: String,
    required: 'Owner required'
  }
})


const cartListModel = mongoose.model('CartSchema', CartSchema);
cartListModel.createIndexes();
export default cartListModel