import express from 'express'
import passport from 'passport'
import { facebookAuth, googleAuth } from '../controllers/socmed.js'

export const socmedRouter = express.Router()

socmedRouter.post('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
socmedRouter.get('/google/callback', passport.authenticate('google'), (_, res) => res.redirect('/auth/google/success'))
socmedRouter.get('/google/success', googleAuth)

socmedRouter.post('/facebook', passport.authenticate('facebook', { scope: 'email' }))
socmedRouter.get('/facebook/callback', passport.authenticate('facebook'), (_, res) => res.redirect('/auth/facebook/success'))
socmedRouter.get('/facebook/success', facebookAuth)