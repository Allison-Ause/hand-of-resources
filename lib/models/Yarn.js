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
    this.weight = row.weight;
    this.fiber = row.fiber;
    this.ply = row.ply;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * from yarn;
    `);
    return rows.map((row) => new Yarn(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM yarn WHERE id = $1`,
      [id]
    );
    console.log('rows is:', rows);
    return new Yarn(rows[0]);
  }
}

module.exports = { Yarn };
