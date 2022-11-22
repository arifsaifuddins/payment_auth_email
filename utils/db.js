import { Sequelize } from "sequelize";

export const pgSQL = new Sequelize('email_auth_payment', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres'
});

export const connectDB = async () => {
  try {
    await pgSQL.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// // syncronize all model
pgSQL.sync({ alter: true }) // force, drop