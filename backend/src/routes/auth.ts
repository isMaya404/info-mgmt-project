import express from "express";
import { signup, login } from "../controllers/auth.ts";
const router = express.Router();

// INFO:  "/" === "api/v1/auth"
router.post("/signup", signup);
router.post("/login", login);
// router.post("/otp", otp); // idk maybe if it's a requirement

export default router;
