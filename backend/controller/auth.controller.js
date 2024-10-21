import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
class App {
    // ====== SignUp
    signup = async (req, res) => {
        const { email, name, password  } = req.body
        try {
            if(!email || !password || !name){
                throw new Error("All fields are required")
            }
            // ====== Check if user exists
            const userAlreadyExists = await User.findOne({ email });
            if(userAlreadyExists) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists"
                })
            }

            // =========== 
            const genSalt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, genSalt)
            const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
            const user = new User({
                email, 
                password: hashPassword,
                name,
                verificationToken,
                verificationTokenExpiresAt: Date.now() + 24 * 60 * 60* 1000 // 24 hours
            })
            await user.save();

            // ========= jwt
            generateTokenAndSetCookie(res, user._id)
            res.status(201).json({
                success: true,
                message: "User created successfully",
                user: {
                    ...user._doc,
                    password: undefined
                }
            })
        }catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }
    
    // ====== SignUp
    login = async (req, res) => {
        res.send("SignUp page")
    }
    
    // ====== SignUp
    logout = async (req, res) => {
        res.send("SignUp page")
    }
    
}

const newApp = new App
export default newApp