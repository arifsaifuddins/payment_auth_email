// import { Sequelize } from "sequelize"
import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDB = async () => {
  return await mongoose.connect(process.env.MONGODB)
    .then((res) => console.log('connection success : connected!', res.options.autoIndex))
    .catch(err => console.log('connection failed : not connected! = ', err.code))
}

// // sequelize
// // package required (pg pg-hstore)
// export const SQL = new Sequelize('email_auth_payment', 'postgres', '', {
//   host: 'localhost',
//   dialect: 'postgres'
// })

// export const connectDB = async () => {
//   try {
//     await SQL.authenticate()
//     console.log('Connection has been established successfully...')
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }

// // // syncronize all model
// SQL.sync({ alter: true }) // force, drop