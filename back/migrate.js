require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2/promise");

const migrate = async () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await mysql.createConnection({
    host: FORMER_DB_HOST,
    port: FORMER_DB_PORT,
    user: FORMER_DB_USER,
    password: FORMER_DB_PASSWORD,
    multipleStatements: true,
  });

  await connection.query(`drop database if exists ${FORMER_DB_NAME}`);
  await connection.query(`create database ${FORMER_DB_NAME}`);
  await connection.query(`use ${FORMER_DB_NAME}`);
  console.log("Current working directory:", process.cwd());

  const sql = fs.readFileSync("./database.sql", "utf8");

  await connection.query(sql);

  connection.end();
};

try {
  migrate();
} catch (err) {
  console.error(err);
}
