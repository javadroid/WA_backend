import express from 'express'
import { login, register } from '../controllers/auth.controller'

const authrouter = express.Router()

authrouter.route("/register").post(register)
authrouter.route("/login").post(login)
export default authrouter