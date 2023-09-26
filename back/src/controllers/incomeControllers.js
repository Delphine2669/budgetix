const models = require("../models");
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
  };
  models.income
    .insert(income)
    .then(([result]) => {
      res.location(`/incomes/${result.insertId}`).sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error saving data from database");
    });
};

const read = (req, res) => {
  const incomeId = parseInt(req.params.id, 10);
  models.income
    .find(incomeId)
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
  const incomeId = parseInt(req.params.id, 10);
  const incomeData = req.body;

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

module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
};
