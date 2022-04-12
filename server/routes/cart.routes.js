import express from 'express'
import authCtrl from '../controllers/auth.controller'
import itemCtrl from '../controllers/cart.controller'

const router = express.Router()

router.route('/api/cart')
    .post(commentCtrl.create)

router.route('/api/cart/:cartId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, itemCtrl.cartByID)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, itemCtrl.update)

router.param('cartId', cartCtrl.cartByID)

export default router