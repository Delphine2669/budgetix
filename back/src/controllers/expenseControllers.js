const models = require("../models");

const browse = (req, res) => {
  models.expense
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
  const expense = {
    amount: req.body.amount,
    description: req.body.description,
    date: req.body.date,
  };
  models.expense
    .insert(expense)
    .then(([result]) => {
      res.location(`/expenses/${result.insertId}`).sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error saving data from database");
    });
};

const read = (req, res) => {
  const expenseId = parseInt(req.params.id, 10);
  models.expense
    .find(expenseId)
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
  const expenseId = parseInt(req.params.id, 10);
  const expenseData = req.body;

  models.expense
    .update(expenseData, expenseId)
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
  const expenseId = parseInt(req.params.id, 10);
  models.expense
    .delete(expenseId)
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
