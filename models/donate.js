// import { DataTypes } from "sequelize"
// import { SQL } from "../utils/db.js"

import mongoose from "mongoose"

const Payment = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  order_id: {
    type: String,
    required: true
  },
  transaction_id: {
    type: String,
    required: false
  },
  payment_type: {
    type: String,
    required: true
  },
  payment_code: {
    type: String,
    required: false,
  },
  transaction_time: {
    type: String,
    required: false
  },
  transaction_status: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: false
  },
  url_action: {
    type: String,
    required: false,
  },
  qrcode_action: {
    type: String,
    required: false,
  },
}, { timestamps: true })

export default mongoose.model('Payment', Payment)

// export const Donate = SQL.define('Donate', {
//   amount: {
//     type: DataTypes.NUMBER,
//     allowNull: false
//   },
//   user_id: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   order_id: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   transaction_id: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   payment_type: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   payment_code: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   transaction_time: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   transaction_status: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   message: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   url_action: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   qrcode_action: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
// })

// // Donate.sync({ alter: true }) // for sync one model