import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import fileupload from 'express-fileupload'
import ExpressMongoSanitize from 'express-mongo-sanitize'
const app=express()


if(process.env.NODE_ENV !=="production"){
    app.use(morgan("dev"))
}

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(ExpressMongoSanitize())
app.use(cookieParser())
app.use(compression())
app.use(fileupload({useTempFiles:true}))
app.use(cors({
    origin:["http://localhost:3001",]
}))


app.post("/",(req,res)=>{

    res.send(req.body)
})
export default app
