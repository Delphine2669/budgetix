const AbstractManager = require("./AbstractManager");

class ExpenseManager extends AbstractManager {
  constructor() {
    super({ table: "expense" });
  }

  insert(expense) {
    return this.database.query(
      `INSERT INTO ${this.table} (amount,description,date, user_id) VALUES(?,?,?,?)`,
      [expense.amount, expense.description, expense.date, expense.user_id]
    );
  }

  update(expense) {
    return this.database.query(
      `UPDATE ${this.table} SET amount=?, description=?, date=?, user_id=? WHERE id=?`,
      [
        expense.amount,
        expense.description,
        expense.date,
        expense.user_id,
        expense.id,
      ]
    );
  }
}
module.exports = ExpenseManager;
