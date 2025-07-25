const models = require("../models");
const AbstractManager = require("../models/AbstractManager");
const UserManager = require("../models/UserManager");
// const userManager = new UserManager();
const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error retrieving data from database");
    });
};

const add = (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    hashedPassword: req.body.hashedPassword,
  };
  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error saving data from database");
    });
};
const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error retrieving data from database");
    });
};

const edit = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userData = req.body;
  models.user
    .update(userData, userId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error editing data");
    });
};
const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserIncome = (req, res) => {
  // const userId = parseInt(req.params.id, 10);
  const userData = req.params.id;

  if (isNaN(userId)) {
    return res.status(400).send("Invalid user ID");
  }

  models.user
    .getUserIncomes(userId)

    .then(([rows]) => {
      if (rows.length === 0) {
        res.status(404).send("No data found for this user");
      } else {
        res.json(rows);
        res.status(200).json(rows);
      }
    })
    .catch((err) => {
      console.error("Error fetching user incomes/expenses:", err);
      res.status(500).send("Internal server error");
    });
};

const getUserIncomesAndExpenses = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userData = req.params.id;
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  try {
    const { id } = req.params;

    const [expenses] = await models.user.getUserExpensesP(id);
    const [incomes] = await models.user.getUserIncomesP(id);

    res.json({ userId, expenses, incomes });
  } catch (error) {
    console.error("Error fetching user income and expenses:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
  getUserIncome,
  getUserIncomesAndExpenses,
};
