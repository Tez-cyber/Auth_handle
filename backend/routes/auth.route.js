import express from "express"
const router = express.Router()

import authController from "../controller/auth.controller.js"

router.post("/signup", authController.signup)
router.post("/login", authController.signup)
router.post("/logout", authController.logout)

router.post("/verify-email", authController.verifyEmail)
export default router