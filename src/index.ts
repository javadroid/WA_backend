import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app'
import logger from './configs/logger'

dotenv.config()

const {MONGODB_URL,NODE_ENV}=process.env
const  PORT =process.env.PORT||3001


let server: any

mongoose.connect(MONGODB_URL!).then(()=>{
    server =app.listen(PORT,()=>{
        logger.info(`Server connected to db and listening at ${PORT}`)
    })
})

mongoose.connection.on("error",(err:any)=>{
logger.error("Mongodb connection errot: "+err)
})

if(NODE_ENV!=="production"){
    mongoose.set("debug",true)
}

const exitHandler=()=>{
    if(server){
        logger.info("Server closed");
        process.exit(1);
    }else{
        process.exit(1);
    }
}
const unexpectedErrorHandler=(error:any)=>{
    logger.error(error)
    exitHandler()
}

process.on("uncaughtException",unexpectedErrorHandler);
process.on("unhandledRejection",unexpectedErrorHandler);
process.on("SIGTERM",()=>{
    if(server){
        logger.info("Server closed");
        process.exit(1);
    }
});