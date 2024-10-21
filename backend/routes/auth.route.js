import express from "express"
const router = express.Router()

import authController from "../controller/auth.controller.js"

router.post("/signup", authController.signup)
router.post("/login", authController.signup)
router.post("/logout", authController.signup)
export default router