const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (name,email,password) VALUES(?,?,?)`,
      [user.name, user.email, user.password]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET name=?, email=?, password=? WHERE id=?`,
      [user.name, user.email, user.password, user.id]
    );
  }
  findById(user_id) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE id = ?`, [
      user_id,
    ]);
  }
}
module.exports = UserManager;
