import express from 'express'
import { login, logout, refresh_token, register } from '../controllers/auth.controller'

const authrouter = express.Router()

authrouter.route("/register").post(register)
authrouter.route("/login").post(login)
authrouter.route("/logout").post(logout)
authrouter.route("/refresh_token").post(refresh_token)
export default authrouter
