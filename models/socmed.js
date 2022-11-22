import { DataTypes } from "sequelize";
import { pgSQL } from "../utils/db.js";

export const Socmed = pgSQL.define('Socmed', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

// Socmed.sync({ alter: true }) // for sync one model