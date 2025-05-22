import express from 'express'
const router=express.Router()
import {signup,Login} from '../controller/user.controller.js'

router.post("/signup",signup)
router.post("/login",Login)









export default router;
