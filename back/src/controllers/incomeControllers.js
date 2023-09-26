const models = require("../models");
const IncomeManager = require("../models/IncomeManager");
const browse = (req, res) => {
  models.income
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
  const income = {
    amount: req.body.amount,
    description: req.body.description,
    date: req.body.date,
    user_id: req.body.user_id,
  };
  models.user
    .findById(income.user_id)
    .then((user) => {
      if (!user) {
        return res.status(400).send("Invalid user_id");
      }
      models.income
        .insert(income)
        .then(([result]) => {
          res.location(`/incomes/${result.insertId}`).sendStatus(204);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("error saving data from database");
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error saving data from database");
    });
};

const read = (req, res) => {
  const incomeId = parseInt(req.params.id, 10);
  models.income
    .findByIdWithUser(incomeId)
    .then(([incomeWithUser]) => {
      if (!incomeWithUser) {
        res.sendStatus(404);
      } else {
        res.send(incomeWithUser);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error retrieving data from database");
    });
};

const edit = (req, res) => {
  const incomeId = parseInt(req.params.id, 10);
  const incomeData = req.body;
  models.user
    .findById(incomeData.user_id)
    .then((user) => {
      if (!user) {
        return res.status(400).send("Invalid user_id");
      }

      models.income
        .update(incomeData, incomeId)
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
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving income data");
    });
};
const destroy = (req, res) => {
  const incomeId = parseInt(req.params.id, 10);
  models.income
    .delete(incomeId)
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
const readWithUser = async (req, res) => {
  const incomeId = parseInt(req.params.id, 10);
  try {
    // Use the findByIdWithUser method from your IncomeManager to fetch income data with user information
    const [incomeWithUser] = await incomeManager.findByIdWithUser(incomeId);

    if (!incomeWithUser) {
      return res.sendStatus(404); // Return a 404 response if the record is not found
    }
    const userId = incomeWithUser.user_id;
    const responseData = {
      income: incomeWithUser,
      userId: userId,
    };
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving income data with user information");
  }
};

const getIncomesByUserId = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const incomes = await IncomeManager.getAllIncomesByUserId(user_id);
    res.json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
  getIncomesByUserId,
  readWithUser,
};
