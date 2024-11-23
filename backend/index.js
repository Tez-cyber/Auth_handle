import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./db/connectDB.js"
import path from "path"

dotenv.config();
const app = express();
const __dirname = path.resolve();


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
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port: ${PORT}`)
})