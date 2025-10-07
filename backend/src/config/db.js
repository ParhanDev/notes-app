import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12801511",
  password: "fcE7JrHlJk",
  database: "sql12801511",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("Database connection failed:");
    throw error;
  }
};
