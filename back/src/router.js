const express = require("express");

const fs = require("fs");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());
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
// router.post(
//   "/login",
//   authControllers.getUserByUsernameWithPasswordAndPassToNext,
//   verifyPassword
// );
router.post(
  "/login",
  authControllers.getUserByUsernameWithPasswordAndPassToNext,
  verifyPassword,
  async (req, res) => {
    try {
      const user =
        await authControllers.getUserByUsernameWithPasswordAndPassToNext(
          req.body.username,
          req.body.password
        );

      if (user) {
        res.cookie("user", "authenticatedUser", {
          maxAge: 900000,
          httpOnly: true,
        });
        res.status(200).json({ message: "Login successful", user });
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/protected", (req, res) => {
  if (req.cookies.user === "authenticatedUser") {
    res.status(200).json({ message: "Welcome to the protected route!" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("/");
});

module.exports = router;
