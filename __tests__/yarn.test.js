const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('yarn routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /yarn displays list of yarn', async () => {
    const res = await request(app).get('/yarn');
    expect(res.status).toBe(200);
    expect(res.body.length === 4);
  });
});
afterAll(() => {
  pool.end();
});
