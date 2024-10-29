import express from "express"
const router = express.Router()

import authController from "../controller/auth.controller.js"

router.post("/signup", authController.signup)
router.post("/verify-email", authController.verifyEmail)
router.post("/login", authController.login)
router.post("/forgot-password", authController.forgotPassword)
router.post("/reset-password/:token", authController.resetPassword)
router.post("/logout", authController.logout)


export default router