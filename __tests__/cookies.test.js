const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('yarn routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.skip('#GET /cookies displays list of yarn', async () => {
    const res = await request(app).get('/cookies');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(4);
  });

  it.skip('#GET /cookies/:id returns single cookie', async () => {
    const res = await request(app).get('/cookies/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      name: 'Snickerdoodle',
      batch_yield: 24,
      deliciousness: 9,
    });
  });

  it.skip('#POST /cookies adds a new cookie', async () => {
    const newCookie = {
      name: 'Juniper Snaps',
      batch_yield: 16,
      deliciousness: 10,
    };

    const res = await request(app).post('/cookies').send(newCookie);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newCookie,
    });
  });
});
afterAll(async () => {
  await setup(pool);
  pool.end();
});
