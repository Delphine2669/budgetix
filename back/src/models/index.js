require("dotenv").config();

const mysql = require("mysql2/promise");

const UserManager = require("./UserManager");
const IncomeManager = require("./IncomeManager");
const ExpenseManager = require("./ExpenseManager");

const {
  FORMER_DB_HOST,
  FORMER_DB_PORT,
  FORMER_DB_USER,
  FORMER_DB_PASSWORD,
  FORMER_DB_NAME,
} = process.env;

const database = mysql.createPool({
  host: FORMER_DB_HOST,
  port: FORMER_DB_PORT,
  user: FORMER_DB_USER,
  password: FORMER_DB_PASSWORD,
  database: FORMER_DB_NAME,
});

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
