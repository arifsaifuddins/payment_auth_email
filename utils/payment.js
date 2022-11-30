import midtransClient from 'midtrans-client'
import "dotenv/config"

export const core = new midtransClient.CoreApi({
  isProduction: true,
  serverKey: process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_KEY
})