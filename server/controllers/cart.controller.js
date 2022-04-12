import Item from '../models/item.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'

const create = async (req, res) => {
    const item = new Item(req.body)
    try {
        await item.save()
        return res.status(200).json({
            message: "Item added!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const cartByID = async (req, res, next, id) => {
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


export default {
    create,
    cartByID,
    update
}
