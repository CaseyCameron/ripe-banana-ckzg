import db from '../lib/utils/db.js';
// import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('POSTS an reviewer', async () => {
    const res = await request(app)
      .post('/api/v1/reviewer')
      .send({
        name: 'Roger Ebert',
        company: 'Skiskel & Ebert'
      });
      
    expect(res.body).toEqual({
      id: 1,
      name: 'Roger Ebert',
      company: 'Skiskel & Ebert',
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
  });
});
