import express from 'express'
import { login, register } from '../controllers/auth.controller'

const authrouter = express.Router()

authrouter.route("/register").post(register)
authrouter.route("/register").post(login)
export default authrouter