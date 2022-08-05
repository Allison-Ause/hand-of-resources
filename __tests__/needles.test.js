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

  it.skip('#GET /needles/:id returns single needle', async () => {
    const res = await request(app).get('/needles/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      company: 'Chiagoo',
      material: 'Bamboo',
      length: 16,
    });
  });

  it.skip('#POST /needles route adds new needle', async () => {
    const newNeedle = {
      company: 'Addi Turbo',
      material: 'Platinum',
      length: 60,
    };
    const res = await request(app).post('/needles').send(newNeedle);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newNeedle,
    });
  });

  it.skip('#PUT /needles/:id updates a single needle', async () => {
    const res = await request(app)
      .put('/needles/1')
      .send({ material: 'Mohair' });
    expect(res.status).toBe(200);
    expect(res.body.material).toEqual('Mohair');
  });

  it.skip('#DELETE /needles/:id deletes a single needle', async () => {
    const res = await request(app).delete('/needles/1');
    expect(res.status).toBe(200);

    const needleRes = await request(app).get('/needles/1');
    expect(needleRes.status).toBe(404);
  });
});
afterAll(async () => {
  await setup(pool);
  pool.end();
});
