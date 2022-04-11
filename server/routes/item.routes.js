import express from 'express'
import authCtrl from '../controllers/auth.controller'
import itemCtrl from '../controllers/item.controller'

const router = express.Router()

router.route('/api/items')
    .get(itemCtrl.list)

router.route('/api/items/:itemId')
    .post(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, itemCtrl.create)
    .put(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, itemCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAdminAuthorization, itemCtrl.remove)

router.param('itemId', itemCtrl.itemByID)

export default router