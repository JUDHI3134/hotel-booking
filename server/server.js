import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./config/db.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/userRoutes.js"
import hotelRouter from "./routes/hotelRoute.js"


//database connection
connectDB()

const app = express()
app.use(cors())

app.use(express.json())
app.use(clerkMiddleware())

//API to listen clerk webhooks
app.use("/api/clerk", clerkWebhooks)

app.get("/", (req, res) => res.send("Api is Working"))

app.use("/api/user", userRouter)
app.use("/api/hotel", hotelRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running PORT : ${PORT} `)
})