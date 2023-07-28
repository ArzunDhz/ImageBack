const router = express.Router()  // using the router provided by the express in roures folder
import express from 'express'
import {userLogin, userRegister ,userDelete ,userInfo, userLogout, resetPassword } from '../controllers/userController.js'
import { isUserAuthnecated } from '../middlewares/Auth.js'



router.post('/register',userRegister)
router.post('/login',userLogin)
router.get('/userinfo', isUserAuthnecated ,userInfo)
router.delete('/deleteuser',isUserAuthnecated, userDelete)
router.get('/logout',isUserAuthnecated, userLogout)
router.put('/reset',isUserAuthnecated,resetPassword)



export default router