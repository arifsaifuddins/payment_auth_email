import express from "express";
import { loginUser, registerUser, verifyUser } from "../controllers/user.js";

export const userRouters = express.Router()

userRouters.get('/verify/:token', verifyUser)
userRouters.post('/register', registerUser)
userRouters.post('/login', loginUser)