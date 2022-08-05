const pool = require('../utils/pool');

class Cookies {
  id;
  name;
  yield;
  deliciousness;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.yeild = row.yield;
    this.deliciousness = row.deliciousness;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM cookies`);
    return rows.map((row) => new Cookies(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM cookies
    WHERE id = $1`,
      [id]
    );
    return new Cookies(rows[0]);
  }
}

module.exports = { Cookies };
