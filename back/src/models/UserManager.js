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
      `SELECT username, hashedPassword from ${this.table} where username = ?`,
      [user.username]
    );
  }
}

module.exports = UserManager;
