const pool = require('../utils/pool');

class Sheep {
  id;
  name;
  breed;
  region;
  age;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.breed = row.breed;
    this.region = row.region;
    this.age = row.age;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM sheep`);

    return rows.map((row) => new Sheep(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM sheep
    WHERE id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Sheep(rows[0]);
  }

  static async insert({ name, breed, region, age }) {
    const { rows } = await pool.query(
      `
    INSERT INTO sheep (name, breed, region, age)
    VALUES ($1, $2, $3, $4) RETURNING *
    `,
      [name, breed, region, age]
    );
    return new Sheep(rows[0]);
  }

  static async updateById(id, newValues) {
    const sheep = await Sheep.getById(id);
    if (!sheep) {
      return null;
    }
    const updatedValues = { ...sheep, ...newValues };
    const { rows } = await pool.query(
      `
    UPDATE sheep
    SET name = $2, breed = $3, region = $4, age = $5
    WHERE id = $1
    RETURNING *`,
      [
        id,
        updatedValues.name,
        updatedValues.breed,
        updatedValues.region,
        updatedValues.age,
      ]
    );
    return new Sheep(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
    DELETE from sheep
    WHERE id = $1
    RETURNING *`,
      [id]
    );
    return new Sheep(rows[0]);
  }
}

module.exports = { Sheep };
