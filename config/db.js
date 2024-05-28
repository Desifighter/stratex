import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";

const connectionConfig = {
  host: process.env.END_POINT,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: 3306,
};

async function connectDB() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    console.log("Connected to the MySQL database.");

    // Example query to test the connection
    const [rows, fields] = await connection.execute("SELECT 1 + 1 AS solution");
    console.log("The solution is:", rows[0].solution);

    // No need to close the connection manually when using mysql2/promise
  } catch (error) {
    console.error("Error connecting to the database:", error.stack);
  }
}

export default connectDB;

export const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: process.env.END_POINT,
    dialect: "mysql",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the MySQL database.");
    await sequelize.sync(); // Sync models with the database
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();
