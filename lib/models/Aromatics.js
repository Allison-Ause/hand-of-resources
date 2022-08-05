const pool = require('../utils/pool');

class Aromatics {
  id;
  name;
  color;
  scent_strength;
  toxic;

  constructor(rows) {
    this.id = rows.id;
    this.name = rows.name;
    this.color = rows.color;
    this.scent_strength = rows.scent_strength;
    this.toxic = rows.toxic;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM aromatics`);
    return rows.map((row) => new Aromatics(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM aromatics
    WHERE id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Aromatics(rows[0]);
  }

  static async insert({ name, color, scent_strength, toxic }) {
    const { rows } = await pool.query(
      `
    INSERT INTO aromatics (name, color, scent_strength, toxic)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
      [name, color, scent_strength, toxic]
    );
    return new Aromatics(rows[0]);
  }

  static async updateById(id, newValues) {
    const aromatic = await Aromatics.getById(id);
    if (!aromatic) {
      return null;
    }
    const updatedValues = { ...aromatic, ...newValues };
    const { rows } = await pool.query(
      `
    UPDATE aromatics
    SET name = $2, color = $3, scent_strength = $4, toxic = $5
    WHERE id = $1
    RETURNING *`,
      [
        id,
        updatedValues.name,
        updatedValues.color,
        updatedValues.scent_strength,
        updatedValues.toxic,
      ]
    );
    return new Aromatics(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM aromatics
    WHERE id = $1
    RETURNING *`,
      [id]
    );
    return new Aromatics(rows[0]);
  }
}

module.exports = { Aromatics };
