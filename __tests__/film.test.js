
import db from '../lib/utils/db.js';
// import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe.skip('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('POSTS a film', async () => {
    const res = await request(app)
      .post('/api/v1/films')
      .send({
        title: 'Fast & Furious',
        studio: 'MGM',
        released: 2017,
      });

    expect(res.body).toEqual({
      id: 1,
      title: 'Fast & Furious',
      studio: 'MGM',
      released: 2017,
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });
});
