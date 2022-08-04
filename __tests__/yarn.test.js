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
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      brand: 'Woolstock',
      fiber: 'Wool',
      weight: 'DK',
      ply: 3,
    });
  });
  it('#POST /yarn/ adds new yarn', async () => {
    const newYarn = {
      brand: 'BlueSky',
      fiber: 'Linen',
      weight: 'Sport',
      ply: 2,
    };
    const res = await request(app).post('/yarn').send(newYarn);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newYarn,
    });
  });
  it('#PUT /yarn/:id updates single yarn', async () => {
    const res = await request(app).put('/yarn/1').send({ weight: 'Bulky' });
    expect(res.status).toBe(200);
    expect(res.body).toBe('Bulky');
  });
});
afterAll(() => {
  pool.end();
});
