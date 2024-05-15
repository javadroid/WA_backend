import express from 'express'
import { createOpenConversation, getConversation } from '../controllers/conversation.controller'
import authMiddleware from '../middlewares/auth.mddleware'


const  {all} = require('trim-request')
const conversationrouter = express.Router()

conversationrouter.route("/").post(all,authMiddleware,createOpenConversation)
conversationrouter.route("/").get(all,authMiddleware,getConversation)

export default conversationrouter
