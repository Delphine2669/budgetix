const models = require("../models");

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
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
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
getUserIncome = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await UserManager.getUserById(user_id);
    const incomes = await IncomeManager.getIncomesByUserId(user_id);

    const responseData = {
      user,
      incomes,
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { browse, read, add, edit, destroy };
