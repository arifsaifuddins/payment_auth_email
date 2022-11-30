import express from 'express'
import { eBankMoney } from '../controllers/donate.js'

export const donateRouter = express.Router()

donateRouter.post('/transfer', eBankMoney)

donateRouter.post('/notification', () => {
  console.log('ok')
})

donateRouter.post('/status', () => {
  console.log('ok')
})