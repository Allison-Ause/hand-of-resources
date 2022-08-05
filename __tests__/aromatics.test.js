const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('aromatics routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /aromatics returns full list of aromatics', async () => {
    const res = await request(app).get('/aromatics');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(4);
  });

  it('#GET /aromatics/:id returns a single id', async () => {
    const res = await request(app).get('/aromatics/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      name: 'Lavender',
      color: 'Purple',
      scent_strength: 10,
      toxic: false,
    });
  });

  it('#POST /aromatics adds new aromatic', async () => {
    const newAromatic = {
      name: 'White Sage',
      color: 'Silver',
      scent_strength: 6,
      toxic: true,
    };
    const res = await request(app).post('/aromatics').send(newAromatic);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newAromatic,
    });
  });

  it('#PUT /aromatics/:id updates single aromatic', async () => {
    const res = await request(app).put('/aromatics/1').send({ toxic: true });
    expect(res.status).toBe(200);
    expect(res.body.toxic).toBe(true);
  });

  it('#DELETE /aromatics/:id deletes a single aromatic', async () => {
    const res = await request(app).delete('/aromatics/1');
    expect(res.status).toBe(200);

    const aromaticRes = await request(app).get('/aromatic/1');
    expect(aromaticRes.status).toBe(404);
  });
});
afterAll(async () => {
  await setup(pool);
  pool.end();
});
