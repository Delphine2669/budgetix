const express = require("express");
const fs = require("fs");
const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  checkingUser,
} = require("./middlewares/auth");

const userControllers = require("./controllers/userControllers");
const incomeControllers = require("./controllers/incomeControllers");
const expenseControllers = require("./controllers/expenseControllers");
const authControllers = require("./controllers/authControllers");

//* user routes
router.get("/users", userControllers.browse);

router.put("/users/:id", userControllers.edit);
router.get("/users/:id", userControllers.read);
router.delete("/users/:id", userControllers.destroy);
//* income routes
router.get("/incomes", incomeControllers.browse);
router.get("/incomes/:id", incomeControllers.read);
router.post("/incomes", incomeControllers.add);
router.put("/incomes/:id", incomeControllers.edit);
router.delete("/incomes/:id", incomeControllers.destroy);

//* expense routes
router.get("/expenses", expenseControllers.browse);
router.get("/expenses/:id", expenseControllers.read);
router.post("/expenses", expenseControllers.add);
router.put("/expenses/:id", expenseControllers.edit);
router.delete("/expenses/:id", expenseControllers.destroy);

//*register and login
router.post("/users", hashPassword, checkingUser, userControllers.add);
router.post(
  "/login",
  authControllers.getUserByUsernameWithPasswordAndPassToNext,
  verifyPassword
);
// todo fix this if need be
// router.get("/users/:id/incomes", incomeControllers.getIncomesByUserId);
// router.get("/users/:userId/incomes/:incomeId", incomeControllers.readWithUser);

module.exports = router;
