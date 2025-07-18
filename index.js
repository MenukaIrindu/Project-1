import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import studentRouter from "./routers/studentRouter.js"
import userRouter from "./routers/userRouter.js"

const app = express()


app.use(bodyParser.json())

const connectionString = "mongodb+srv://admin:123@cluster0.aaydtkx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



mongoose.connect(connectionString).then(
    ()=>{
        console.log("Connected to database")
    }
).catch(
    ()=>{
        console.log("Failed to connect to the database")
    }
)




app.use("/students",studentRouter)
app.use("/users", userRouter)




app.listen(5000, 
   ()=>{
       console.log("server started")
   }
)
