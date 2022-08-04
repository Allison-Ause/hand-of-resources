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
    return new Yarn(rows[0]);
  }

  static async insert({ brand, fiber, weight, ply }) {
    const { rows } = await pool.query(
      `
    INSERT INTO yarn (brand, fiber, weight, ply) 
    VALUES ($1, $2, $3, $4) RETURNING *
    `,
      [brand, fiber, weight, ply]
    );
    return new Yarn(rows[0]);
  }

  static async updateById(id, newValues) {
    const yarn = await Yarn.getById(id);
    if (!yarn) return null;
    const updatedValues = { ...yarn, ...newValues };
    const { rows } = await pool.query(
      `
    UPDATE yarn
    SET brand = $2, fiber = $3, weight = $4, ply = $5
    WHERE id = $1
    RETURNING *
    `,
      [
        id,
        updatedValues.brand,
        updatedValues.fiber,
        updatedValues.weight,
        updatedValues.ply,
      ]
    );
    return new Yarn(rows[0]);
  }
}

module.exports = { Yarn };
