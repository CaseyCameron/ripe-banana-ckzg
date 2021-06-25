
import db from '../lib/utils/db.js';
// import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../lib/models/Studio.js';

describe('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('POSTS a studio', async () => {
    const res = await request(app)
      .post('/api/v1/studios')
      .send({
        name: 'MGM',
        city: 'Los Angeles',
        state: 'California',
        country: 'USA'
      });

    expect(res.body).toEqual({
      id: 1,
      name: 'MGM',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  it('Get all studios', async () => {
    await Studio.bulkCreate(
      [{
        name: 'MGM',
        city: 'Los Angeles',
        state: 'California',
        country: 'USA'
      },

      {
        name: 'TNT',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'USA'
      },

      {
        name: 'Disney',
        city: 'Los Angeles',
        state: 'California',
        country: 'USA'
      }
      ]

    );

    const res = await request(app)
      .get('/api/v1/studios');

    expect(res.body).toEqual([{ id: 1, name: 'MGM' }, { id: 2, name: 'TNT' }, { id: 3, name: 'Disney' }]);
  });
});
