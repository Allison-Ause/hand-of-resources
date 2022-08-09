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

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM needles
    WHERE id = $1
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Needles(rows[0]);
  }

  static async insert({ company, material, length }) {
    const { rows } = await pool.query(
      `INSERT INTO needles (company, material, length) VALUES ($1, $2, $3)
    RETURNING *`,
      [company, material, length]
    );
    return new Needles(rows[0]);
  }

  static async updateById(id, newValues) {
    const needles = await Needles.getById(id);
    if (!needles) {
      return null;
    }
    const updatedValues = { ...needles, ...newValues };
    const { rows } = await pool.query(
      `
    UPDATE needles
    SET company = $2, material = $3, length = $4
    WHERE id = $1
    RETURNING *
    `,
      [id, updatedValues.company, updatedValues.material, updatedValues.length]
    );
    return new Needles(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
    DELETE from needles
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    return new Needles(rows[0]);
  }
}

module.exports = { Needles };
