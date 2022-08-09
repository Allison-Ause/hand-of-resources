const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cookies routes', () => {
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
      batch_yield: 24,
      deliciousness: 9,
    });
  });

  it('#POST /cookies adds a new cookie', async () => {
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

  it('#PUT /cookies/:id updates single cookie', async () => {
    const res = await request(app).put('/cookies/1').send({ batch_yield: 102 });
    expect(res.status).toBe(200);
    expect(res.body.batch_yield).toBe(102);
  });

  it('#DELETE /cookies/:id deletes a single cookie', async () => {
    const res = await request(app).delete('/cookies/1');
    expect(res.status).toBe(200);

    const cookiesRes = await request(app).get('/cookies/1');
    expect(cookiesRes.status).toBe(404);
  });
});
afterAll(async () => {
  await setup(pool);
  pool.end();
});
