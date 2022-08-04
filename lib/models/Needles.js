const pool = require('../utils/pool');

class Needles {
  id;
  company;
  material;
  length;

  constructor(row) {
    this.id = row.id;
    this.company = row.company;
    this.material = row.material;
    this.length = row.length;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM needles
    `);
    return rows.map((row) => new Needles(row));
  }
}

module.exports = { Needles };
