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
}
module.exports = IncomeManager;
