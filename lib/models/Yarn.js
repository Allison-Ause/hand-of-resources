const pool = require('../utils/pool');

class Yarn {
  id;
  brand;
  fiber;
  weight;
  ply;

  constructor(row) {
    this.id = row.id;
    this.brand = row.brand;
    this.fiber = row.fiber;
    this.ply = row.ply;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * from yarn;
    `);
    return rows.map((row) => new Yarn(row));
  }
}

module.exports = { Yarn };
