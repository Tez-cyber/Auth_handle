import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js"

dotenv.config()
const app = express()


// ================= Middlewares
app.use(express.json())

// ================= routes
import authRoutes from "./routes/auth.route.js"
app.use("/api/auth", authRoutes)


// ============ 

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port: ${PORT}`)
})