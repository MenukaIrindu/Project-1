import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import userRouter from "./routers/userRouter.js"
import productRouter from "./routers/productRouter.js"

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


app.use("/users", userRouter)
app.use("/products", productRouter)




app.listen(5000, 
   ()=>{
       console.log("server started")
   }
)
