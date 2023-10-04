require("dotenv").config();

const mysql = require("mysql2/promise");

const UserManager = require("./UserManager");
const IncomeManager = require("./IncomeManager");
const ExpenseManager = require("./ExpenseManager");

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const database = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// const mysql = require("mysql");
// const connection = mysql.createConnection({
//   // Get ProxySQL unix domain socket path from the environment
//   socketPath: process.env["CC_MYSQL_PROXYSQL_SOCKET_PATH"],
//   // Get the database user from the environment
//   user: process.env["MYSQL_ADDON_USER"],
//   // Get the database password from the environment
//   password: process.env["MYSQL_ADDON_PASSWORD"],
//   // Get the database name from the environment
//   database: process.env["MYSQL_ADDON_DB"],
// });
// connection.connect(function (err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }

//   console.log("connected as id " + connection.threadId);
// });

// try a connection

database.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers
const models = {};

models.user = new UserManager();
models.user.setDatabase(database);
models.income = new IncomeManager();
models.income.setDatabase(database);
models.expense = new ExpenseManager();
models.expense.setDatabase(database);
// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
