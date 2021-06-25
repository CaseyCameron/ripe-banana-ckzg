
import sequelize from '../lib/utils/db.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
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
});
