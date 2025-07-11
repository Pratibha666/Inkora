import express from 'express'
import { authenticateToken } from '../utils/userAuth.js'
import { forgotPassword, login, logout, register, resetPassword, updateUser, userDetails, verifyForgotPassword } from '../controllers/userController.js'

const router = express.Router()

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/logout').get(logout)

router.route('/update-user').put(authenticateToken,updateUser)

router.route('/forgot-password').put(forgotPassword)

router.route('/verify-forgot-password').put(verifyForgotPassword)

router.route('/reset-password').put(resetPassword)

router.route('/user-details').get(authenticateToken,userDetails)


export default router