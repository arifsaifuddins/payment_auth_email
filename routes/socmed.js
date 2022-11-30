import express from 'express'
import passport from 'passport'
import { socmedsAuth } from '../controllers/socmed.js'

export const socmedRouter = express.Router()

socmedRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
socmedRouter.get('/google/callback', passport.authenticate('google'), socmedsAuth)

socmedRouter.get('/facebook', passport.authenticate('facebook', { scope: 'email' }))
socmedRouter.get('/facebook/callback', passport.authenticate('facebook'), socmedsAuth)