import "dotenv/config";
import './utils/passport.js'
import cors from 'cors';
import express from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import { connectDB } from "./utils/db.js";
import { userRouters } from "./routes/user.js";
import { socmedRouter } from "./routes/socmed.js";

// init
const app = express()
const port = 5300

// session
app.use(cookieSession({ name: 'session', keys: [process.env.SECRET_KEY], maxAge: 24 * 60 * 60 * 100 }))

// databases
connectDB()

// midlewares
app.use(cors())
app.use(express.json())

// passport init
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/user', userRouters)
app.use('/auth', socmedRouter)
app.use('/', (req, res) => {
  return res.status(200).json({ code: 200, message: 'EMail Auth Payment' })
})

// server
app.listen(port, () => console.log(`Running at http://localhost:${port}!`))