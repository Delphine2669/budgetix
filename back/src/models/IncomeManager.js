const AbstractManager = require("./AbstractManager");

class IncomeManager extends AbstractManager {
  constructor() {
    super({ table: "income" });
  }

  insert(income) {
    return this.database.query(
      `INSERT INTO ${this.table} (amount,description,date, user_id) VALUES(?,?,?,?)`,
      [income.amount, income.description, income.date, income.user_id]
    );
  }

  update(income) {
    return this.database.query(
      `UPDATE ${this.table} SET amount=?, description=?, date=?, user_id=? WHERE id=?`,
      [
        income.amount,
        income.description,
        income.date,
        income.user_id,
        income.id,
      ]
    );
  }
  findByIdWithUser(incomeId) {
    return this.database.query(
      `SELECT income.*, user.name AS user_name, user.email AS user_email
      FROM ${this.table} AS income
      INNER JOIN user ON income.user_id = user.id
      WHERE income.id = ?
      `,
      [incomeId]
    );
  }
  getAllIncomesByUserId(income) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id = ?`,
      [user_id]
    );
  }
}
module.exports = IncomeManager;
