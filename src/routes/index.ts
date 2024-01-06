import express from 'express'
import authrouter from './auth.route'

const routers = express.Router()

routers.use("/auth",authrouter )
export default routers