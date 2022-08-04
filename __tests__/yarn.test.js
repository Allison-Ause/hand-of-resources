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

  it('#GET /yarn/:id displays single yarn', async () => {
    const res = await request(app).get('/yarn/1');
    console.log('res.body', res.body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      brand: 'Woolstock',
      fiber: 'Wool',
      weight: 'DK',
      ply: 3,
    });
  });
});
afterAll(() => {
  pool.end();
});
