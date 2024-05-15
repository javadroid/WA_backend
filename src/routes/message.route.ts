import express from 'express'

import authMiddleware from '../middlewares/auth.mddleware'
import { getMessage, sendMessage } from '../controllers/message.controller'


const  {all} = require('trim-request')
const messagerouter = express.Router()

messagerouter.route("/").post(all,authMiddleware,sendMessage)
messagerouter.route("/:convo_id").get(all,authMiddleware,getMessage)

export default messagerouter
