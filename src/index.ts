import express from 'express'
import app from './app'


console.log(process.env.NODE_ENV)
const  PORT =process.env.PORT||3001

app.listen(PORT,()=>{
    console.log(`Server listening at ${PORT}`)
})