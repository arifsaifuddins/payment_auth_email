import midtransClient from 'midtrans-client'
import "dotenv/config"

export const core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.SERVER_KEY_SB || process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_KEY_SB || process.env.CLIENT_KEY
})