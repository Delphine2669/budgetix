const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (username, email, hashedPassword) VALUES(?,?,?)`,
      [user.username, user.email, user.hashedPassword]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET username=?, email=?, hashedPassword=? WHERE id=?`,
      [user.username, user.email, user.hashedPassword, user.id]
    );
  }
  findByUsernameWithHashedPassword(user) {
    return this.database.query(
      `SELECT username,id, hashedPassword from ${this.table} where username = ?`,
      [user.username, user.id]
    );
  }

  getUserIncomes(user) {
    return this.database.query(
      `SELECT 
            u.id AS user_id,
            u.username,
            e.id AS expense_id, e.amount AS expense_amount, e.date AS expense_date, e.description AS expense_description,
            i.id AS income_id, i.amount AS income_amount, i.date AS income_date, i.description AS income_description
         FROM 
            user AS u
         LEFT JOIN 
            expense AS e ON u.id = e.user_id
         LEFT JOIN 
            income AS i ON u.id = i.user_id
         WHERE 
            u.id = ?`,
      [user.id]
    );
  }

  getUserExpensesP(userId) {
    return this.database.query(
      `SELECT id, amount, date, description FROM expense WHERE user_id = ?`,
      [userId]
    );
  }

  getUserIncomesP(userId) {
    return this.database.query(
      `SELECT id, amount, date, description FROM income WHERE user_id = ?`,
      [userId]
    );
  }
}
module.exports = UserManager;
