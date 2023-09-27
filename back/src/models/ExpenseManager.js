const AbstractManager = require("./AbstractManager");

class ExpenseManager extends AbstractManager {
  constructor() {
    super({ table: "expense" });
  }

  insert(expense) {
    return this.database.query(
      `INSERT INTO ${this.table} (amount,description,date) VALUES(?,?,?)`,
      [expense.amount, expense.description, expense.date]
    );
  }

  update(expense) {
    return this.database.query(
      `UPDATE ${this.table} SET amount=?, description=?, date=? WHERE id=?`,
      [expense.amount, expense.description, expense.date, expense.id]
    );
  }
}
module.exports = ExpenseManager;
