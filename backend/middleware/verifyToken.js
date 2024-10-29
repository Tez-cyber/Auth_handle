import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token // Same "token" used in generateTokenAndSetCookie.js
    if(!token) return res.status(401).json({ success: false, message: "Unauthorized access - no token provided" })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return res.status(401).json({ success: false, message: "Unauthorized access - invalid token provided" })
        req.userId = decoded.userId
        next()
    }catch(err) {
        console.log("Error in verifyToken", err)
        return res.status(500).json({
            success: false, 
            message: "Server error" 
        })
    }
}