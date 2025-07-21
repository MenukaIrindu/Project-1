import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import userRouter from "./routers/userRouter.js"
import productRouter from "./routers/productRouter.js"
import dotenv from "dotenv"
dotenv.config()

const app = express()


app.use(bodyParser.json())

const connectionString = process.env.MONGO_URI

mongoose.connect(connectionString).then(
    ()=>{
        console.log("Connected to database")
    }
).catch(
    ()=>{
        console.log("Failed to connect to the database")
    }
)


app.use("/users", userRouter)
app.use("/product", productRouter)




app.listen(5000, 
   ()=>{
       console.log("server started")
   }
)
