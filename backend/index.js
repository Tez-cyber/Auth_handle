import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./db/connectDB.js"

dotenv.config()
const app = express()


// ================= Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // set to true so that cookies and reqs can be handled
}))
app.use(express.json()) // parse incoming requests: using req.body
app.use(cookieParser()) // parse incoming cookies


// ================= routes
import authRoutes from "./routes/auth.route.js"
app.use("/api/auth", authRoutes)


// ============ 

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port: ${PORT}`)
})