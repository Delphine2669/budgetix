const express = require("express");
const fs = require("fs");
const router = express.Router();
const userControllers = require("./controllers/userControllers");
const incomeControllers = require("./controllers/incomeControllers");
router.get("/users", userControllers.browse);
router.post("/users", userControllers.add);
router.put("/users/:id", userControllers.edit);
router.get("/users/:id", userControllers.read);
router.delete("/users/:id", userControllers.destroy);

router.get("/incomes", incomeControllers.browse);
router.get("/incomes/:id", incomeControllers.read);
router.post("/incomes", incomeControllers.add);
router.put("/incomes/:id", incomeControllers.edit);
router.delete("/incomes/:id", incomeControllers.destroy);

router.get("/users/:userId/incomes", incomeControllers.getIncomesByUserId);

router.get("/users/:userId/incomes/:incomeId", incomeControllers.readWithUser);
module.exports = router;
