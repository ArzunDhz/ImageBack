
import express from 'express'
import { deleteImage, generateImage,getAllImage, deleteAllImage } from '../controllers/imageController.js'
import { isUserAuthnecated } from '../middlewares/Auth.js'

const router = express.Router()  // using the router provided by the express in roures folder

router.post('/generate', isUserAuthnecated , generateImage)
router.get('/getallimage', isUserAuthnecated , getAllImage)
router.delete('/clearhistory', isUserAuthnecated ,  deleteAllImage)
router.delete('/:deleteimage', isUserAuthnecated ,  deleteImage)


export default router