import Item from '../models/item.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'

const create = async (req, res) => {
  const item = new Item(req.body)
  try {
    await item.save()
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
    let items = await Item.find().select('name price stock')
    res.json(items)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const itemByID = async (req, res, next, id) => {
  try {
    let item = await Item.findById(id)
    if (!item)
      return res.status('400').json({
        error: "Item not found"
      })
    req.profile = item
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve item"
    })
  }
}

const update = async (req, res) => {
  try {
    let item = req.profile
    item = extend(item, req.body)
    await item.save()
    res.json(item)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


const remove = async (req, res) => {
  try {
    let item = req.profile
    let deletedItem = await item.remove()
    res.json(deletedItem)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


export default {
  create,
  itemByID,
  list,
  remove,
  update
}
