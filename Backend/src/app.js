import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

//middleware
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:'16kb'})) //This for url //in extended we will take objects inside object
app.use(express.static("public"))//for assets

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(cookieParser())

//routes import
import userRouter from'./routes/user.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter)

export default app;