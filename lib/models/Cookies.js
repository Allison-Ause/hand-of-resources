const pool = require('../utils/pool');

class Cookies {
  id;
  name;
  batch_yield;
  deliciousness;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.batch_yield = row.batch_yield;
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

  static async insert({ name, batch_yield, deliciousness }) {
    const { rows } = await pool.query(
      `
    INSERT INTO cookies (name, batch_yield, deliciousness) 
    VALUES ($1, $2, $3)
    RETURNING *
    `,
      [name, batch_yield, deliciousness]
    );
    return new Cookies(rows[0]);
  }
}

module.exports = { Cookies };
