import express from "express"
const router = express.Router()

import authController from "../controller/auth.controller.js"

router.get("/signup", authController.signup)
router.get("/login", authController.signup)
router.get("/logout", authController.signup)
export default router