const AbstractManager = require("./AbstractManager");

class IncomeManager extends AbstractManager {
  constructor() {
    super({ table: "income" });
  }

  insert(income) {
    return this.database.query(
      `INSERT INTO ${this.table} (amount,description,date) VALUES(?,?,?)`,
      [income.amount, income.description, income.date]
    );
  }

  update(income) {
    return this.database.query(
      `UPDATE ${this.table} SET amount=?, description=?, date=?WHERE id=?`,
      [income.amount, income.description, income.date, income.id]
    );
  }
}
module.exports = IncomeManager;
