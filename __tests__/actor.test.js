import db from '../lib/utils/db.js';
// import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('POSTS an actor', async () => {
    const res = await request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Brad Pitt',
        dob: new Date(1963, 12, 18),
        pob: 'Shawnee, Oklahoma'
      });
      
    expect(res.body).toEqual({
      id: 1,
      name: 'Brad Pitt',
      dob: new Date(1963, 12, 18).toISOString(),
      pob: 'Shawnee, Oklahoma',
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
  });
});
