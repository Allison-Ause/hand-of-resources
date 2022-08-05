const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('yarn routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /sheep displays full list of sheep', async () => {
    const res = await request(app).get('/sheep');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(4);
  });

  it('#GET /sheep/:id displays one sheep', async () => {
    const res = await request(app).get('/sheep/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      name: 'Bopsy',
      breed: 'Valais Blacknose',
      region: 'Switzerland',
      age: 2,
    });
  });

  it('#POST /sheep adds new sheep', async () => {
    const newSheep = {
      name: 'Sofia',
      breed: 'Bluefaced Leister',
      region: 'Ireland',
      age: 8,
    };
    const res = await request(app).post('/sheep').send(newSheep);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newSheep,
    });
  });

  it('#PUT /sheep/:id updates single sheep', async () => {
    const res = await request(app).put('/sheep/1').send({ age: 45 });
    expect(res.status).toBe(200);
    expect(res.body.age).toBe(45);
  });

  it('#DELETE /sheep/:id deletes a single sheep', async () => {
    const res = await request(app).delete('/sheep/1');
    expect(res.status).toBe(200);

    const sheepRes = await request(app).get('/sheep/1');
    expect(sheepRes.status).toBe(404);
  });
});
afterAll(async () => {
  await setup(pool);
  pool.end();
});
