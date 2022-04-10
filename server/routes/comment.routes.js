import express from 'express'
import authCtrl from '../controllers/auth.controller'
import commentCtrl from '../controllers/comment.controller'

const router = express.Router()

router.route('/api/comments')
    .get(commentCtrl.list)

router.route('/api/comments/:commentId')
    .post(authCtrl.requireSignin, authCtrl.hasCommentAuthorization, commentCtrl.create)
    .put(authCtrl.requireSignin, authCtrl.hasCommentAuthorization, commentCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasCommentAuthorization, commentCtrl.remove)

router.param('commentId', commentCtrl.commentByID)

export default router