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

  post(expense) {
    return this.database.query(
      `INSERT INTO ${this.table} (amount, description, date, user_id) VALUES (?, ?, ?, ?`,
      [expense.amount, expense.description, expense.date, expense.id]
    );
  }
  getExpensesById(expense) {
    return this.database.query(`SELECT * from ${this.table} WHERE id=?`, [
      expense.amount,
      expense.description,
      expense.date,
      expense.id,
    ]);
  }
}
module.exports = ExpenseManager;
