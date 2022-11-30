// import { DataTypes } from "sequelize"
// import { SQL } from "../utils/db.js"

import mongoose from "mongoose"

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: false
  },
  token: {
    type: String,
    required: false
  },
  verify: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false,
    default: '-'
  },
  bio: {
    type: String,
    required: false,
    default: '-'
  },
  address: {
    type: String,
    required: false,
    default: '-'
  },
  birth: {
    type: String,
    required: false,
    default: '-'
  },
}, { timestamps: true })

export default mongoose.model('User', User)

// export const User = SQL.define('User', {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       isEmail: true
//     }
//   },
//   picture: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   token: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   verify: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   bio: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   address: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   birth: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
// })

// // User.sync({ alter: true }) // for sync one model