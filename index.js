import "dotenv/config"
import './utils/passport.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import cors from 'cors'
import express from "express"
import passport from "passport"
import cookieSession from "cookie-session"
import expressEjsLayouts from 'express-ejs-layouts'
import { connectDB } from "./utils/db.js"
import { userRouters } from "./routes/user.js"
import { socmedRouter } from "./routes/socmed.js"
import { donateRouter } from "./routes/donate.js"

// init
const app = express()
const port = 5300
const __dirname = dirname(fileURLToPath(import.meta.url))

// session
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET_KEY],
  maxAge: 24 * 60 * 60 * 100
}))

// databases
connectDB()

// midlewares
app.use(cors())
app.use(express.json())
app.use(express.raw())

// template engine
app.use(expressEjsLayouts)
app.set('view engine', 'ejs')
app.set('/views', path.join(__dirname, '/views'))
app.use('/public', express.static(path.join(__dirname, '/public')))

// passport init
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/user', userRouters)
app.use('/auth', socmedRouter)
app.use('/payment', donateRouter)
app.get('/', (_, res) => {
  res.render('home', {
    title: 'Home',
    layout: './layouts/main'
  })
})

// server
app.listen(port, () => console.log(`Running at http://localhost:${port}!`))