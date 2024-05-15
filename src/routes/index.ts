import express from 'express'
import authrouter from './auth.route'
import conversationrouter from './conversation.route'
import messagerouter from './message.route'
import userRouter from './user.route'

const routers = express.Router()

routers.use("/auth",authrouter )
routers.use("/user",userRouter )
routers.use("/conversation",conversationrouter )
routers.use("/message",messagerouter )
export default routers