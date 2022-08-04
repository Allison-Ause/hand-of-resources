const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('yarn routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.skip('#GET /needles displays list of needles', async () => {
    const res = await request(app).get('/needles');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(4);
  });

  it('#GET /needles/:id returns single needle', async () => {
    const res = await request(app).get('/needles/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      company: 'Chiagoo',
      material: 'Bamboo',
      length: 16,
    });
  });
});
afterAll(async () => {
  await setup(pool);
  pool.end();
});
