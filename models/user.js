import { DataTypes } from "sequelize";
import { pgSQL } from "../utils/db.js";

export const User = pgSQL.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  password: DataTypes.STRING
})

// User.sync({ alter: true }) // for sync one model