import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MONGODB Connected: ${conn.connection.host}`)
    }catch (err) {
        console.log("Error connection to MongoDB:", err.message)
        process.exit(1) // 0 status is success
    }
}