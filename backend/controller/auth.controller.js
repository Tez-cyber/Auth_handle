import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendPasswordResetEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js"
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
            // ====Send verification using email 
            await sendVerificationEmail(user.email, verificationToken)

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
    
    // ========= Verify Email
    verifyEmail = async (req, res) => {
        const { code } = req.body;
        try {
            const user = await User.findOne({
                verificationToken: code,
                verificationTokenExpiresAt: { $gt: Date.now() },
            });
    
            if (!user) {
                return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
            }
    
            user.isVerified = true;
            user.verificationToken = undefined;
            user.verificationTokenExpiresAt = undefined;
            await user.save();
    
            await sendWelcomeEmail(user.email, user.name);
    
            res.status(200).json({
                success: true,
                message: "Email verified successfully",
                user: {
                    ...user._doc,
                    password: undefined,
                },
            });
        } catch (error) {
            console.log("error in verifyEmail ", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    };
    
    // ====== Login
    login = async (req, res) => {
        const { email, password } = req.body

        try {
            const user = await User.findOne({ email })
            if(!user) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials"
                })
            }
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if(!isPasswordValid) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid password"
                })
            }
            // ======== generate token and set cookie if credentials are correct
            generateTokenAndSetCookie(res, user._id)

            user.lastLogin = new Date();
            await user.save()

            res.status(200).json({
                success: true,
                message: "Logged in successfully",
                user: {
                    ...user._doc,
                    password: undefined
                }
            })

        }catch(err) {
            console.log("Error Logging in", err);
            res.status(500).json({ success: false, message: "Login error" });
        }
    }

    // ======== Forgot Password
    forgotPassword = async (req, res) => {
        const { email } = req.body
        try {
            const user = await User.findOne({ email })

            if(!user) {
                return res.status(400).json({
                    success: false,
                    message: "Email doesnt exist"
                })
            }

            // Generate reset token
            const resetToken = crypto.randomBytes(20).toString("hex")
            const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 // Expires in 1 hr

            // ========== set user reset Token
            user.resetPasswordToken = resetToken
            user.resetPasswordTokenExpiresAt = resetTokenExpiresAt

            await user.save()

            // send email with user token....
            await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

            res.status(200).json({
                success: true,
                message: "Passwors reset link sent to your email"
            })
        }catch(err) {
            console.log("Server Error", err)
            res.status(500).json({ success: false, message: err.message });
        }
    }
    
    // ====== Logout
    logout = async (req, res) => {
        res.clearCookie("token")
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    }
    
}

const newApp = new App
export default newApp