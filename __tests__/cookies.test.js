const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('yarn routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /cookies displays list of yarn', async () => {
    const res = await request(app).get('/cookies');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(4);
  });

  it('#GET /cookies/:id returns single cookie', async () => {
    const res = await request(app).get('/cookies/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      name: 'Snickerdoodle',
      yield: 24,
      deliciousness: 9,
    });
  });
});
afterAll(async () => {
  await setup(pool);
  pool.end();
});
