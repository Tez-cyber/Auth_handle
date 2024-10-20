import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js"

dotenv.config()
const app = express()


// ================= routes
import authRoutes from "./routes/auth.route.js"
app.use("/api/auth", authRoutes)
app.get("/", (req, res) => {
    res.send("Hello World")
})

// ============

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port: ${PORT}`)
})